import { assert } from "chai";
import {
  AUTO_CHECK_POLL_MS,
  AUTO_CHECK_STARTUP_DELAY_MS,
  decideAutoCheck,
  getAutoCheckIntervalMs,
  parseLastAutoCheck,
} from "../../src/utils/autoCheckSchedule";

const DAY = 24 * 60 * 60 * 1000;
// Largest delay a browser-style timer stores without overflowing.
const MAX_TIMER_DELAY = 2 ** 31 - 1;

describe("autoCheckSchedule", function () {
  describe("getAutoCheckIntervalMs", function () {
    it("maps each frequency to its period", function () {
      assert.equal(getAutoCheckIntervalMs("daily"), DAY);
      assert.equal(getAutoCheckIntervalMs("weekly"), 7 * DAY);
      assert.equal(getAutoCheckIntervalMs("monthly"), 30 * DAY);
    });

    it("treats disabled and unknown values as off", function () {
      assert.equal(getAutoCheckIntervalMs("disabled"), 0);
      assert.equal(getAutoCheckIntervalMs("fortnightly"), 0);
      assert.equal(getAutoCheckIntervalMs("constructor"), 0);
    });
  });

  describe("timers", function () {
    it("never asks a timer for a delay that overflows", function () {
      assert.isBelow(AUTO_CHECK_POLL_MS, MAX_TIMER_DELAY);
      assert.isBelow(AUTO_CHECK_STARTUP_DELAY_MS, MAX_TIMER_DELAY);
    });

    it("is needed because the monthly period itself would overflow", function () {
      assert.isAbove(getAutoCheckIntervalMs("monthly"), MAX_TIMER_DELAY);
    });
  });

  describe("parseLastAutoCheck", function () {
    it("reads epoch milliseconds stored as a string", function () {
      assert.equal(parseLastAutoCheck("1760000000000"), 1760000000000);
    });

    it("returns null when nothing usable is stored", function () {
      assert.isNull(parseLastAutoCheck(""));
      assert.isNull(parseLastAutoCheck(undefined));
      assert.isNull(parseLastAutoCheck("not a number"));
      assert.isNull(parseLastAutoCheck("0"));
      assert.isNull(parseLastAutoCheck("-5"));
    });
  });

  describe("decideAutoCheck", function () {
    const now = 1_760_000_000_000;

    it("runs once the period has passed, including across restarts", function () {
      assert.equal(decideAutoCheck(30 * DAY, now - 30 * DAY, now), "run");
      assert.equal(decideAutoCheck(30 * DAY, now - 45 * DAY, now), "run");
    });

    it("waits while the period has not passed", function () {
      assert.equal(decideAutoCheck(30 * DAY, now - 29 * DAY, now), "wait");
      assert.equal(decideAutoCheck(DAY, now - 1000, now), "wait");
    });

    it("counts from now when no previous check is recorded", function () {
      assert.equal(decideAutoCheck(DAY, null, now), "reset");
    });

    it("counts from now when the stored time is in the future", function () {
      assert.equal(decideAutoCheck(DAY, now + DAY, now), "reset");
    });

    it("does nothing when disabled", function () {
      assert.equal(decideAutoCheck(0, now - 365 * DAY, now), "wait");
      assert.equal(decideAutoCheck(0, null, now), "wait");
    });
  });
});
