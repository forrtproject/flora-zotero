import { assert } from "chai";
import {
  getChecker,
  createTestItem,
  cleanupItems,
  mockHTTP,
} from "../fixtures/helpers";
import {
  singleReplicationMatch,
  noBibtexMatch,
  createMockHTTPHandler,
  TEST_DOIS,
} from "../fixtures/apiResponses";

describe("Item Creation", function () {
  this.timeout(30000);

  const testItems: Zotero.Item[] = [];
  let restoreHTTP: (() => void) | null = null;

  afterEach(async function () {
    if (restoreHTTP) {
      restoreHTTP();
      restoreHTTP = null;
    }
    await cleanupItems(testItems);
    testItems.length = 0;
  });

  /** Helper to run the replication check and find the created replication item */
  async function processAndFindReplication(
    originalItem: Zotero.Item,
  ): Promise<Zotero.Item | null> {
    const checker = getChecker();
    const articles = Object.values(singleReplicationMatch.results).flat();
    const article = articles.find((a) => a.doi === TEST_DOIS.originalA);
    if (!article) throw new Error("Fixture article not found");

    await checker.notifyUserAndAddReplications(
      originalItem.id,
      article.record.replications,
    );

    const search = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search.addCondition("DOI", "is", TEST_DOIS.replication);
    const ids = await search.search();
    if (ids.length === 0) return null;

    const item = await Zotero.Items.getAsync(ids[0]);
    if (item) testItems.push(item);
    return item;
  }

  it("creates replication item with correct fields from BibTeX", async function () {
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    const rep = await processAndFindReplication(original);
    assert.isNotNull(rep, "Replication item should be created");

    assert.equal(rep!.getField("DOI"), TEST_DOIS.replication);
    assert.include(rep!.getField("title") as string, "Replication");
    // BibTeX-filled fields
    assert.equal(rep!.getField("date"), "2022");
  });

  it("adds correct tags to original item", async function () {
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    await processAndFindReplication(original);

    // Re-fetch the original to see updated tags
    const updatedOriginal = await Zotero.Items.getAsync(original.id);
    const tags = updatedOriginal!.getTags().map((t: any) => t.tag);

    assert.include(tags, "Has Replication");
    assert.include(tags, "Replication: Successful");
  });

  it("adds correct tags to replication item", async function () {
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    const rep = await processAndFindReplication(original);
    assert.isNotNull(rep);

    const tags = rep!.getTags().map((t: any) => t.tag);
    assert.include(tags, "Is Replication");
    assert.include(tags, "Added by Replication Checker");
  });

  it("creates bidirectional relations", async function () {
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    const rep = await processAndFindReplication(original);
    assert.isNotNull(rep);

    // Check relations — Zotero stores relations as URI arrays
    const origRelated = original.relatedItems;
    const repRelated = rep!.relatedItems;

    assert.isAbove(origRelated.length, 0, "Original should have related items");
    assert.isAbove(
      repRelated.length,
      0,
      "Replication should have related items",
    );
  });

  it("creates replication note on original", async function () {
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    await processAndFindReplication(original);

    // Check for child note
    const noteIDs = original.getNotes();
    assert.isAbove(
      noteIDs.length,
      0,
      "Original should have a replication note",
    );

    const note = await Zotero.Items.getAsync(noteIDs[0]);
    const noteHTML = note!.getNote();
    assert.include(noteHTML, "<h2>");
    assert.include(noteHTML, TEST_DOIS.replication);
  });

  it("creates item with minimal data when BibTeX missing", async function () {
    restoreHTTP = mockHTTP(createMockHTTPHandler(noBibtexMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    const articles = Object.values(noBibtexMatch.results).flat();
    const article = articles.find((a) => a.doi === TEST_DOIS.originalA)!;

    const checker = getChecker();
    await checker.notifyUserAndAddReplications(
      original.id,
      article.record.replications,
    );

    // Find the created item
    const search = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search.addCondition("DOI", "is", TEST_DOIS.noBibtex);
    const ids = await search.search();
    assert.isAbove(ids.length, 0, "Item should be created even without BibTeX");

    const item = await Zotero.Items.getAsync(ids[0]);
    testItems.push(item!);
    assert.equal(item!.getField("title"), "Replication Without BibTeX");
    assert.equal(item!.getField("DOI"), TEST_DOIS.noBibtex);
  });

  it("adds replication item to collection", async function () {
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    const rep = await processAndFindReplication(original);
    assert.isNotNull(rep, "Replication item should be created");

    // Verify the replication is in a collection
    const collections = rep!.getCollections();
    assert.isAbove(
      collections.length,
      0,
      "Replication item should be in at least one collection",
    );
  });
});
