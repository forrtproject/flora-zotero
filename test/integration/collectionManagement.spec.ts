import { assert } from "chai";
import {
  getChecker,
  createTestItem,
  cleanupItems,
  cleanupCollection,
  mockHTTP,
} from "../fixtures/helpers";
import {
  singleReplicationMatch,
  createMockHTTPHandler,
  TEST_DOIS,
} from "../fixtures/apiResponses";

describe("Collection Management", function () {
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

  it("creates new collection when none exists", async function () {
    const checker = getChecker();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    // Delete any existing FLoRA Replications collection
    const libraryID = Zotero.Libraries.userLibraryID;
    const allCollections = Zotero.Collections.getByLibrary(libraryID, true);
    for (const col of allCollections) {
      if (
        col.name === "FLoRA Replications" ||
        col.name.includes("Replications")
      ) {
        testCollections.push(col);
      }
    }
    for (const col of testCollections) {
      await cleanupCollection(col);
    }
    testCollections.length = 0;

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    const articles = Object.values(singleReplicationMatch.results).flat();
    const article = articles.find((a) => a.doi === TEST_DOIS.originalA)!;

    await checker.notifyUserAndAddReplications(
      original.id,
      article.record.replications,
    );

    // Verify collection was created
    const updatedCollections = Zotero.Collections.getByLibrary(libraryID, true);
    const repCollection = updatedCollections.find(
      (c: any) => c.name.includes("Replications") || c.name.includes("FLoRA"),
    );
    assert.isNotNull(repCollection, "Replication collection should exist");
    if (repCollection) testCollections.push(repCollection);

    // Clean up replication items
    const search = new Zotero.Search({ libraryID });
    search.addCondition("DOI", "is", TEST_DOIS.replication);
    for (const id of await search.search()) {
      const item = await Zotero.Items.getAsync(id);
      if (item) testItems.push(item);
    }
  });

  it("finds existing collection by name", async function () {
    const checker = getChecker();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const libraryID = Zotero.Libraries.userLibraryID;
    const folderName =
      (Zotero.Prefs.get(
        "replication-checker.folderName",
      ) as string) || "FLoRA Replications";

    // Create collection with the expected name
    const existingCol = new Zotero.Collection({
      libraryID,
      name: folderName,
    });
    await existingCol.saveTx();
    testCollections.push(existingCol);

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    const articles = Object.values(singleReplicationMatch.results).flat();
    const article = articles.find((a) => a.doi === TEST_DOIS.originalA)!;

    await checker.notifyUserAndAddReplications(
      original.id,
      article.record.replications,
    );

    // Verify no additional collection was created
    const updatedCollections = Zotero.Collections.getByLibrary(libraryID, true);
    const matchingCollections = updatedCollections.filter(
      (c: any) => c.name === folderName,
    );
    assert.equal(
      matchingCollections.length,
      1,
      "Should reuse existing collection, not create a new one",
    );

    // Clean up replication items
    const search = new Zotero.Search({ libraryID });
    search.addCondition("DOI", "is", TEST_DOIS.replication);
    for (const id of await search.search()) {
      const item = await Zotero.Items.getAsync(id);
      if (item) testItems.push(item);
    }
  });

  it("handles deleted collection gracefully", async function () {
    const checker = getChecker();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const libraryID = Zotero.Libraries.userLibraryID;

    // Create and immediately delete a collection, but store its ID in prefs
    const tempCol = new Zotero.Collection({
      libraryID,
      name: "Temporary Collection",
    });
    await tempCol.saveTx();
    const tempColID = tempCol.id;

    // Store the now-stale ID in prefs
    const storedIDs: Record<string, number> = {};
    storedIDs[String(libraryID)] = tempColID;
    Zotero.Prefs.set(
      "replication-checker.collectionIDs",
      JSON.stringify(storedIDs),
    );

    await tempCol.eraseTx();

    // Now run the check — should create a new collection without crashing
    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    const articles = Object.values(singleReplicationMatch.results).flat();
    const article = articles.find((a) => a.doi === TEST_DOIS.originalA)!;

    // This should not throw
    await checker.notifyUserAndAddReplications(
      original.id,
      article.record.replications,
    );

    // Verify a collection was created
    const updatedCollections = Zotero.Collections.getByLibrary(libraryID, true);
    const repCollection = updatedCollections.find(
      (c: any) => c.name.includes("Replications") || c.name.includes("FLoRA"),
    );
    assert.isNotNull(
      repCollection,
      "New collection should be created after stale one was deleted",
    );
    if (repCollection) testCollections.push(repCollection);

    // Clean up replication items
    const search = new Zotero.Search({ libraryID });
    search.addCondition("DOI", "is", TEST_DOIS.replication);
    for (const id of await search.search()) {
      const item = await Zotero.Items.getAsync(id);
      if (item) testItems.push(item);
    }
  });

  it("renames collection when preference changes", async function () {
    const checker = getChecker();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const libraryID = Zotero.Libraries.userLibraryID;
    const oldName = "Old Replication Folder Name";

    // Create collection with old name and store its ID in prefs
    const col = new Zotero.Collection({ libraryID, name: oldName });
    await col.saveTx();
    testCollections.push(col);

    const storedIDs: Record<string, number> = {};
    storedIDs[String(libraryID)] = col.id;
    Zotero.Prefs.set(
      "replication-checker.collectionIDs",
      JSON.stringify(storedIDs),
    );

    // Change the folder name preference
    const newName = "Renamed Replication Folder";
    Zotero.Prefs.set("replication-checker.folderName", newName);

    // Run check — should rename the existing collection
    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    const articles = Object.values(singleReplicationMatch.results).flat();
    const article = articles.find((a) => a.doi === TEST_DOIS.originalA)!;

    await checker.notifyUserAndAddReplications(
      original.id,
      article.record.replications,
    );

    // Verify the collection was renamed
    const renamedCol = Zotero.Collections.get(col.id);
    assert.equal(
      renamedCol.name,
      newName,
      "Collection should be renamed to new preference value",
    );

    // Reset the preference to default for other tests
    Zotero.Prefs.set("replication-checker.folderName", "FLoRA Replications");

    // Clean up replication items
    const search = new Zotero.Search({ libraryID });
    search.addCondition("DOI", "is", TEST_DOIS.replication);
    for (const id of await search.search()) {
      const item = await Zotero.Items.getAsync(id);
      if (item) testItems.push(item);
    }
  });
});
