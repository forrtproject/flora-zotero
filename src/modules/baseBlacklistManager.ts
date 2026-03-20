/**
 * BaseBlacklistManager<TEntry>
 * Abstract base class providing the shared storage, serialisation, and
 * index logic used by both BlacklistManager and ReproductionBlacklistManager.
 *
 * Shared behaviour (~180 lines):
 *   init · rebuildIndex · normalizeDOI · normalizeUrl
 *   saveBlacklist · getEntries · clearBlacklist · getCount
 *
 * Subclass responsibilities:
 *   addToBlacklist   – identifier strategy (DOI-first vs URL-first)
 *   isBlacklisted    – argument order and fallback logic
 *   removeFromBlacklist – single vs dual identifier removal
 *   getEntriesWithMetadata – UI-facing shape differs between managers
 *   migrateEntries   – optional: in-place migration after loading
 */

import { normalizeDoi } from "../utils/doi";

/** Minimum shape required for an entry to be indexed by the base class. */
export interface BlacklistEntryBase {
  doi?: string | null;
  url?: string | null;
}

export abstract class BaseBlacklistManager<
  TEntry extends BlacklistEntryBase,
> {
  protected data: { version: number; entries: TEntry[] };
  protected doiIndex = new Set<string>();
  protected urlIndex = new Set<string>();
  protected initialized = false;

  constructor(
    protected readonly prefKey: string,
    protected readonly schemaVersion: number,
    protected readonly debugTag: string,
  ) {
    this.data = { version: schemaVersion, entries: [] };
  }

  /** Override to perform in-place migration of loaded entries before indexing. */
  protected migrateEntries(_entries: TEntry[]): void {}

  async init(): Promise<void> {
    if (this.initialized) {
      Zotero.debug(`${this.debugTag}: Already initialized`);
      return;
    }

    try {
      const prefValue = Zotero.Prefs.get(this.prefKey);

      if (!prefValue || typeof prefValue !== "string" || prefValue === "") {
        Zotero.debug(`${this.debugTag}: No existing blacklist, initializing empty`);
        this.data = { version: this.schemaVersion, entries: [] };
        this.initialized = true;
        return;
      }

      this.data = JSON.parse(prefValue as string);

      if (!this.data.entries || !Array.isArray(this.data.entries)) {
        throw new Error("Invalid blacklist structure: entries is not an array");
      }
      if (typeof this.data.version !== "number") {
        throw new Error("Invalid blacklist structure: version is not a number");
      }

      this.migrateEntries(this.data.entries);
      Zotero.debug(
        `${this.debugTag}: Loaded ${this.data.entries.length} blacklisted entries`,
      );
    } catch (error) {
      Zotero.logError(
        new Error(
          `${this.debugTag}: Blacklist corrupted, resetting: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ),
      );
      this.data = { version: this.schemaVersion, entries: [] };
      await this.saveBlacklist();
    }

    this.rebuildIndex();
    this.initialized = true;
  }

  protected rebuildIndex(): void {
    this.doiIndex.clear();
    this.urlIndex.clear();
    for (const entry of this.data.entries) {
      const nd = this.normalizeDOI(entry.doi);
      if (nd) this.doiIndex.add(nd);
      const nu = this.normalizeUrl(entry.url);
      if (nu) this.urlIndex.add(nu);
    }
    Zotero.debug(
      `${this.debugTag}: Index rebuilt with ${this.doiIndex.size} DOIs and ${this.urlIndex.size} URLs`,
    );
  }

  protected normalizeDOI(doi: string | null | undefined): string | null {
    return normalizeDoi(doi);
  }

  protected normalizeUrl(url: string | null | undefined): string | null {
    if (!url) return null;
    const n = String(url).trim().toLowerCase().replace(/\/+$/, "");
    return n || null;
  }

  protected async saveBlacklist(): Promise<void> {
    try {
      Zotero.Prefs.set(this.prefKey, JSON.stringify(this.data));
      Zotero.debug(
        `${this.debugTag}: Saved ${this.data.entries.length} entries to preferences`,
      );
    } catch (error) {
      Zotero.logError(
        new Error(
          `${this.debugTag}: Failed to save blacklist: ${
            error instanceof Error ? error.message : String(error)
          }`,
        ),
      );
      throw error;
    }
  }

  getEntries(): TEntry[] {
    if (!this.initialized) {
      Zotero.debug(`${this.debugTag}: getEntries called before initialization`);
      return [];
    }
    return [...this.data.entries];
  }

  async clearBlacklist(): Promise<void> {
    if (!this.initialized) {
      throw new Error(`${this.debugTag} not initialized`);
    }
    const count = this.data.entries.length;
    this.data.entries = [];
    this.doiIndex.clear();
    this.urlIndex.clear();
    await this.saveBlacklist();
    Zotero.debug(`${this.debugTag}: Cleared ${count} entries from blacklist`);
  }

  getCount(): number {
    return this.data.entries.length;
  }

  // ── Subclass contract ──────────────────────────────────────────────────────
  // These differ enough between managers that subclasses own the full impl.

  abstract addToBlacklist(entry: TEntry): Promise<void>;
  abstract isBlacklisted(
    primary: string | null | undefined,
    secondary?: string | null | undefined,
  ): boolean;
  abstract removeFromBlacklist(identifier: string): Promise<void>;
  abstract getEntriesWithMetadata(): unknown[];
}
