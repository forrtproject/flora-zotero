import { assert } from "chai";
import { BlacklistManager } from "../../src/modules/blacklistManager";
import type { BlacklistEntry } from "../../src/types/replication";

function makeEntry(overrides?: Partial<BlacklistEntry>): BlacklistEntry {
  return {
    itemID: 1,
    doi: "10.1234/test",
    title: "Test Replication",
    originalTitle: "Test Original",
    dateAdded: new Date().toISOString(),
    type: "replication",
    ...overrides,
  };
}

describe("BlacklistManager", function() {
  let manager: BlacklistManager;

  beforeEach(async function() {
    manager = new BlacklistManager();
    await manager.init();
  });

  describe("init", function() {
    it("initializes with empty blacklist when no pref exists", function() {
      assert.deepEqual(manager.getEntries(), []);
      assert.equal(manager.getCount(), 0);
    });

    it("loads existing blacklist from prefs", async function() {
      const data = {
        version: 2,
        entries: [makeEntry({ doi: "10.1234/saved" })],
      };
      (globalThis as any).Zotero.Prefs.set(
        "replication-checker.blacklist",
        JSON.stringify(data),
      );

      const m = new BlacklistManager();
      await m.init();
      assert.equal(m.getCount(), 1);
    });

    it("handles corrupted pref data gracefully", async function() {
      (globalThis as any).Zotero.Prefs.set(
        "replication-checker.blacklist",
        "not valid json!!!",
      );

      const m = new BlacklistManager();
      await m.init(); // Should not throw
      assert.equal(m.getCount(), 0);
    });
  });

  describe("addToBlacklist", function() {
    it("adds entry and increments count", async function() {
      await manager.addToBlacklist(makeEntry({ doi: "10.1234/new" }));
      assert.equal(manager.getCount(), 1);
    });

    it("prevents duplicate DOI entries", async function() {
      await manager.addToBlacklist(makeEntry({ doi: "10.1234/dup" }));
      await manager.addToBlacklist(makeEntry({ doi: "10.1234/dup" }));
      assert.equal(manager.getCount(), 1);
    });

    it("prevents duplicate URL entries", async function() {
      await manager.addToBlacklist(
        makeEntry({ doi: "", url: "https://example.com/a" }),
      );
      await manager.addToBlacklist(
        makeEntry({ doi: "", url: "https://example.com/a" }),
      );
      assert.equal(manager.getCount(), 1);
    });

    it("skips entries with no DOI and no URL", async function() {
      await manager.addToBlacklist(makeEntry({ doi: "", url: undefined }));
      assert.equal(manager.getCount(), 0);
    });
  });

  describe("isBlacklisted", function() {
    it("returns false for empty blacklist", function() {
      assert.isFalse(manager.isBlacklisted("10.1234/test"));
    });

    it("finds blacklisted DOI", async function() {
      await manager.addToBlacklist(makeEntry({ doi: "10.1234/blocked" }));
      assert.isTrue(manager.isBlacklisted("10.1234/blocked"));
    });

    it("normalizes DOI for comparison", async function() {
      await manager.addToBlacklist(makeEntry({ doi: "10.1234/UPPER" }));
      assert.isTrue(manager.isBlacklisted("https://doi.org/10.1234/upper"));
    });

    it("finds blacklisted URL", async function() {
      await manager.addToBlacklist(
        makeEntry({ doi: "", url: "https://example.com/study" }),
      );
      assert.isTrue(manager.isBlacklisted(null, "https://example.com/study"));
    });

    it("returns false for non-blacklisted item", async function() {
      await manager.addToBlacklist(makeEntry({ doi: "10.1234/blocked" }));
      assert.isFalse(manager.isBlacklisted("10.1234/other"));
    });
  });

  describe("removeFromBlacklist", function() {
    it("removes entry by DOI", async function() {
      await manager.addToBlacklist(makeEntry({ doi: "10.1234/remove" }));
      assert.equal(manager.getCount(), 1);
      await manager.removeFromBlacklist("10.1234/remove");
      assert.equal(manager.getCount(), 0);
      assert.isFalse(manager.isBlacklisted("10.1234/remove"));
    });

    it("removes entry by URL", async function() {
      await manager.addToBlacklist(
        makeEntry({ doi: "", url: "https://example.com/rm" }),
      );
      await manager.removeFromBlacklist("https://example.com/rm");
      assert.equal(manager.getCount(), 0);
    });

    it("is a no-op for non-existent identifier", async function() {
      await manager.addToBlacklist(makeEntry({ doi: "10.1234/keep" }));
      await manager.removeFromBlacklist("10.1234/nonexistent");
      assert.equal(manager.getCount(), 1);
    });
  });

  describe("clearBlacklist", function() {
    it("removes all entries", async function() {
      await manager.addToBlacklist(makeEntry({ doi: "10.1234/a" }));
      await manager.addToBlacklist(makeEntry({ doi: "10.1234/b" }));
      assert.equal(manager.getCount(), 2);

      await manager.clearBlacklist();
      assert.equal(manager.getCount(), 0);
      assert.isFalse(manager.isBlacklisted("10.1234/a"));
      assert.isFalse(manager.isBlacklisted("10.1234/b"));
    });
  });

  describe("getEntries", function() {
    it("returns a copy, not the original array", async function() {
      await manager.addToBlacklist(makeEntry({ doi: "10.1234/copy" }));
      const entries = manager.getEntries();
      entries.pop();
      assert.equal(manager.getCount(), 1);
    });
  });
});
