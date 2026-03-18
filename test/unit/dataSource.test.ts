import { assert } from "chai";
import { APIDataSource } from "../../src/modules/dataSource";

describe("APIDataSource", function() {
  let dataSource: APIDataSource;

  beforeEach(function() {
    dataSource = new APIDataSource();
  });

  describe("queryByPrefixes", function() {
    it("parses a valid API response", async function() {
      const apiResponse = {
        results: {
          abc: [
            {
              doi: "10.1234/test",
              doi_hash: "abcdef123",
              title: "Test Article",
              authors: [{ given: "John", family: "Doe", sequence: "first" }],
              journal: "Test Journal",
              year: 2020,
              apa_ref: "Doe (2020)",
              bibtex_ref: "@article{doe2020}",
              record: {
                stats: {
                  n_replications: 1,
                  n_unique_replication_dois: 1,
                  n_originals: 0,
                  n_unique_original_dois: 0,
                  n_reproductions: 0,
                  n_reproduction_only: 0,
                },
                replications: [
                  {
                    doi: "10.5678/rep",
                    doi_hash: "xyz",
                    title: "Replication",
                    authors: [],
                    journal: "Rep J",
                    year: 2022,
                    apa_ref: "",
                    bibtex_ref: "",
                    outcome: "successful",
                  },
                ],
                originals: [],
                reproductions: [],
              },
            },
          ],
        },
      };

      // Mock HTTP to return our response
      (globalThis as any).Zotero.HTTP.request = async () => ({
        status: 200,
        response: JSON.stringify(apiResponse),
        responseText: JSON.stringify(apiResponse),
      });

      const results = await dataSource.queryByPrefixes(["abc"]);
      assert.lengthOf(results, 1);
      assert.equal(results[0].doi, "10.1234/test");
      assert.lengthOf(results[0].replications, 1);
      assert.equal(results[0].replications[0].outcome, "successful");
      assert.deepEqual(results[0].originals, []);
      assert.deepEqual(results[0].reproductions, []);
    });

    it("returns empty array for empty results", async function() {
      (globalThis as any).Zotero.HTTP.request = async () => ({
        status: 200,
        response: JSON.stringify({ results: {} }),
        responseText: JSON.stringify({ results: {} }),
      });

      const results = await dataSource.queryByPrefixes(["xyz"]);
      assert.deepEqual(results, []);
    });

    it("throws on non-200 status", async function() {
      (globalThis as any).Zotero.HTTP.request = async () => ({
        status: 500,
        response: "Server Error",
        responseText: "Server Error",
      });

      try {
        await dataSource.queryByPrefixes(["abc"]);
        assert.fail("Should have thrown");
      } catch (error: any) {
        assert.include(error.message, "API returned status 500");
      }
    });

    it("throws on network error", async function() {
      (globalThis as any).Zotero.HTTP.request = async () => {
        throw new Error("Network unreachable");
      };

      try {
        await dataSource.queryByPrefixes(["abc"]);
        assert.fail("Should have thrown");
      } catch (error: any) {
        assert.include(error.message, "Network unreachable");
      }
    });

    it("handles response with multiple prefixes", async function() {
      const apiResponse = {
        results: {
          aaa: [
            {
              doi: "10.1111/a",
              doi_hash: "h1",
              title: "Article A",
              authors: [],
              journal: "J",
              year: 2020,
              apa_ref: "",
              bibtex_ref: "",
              record: {
                stats: {
                  n_replications: 0,
                  n_unique_replication_dois: 0,
                  n_originals: 1,
                  n_unique_original_dois: 1,
                  n_reproductions: 0,
                  n_reproduction_only: 0,
                },
                replications: [],
                originals: [
                  {
                    doi: "10.2222/orig",
                    doi_hash: "h2",
                    title: "Original",
                    authors: [],
                    journal: "J",
                    year: 2018,
                    apa_ref: "",
                    bibtex_ref: "",
                  },
                ],
                reproductions: [],
              },
            },
          ],
          bbb: [
            {
              doi: "10.3333/b",
              doi_hash: "h3",
              title: "Article B",
              authors: [],
              journal: "J",
              year: 2021,
              apa_ref: "",
              bibtex_ref: "",
              record: {
                stats: {
                  n_replications: 0,
                  n_unique_replication_dois: 0,
                  n_originals: 0,
                  n_unique_original_dois: 0,
                  n_reproductions: 1,
                  n_reproduction_only: 1,
                },
                replications: [],
                originals: [],
                reproductions: [
                  {
                    doi: "10.4444/repro",
                    doi_hash: "h4",
                    title: "Reproduction",
                    authors: [],
                    journal: "J",
                    year: 2023,
                    apa_ref: "",
                    bibtex_ref: "",
                  },
                ],
              },
            },
          ],
        },
      };

      (globalThis as any).Zotero.HTTP.request = async () => ({
        status: 200,
        response: JSON.stringify(apiResponse),
        responseText: JSON.stringify(apiResponse),
      });

      const results = await dataSource.queryByPrefixes(["aaa", "bbb"]);
      assert.lengthOf(results, 2);
      assert.equal(results[0].originals.length, 1);
      assert.equal(results[1].reproductions.length, 1);
    });
  });
});
