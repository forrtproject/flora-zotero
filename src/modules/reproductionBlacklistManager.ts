/**
 * Reproduction Blacklist Manager
 * Manages banned reproduction items that should not be re-added during checks.
 *
 * Extends BaseBlacklistManager with URL-first deduplication (reproductions
 * often lack DOIs) and URL-only removal.
 */

import type {
  ReproductionBlacklistEntry,
  ReproductionBlacklistData,
} from "../types/replication";
import { BaseBlacklistManager } from "./baseBlacklistManager";

const REPRODUCTION_BLACKLIST_PREF = "replication-checker.reproductionBlacklist";

class ReproductionBlacklistManager extends BaseBlacklistManager<ReproductionBlacklistEntry> {
  constructor() {
    super(REPRODUCTION_BLACKLIST_PREF, 1, "ReproductionBlacklistManager");
  }

  async addToBlacklist(entry: ReproductionBlacklistEntry): Promise<void> {
    if (!this.initialized) {
      throw new Error("ReproductionBlacklistManager not initialized");
    }

    // URL is the primary identifier for reproductions (many lack DOIs)
    const normalizedUrl = this.normalizeUrl(entry.url);
    const normalizedDoi = this.normalizeDOI(entry.doi);

    if (!normalizedUrl && !normalizedDoi) {
      Zotero.debug(
        `ReproductionBlacklistManager: Cannot blacklist entry - no URL or DOI: ${entry.title}`,
      );
      return;
    }

    if (normalizedUrl && this.urlIndex.has(normalizedUrl)) {
      Zotero.debug(
        `ReproductionBlacklistManager: URL already blacklisted: ${normalizedUrl}`,
      );
      return;
    }
    if (normalizedDoi && this.doiIndex.has(normalizedDoi)) {
      Zotero.debug(
        `ReproductionBlacklistManager: DOI already blacklisted: ${normalizedDoi}`,
      );
      return;
    }

    this.data.entries.push(entry);
    if (normalizedUrl) this.urlIndex.add(normalizedUrl);
    if (normalizedDoi) this.doiIndex.add(normalizedDoi);

    await this.saveBlacklist();
    Zotero.debug(
      `ReproductionBlacklistManager: Added to blacklist: ${entry.title} (${normalizedUrl || normalizedDoi})`,
    );
  }

  /** Check if a reproduction is blacklisted by URL (primary) or DOI (fallback). */
  isBlacklisted(
    url: string | null | undefined,
    doi?: string | null | undefined,
  ): boolean {
    if (!this.initialized) {
      Zotero.debug(
        "ReproductionBlacklistManager: isBlacklisted called before initialization, returning false",
      );
      return false;
    }

    const normalizedUrl = this.normalizeUrl(url);
    if (normalizedUrl && this.urlIndex.has(normalizedUrl)) return true;

    const normalizedDoi = this.normalizeDOI(doi);
    if (normalizedDoi && this.doiIndex.has(normalizedDoi)) return true;

    return false;
  }

  /** Remove by URL only (the canonical identifier for reproductions). */
  async removeFromBlacklist(url: string): Promise<void> {
    if (!this.initialized) {
      throw new Error("ReproductionBlacklistManager not initialized");
    }

    const normalizedUrl = this.normalizeUrl(url);
    if (!normalizedUrl) {
      Zotero.debug(
        `ReproductionBlacklistManager: Cannot remove - invalid URL: ${url}`,
      );
      return;
    }

    const initialLength = this.data.entries.length;
    this.data.entries = this.data.entries.filter((entry) => {
      return this.normalizeUrl(entry.url) !== normalizedUrl;
    });

    if (this.data.entries.length === initialLength) {
      Zotero.debug(
        `ReproductionBlacklistManager: URL not found in blacklist: ${normalizedUrl}`,
      );
      return;
    }

    this.rebuildIndex();
    await this.saveBlacklist();
    Zotero.debug(
      `ReproductionBlacklistManager: Removed from blacklist: ${normalizedUrl}`,
    );
  }

  getEntriesWithMetadata(): Array<{
    reproductionTitle: string;
    originalTitle: string;
    url: string;
    doi: string;
    dateAdded: string;
  }> {
    if (!this.initialized) return [];

    return this.data.entries.map((entry) => ({
      reproductionTitle: entry.title,
      originalTitle: entry.originalTitle,
      url: entry.url,
      doi: entry.doi,
      dateAdded: entry.dateAdded,
    }));
  }
}

// Export singleton instance
export const reproductionBlacklistManager = new ReproductionBlacklistManager();
export { ReproductionBlacklistManager };
// Re-export data types consumed by other modules
export type { ReproductionBlacklistData, ReproductionBlacklistEntry };
