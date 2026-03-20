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

  it("updates preference when collection is manually renamed in Zotero", async function () {
    const checker = getChecker();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const libraryID = Zotero.Libraries.userLibraryID;
    const userRenamedTo = "My Custom Folder";

    // Simulate: user manually renamed the collection in Zotero.
    // The collection has the user's name but the pref still holds the old name.
    const col = new Zotero.Collection({ libraryID, name: userRenamedTo });
    await col.saveTx();
    testCollections.push(col);

    const storedIDs: Record<string, number> = {};
    storedIDs[String(libraryID)] = col.id;
    Zotero.Prefs.set(
      "replication-checker.collectionIDs",
      JSON.stringify(storedIDs),
    );

    // Pref still says the old name — simulates the state after a manual Zotero rename
    Zotero.Prefs.set("replication-checker.folderName", "Old Preference Name");

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

    // Collection should keep the user's name (not reverted to the preference)
    const afterCol = Zotero.Collections.get(col.id);
    assert.equal(
      afterCol.name,
      userRenamedTo,
      "Collection should retain the user's manual rename",
    );

    // Preference should have been updated to match the collection's current name
    const updatedPref = Zotero.Prefs.get("replication-checker.folderName") as string;
    assert.equal(
      updatedPref,
      userRenamedTo,
      "Preference should be updated to match the manually renamed collection",
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

  it("recognises legacy 'Replication folder' name on upgrade", async function () {
    const checker = getChecker();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const libraryID = Zotero.Libraries.userLibraryID;
    const legacyName = "Replication folder";
    const currentDefault = "FLoRA Replications";

    // Simulate an upgraded library: legacy collection exists, no stored ID in prefs
    Zotero.Prefs.set("replication-checker.collectionIDs", "{}");
    Zotero.Prefs.set("replication-checker.folderName", currentDefault);

    const legacyCol = new Zotero.Collection({ libraryID, name: legacyName });
    await legacyCol.saveTx();
    testCollections.push(legacyCol);

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

    // Legacy collection should have been renamed to the current default — no duplicate created
    const updatedCollections = Zotero.Collections.getByLibrary(libraryID, true);
    const legacyRemains = updatedCollections.find((c: any) => c.name === legacyName);
    assert.isUndefined(legacyRemains, "Legacy 'Replication folder' should have been renamed");

    const newCol = updatedCollections.find((c: any) => c.name === currentDefault);
    assert.isNotNull(newCol, "Collection should now exist under the current default name");
    if (newCol) testCollections.push(newCol);

    // Only one replication collection should exist (no duplicate)
    const repCols = updatedCollections.filter(
      (c: any) => c.name === currentDefault || c.name === legacyName,
    );
    assert.equal(repCols.length, 1, "Should have exactly one replication collection (no duplicate)");

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
