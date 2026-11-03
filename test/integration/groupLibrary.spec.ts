import { assert } from "chai";
import {
  getChecker,
  cleanupItems,
  cleanupCollection,
  mockHTTP,
} from "../fixtures/helpers";
import {
  singleReplicationMatch,
  createMockHTTPHandler,
  TEST_DOIS,
} from "../fixtures/apiResponses";
import {
  REPLICATION_SPEC,
  getCollectionFolderName,
  getOrCreateCollection,
  renameManagedCollection,
} from "../../src/utils/collectionUtils";

const GROUP_ADD_PREF = "replication-checker.groupAddMode";
const LIBRARIES_PREF = "replication-checker.autoCheckLibraries";

describe("Group libraries and settings", function () {
  this.timeout(30000);

  const groups: any[] = [];
  const testItems: Zotero.Item[] = [];
  let restoreHTTP: (() => void) | null = null;
  let checker: any;

  async function createGroup(editable: boolean): Promise<any> {
    const group: any = new (Zotero as any).Group();
    group.id = 1000000 + Math.floor(Math.random() * 1000000);
    group.name = `Test Group ${group.id}`;
    group.description = "";
    group.editable = editable;
    group.filesEditable = editable;
    group.version = 0;
    await group.saveTx();
    groups.push(group);
    return group;
  }

  async function createOriginal(libraryID: number): Promise<Zotero.Item> {
    const item = new Zotero.Item("journalArticle");
    (item as any).libraryID = libraryID;
    item.setField("title", "The Original Study A");
    item.setField("DOI", TEST_DOIS.originalA);
    await item.saveTx();
    return item;
  }

  const replications = () =>
    Object.values(singleReplicationMatch.results)
      .flat()
      .find((a: any) => a.doi === TEST_DOIS.originalA)!.record.replications;

  function apply(libraryID: number, itemID: number) {
    return checker.applyGroupedResults({
      replications: new Map([[libraryID, new Map([[itemID, replications()]])]]),
      reproductions: new Map(),
    });
  }

  async function findReplication(libraryID: number): Promise<number[]> {
    const search = new Zotero.Search({ libraryID });
    search.addCondition("DOI", "is", TEST_DOIS.replication);
    return search.search();
  }

  beforeEach(function () {
    checker = getChecker();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));
  });

  afterEach(async function () {
    restoreHTTP?.();
    restoreHTTP = null;
    delete checker.askBeforeAddingToGroup;
    delete checker.checkEntireLibrary;
    Zotero.Prefs.clear(GROUP_ADD_PREF);
    Zotero.Prefs.clear(LIBRARIES_PREF);
    await cleanupItems(testItems);
    testItems.length = 0;
    for (const group of groups) await group.eraseTx();
    groups.length = 0;
  });

  it("ask is the default, and cancelling adds nothing", async function () {
    const group = await createGroup(true);
    const original = await createOriginal(group.libraryID);
    let asked = 0;
    checker.askBeforeAddingToGroup = () => {
      asked++;
      return "skip";
    };

    await apply(group.libraryID, original.id);

    assert.equal(asked, 1);
    assert.lengthOf(await findReplication(group.libraryID), 0);
    assert.lengthOf((await Zotero.Items.getAsync(original.id))!.getNotes(), 0);
  });

  it("always adds to the group without asking", async function () {
    Zotero.Prefs.set(GROUP_ADD_PREF, "always");
    const group = await createGroup(true);
    const original = await createOriginal(group.libraryID);
    checker.askBeforeAddingToGroup = () => assert.fail("must not ask");

    await apply(group.libraryID, original.id);

    assert.lengthOf(await findReplication(group.libraryID), 1);
    assert.isAbove(Zotero.Collections.getByLibrary(group.libraryID, true).length, 0);
  });

  it("tags-only adds tags and a note but no items or collections", async function () {
    Zotero.Prefs.set(GROUP_ADD_PREF, "tags-only");
    const group = await createGroup(true);
    const original = await createOriginal(group.libraryID);
    checker.askBeforeAddingToGroup = () => assert.fail("must not ask");

    await apply(group.libraryID, original.id);

    const updated = (await Zotero.Items.getAsync(original.id))!;
    assert.include(updated.getTags().map((t: any) => t.tag), "Has Been Replicated");
    assert.lengthOf(updated.getNotes(), 1);
    assert.lengthOf(await findReplication(group.libraryID), 0);
    assert.lengthOf(Zotero.Collections.getByLibrary(group.libraryID, true), 0);
  });

  it("tags-only also applies to the new-item path", async function () {
    Zotero.Prefs.set(GROUP_ADD_PREF, "tags-only");
    const group = await createGroup(true);
    const original = await createOriginal(group.libraryID);
    const personal = await createOriginal(Zotero.Libraries.userLibraryID);
    testItems.push(personal);

    assert.isTrue(await checker.isTagsOnlyItem(original.id));
    assert.isFalse(await checker.isTagsOnlyItem(personal.id));
  });

  it("copying from a group uses a [Group-Library] collection and no read-only tag", async function () {
    const group = await createGroup(true);
    const original = await createOriginal(group.libraryID);
    checker.askBeforeAddingToGroup = () => "copy";

    await apply(group.libraryID, original.id);

    const userID = Zotero.Libraries.userLibraryID;
    const collection = Zotero.Collections.getByLibrary(userID, true).find(
      (c: any) => c.name === `${group.name} [Group-Library]`,
    );
    assert.exists(collection);
    const copies = collection!.getChildItems() as Zotero.Item[];
    assert.lengthOf(copies, 1);
    assert.notInclude(
      copies[0].getTags().map((t: any) => t.tag),
      "Original present in Read-Only Library",
    );
    testItems.push(...copies);
    for (const id of await findReplication(userID)) {
      testItems.push((await Zotero.Items.getAsync(id))!);
    }
    await cleanupCollection(collection as any);
  });

  it("scheduled checks follow the library setting and skip read-only groups", async function () {
    const editable = await createGroup(true);
    const readOnly = await createGroup(false);
    const checked: number[] = [];
    checker.checkEntireLibrary = async (id: number) => {
      checked.push(id);
    };
    const userID = Zotero.Libraries.userLibraryID;

    await checker.runScheduledCheck();
    assert.deepEqual(checked, [userID]);

    checked.length = 0;
    Zotero.Prefs.set(LIBRARIES_PREF, "groups");
    await checker.runScheduledCheck();
    assert.include(checked, editable.libraryID);
    assert.notInclude(checked, readOnly.libraryID);
    assert.notInclude(checked, userID);

    checked.length = 0;
    Zotero.Prefs.set(LIBRARIES_PREF, "all");
    await checker.runScheduledCheck();
    assert.include(checked, userID);
    assert.include(checked, editable.libraryID);
    assert.notInclude(checked, readOnly.libraryID);
  });

  it("renaming updates the real collection and survives the next lookup", async function () {
    const userID = Zotero.Libraries.userLibraryID;
    const collection = await getOrCreateCollection(userID, REPLICATION_SPEC);
    const before = getCollectionFolderName(REPLICATION_SPEC);
    try {
      await renameManagedCollection(REPLICATION_SPEC, "Renamed Replications");
      assert.equal(Zotero.Collections.get(collection.id).name, "Renamed Replications");
      const again = await getOrCreateCollection(userID, REPLICATION_SPEC);
      assert.equal(again.id, collection.id);
      assert.equal(getCollectionFolderName(REPLICATION_SPEC), "Renamed Replications");
    } finally {
      await renameManagedCollection(REPLICATION_SPEC, before);
    }
  });
});
