import { assert } from "chai";
import { APIDataSource } from "../../src/modules/dataSource";

describe("FLoRA API Smoke Test", function () {
  this.timeout(15000);

  before(function () {
    // Skip unless the preference is explicitly set
    if (!Zotero.Prefs.get("replication-checker.runApiSmoke")) {
      this.skip();
    }
  });

  it("API returns valid response for known prefix", async function () {
    const dataSource = new APIDataSource();
    await dataSource.initialize();

    // Use a common 3-char prefix — most will return at least empty results
    const results = await dataSource.queryByPrefixes(["abc"]);
    assert.isArray(results);

    if (results.length > 0) {
      assert.property(results[0], "doi");
      assert.property(results[0], "replications");
      assert.property(results[0], "originals");
      assert.property(results[0], "reproductions");
    }
  });

  it("API handles empty prefix list", async function () {
    const dataSource = new APIDataSource();
    await dataSource.initialize();

    const results = await dataSource.queryByPrefixes([]);
    assert.isArray(results);
    assert.lengthOf(results, 0);
  });
});
