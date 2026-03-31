/**
 * Tag key constants and localization helpers for Replication Checker plugin.
 *
 * Each constant is an FTL key. Call getTag(key) to get the localized string
 * that is actually stored on Zotero items. Use itemHasTag() when reading tags
 * so that items tagged by an earlier (English-only) version are still recognized.
 */

import { getString } from "./strings";

// ── Replication tags ─────────────────────────────────────────────────────────
export const TAG_HAS_REPLICATION = "replication-checker-tag";
export const TAG_IS_REPLICATION = "replication-checker-tag-is-replication";
export const TAG_ADDED_BY_CHECKER = "replication-checker-tag-added-by-checker";
export const TAG_REPLICATION_SUCCESS = "replication-checker-tag-success";
export const TAG_REPLICATION_FAILURE = "replication-checker-tag-failure";
export const TAG_REPLICATION_MIXED = "replication-checker-tag-mixed";
export const TAG_REPLICATION_MULTIPLE_ORIGINALS = "replication-checker-tag-multiple-originals";
export const TAG_READONLY_ORIGIN = "replication-checker-tag-readonly-origin";
export const TAG_HAS_BEEN_REPLICATED = "replication-checker-tag-has-been-replicated";
export const TAG_HAS_BEEN_REPRODUCED = "replication-checker-tag-has-been-reproduced";
export const TAG_IN_FLORA = "replication-checker-tag-in-flora";

// ── Reproduction tags ────────────────────────────────────────────────────────
export const TAG_HAS_REPRODUCTION = "reproduction-checker-tag";
export const TAG_IS_REPRODUCTION = "reproduction-checker-tag-is-reproduction";

// ── Reproduction outcome tags ────────────────────────────────────────────────
export const TAG_REPRO_CS_ROBUST = "reproduction-checker-tag-outcome-cs-robust";
export const TAG_REPRO_CS_CHALLENGES = "reproduction-checker-tag-outcome-cs-challenges";
export const TAG_REPRO_CS_NOT_CHECKED = "reproduction-checker-tag-outcome-cs-not-checked";
export const TAG_REPRO_CI_ROBUST = "reproduction-checker-tag-outcome-ci-robust";
export const TAG_REPRO_CI_CHALLENGES = "reproduction-checker-tag-outcome-ci-challenges";
export const TAG_REPRO_CI_NOT_CHECKED = "reproduction-checker-tag-outcome-ci-not-checked";
export const TAG_REPRODUCTION_MULTIPLE_ORIGINALS = "reproduction-checker-tag-multiple-originals";

// ── Localization helpers ─────────────────────────────────────────────────────

/** Resolve an FTL key to its localized tag string for the current UI language. */
export function getTag(ftlKey: string): string {
  return getString(ftlKey);
}

/**
 * English (fallback) values for every tag key.
 * Used to recognise tags written by older plugin versions that always used English.
 */
export const ENGLISH_TAG_VALUES: Record<string, string> = {
  // TAG_HAS_REPLICATION key now resolves to "Has Been Replicated"; keep "Has Replication" as
  // legacy so older items (tagged before the merge) are still recognised by itemHasTag().
  [TAG_HAS_REPLICATION]: "Has Replication",
  [TAG_IS_REPLICATION]: "Is Replication",
  [TAG_ADDED_BY_CHECKER]: "Added by Replication Checker",
  [TAG_REPLICATION_SUCCESS]: "Replication: Successful",
  [TAG_REPLICATION_FAILURE]: "Replication: Failure",
  [TAG_REPLICATION_MIXED]: "Replication: Mixed",
  [TAG_REPLICATION_MULTIPLE_ORIGINALS]: "Replication: Multiple Originals",
  [TAG_READONLY_ORIGIN]: "Original present in Read-Only Library",
  // TAG_HAS_BEEN_REPLICATED is now the canonical "replicated" tag; "Has Replication" is the
  // legacy English value for backward-compat (items tagged by earlier versions).
  [TAG_HAS_BEEN_REPLICATED]: "Has Replication",
  // TAG_HAS_REPRODUCTION key now resolves to "Has Been Reproduced"; same legacy pattern.
  [TAG_HAS_REPRODUCTION]: "Has Reproduction",
  // TAG_HAS_BEEN_REPRODUCED is now the canonical "reproduced" tag.
  [TAG_HAS_BEEN_REPRODUCED]: "Has Reproduction",
  [TAG_IN_FLORA]: "In FLoRA",
  [TAG_IS_REPRODUCTION]: "Is Reproduction",
  [TAG_REPRO_CS_ROBUST]: "Reproduction: Computationally Successful, Robust",
  [TAG_REPRO_CS_CHALLENGES]: "Reproduction: Computationally Successful, Robustness Challenges",
  [TAG_REPRO_CS_NOT_CHECKED]: "Reproduction: Computationally Successful, Robustness Not Checked",
  [TAG_REPRO_CI_ROBUST]: "Reproduction: Computational Issues, Robust",
  [TAG_REPRO_CI_CHALLENGES]: "Reproduction: Computational Issues, Robustness Challenges",
  [TAG_REPRO_CI_NOT_CHECKED]: "Reproduction: Computational Issues, Robustness Not Checked",
  [TAG_REPRODUCTION_MULTIPLE_ORIGINALS]: "Reproduction: Multiple Originals",
};

/**
 * Check whether a Zotero item carries a given plugin tag.
 * Matches both the current localized value and the English fallback so that
 * items tagged by earlier plugin versions (English-only) are still recognised.
 */
export function itemHasTag(item: any, ftlKey: string): boolean {
  const localized = getTag(ftlKey);
  if (item.hasTag(localized)) return true;
  const english = ENGLISH_TAG_VALUES[ftlKey];
  return !!english && english !== localized && item.hasTag(english);
}
