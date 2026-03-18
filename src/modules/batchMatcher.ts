/**
 * Batch matcher module for Replication Checker
 * Implements privacy-preserving matching algorithm using MD5 hash prefixes
 */

import CryptoJS from "crypto-js";
import type { ReplicationDataSource } from "./dataSource";
import type { DOICheckResult } from "../types/replication";
import { normalizeDoi as normalizeDoiShared } from "../utils/doi";

interface DoiPrefixMap {
  [doi: string]: string;
}

/**
 * BatchMatcher - Implements privacy-preserving DOI matching
 * Uses MD5 hash prefixes for privacy while matching replications
 */
export class BatchMatcher {
  private dataSource: ReplicationDataSource;

  /**
   * Number of hash prefixes to send per API request.
   * The FLoRA API processes at most 200 prefixes per request,
   * silently ignoring any beyond that limit.
   */
  private readonly BATCH_SIZE = 200;

  constructor(dataSource: ReplicationDataSource) {
    this.dataSource = dataSource;
  }

  /**
   * Check a batch of DOIs for replications, originals, and reproductions
   * @param dois Array of DOI strings to check
   * @returns Array of DOI check results with all related studies
   */
  async checkBatch(dois: string[]): Promise<DOICheckResult[]> {
    Zotero.debug(`[BatchMatcher] Checking ${dois.length} DOIs...`);
    Zotero.debug(
      `[BatchMatcher] Input DOIs: ${dois.slice(0, 5).join(", ")}${dois.length > 5 ? "..." : ""}`,
    );

    // Normalize and filter DOIs
    const normalizedDois = dois
      .map((doi) => this.normalizeDoi(doi))
      .filter((doi) => doi !== null) as string[];

    Zotero.debug(
      `[BatchMatcher] Normalized to ${normalizedDois.length} valid DOIs`,
    );
    if (normalizedDois.length > 0) {
      Zotero.debug(
        `[BatchMatcher] First few normalized: ${normalizedDois.slice(0, 3).join(", ")}`,
      );
    }

    // Create DOI to prefix map
    const doiToPrefixMap: DoiPrefixMap = {};
    normalizedDois.forEach((doi) => {
      const prefix = this.generatePrefix(doi);
      doiToPrefixMap[doi] = prefix;
      if (normalizedDois.indexOf(doi) < 3) {
        Zotero.debug(`[BatchMatcher] DOI: ${doi} -> Prefix: ${prefix}`);
      }
    });

    Zotero.debug(
      `[BatchMatcher] Generated ${Object.keys(doiToPrefixMap).length} unique DOIs with prefixes`,
    );

    // Get unique prefixes
    const uniquePrefixes = Array.from(new Set(Object.values(doiToPrefixMap)));
    Zotero.debug(
      `[BatchMatcher] Unique prefixes count: ${uniquePrefixes.length}`,
    );
    Zotero.debug(
      `[BatchMatcher] Unique prefixes: ${uniquePrefixes.join(", ")}`,
    );

    let allResults: DOICheckResult[] = [];

    // Query in batches
    const startTime = Date.now();
    for (let i = 0; i < uniquePrefixes.length; i += this.BATCH_SIZE) {
      const batchPrefixes = uniquePrefixes.slice(i, i + this.BATCH_SIZE);
      Zotero.debug(
        `[BatchMatcher] Querying batch ${Math.floor(i / this.BATCH_SIZE) + 1} with ${batchPrefixes.length} prefixes: ${batchPrefixes.join(", ")}`,
      );
      const batchResults = await this.dataSource.queryByPrefixes(batchPrefixes);
      Zotero.debug(
        `[BatchMatcher] Batch returned ${batchResults.length} DOI results`,
      );
      allResults = allResults.concat(batchResults);
    }
    const queryTime = Date.now() - startTime;

    Zotero.debug(
      `[BatchMatcher] Received ${allResults.length} total DOI results from data source in ${queryTime}ms`,
    );

    // Verify matches locally (privacy-preserving step)
    const results = this.verifyMatches(
      normalizedDois,
      doiToPrefixMap,
      allResults,
    );

    const matchCount = results.filter(
      (r) =>
        r.replications.length > 0 ||
        r.originals.length > 0 ||
        r.reproductions.length > 0,
    ).length;
    Zotero.debug(
      `[BatchMatcher] Found ${matchCount} DOIs with related studies out of ${results.length} checked`,
    );

    // Log details of matches found
    for (const result of results) {
      if (
        result.replications.length > 0 ||
        result.originals.length > 0 ||
        result.reproductions.length > 0
      ) {
        Zotero.debug(
          `[BatchMatcher] Match: ${result.doi} -> ` +
            `${result.replications.length} replications, ` +
            `${result.originals.length} originals, ` +
            `${result.reproductions.length} reproductions`,
        );
      }
    }

    return results;
  }

  /**
   * Verify which candidates actually match our DOIs
   * This is the privacy-preserving step - happens locally
   * @param ourDois The DOIs we're checking
   * @param doiToPrefixMap Map of DOIs to their hash prefixes
   * @param apiResults Results returned from API
   * @returns Array of DOI check results
   */
  private verifyMatches(
    ourDois: string[],
    doiToPrefixMap: DoiPrefixMap,
    apiResults: DOICheckResult[],
  ): DOICheckResult[] {
    const results: DOICheckResult[] = [];

    Zotero.debug(
      `[BatchMatcher] Starting verifyMatches: ${ourDois.length} DOIs, ${apiResults.length} API results`,
    );

    // For each of our DOIs
    for (const doi of ourDois) {
      const ourPrefix = doiToPrefixMap[doi];
      const normalizedOurDoi = this.normalizeDoi(doi);

      if (ourDois.indexOf(doi) < 3) {
        Zotero.debug(
          `[BatchMatcher] Verifying DOI: ${doi} (normalized: ${normalizedOurDoi}, prefix: ${ourPrefix})`,
        );
      }

      // Find API results that match this DOI
      const matchingResult = apiResults.find((apiResult) => {
        const apiNormalizedDoi = this.normalizeDoi(apiResult.doi);
        return apiNormalizedDoi === normalizedOurDoi;
      });

      if (matchingResult) {
        if (ourDois.indexOf(doi) < 3) {
          Zotero.debug(
            `[BatchMatcher] Found match for ${doi}: ` +
              `${matchingResult.replications.length} replications, ` +
              `${matchingResult.originals.length} originals, ` +
              `${matchingResult.reproductions.length} reproductions`,
          );
        }

        results.push({
          doi: doi, // Use original DOI
          replications: matchingResult.replications,
          originals: matchingResult.originals,
          reproductions: matchingResult.reproductions,
        });
      } else {
        // No match found - return empty arrays
        results.push({
          doi: doi,
          replications: [],
          originals: [],
          reproductions: [],
        });
      }
    }

    Zotero.debug(
      `[BatchMatcher] verifyMatches complete: ${
        results.filter(
          (r) =>
            r.replications.length > 0 ||
            r.originals.length > 0 ||
            r.reproductions.length > 0,
        ).length
      } matches found`,
    );

    return results;
  }

  /**
   * Normalize DOI to standard format
   * Delegates to shared normalizeDoi utility
   */
  normalizeDoi(doi: string | null | undefined): string | null {
    return normalizeDoiShared(doi);
  }

  /**
   * Generate MD5 hash prefix from DOI (3 characters)
   * @param doi The DOI to hash
   * @returns 3-character hash prefix
   */
  generatePrefix(doi: string): string {
    const hash = CryptoJS.MD5(doi).toString();
    return hash.substring(0, 3);
  }
}
