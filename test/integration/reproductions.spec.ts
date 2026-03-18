import { assert } from "chai";
import {
  getPlugin,
  getReproductionHandler,
  createTestItem,
  cleanupItems,
  cleanupCollection,
  mockHTTP,
} from "../fixtures/helpers";
import {
  singleReproductionMatch,
  createMockHTTPHandler,
  TEST_DOIS,
  TEST_REPRODUCTION_DOI,
} from "../fixtures/apiResponses";

describe("Reproductions", function () {
  this.timeout(30000);

  const testItems: Zotero.Item[] = [];
  const testCollections: Zotero.Collection[] = [];
  let restoreHTTP: (() => void) | null = null;

  afterEach(async function () {
    if (restoreHTTP) {
      restoreHTTP();
      restoreHTTP = null;
    }
    await cleanupItems(testItems);
    testItems.length = 0;
    for (const col of testCollections) {
      await cleanupCollection(col);
    }
    testCollections.length = 0;
  });

  /** Helper: get the reproduction RelatedStudy[] from the fixture */
  function getReproductions() {
    return Object.values(singleReproductionMatch.results)
      .flat()
      .find((a) => a.doi === TEST_DOIS.originalA)!.record.reproductions;
  }

  /** Helper: find the created reproduction item by DOI */
  async function findReproductionItem(): Promise<Zotero.Item | null> {
    const search = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search.addCondition("DOI", "is", TEST_REPRODUCTION_DOI);
    const ids = await search.search();
    if (ids.length === 0) return null;
    const item = await Zotero.Items.getAsync(ids[0]);
    if (item) testItems.push(item);
    return item;
  }

  it("creates reproduction item with correct fields", async function () {
    const handler = getReproductionHandler();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReproductionMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    await handler.processReproductions(
      original.id,
      getReproductions(),
    );

    const repro = await findReproductionItem();
    assert.isNotNull(repro, "Reproduction item should be created");
    assert.equal(repro!.getField("DOI"), TEST_REPRODUCTION_DOI);
    assert.include(
      repro!.getField("title") as string,
      "Reproduction",
    );
  });

  it("adds correct tags to original item", async function () {
    const handler = getReproductionHandler();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReproductionMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    await handler.processReproductions(
      original.id,
      getReproductions(),
    );

    const updated = await Zotero.Items.getAsync(original.id);
    const tags = updated!.getTags().map((t: any) => t.tag);
    assert.include(tags, "Has Reproduction");
    assert.include(
      tags,
      "Reproduction: Computationally Successful, Robust",
    );
  });

  it("adds correct tags to reproduction item", async function () {
    const handler = getReproductionHandler();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReproductionMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    await handler.processReproductions(
      original.id,
      getReproductions(),
    );

    const repro = await findReproductionItem();
    assert.isNotNull(repro);
    const tags = repro!.getTags().map((t: any) => t.tag);
    assert.include(tags, "Is Reproduction");
    assert.include(tags, "Added by Replication Checker");
  });

  it("creates bidirectional relations", async function () {
    const handler = getReproductionHandler();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReproductionMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    await handler.processReproductions(
      original.id,
      getReproductions(),
    );

    const repro = await findReproductionItem();
    assert.isNotNull(repro);

    assert.isAbove(
      original.relatedItems.length,
      0,
      "Original should have related items",
    );
    assert.isAbove(
      repro!.relatedItems.length,
      0,
      "Reproduction should have related items",
    );
  });

  it("creates reproduction note on original", async function () {
    const handler = getReproductionHandler();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReproductionMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    await handler.processReproductions(
      original.id,
      getReproductions(),
    );

    const noteIDs = original.getNotes();
    assert.isAbove(noteIDs.length, 0, "Original should have a note");

    const note = await Zotero.Items.getAsync(noteIDs[0]);
    const noteHTML = note!.getNote();
    assert.include(noteHTML, "<h2>");
    assert.include(noteHTML, TEST_REPRODUCTION_DOI);
  });

  it("adds reproduction item to collection", async function () {
    const handler = getReproductionHandler();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReproductionMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    await handler.processReproductions(
      original.id,
      getReproductions(),
    );

    const repro = await findReproductionItem();
    assert.isNotNull(repro);
    const collections = repro!.getCollections();
    assert.isAbove(
      collections.length,
      0,
      "Reproduction should be in a collection",
    );
  });

  it("re-scan does not duplicate reproduction items", async function () {
    const handler = getReproductionHandler();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReproductionMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    // First run
    await handler.processReproductions(
      original.id,
      getReproductions(),
    );

    const search1 = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search1.addCondition("DOI", "is", TEST_REPRODUCTION_DOI);
    const countAfterFirst = (await search1.search()).length;

    // Second run
    await handler.processReproductions(
      original.id,
      getReproductions(),
    );

    const search2 = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search2.addCondition("DOI", "is", TEST_REPRODUCTION_DOI);
    const countAfterSecond = (await search2.search()).length;

    assert.equal(
      countAfterSecond,
      countAfterFirst,
      "No duplicate reproduction items should be created",
    );
  });

  it("blacklist check blocks reproduction item creation", async function () {
    const handler = getReproductionHandler();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReproductionMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    // Count items before
    const searchBefore = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    searchBefore.addCondition("itemType", "isNot", "attachment");
    searchBefore.addCondition("itemType", "isNot", "note");
    const countBefore = (await searchBefore.search()).length;

    // Blacklist the reproduction DOI using the plugin's blacklist manager
    const blacklistManager = getPlugin().blacklistManager;
    await blacklistManager.addToBlacklist({
      itemID: 0,
      doi: TEST_REPRODUCTION_DOI,
      url: "https://osf.io/test123",
      title: "Blocked Reproduction",
      originalTitle: "Original",
      dateAdded: new Date().toISOString(),
      type: "reproduction" as const,
    });

    await handler.processReproductions(
      original.id,
      getReproductions(),
    );

    // Count items after — should be same (no new item created)
    const searchAfter = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    searchAfter.addCondition("itemType", "isNot", "attachment");
    searchAfter.addCondition("itemType", "isNot", "note");
    const countAfter = (await searchAfter.search()).length;

    assert.equal(
      countAfter,
      countBefore,
      "No new items should be created when reproduction is blacklisted",
    );

    // Cleanup blacklist
    await blacklistManager.removeFromBlacklist(TEST_REPRODUCTION_DOI);
  });

  it("note not duplicated on re-check", async function () {
    const handler = getReproductionHandler();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReproductionMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    await handler.processReproductions(
      original.id,
      getReproductions(),
    );

    const noteCountAfterFirst = original.getNotes().length;

    await handler.processReproductions(
      original.id,
      getReproductions(),
    );

    const updated = await Zotero.Items.getAsync(original.id);
    const noteCountAfterSecond = updated!.getNotes().length;

    assert.equal(
      noteCountAfterSecond,
      noteCountAfterFirst,
      "Note count should not increase on re-check",
    );
  });
});
