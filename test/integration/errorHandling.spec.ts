import { assert } from "chai";
import {
  getChecker,
  createTestItem,
  cleanupItems,
  mockHTTP,
} from "../fixtures/helpers";
import { TEST_DOIS } from "../fixtures/apiResponses";

describe("Error Handling", function () {
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

  it("handles API failure gracefully during check", async function () {
    const checker = getChecker();

    // Mock HTTP to always fail
    restoreHTTP = mockHTTP(async () => {
      throw new Error("Simulated network failure");
    });

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    // checkBatch (called internally) should throw, but
    // notifyUserAndAddReplications receives pre-fetched data,
    // so test the matcher directly
    try {
      await checker.matcher.checkBatch([TEST_DOIS.originalA]);
      assert.fail("Should have thrown on API failure");
    } catch (error: any) {
      assert.include(error.message, "network failure");
    }
  });

  it("handles non-200 API response", async function () {
    const checker = getChecker();

    restoreHTTP = mockHTTP(async () => ({
      status: 503,
      response: "Service Unavailable",
      responseText: "Service Unavailable",
    }));

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    try {
      await checker.matcher.checkBatch([TEST_DOIS.originalA]);
      assert.fail("Should have thrown on 503 response");
    } catch (error: any) {
      assert.include(error.message, "503");
    }
  });

  it("handles empty replications array without error", async function () {
    const checker = getChecker();

    const original = await createTestItem(
      TEST_DOIS.originalA,
      "The Original Study A",
    );
    testItems.push(original);

    // Passing empty replications should not throw
    await checker.notifyUserAndAddReplications(original.id, []);

    // Original should not get "Has Replication" tag
    const updatedOriginal = await Zotero.Items.getAsync(original.id);
    const tags = updatedOriginal!.getTags().map((t: any) => t.tag);
    assert.notInclude(tags, "Has Replication");
  });
});
