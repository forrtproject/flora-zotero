import { assert } from "chai";
import { normalizeDoi } from "../../src/utils/doi";
import { BatchMatcher } from "../../src/modules/batchMatcher";
import type { ReplicationDataSource } from "../../src/modules/dataSource";
import type { DOICheckResult } from "../../src/types/replication";

/** Stub data source that returns predetermined results */
class StubDataSource {
  results: DOICheckResult[] = [];
  lastPrefixes: string[] = [];

  async initialize() {}
  async queryByPrefixes(prefixes: string[]): Promise<DOICheckResult[]> {
    this.lastPrefixes = prefixes;
    return this.results;
  }
}

describe("DOI and BatchMatcher", function () {
  describe("normalizeDoi", function () {
    it("returns null for null/undefined/empty", function () {
      assert.isNull(normalizeDoi(null));
      assert.isNull(normalizeDoi(undefined));
      assert.isNull(normalizeDoi(""));
    });

    it("lowercases DOI", function () {
      assert.equal(normalizeDoi("10.1234/ABC"), "10.1234/abc");
    });

    it("strips https://doi.org/ prefix", function () {
      assert.equal(
        normalizeDoi("https://doi.org/10.1234/test"),
        "10.1234/test",
      );
    });

    it("strips https://dx.doi.org/ prefix", function () {
      assert.equal(
        normalizeDoi("https://dx.doi.org/10.1234/test"),
        "10.1234/test",
      );
    });

    it("strips http:// prefix", function () {
      assert.equal(
        normalizeDoi("http://doi.org/10.1234/test"),
        "10.1234/test",
      );
    });

    it("strips doi: prefix", function () {
      assert.equal(normalizeDoi("doi: 10.1234/test"), "10.1234/test");
    });

    it("collapses multiple slashes", function () {
      assert.equal(normalizeDoi("10.1234//test"), "10.1234/test");
    });

    it("trims whitespace", function () {
      assert.equal(normalizeDoi("  10.1234/test  "), "10.1234/test");
    });

    it("returns null for non-DOI string", function () {
      assert.isNull(normalizeDoi("not-a-doi"));
      assert.isNull(normalizeDoi("abc123"));
    });

    it("accepts valid DOI formats", function () {
      assert.equal(normalizeDoi("10.1000/xyz123"), "10.1000/xyz123");
      assert.equal(
        normalizeDoi("10.1038/nature12373"),
        "10.1038/nature12373",
      );
    });
  });

  describe("BatchMatcher", function () {
    let dataSource: StubDataSource;
    let matcher: BatchMatcher;

    beforeEach(function () {
      dataSource = new StubDataSource();
      matcher = new BatchMatcher(
        dataSource as unknown as ReplicationDataSource,
      );
    });

    describe("generatePrefix", function () {
      it("returns a 3-character string", function () {
        const prefix = matcher.generatePrefix("10.1234/test");
        assert.isString(prefix);
        assert.lengthOf(prefix, 3);
      });

      it("returns consistent results for same input", function () {
        const p1 = matcher.generatePrefix("10.1234/test");
        const p2 = matcher.generatePrefix("10.1234/test");
        assert.equal(p1, p2);
      });

      it("returns different prefixes for different DOIs", function () {
        const p1 = matcher.generatePrefix("10.1234/aaa");
        const p2 = matcher.generatePrefix("10.5678/bbb");
        assert.isString(p1);
        assert.isString(p2);
      });
    });

    describe("normalizeDoi (method)", function () {
      it("delegates to shared normalizeDoi", function () {
        assert.equal(
          matcher.normalizeDoi("https://doi.org/10.1234/test"),
          "10.1234/test",
        );
        assert.isNull(matcher.normalizeDoi(null));
      });
    });

    describe("checkBatch", function () {
      it("returns empty results for empty input", async function () {
        const results = await matcher.checkBatch([]);
        assert.deepEqual(results, []);
      });

      it("filters out invalid DOIs", async function () {
        dataSource.results = [];
        const results = await matcher.checkBatch(["not-a-doi", "", "abc"]);
        assert.deepEqual(results, []);
      });

      it("sends unique prefixes to data source", async function () {
        dataSource.results = [];
        await matcher.checkBatch(["10.1234/a", "10.1234/b"]);
        assert.isArray(dataSource.lastPrefixes);
      });

      it("matches API results to input DOIs", async function () {
        const testDoi = "10.1234/test";
        dataSource.results = [
          {
            doi: testDoi,
            replications: [
              {
                doi: "10.5678/rep",
                doi_hash: "abc",
                title: "Replication",
                authors: [],
                journal: "J",
                year: 2022,
                apa_ref: "",
                bibtex_ref: "",
              },
            ],
            originals: [],
            reproductions: [],
          },
        ];

        const results = await matcher.checkBatch([testDoi]);
        assert.lengthOf(results, 1);
        assert.equal(results[0].doi, testDoi);
        assert.lengthOf(results[0].replications, 1);
      });

      it("returns empty arrays for DOIs with no match", async function () {
        dataSource.results = [];
        const results = await matcher.checkBatch(["10.1234/no-match"]);
        assert.lengthOf(results, 1);
        assert.equal(results[0].doi, "10.1234/no-match");
        assert.deepEqual(results[0].replications, []);
        assert.deepEqual(results[0].originals, []);
        assert.deepEqual(results[0].reproductions, []);
      });
    });
  });
});
