/**
 * Scheduling rules for the automatic library check.
 *
 * The schedule used to be a single setInterval with the full period, started
 * when Zotero started. That had two faults: the period restarted with every
 * Zotero restart, so a monthly check only ran after 30 days of uninterrupted
 * uptime; and 30 days (2.59e9 ms) exceeds the 2^31-1 ms that browser-style
 * timers store a delay in, so the monthly timer could not be relied on at all.
 *
 * Instead, the time of the last scheduled check is stored in a preference, and
 * a short timer looks every hour whether the next one is due. The pure functions
 * here hold the rules, so they can be tested without Zotero.
 */

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/** Period of each frequency option, in milliseconds. 0 means disabled. */
export const AUTO_CHECK_INTERVALS: Readonly<Record<string, number>> = {
  disabled: 0,
  test: 5 * 60 * 1000, // 5 minutes (for testing only)
  daily: DAY,
  weekly: 7 * DAY,
  monthly: 30 * DAY,
};

/** How often to look whether a scheduled check is due. */
export const AUTO_CHECK_POLL_MS = HOUR;

/**
 * Delay before the first look after Zotero starts, so an overdue check does
 * not compete with Zotero's own start-up work.
 */
export const AUTO_CHECK_STARTUP_DELAY_MS = 2 * 60 * 1000;

/** Period for a frequency preference value; unknown values count as disabled. */
export function getAutoCheckIntervalMs(frequency: string): number {
  return Object.prototype.hasOwnProperty.call(AUTO_CHECK_INTERVALS, frequency)
    ? AUTO_CHECK_INTERVALS[frequency]
    : 0;
}

/**
 * Read the stored last-check time. It is stored as a string because epoch
 * milliseconds do not fit in an integer preference.
 */
export function parseLastAutoCheck(value: unknown): number | null {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const ms = Number(value);
  return Number.isFinite(ms) && ms > 0 ? ms : null;
}

export type AutoCheckDecision =
  /** Nothing to do yet. */
  | "wait"
  /** Run a check now and record the current time. */
  | "run"
  /**
   * No usable record of a previous check (first run after install or upgrade,
   * or a clock that moved backwards): record the current time and count the
   * period from now, rather than starting a full-library check unannounced.
   */
  | "reset";

export function decideAutoCheck(
  intervalMs: number,
  lastRunMs: number | null,
  nowMs: number,
): AutoCheckDecision {
  if (intervalMs <= 0) return "wait";
  if (lastRunMs === null || lastRunMs > nowMs) return "reset";
  return nowMs - lastRunMs >= intervalMs ? "run" : "wait";
}
