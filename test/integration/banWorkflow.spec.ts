import { assert } from "chai";
import {
  getPlugin,
  getChecker,
  getReproductionHandler,
  createTestItem,
  mockHTTP,
} from "../fixtures/helpers";
import {
  singleReplicationMatch,
  singleReproductionMatch,
  createMockHTTPHandler,
  TEST_DOIS,
  TEST_REPRODUCTION_DOI,
} from "../fixtures/apiResponses";

describe("Ban Workflow", function () {
  this.timeout(30000);

  const testItems: Zotero.Item[] = [];
  let restoreHTTP: (() => void) | null = null;

  afterEach(async function () {
    if (restoreHTTP) { restoreHTTP(); restoreHTTP = null; }

    // Un-trash items before erasing (eraseTx requires non-deleted state in some versions)
    for (const item of testItems) {
      try {
        if (item.deleted) {
          item.deleted = false;
          await item.saveTx();
        }
        const noteIDs = item.getNotes();
        for (const noteID of noteIDs) {
          const note = await Zotero.Items.getAsync(noteID);
          if (note) await note.eraseTx();
        }
        await item.eraseTx();
      } catch { /* already deleted */ }
    }
    testItems.length = 0;

    // Always clean blacklist after each test
    const bm = getPlugin().blacklistManager;
    await bm.clearBlacklist();
  });

  /** Set up: create original + replication items with proper tags and relation */
  async function createLinkedPair(): Promise<{
    original: Zotero.Item;
    replication: Zotero.Item;
  }> {
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReplicationMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    const checker = getChecker();
    const articles = Object.values(singleReplicationMatch.results).flat();
    const article = articles.find((a) => a.doi === TEST_DOIS.originalA)!;
    await checker.notifyUserAndAddReplications(
      original.id,
      article.record.replications,
    );

    const search = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search.addCondition("DOI", "is", TEST_DOIS.replication);
    const ids = await search.search();
    assert.isAbove(ids.length, 0, "Replication item should exist after setup");

    const replication = await Zotero.Items.getAsync(ids[0]);
    testItems.push(replication!);

    return { original, replication: replication! };
  }

  it("ban moves replication item to trash", async function () {
    const { replication } = await createLinkedPair();

    const checker = getChecker();
    await checker.banSelectedItems([replication], true);

    const refreshed = await Zotero.Items.getAsync(replication.id);
    assert.isTrue(refreshed!.deleted, "Banned item should be in trash");
  });

  it("ban adds item to blacklist by DOI", async function () {
    const { replication } = await createLinkedPair();

    const checker = getChecker();
    await checker.banSelectedItems([replication], true);

    const bm = getPlugin().blacklistManager;
    const isBlacklisted = bm.isBlacklisted(TEST_DOIS.replication);
    assert.isTrue(isBlacklisted, "Replication DOI should be in blacklist after ban");
  });

  it("ban removes relation from original item", async function () {
    const { original, replication } = await createLinkedPair();

    // Verify the relation exists before ban
    const relatedBefore = original.relatedItems;
    assert.isAbove(
      relatedBefore.length,
      0,
      "Original should have related items before ban",
    );

    const checker = getChecker();
    await checker.banSelectedItems([replication], true);

    const updatedOriginal = await Zotero.Items.getAsync(original.id);
    const relatedAfter = updatedOriginal!.relatedItems;
    assert.equal(
      relatedAfter.length,
      0,
      "Original should have no related items after ban",
    );
  });

  it("ban cancelled when user declines confirmation", async function () {
    const { replication } = await createLinkedPair();

    const checker = getChecker();
    await checker.banSelectedItems([replication], false);

    const refreshed = await Zotero.Items.getAsync(replication.id);
    assert.isFalse(
      refreshed!.deleted,
      "Item should NOT be trashed when ban is cancelled",
    );

    const bm = getPlugin().blacklistManager;
    assert.isFalse(
      bm.isBlacklisted(TEST_DOIS.replication),
      "Item should NOT be blacklisted when ban is cancelled",
    );
  });

  it("banned replication is not re-added on subsequent check", async function () {
    const { original, replication } = await createLinkedPair();

    const checker = getChecker();
    await checker.banSelectedItems([replication], true);

    // Count items — should not include the banned replication after a second run
    const countBefore = await (async () => {
      const s = new Zotero.Search({ libraryID: Zotero.Libraries.userLibraryID });
      s.addCondition("DOI", "is", TEST_DOIS.replication);
      s.addCondition("deleted", "false", "");
      return (await s.search()).length;
    })();

    const articles = Object.values(singleReplicationMatch.results).flat();
    const article = articles.find((a) => a.doi === TEST_DOIS.originalA)!;
    await checker.notifyUserAndAddReplications(
      original.id,
      article.record.replications,
    );

    const countAfter = await (async () => {
      const s = new Zotero.Search({ libraryID: Zotero.Libraries.userLibraryID });
      s.addCondition("DOI", "is", TEST_DOIS.replication);
      s.addCondition("deleted", "false", "");
      return (await s.search()).length;
    })();

    assert.equal(
      countAfter,
      countBefore,
      "Blacklisted replication must not be re-created",
    );
  });

  it("ban of reproduction item adds to blacklist with type 'reproduction'", async function () {
    restoreHTTP = mockHTTP(createMockHTTPHandler(singleReproductionMatch));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    const handler = getReproductionHandler();
    const reproductions = Object.values(singleReproductionMatch.results)
      .flat()
      .find((a) => a.doi === TEST_DOIS.originalA)!.record.reproductions;
    await handler.processReproductions(original.id, reproductions);

    const search = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search.addCondition("DOI", "is", TEST_REPRODUCTION_DOI);
    const ids = await search.search();
    assert.isAbove(ids.length, 0, "Reproduction item should exist after setup");

    const reproItem = await Zotero.Items.getAsync(ids[0]);
    testItems.push(reproItem!);

    const checker = getChecker();
    await checker.banSelectedItems([reproItem!], true);

    const bm = getPlugin().blacklistManager;
    const entries = bm.getEntriesWithMetadata();
    const entry = entries.find(
      (e: any) => e.doi === TEST_REPRODUCTION_DOI || e.url?.includes("test123"),
    );
    assert.exists(entry, "Blacklist entry should exist for reproduction DOI");
    assert.equal(entry.type, "reproduction", "Blacklist entry type should be 'reproduction'");
  });
});
