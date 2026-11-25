/**
 * Tag key constants and localization helpers for Replication Checker plugin.
 *
 * Each constant is an FTL key. Call getTag(key) to get the localized string
 * that is actually stored on Zotero items. Use itemHasTag() when reading tags
 * so that items tagged by an earlier version (English-only, or with a since-renamed
 * translation) are still recognized. migrateLegacyTags() renames those older
 * translated tags once at startup, so exact-name tag searches find them too.
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
 * Tag values that earlier versions wrote in a given UI language, keyed by base
 * locale and then by tag key. `current` is the value in today's FTL file; a unit
 * test keeps the two in sync. Add an entry whenever a translated tag is renamed.
 */
export const LEGACY_LOCALIZED_TAG_VALUES: Record<
  string,
  Record<string, { old: string; current: string }>
> = {
  // Korean before v0.1.16: 복제 ("duplicate" in Zotero's Korean UI) became 반복,
  // 혼합 became 혼재 and 견고 became 강건.
  ko: {
    [TAG_HAS_REPLICATION]: { old: "복제됨", current: "반복 검증됨" },
    [TAG_HAS_BEEN_REPLICATED]: { old: "복제됨", current: "반복 검증됨" },
    [TAG_IS_REPLICATION]: { old: "복제 연구임", current: "반복 연구임" },
    [TAG_REPLICATION_SUCCESS]: { old: "복제 연구: 성공", current: "반복 연구: 성공" },
    [TAG_REPLICATION_FAILURE]: { old: "복제 연구: 실패", current: "반복 연구: 실패" },
    [TAG_REPLICATION_MIXED]: { old: "복제 연구: 혼합", current: "반복 연구: 혼재" },
    [TAG_REPLICATION_MULTIPLE_ORIGINALS]: { old: "복제 연구: 여러 원본", current: "반복 연구: 여러 원본" },
    [TAG_REPRO_CS_ROBUST]: { old: "재현 연구: 계산 성공, 견고", current: "재현 연구: 계산 성공, 강건" },
    [TAG_REPRO_CS_CHALLENGES]: { old: "재현 연구: 계산 성공, 견고성 문제", current: "재현 연구: 계산 성공, 강건성 문제" },
    [TAG_REPRO_CS_NOT_CHECKED]: { old: "재현 연구: 계산 성공, 견고성 미확인", current: "재현 연구: 계산 성공, 강건성 미확인" },
    [TAG_REPRO_CI_ROBUST]: { old: "재현 연구: 계산 문제, 견고", current: "재현 연구: 계산 문제, 강건" },
    [TAG_REPRO_CI_CHALLENGES]: { old: "재현 연구: 계산 문제, 견고성 문제", current: "재현 연구: 계산 문제, 강건성 문제" },
    [TAG_REPRO_CI_NOT_CHECKED]: { old: "재현 연구: 계산 문제, 견고성 미확인", current: "재현 연구: 계산 문제, 강건성 미확인" },
  },
};

/** Base language of Zotero's UI, e.g. "ko" for "ko-KR". */
export function currentLocaleBase(): string {
  return String(Zotero.locale || "en-US").split("-")[0];
}

/**
 * Check whether a Zotero item carries a given plugin tag.
 * Matches the current localized value, the English fallback and any earlier
 * translation for the current UI language, so that items tagged by earlier
 * plugin versions are still recognised.
 */
export function itemHasTag(item: any, ftlKey: string): boolean {
  const localized = getTag(ftlKey);
  if (item.hasTag(localized)) return true;
  const english = ENGLISH_TAG_VALUES[ftlKey];
  if (english && english !== localized && item.hasTag(english)) return true;
  const legacy = LEGACY_LOCALIZED_TAG_VALUES[currentLocaleBase()]?.[ftlKey]?.old;
  return !!legacy && legacy !== localized && item.hasTag(legacy);
}

const TAG_MIGRATION_PREF = "replication-checker.tagMigration";

/**
 * One-time migration: rename tags written under an earlier translation to the
 * current one in every editable library. Runs only when the UI language has
 * legacy values and its strings loaded (each new name must equal getTag()),
 * so a failed locale load never renames Korean tags to English or to raw keys.
 * Zotero.Tags.rename() merges into the new tag if it already exists and keeps
 * tag colours. Read-only libraries keep the old names; itemHasTag() still
 * recognises them.
 */
export async function migrateLegacyTags(): Promise<void> {
  try {
    await renameLegacyTags();
  } catch (error) {
    Zotero.debug(`[ReplicationChecker] Tag migration failed: ${error}`);
  }
}

async function renameLegacyTags(): Promise<void> {
  const locale = currentLocaleBase();
  const entries = LEGACY_LOCALIZED_TAG_VALUES[locale];
  if (!entries) return;

  const prefKey = `${TAG_MIGRATION_PREF}.${locale}`;
  if (Zotero.Prefs.get(prefKey)) return;

  const renames = new Map<string, string>();
  for (const [key, { old, current }] of Object.entries(entries)) {
    const loaded = getTag(key);
    if (loaded !== current) {
      Zotero.debug(`[ReplicationChecker] Tag migration skipped: "${key}" is "${loaded}", expected "${current}"`);
      return;
    }
    renames.set(old, current);
  }

  let ok = true;
  for (const library of Zotero.Libraries.getAll()) {
    if (!library.editable || library.libraryType === "feed") continue;
    const libraryID = library.libraryID;
    try {
      for (const [oldName, newName] of renames) {
        const oldTagID = Zotero.Tags.getID(oldName);
        if (!oldTagID) continue;
        const itemIDs = await Zotero.Tags.getTagItems(libraryID, oldTagID);
        if (!itemIDs.length) continue;
        await Zotero.Tags.rename(libraryID, oldName, newName);
        Zotero.debug(
          `[ReplicationChecker] Renamed tag "${oldName}" to "${newName}" on ${itemIDs.length} item(s) in library ${libraryID}`,
        );
      }
    } catch (error) {
      ok = false;
      Zotero.debug(`[ReplicationChecker] Tag migration failed in library ${libraryID}: ${error}`);
    }
  }

  if (ok) Zotero.Prefs.set(prefKey, 1);
}
