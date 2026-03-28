/**
 * Shared collection-management utilities.
 *
 * Provides a single, well-tested find / rename / create flow used by
 * ReplicationChecker and ReproductionHandler for every collection type:
 *   - FLoRA Replications
 *   - FLoRA Reproductions
 *   - FLoRA Originals linked to Replications
 *   - FLoRA Originals linked to Reproductions
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CollectionSpec {
  /** Preference key storing the user-chosen folder name. */
  namePrefKey: string;
  /** Preference key storing the JSON map of libraryID → collectionID. */
  idsPrefKey: string;
  /** Default name when no preference is set. */
  defaultName: string;
  /**
   * Old names that may exist in the library and should be migrated (renamed)
   * to `targetName` instead of creating a duplicate.
   * The current `targetName` is always excluded from this list automatically.
   */
  legacyNames: string[];
  /** Prefix for Zotero.debug() messages, e.g. "[ReplicationChecker]". */
  debugTag: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function _getStoredIDs(idsPrefKey: string): Record<string, number> {
  try {
    const json = Zotero.Prefs.get(idsPrefKey) as string;
    if (json) return JSON.parse(json);
  } catch { /* ignore */ }
  return {};
}

function _saveID(idsPrefKey: string, libraryID: number, collectionID: number): void {
  const map = _getStoredIDs(idsPrefKey);
  map[String(libraryID)] = collectionID;
  try { Zotero.Prefs.set(idsPrefKey, JSON.stringify(map)); } catch { /* ignore */ }
}

function _clearStaleID(idsPrefKey: string, libraryID: number): void {
  const map = _getStoredIDs(idsPrefKey);
  delete map[String(libraryID)];
  try { Zotero.Prefs.set(idsPrefKey, JSON.stringify(map)); } catch { /* ignore */ }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read the user-configured folder name from preferences, falling back to the
 * spec's default when the pref is missing or empty.
 */
export function getCollectionFolderName(spec: CollectionSpec): string {
  try {
    const val = Zotero.Prefs.get(spec.namePrefKey);
    if (typeof val === "string" && val.trim().length > 0) return val.trim();
  } catch { /* ignore */ }
  return spec.defaultName;
}

/**
 * Locate an existing collection by trying, in order:
 *   1. Exact name match against `targetName`
 *   2. Stored collection ID (from preferences) — respects user renames in Zotero:
 *      if the collection name differs from the preference the user renamed it
 *      manually, so we update the preference to match rather than reverting.
 *   3. Any of `spec.legacyNames` — renames the found collection to `targetName`
 *
 * @param collections - Result of `Zotero.Collections.getByLibrary(libraryID, true)`
 *   (only active / non-deleted collections; avoids stale in-memory cache objects).
 * @param targetName  - Desired name (typically from `getCollectionFolderName`).
 * @param libraryID   - Library being searched.
 * @param spec        - Configuration for this collection type.
 * @returns The matched collection object, or `null` if nothing was found
 *   (caller should create a new collection in that case).
 */
export async function findOrRenameCollection(
  collections: any[],
  targetName: string,
  libraryID: number,
  spec: CollectionSpec,
): Promise<any | null> {

  // 1. Exact name match (top-level only).
  const exact = collections.find((c: any) => c.name === targetName && !c.parentID);
  if (exact) {
    _saveID(spec.idsPrefKey, libraryID, exact.id);
    return exact;
  }

  // 2. Find by stored collection ID.
  //    We search within `collections` (from getByLibrary) rather than calling
  //    Zotero.Collections.get() directly so we never match stale in-memory
  //    objects that linger after a collection is deleted by sync or another client.
  const storedID = _getStoredIDs(spec.idsPrefKey)[String(libraryID)];
  if (storedID) {
    const byID = collections.find((c: any) => c.id === storedID);
    if (byID) {
      if (byID.name !== targetName) {
        // User manually renamed the collection in Zotero — honour that by updating
        // the preference to match instead of reverting the collection name.
        try { Zotero.Prefs.set(spec.namePrefKey, byID.name); } catch { /* ignore */ }
        Zotero.debug(
          `${spec.debugTag} Collection renamed by user to "${byID.name}"; ` +
          `updated preference (was "${targetName}")`
        );
      }
      _saveID(spec.idsPrefKey, libraryID, byID.id);
      return byID;
    }
    // Stored ID no longer points to a live collection — clear the stale entry.
    Zotero.debug(
      `${spec.debugTag} Stored collection ID ${storedID} not found in ` +
      `library ${libraryID} — clearing stale pref`
    );
    _clearStaleID(spec.idsPrefKey, libraryID);
  }

  // 3. Fall back to legacy / default names (rename instead of creating a duplicate).
  const fallbackNames = spec.legacyNames.filter((n) => n !== targetName);
  for (const legacyName of fallbackNames) {
    const old = collections.find((c: any) => c.name === legacyName && !c.parentID);
    if (old) {
      old.name = targetName;
      await old.saveTx();
      _saveID(spec.idsPrefKey, libraryID, old.id);
      Zotero.debug(
        `${spec.debugTag} Renamed collection "${legacyName}" → "${targetName}" in library ${libraryID}`
      );
      return old;
    }
  }

  return null;
}

/**
 * Convenience wrapper: resolves (or creates) the collection described by `spec`
 * in `libraryID`.  Saves the collection ID to preferences automatically.
 */
export async function getOrCreateCollection(
  libraryID: number,
  spec: CollectionSpec,
): Promise<any> {
  const targetName = getCollectionFolderName(spec);
  const allCollections = Zotero.Collections.getByLibrary(libraryID, true);
  let collection = await findOrRenameCollection(allCollections, targetName, libraryID, spec);
  if (!collection) {
    collection = new Zotero.Collection({ libraryID, name: targetName });
    await collection.saveTx();
    _saveID(spec.idsPrefKey, libraryID, collection.id);
    Zotero.debug(
      `${spec.debugTag} Created new collection "${targetName}" in library ${libraryID}`
    );
  }
  return collection;
}
