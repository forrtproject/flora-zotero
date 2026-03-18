import CryptoJS from "crypto-js";
import type {
  PrefixLookupResponse,
  FLoRAArticle,
  RelatedStudy,
} from "../../src/types/replication";

/** Compute the 3-char MD5 prefix for a DOI (same logic as BatchMatcher) */
export function computePrefix(doi: string): string {
  const normalized = doi.trim().toLowerCase();
  return CryptoJS.MD5(normalized).toString().substring(0, 3);
}

/** Build a PrefixLookupResponse keyed by correct MD5 prefixes */
export function buildPrefixLookupResponse(
  articles: FLoRAArticle[],
): PrefixLookupResponse {
  const results: { [prefix: string]: FLoRAArticle[] } = {};
  for (const article of articles) {
    const prefix = computePrefix(article.doi);
    if (!results[prefix]) results[prefix] = [];
    results[prefix].push(article);
  }
  return { results };
}

/** Create a minimal FLoRAArticle */
function makeArticle(opts: {
  doi: string;
  title: string;
  replications?: RelatedStudy[];
  originals?: RelatedStudy[];
  reproductions?: RelatedStudy[];
}): FLoRAArticle {
  return {
    doi: opts.doi,
    doi_hash: CryptoJS.MD5(opts.doi.toLowerCase()).toString(),
    title: opts.title,
    authors: [{ given: "Test", family: "Author", sequence: "first" }],
    journal: "Test Journal",
    year: 2020,
    apa_ref: `Author, T. (2020). ${opts.title}. Test Journal.`,
    bibtex_ref: `@article{author2020, title={${opts.title}}, author={Author, Test}, journal={Test Journal}, year={2020}, doi={${opts.doi}}}`,
    record: {
      stats: {
        n_replications: (opts.replications || []).length,
        n_unique_replication_dois: (opts.replications || []).length,
        n_originals: (opts.originals || []).length,
        n_unique_original_dois: (opts.originals || []).length,
        n_reproductions: (opts.reproductions || []).length,
        n_reproduction_only: 0,
      },
      replications: opts.replications || [],
      originals: opts.originals || [],
      reproductions: opts.reproductions || [],
    },
  };
}

/** Create a minimal RelatedStudy */
function makeRelatedStudy(opts: {
  doi: string;
  title: string;
  outcome?: string;
  bibtex_ref?: string;
}): RelatedStudy {
  return {
    doi: opts.doi,
    doi_hash: CryptoJS.MD5(opts.doi.toLowerCase()).toString(),
    title: opts.title,
    authors: [{ given: "Test", family: "Replicator", sequence: "first" }],
    journal: "Replication Journal",
    year: 2022,
    apa_ref: `Replicator, T. (2022). ${opts.title}. Replication Journal.`,
    bibtex_ref:
      opts.bibtex_ref ||
      `@article{replicator2022, title={${opts.title}}, author={Replicator, Test}, journal={Replication Journal}, year={2022}, doi={${opts.doi}}}`,
    outcome: opts.outcome,
  };
}

// ===== Test DOIs =====
export const TEST_DOIS = {
  originalA: "10.1234/test.original.a",
  originalB: "10.1234/test.original.b",
  replication: "10.5678/test.replication.001",
  replicationMulti: "10.5678/test.replication.multi",
  cycleA: "10.9999/test.cycle.a",
  cycleB: "10.9999/test.cycle.b",
  cycleC: "10.9999/test.cycle.c",
  noBibtex: "10.7777/test.no.bibtex",
};

// ===== Fixtures =====

/** DOI 10.1234/test.original.a → 1 replication (10.5678/test.replication.001) */
export const singleReplicationMatch = buildPrefixLookupResponse([
  makeArticle({
    doi: TEST_DOIS.originalA,
    title: "The Original Study A",
    replications: [
      makeRelatedStudy({
        doi: TEST_DOIS.replication,
        title: "A Successful Replication of Study A",
        outcome: "successful",
        bibtex_ref: `@article{replicator2022,
  title={A Successful Replication of Study A},
  author={Replicator, Test},
  journal={Replication Journal},
  year={2022},
  volume={10},
  pages={1-15},
  doi={${TEST_DOIS.replication}}}`,
      }),
    ],
  }),
]);

