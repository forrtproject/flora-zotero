/**
 * Blacklist Manager
 * Manages banned replication and reproduction items that should not be
 * re-added during checks.
 *
 * Extends BaseBlacklistManager with DOI-first deduplication and dual
 * DOI/URL removal. Also handles migration of pre-v2 entries that lack
 * a `type` field.
 */

import type {
  BlacklistEntry,
  BlacklistData,
  BlacklistEntryType,
} from "../types/replication";
import { BaseBlacklistManager } from "./baseBlacklistManager";

const BLACKLIST_PREF = "replication-checker.blacklist";

class BlacklistManager extends BaseBlacklistManager<BlacklistEntry> {
  constructor() {
    super(BLACKLIST_PREF, 2, "BlacklistManager");
  }

  /** Backfill `type` field missing from pre-v2 entries. */
  protected override migrateEntries(entries: BlacklistEntry[]): void {
    for (const entry of entries) {
      if (!entry.type) {
        entry.type = "replication";
      }
    }
  }

  async addToBlacklist(entry: BlacklistEntry): Promise<void> {
    if (!this.initialized) {
      throw new Error("BlacklistManager not initialized");
    }

    const normalizedDoi = this.normalizeDOI(entry.doi);
    const normalizedUrl = this.normalizeUrl(entry.url);

    if (!normalizedDoi && !normalizedUrl) {
      Zotero.debug(
        `BlacklistManager: Cannot blacklist entry - no DOI or URL: ${entry.title}`,
      );
      return;
    }

    // Check if already blacklisted by DOI or URL
    if (normalizedDoi && this.doiIndex.has(normalizedDoi)) {
      Zotero.debug(
        `BlacklistManager: DOI already blacklisted: ${normalizedDoi}`,
      );
      return;
    }
    if (normalizedUrl && this.urlIndex.has(normalizedUrl)) {
      Zotero.debug(
        `BlacklistManager: URL already blacklisted: ${normalizedUrl}`,
      );
      return;
    }

    if (!entry.type) {
      entry.type = "replication";
    }

    this.data.entries.push(entry);
    if (normalizedDoi) this.doiIndex.add(normalizedDoi);
    if (normalizedUrl) this.urlIndex.add(normalizedUrl);

    await this.saveBlacklist();
    Zotero.debug(
      `BlacklistManager: Added to blacklist: ${entry.title} (${normalizedDoi || normalizedUrl}) [${entry.type}]`,
    );
  }

  /** Check if a DOI or URL is blacklisted. */
  isBlacklisted(
    doi: string | null | undefined,
    url?: string | null | undefined,
  ): boolean {
    if (!this.initialized) {
      Zotero.debug(
        "BlacklistManager: isBlacklisted called before initialization, returning false",
      );
      return false;
    }

    const normalizedDoi = this.normalizeDOI(doi);
    if (normalizedDoi && this.doiIndex.has(normalizedDoi)) return true;

    const normalizedUrl = this.normalizeUrl(url);
    if (normalizedUrl && this.urlIndex.has(normalizedUrl)) return true;

    return false;
  }

  /** Remove by DOI or URL (whichever identifier is provided). */
  async removeFromBlacklist(identifier: string): Promise<void> {
    if (!this.initialized) {
      throw new Error("BlacklistManager not initialized");
    }

    const normalizedDoi = this.normalizeDOI(identifier);
    const normalizedUrl = this.normalizeUrl(identifier);

    const initialLength = this.data.entries.length;
    this.data.entries = this.data.entries.filter((entry) => {
      const entryNormalizedDoi = this.normalizeDOI(entry.doi);
      const entryNormalizedUrl = this.normalizeUrl(entry.url);
      if (normalizedDoi && entryNormalizedDoi === normalizedDoi) return false;
      if (normalizedUrl && entryNormalizedUrl === normalizedUrl) return false;
      return true;
    });

    if (this.data.entries.length === initialLength) {
      Zotero.debug(
        `BlacklistManager: Identifier not found in blacklist: ${identifier}`,
      );
      return;
    }

    this.rebuildIndex();
    await this.saveBlacklist();
    Zotero.debug(`BlacklistManager: Removed from blacklist: ${identifier}`);
  }

  getEntriesWithMetadata(): Array<{
    replicationTitle: string;
    originalTitle: string;
    doi: string;
    url: string;
    type: BlacklistEntryType;
    dateAdded: string;
  }> {
    if (!this.initialized) return [];

    return this.data.entries.map((entry) => ({
      replicationTitle: entry.title,
      originalTitle: entry.originalTitle,
      doi: entry.doi || "",
      url: entry.url || "",
      type: entry.type || "replication",
      dateAdded: entry.dateAdded,
    }));
  }
}

// Export singleton instance
export const blacklistManager = new BlacklistManager();
export { BlacklistManager };
// Re-export data types consumed by the preferences UI and other modules
export type { BlacklistData, BlacklistEntry, BlacklistEntryType };
