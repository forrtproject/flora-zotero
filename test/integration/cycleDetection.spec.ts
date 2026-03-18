import { assert } from "chai";
import {
  getPlugin,
  getChecker,
  createTestItem,
  cleanupItems,
  cleanupCollection,
  mockHTTP,
} from "../fixtures/helpers";
import {
  cyclicMatch,
  singleReplicationMatch,
  replicationOfReplicationMatch,
  createMockHTTPHandler,
  TEST_DOIS,
} from "../fixtures/apiResponses";

describe("Cycle Detection", function () {
  this.timeout(30000);

  const testItems: Zotero.Item[] = [];
  let restoreHTTP: (() => void) | null = null;
  const testCollections: Zotero.Collection[] = [];

  afterEach(async function () {
    if (restoreHTTP) {
      restoreHTTP();
      restoreHTTP = null;
    }

    // Clean up items created during test
    await cleanupItems(testItems);
    testItems.length = 0;

    // Clean up collections
    for (const col of testCollections) {
      await cleanupCollection(col);
    }
    testCollections.length = 0;
  });

  it("plugin-added items skip auto-check processing", async function () {
    const checker = getChecker();

    // Mock HTTP to return cycle fixture: A has replication B, B has original A
    restoreHTTP = mockHTTP(createMockHTTPHandler(cyclicMatch));

    // Create the original item A
    const itemA = await createTestItem(
      TEST_DOIS.cycleA,
      "Cycle Study A (Original)",
    );
    testItems.push(itemA);

    // Process A: should create replication item B
    const allArticles = Object.values(cyclicMatch.results).flat();
    const replications = allArticles.find(
      (a) => a.doi === TEST_DOIS.cycleA,
    )!.record.replications;

    await checker.notifyUserAndAddReplications(itemA.id, replications);

    // Find the created replication item B by searching for its DOI
    const search = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search.addCondition("DOI", "is", TEST_DOIS.cycleB);
    const foundIDs = await search.search();
    assert.isAbove(foundIDs.length, 0, "Replication item B should exist");

    const itemB = await Zotero.Items.getAsync(foundIDs[0]);
    testItems.push(itemB!);

    // Count items before checkNewItems
    const searchAll = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    searchAll.addCondition("itemType", "isNot", "attachment");
    searchAll.addCondition("itemType", "isNot", "note");
    const allIDsBefore = await searchAll.search();

    // Enable auto-check so checkNewItems doesn't bail out early
    Zotero.Prefs.set(
      "replication-checker.autoCheckFrequency",
      "daily",
    );

    // Call checkNewItems with B's ID — should skip since B was plugin-added
    await checker.checkNewItems([itemB!.id]);

    // Verify no new items were created
    const searchAll2 = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    searchAll2.addCondition("itemType", "isNot", "attachment");
    searchAll2.addCondition("itemType", "isNot", "note");
    const allIDsAfter = await searchAll2.search();

    assert.equal(
      allIDsAfter.length,
      allIDsBefore.length,
      "No new items should be created for plugin-added items",
    );
  });

  it("re-scanning library does not duplicate existing replications", async function () {
    const checker = getChecker();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    // Create original item
    const itemA = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(itemA);

    // First check — creates replication item
    const replications = Object.values(singleReplicationMatch.results)
      .flat()
      .find((a) => a.doi === TEST_DOIS.originalA)!.record.replications;

    await checker.notifyUserAndAddReplications(itemA.id, replications);

    // Count replication items
    const search1 = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search1.addCondition("DOI", "is", TEST_DOIS.replication);
    const countAfterFirst = (await search1.search()).length;

    // Second check — should not duplicate
    await checker.notifyUserAndAddReplications(itemA.id, replications);

    const search2 = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search2.addCondition("DOI", "is", TEST_DOIS.replication);
    const countAfterSecond = (await search2.search()).length;

    assert.equal(
      countAfterSecond,
      countAfterFirst,
      "No duplicate replication items should be created",
    );

    // Clean up the replication item too
    for (const id of await search2.search()) {
      const item = await Zotero.Items.getAsync(id);
      if (item) testItems.push(item);
    }
  });

  it("existing item found by DOI search prevents duplication", async function () {
    const checker = getChecker();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    // Create original item A
    const itemA = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(itemA);

    // Manually create the replication item B (simulating it already exists)
    const itemB = await createTestItem(
      TEST_DOIS.replication,
      "A Successful Replication of Study A",
    );
    testItems.push(itemB);

    // Run check — should find existing B by DOI, not create duplicate
    const replications = Object.values(singleReplicationMatch.results)
      .flat()
      .find((a) => a.doi === TEST_DOIS.originalA)!.record.replications;

    await checker.notifyUserAndAddReplications(itemA.id, replications);

    // Verify only 1 item with B's DOI exists
    const search = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search.addCondition("DOI", "is", TEST_DOIS.replication);
    const foundIDs = await search.search();
    assert.equal(
      foundIDs.length,
      1,
      "Only one item with the replication DOI should exist",
    );
  });

  it("blacklisted replications are not re-added", async function () {
    const checker = getChecker();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    // Create original item
    const itemA = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(itemA);

    // Use the plugin's blacklistManager instance (not a separate import)
    const blacklistManager = getPlugin().blacklistManager;
    await blacklistManager.addToBlacklist({
      itemID: 0,
      doi: TEST_DOIS.replication,
      title: "Blocked Replication",
      originalTitle: "Original",
      dateAdded: new Date().toISOString(),
      type: "replication" as const,
    });

    // Run check
    const replications = Object.values(singleReplicationMatch.results)
      .flat()
      .find((a) => a.doi === TEST_DOIS.originalA)!.record.replications;

    await checker.notifyUserAndAddReplications(itemA.id, replications);

    // Verify no replication item was created
    const search = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search.addCondition("DOI", "is", TEST_DOIS.replication);
    const foundIDs = await search.search();
    assert.equal(
      foundIDs.length,
      0,
      "Blacklisted replication should not be created",
    );

    // Cleanup blacklist
    await blacklistManager.removeFromBlacklist(TEST_DOIS.replication);
  });

  it("existing item found by title+tag prevents duplication", async function () {
    const checker = getChecker();
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    // Create original item A
    const itemA = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(itemA);

    // Create item B with matching title and "Is Replication" tag but NO DOI
    const itemB = new Zotero.Item("journalArticle");
    (itemB as any).libraryID = Zotero.Libraries.userLibraryID;
    itemB.setField("title", "A Successful Replication of Study A");
    itemB.addTag("Is Replication");
    await itemB.saveTx();
    testItems.push(itemB);

    // Run check — should find existing B by title+tag, not create duplicate
    const replications = Object.values(singleReplicationMatch.results)
      .flat()
      .find((a) => a.doi === TEST_DOIS.originalA)!.record.replications;

    await checker.notifyUserAndAddReplications(itemA.id, replications);

    // Search for items with the replication title and tag
    const search = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search.addCondition("title", "is", "A Successful Replication of Study A");
    search.addCondition("tag", "is", "Is Replication");
    const foundIDs = await search.search();
    assert.equal(
      foundIDs.length,
      1,
      "Should reuse existing item found by title+tag, not create duplicate",
    );
  });

  it("replication of a replication is added across runs", async function () {
    const checker = getChecker();

    // Step 1: Process A → B is created
    restoreHTTP = mockHTTP(createMockHTTPHandler(cyclicMatch));

    const itemA = await createTestItem(
      TEST_DOIS.cycleA,
      "Cycle Study A (Original)",
    );
    testItems.push(itemA);

    const replicationsOfA = Object.values(cyclicMatch.results)
      .flat()
      .find((a) => a.doi === TEST_DOIS.cycleA)!.record.replications;

    await checker.notifyUserAndAddReplications(itemA.id, replicationsOfA);

    // Find created item B
    const searchB = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    searchB.addCondition("DOI", "is", TEST_DOIS.cycleB);
    const bIDs = await searchB.search();
    assert.isAbove(bIDs.length, 0, "Replication B should exist");
    const itemB = await Zotero.Items.getAsync(bIDs[0]);
    testItems.push(itemB!);

    // Step 2: Simulate new session — clear B from pluginAddedItems
    // checkNewItems removes B from tracking (line 411 in replicationChecker.ts)
    Zotero.Prefs.set(
      "replication-checker.autoCheckNewItems",
      true,
    );
    await checker.checkNewItems([itemB!.id]);

    // Step 3: Switch mock so B now has replication C
    restoreHTTP();
    restoreHTTP = mockHTTP(
      createMockHTTPHandler(replicationOfReplicationMatch),
    );

    // Step 4: Process B → C should be created
    const replicationsOfB = Object.values(
      replicationOfReplicationMatch.results,
    )
      .flat()
      .find((a) => a.doi === TEST_DOIS.cycleB)!.record.replications;

    await checker.notifyUserAndAddReplications(itemB!.id, replicationsOfB);

    // Verify C was created
    const searchC = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    searchC.addCondition("DOI", "is", TEST_DOIS.cycleC);
    const cIDs = await searchC.search();
    assert.isAbove(
      cIDs.length,
      0,
      "Replication C (replication-of-replication) should be created",
    );

    // Clean up C
    for (const id of cIDs) {
      const item = await Zotero.Items.getAsync(id);
      if (item) testItems.push(item);
    }
  });
});