/** DOI 10.5678/test.replication.multi → 2 originals */
export const multipleOriginalsMatch = buildPrefixLookupResponse([
  makeArticle({
    doi: TEST_DOIS.replicationMulti,
    title: "A Replication with Multiple Originals",
    originals: [
      makeRelatedStudy({
        doi: TEST_DOIS.originalA,
        title: "Original Study A",
        outcome: "successful",
      }),
      makeRelatedStudy({
        doi: TEST_DOIS.originalB,
        title: "Original Study B",
        outcome: "failed",
      }),
    ],
  }),
]);

/** Cycle: A has replication B, B has original A */
export const cyclicMatch = buildPrefixLookupResponse([
  makeArticle({
    doi: TEST_DOIS.cycleA,
    title: "Cycle Study A (Original)",
    replications: [
      makeRelatedStudy({
        doi: TEST_DOIS.cycleB,
        title: "Cycle Study B (Replication)",
        outcome: "successful",
      }),
    ],
  }),
  makeArticle({
    doi: TEST_DOIS.cycleB,
    title: "Cycle Study B (Replication)",
    originals: [
      makeRelatedStudy({
        doi: TEST_DOIS.cycleA,
        title: "Cycle Study A (Original)",
      }),
    ],
  }),
]);

/** B has replication C — for testing replication-of-replication across runs */
export const replicationOfReplicationMatch = buildPrefixLookupResponse([
  makeArticle({
    doi: TEST_DOIS.cycleB,
    title: "Cycle Study B (Replication)",
    replications: [
      makeRelatedStudy({
        doi: TEST_DOIS.cycleC,
        title: "Cycle Study C (Replication of Replication)",
        outcome: "successful",
      }),
    ],
  }),
]);

/** Original with a replication that has no bibtex_ref */
export const noBibtexMatch = buildPrefixLookupResponse([
  makeArticle({
    doi: TEST_DOIS.originalA,
    title: "The Original Study A",
    replications: [
      {
        doi: TEST_DOIS.noBibtex,
        doi_hash: CryptoJS.MD5(TEST_DOIS.noBibtex.toLowerCase()).toString(),
        title: "Replication Without BibTeX",
        authors: [
          { given: "No", family: "Bibtex", sequence: "first" as const },
        ],
        journal: "Sparse Journal",
        year: 2023,
        apa_ref: "Bibtex, N. (2023). Replication Without BibTeX.",
        bibtex_ref: "", // intentionally empty
        outcome: "failed",
      },
    ],
  }),
]);

/** Empty response */
export const emptyResponse: PrefixLookupResponse = { results: {} };

/**
 * Dispatch fixture data based on requested prefixes.
 * Used by the HTTP mock to return the correct fixture for each test scenario.
 */
export function getFixtureForPrefixes(
  prefixes: string[],
  fixtureResponse: PrefixLookupResponse,
): PrefixLookupResponse {
  const results: { [prefix: string]: FLoRAArticle[] } = {};
  for (const prefix of prefixes) {
    if (fixtureResponse.results[prefix]) {
      results[prefix] = fixtureResponse.results[prefix];
    }
  }
  return { results };
}

/**
 * Create a mock HTTP handler that returns fixture data for prefix-lookup requests.
 * Falls through to real HTTP for other URLs.
 */
export function createMockHTTPHandler(
  fixtureResponse: PrefixLookupResponse,
  originalHTTP?: typeof Zotero.HTTP.request,
) {
  return async (method: string, url: string, opts: any) => {
    if (url.includes("prefix-lookup")) {
      const body = JSON.parse(opts.body);
      const response = getFixtureForPrefixes(body.prefixes, fixtureResponse);
      const responseText = JSON.stringify(response);
      return {
        status: 200,
        response: responseText,
        responseText,
      };
    }
    // Fall through to real HTTP for other requests
    if (originalHTTP) {
      return originalHTTP(method, url, opts);
    }
    throw new Error(`Unmocked HTTP request: ${method} ${url}`);
  };
}
