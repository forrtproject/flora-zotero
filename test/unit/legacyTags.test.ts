import { assert } from "chai";
import { readFileSync } from "fs";
import { join } from "path";
import {
  LEGACY_LOCALIZED_TAG_VALUES,
  TAG_HAS_BEEN_REPLICATED,
  TAG_IS_REPLICATION,
  itemHasTag,
  migrateLegacyTags,
} from "../../src/utils/tags";
import {
  LEGACY_LOCALIZED_NOTE_TITLES,
  startsWithPluginNoteHeading,
} from "../../src/utils/studyUtils";

/** Single-line `key = value` messages of a locale's FTL file. */
function loadFtl(locale: string): Record<string, string> {
  const path = join(
    __dirname,
    `../../addon/locale/${locale}/replication-checker.ftl`,
  );
  const out: Record<string, string> = {};
  for (const line of readFileSync(path, "utf-8").split("\n")) {
    const m = line.match(/^([a-zA-Z][\w-]*)\s*=\s*(.+)$/);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

const Z = (globalThis as any).Zotero;

function useLocale(
  locale: string,
  strings: Record<string, string> | null,
): void {
  Z.locale = locale;
  Z.ReplicationChecker = { data: { locale: { strings } } };
}

function fakeItem(tags: string[]) {
  return { hasTag: (t: string) => tags.includes(t) };
}

/** Fake Zotero.Libraries/Tags; tags maps libraryID → tag name → item IDs. */
function fakeLibraries(
  libraries: { libraryID: number; editable: boolean; libraryType?: string }[],
  tags: Record<number, Record<string, number[]>>,
) {
  const renames: [number, string, string][] = [];
  const ids = new Map<string, number>();
  for (const lib of Object.values(tags))
    for (const name of Object.keys(lib))
      if (!ids.has(name)) ids.set(name, ids.size + 1);
  const nameOf = (id: number) => [...ids].find(([, v]) => v === id)?.[0] ?? "";
  Z.Libraries = {
    getAll: () => libraries.map((l) => ({ libraryType: "user", ...l })),
  };
  Z.Tags = {
    getID: (name: string) => ids.get(name) ?? false,
    getTagItems: async (libraryID: number, tagID: number) =>
      tags[libraryID]?.[nameOf(tagID)] ?? [],
    rename: async (libraryID: number, oldName: string, newName: string) => {
      renames.push([libraryID, oldName, newName]);
    },
  };
  return renames;
}

describe("Legacy Korean tags and note headings", function () {
  let ko: Record<string, string>;

  before(function () {
    ko = loadFtl("ko");
  });

  afterEach(function () {
    delete Z.locale;
    delete Z.ReplicationChecker;
    delete Z.Libraries;
    delete Z.Tags;
  });

  it("each legacy tag's current value matches ko.ftl and differs from the old one", function () {
    for (const [key, { old, current }] of Object.entries(
      LEGACY_LOCALIZED_TAG_VALUES.ko,
    )) {
      assert.equal(ko[key], current, key);
      assert.notEqual(old, current, key);
    }
  });

  it("each legacy note title differs from the current ko.ftl title", function () {
    for (const [key, old] of Object.entries(LEGACY_LOCALIZED_NOTE_TITLES.ko)) {
      assert.ok(ko[key], key);
      assert.notEqual(ko[key], old, key);
    }
  });

  it("itemHasTag recognises current, legacy Korean and English values", function () {
    useLocale("ko-KR", ko);
    assert.isTrue(itemHasTag(fakeItem(["반복 연구임"]), TAG_IS_REPLICATION));
    assert.isTrue(itemHasTag(fakeItem(["복제 연구임"]), TAG_IS_REPLICATION));
    assert.isTrue(itemHasTag(fakeItem(["Is Replication"]), TAG_IS_REPLICATION));
    assert.isTrue(itemHasTag(fakeItem(["복제됨"]), TAG_HAS_BEEN_REPLICATED));
    assert.isFalse(itemHasTag(fakeItem(["재현 연구임"]), TAG_IS_REPLICATION));
  });

  it("ignores legacy Korean values in other UI languages", function () {
    useLocale("en-US", null);
    assert.isFalse(itemHasTag(fakeItem(["복제 연구임"]), TAG_IS_REPLICATION));
  });

  it("recognises old Korean note headings", function () {
    useLocale("ko", ko);
    const key = "replication-checker-note-title";
    const eng = "Replications Found";
    assert.isTrue(
      startsWithPluginNoteHeading("<h2>반복 연구 발견</h2><ul></ul>", key, eng),
    );
    assert.isTrue(
      startsWithPluginNoteHeading("<h2>복제 연구 발견</h2><ul></ul>", key, eng),
    );
    assert.isTrue(
      startsWithPluginNoteHeading(
        "<h2>Replications Found</h2><ul></ul>",
        key,
        eng,
      ),
    );
    assert.isFalse(startsWithPluginNoteHeading("<h2>내 노트</h2>", key, eng));
  });

  it("renames each old tag once, only in editable libraries that use it", async function () {
    useLocale("ko-KR", ko);
    const renames = fakeLibraries(
      [
        { libraryID: 1, editable: true },
        { libraryID: 2, editable: true, libraryType: "group" },
        { libraryID: 3, editable: false, libraryType: "group" },
      ],
      {
        1: { 복제됨: [10, 11], "복제 연구: 혼합": [12] },
        2: { "재현 연구: 계산 성공, 견고": [20] },
        3: { 복제됨: [30] },
      },
    );
    await migrateLegacyTags();
    assert.sameDeepMembers(renames, [
      [1, "복제됨", "반복 검증됨"],
      [1, "복제 연구: 혼합", "반복 연구: 혼재"],
      [2, "재현 연구: 계산 성공, 견고", "재현 연구: 계산 성공, 강건"],
    ]);
    assert.equal(Z.Prefs.get("replication-checker.tagMigration.ko"), 1);

    renames.length = 0;
    await migrateLegacyTags();
    assert.deepEqual(renames, [], "runs only once");
  });

  it("does nothing, and stays pending, when Korean strings did not load", async function () {
    useLocale("ko-KR", null); // getString() falls back to English
    const renames = fakeLibraries([{ libraryID: 1, editable: true }], {
      1: { 복제됨: [10] },
    });
    await migrateLegacyTags();
    assert.deepEqual(renames, []);
    assert.isUndefined(Z.Prefs.get("replication-checker.tagMigration.ko"));
  });

  it("stays pending when a library fails, so it retries next start", async function () {
    useLocale("ko-KR", ko);
    fakeLibraries([{ libraryID: 1, editable: true }], { 1: { 복제됨: [10] } });
    Z.Tags.rename = async () => {
      throw new Error("locked");
    };
    await migrateLegacyTags();
    assert.isUndefined(Z.Prefs.get("replication-checker.tagMigration.ko"));
  });

  it("does nothing in a UI language without legacy tags", async function () {
    useLocale("de-DE", null);
    const renames = fakeLibraries([{ libraryID: 1, editable: true }], {
      1: { 복제됨: [10] },
    });
    await migrateLegacyTags();
    assert.deepEqual(renames, []);
  });
});
