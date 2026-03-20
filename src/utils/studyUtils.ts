/**
 * Shared utility functions for multiple-originals handling.
 * Used by both ReplicationChecker and ReproductionHandler to eliminate
 * copy-paste. The only caller-visible differences are:
 *   - studyField ('replications' | 'reproductions') for outcome lookup
 *   - studyLabel ('Replication' | 'Reproduction') in the note HTML
 *   - debugTag ('[ReplicationChecker]' | '[ReproductionHandler]') for logs
 */

import type { RelatedStudy, DOICheckResult } from "../types/replication";
import type { BatchMatcher } from "../modules/batchMatcher";
import * as ZoteroIntegration from "./zoteroIntegration";
import { getString } from "./strings";

/** Escape HTML special characters. Accepts any value and coerces to string. */
export function escapeHtml(text: any): string {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Format an authors array (JSON-parsed FLoRA `author_r` / `author_rep`) into
 * a display string like "Smith, J. & Jones, A.".
 *
 * @param authors - raw value from the API (may already be an array, or a JSON string)
 * @param noAuthorsKey - FTL string key returned when the array is empty
 */
export function parseAuthors(authors: any, noAuthorsKey: string): string {
  if (!authors || !Array.isArray(authors) || authors.length === 0) {
    return getString(noAuthorsKey);
  }
  const authorStrings = authors.map((author: any) => {
    const initial = author.given
      ? author.given
          .split(" ")
          .map((part: string) => part[0] + ".")
          .join(" ")
      : "";
    return `${author.family}, ${initial}`;
  });
  return (
    authorStrings.slice(0, -1).join(", ") +
    (authorStrings.length > 1 ? " & " : "") +
    authorStrings.slice(-1)
  );
}

/**
 * Copy a Zotero item to another library, preserving all fields and creators.
 * Returns the new item's ID.
 */
export async function copyItemToLibrary(
  sourceItemID: number,
  targetLibraryID: number,
  debugTag: string,
): Promise<number> {
  const sourceItem = await Zotero.Items.getAsync(sourceItemID);
  if (!sourceItem) throw new Error(`Source item ${sourceItemID} not found`);

  const newItem = new Zotero.Item(sourceItem.itemType as any);
  (newItem as Zotero.Item & { libraryID: number }).libraryID = targetLibraryID;

  const fields = sourceItem.getUsedFields();
  for (const field of fields) {
    const value = sourceItem.getField(field);
    if (value) newItem.setField(field, value);
  }

  const creators = sourceItem.getCreators();
  if (creators.length > 0) newItem.setCreators(creators);

  const newItemID = (await newItem.save()) as number;
  Zotero.debug(
    `${debugTag} Copied item ${sourceItemID} to library ${targetLibraryID} as ${newItemID}`,
  );
  return newItemID;
}

/**
 * Build a map of study-DOI → originals[] for items that have more than one
 * original article. Queries the API in a single batch call.
 */
export async function buildMultipleOriginalsMap(
  matcher: BatchMatcher,
  dois: string[],
  debugTag: string,
): Promise<Map<string, RelatedStudy[]>> {
  const map = new Map<string, RelatedStudy[]>();
  if (dois.length === 0) return map;
  const validDois = dois.filter((d) => d && d.startsWith("10."));
  if (validDois.length === 0) return map;
  try {
    const results = await matcher.checkBatch(validDois);
    for (const result of results) {
      if (result.originals.length > 1) {
        map.set(result.doi, result.originals);
      }
    }
  } catch (e) {
    Zotero.debug(`${debugTag} buildMultipleOriginalsMap failed: ${e}`);
  }
  return map;
}

/**
 * Enrich a batch of {itemID, originals} entries with per-original outcomes.
 *
 * Checks each original's DOI via the API and reads the outcome from
 * `result[studyField]` — pass `'replications'` for replications,
 * `'reproductions'` for reproductions. All original DOIs are batched
 * into ONE API call so no extra latency is added to the item-creation flow.
 */
export async function enrichOriginalsWithOutcomes(
  matcher: BatchMatcher,
  items: Array<{ itemID: number; originals: RelatedStudy[] }>,
  studyField: "replications" | "reproductions",
  debugTag: string,
): Promise<Array<{ itemID: number; originals: RelatedStudy[] }>> {
  if (items.length === 0) return items;

  // 1. Collect unique original DOIs across all entries
  const uniqueOriginalDois = [
    ...new Set(
      items
        .flatMap(({ originals }) => originals.map((o) => (o.doi || "").trim()))
        .filter((d) => d.startsWith("10.")),
    ),
  ];
  if (uniqueOriginalDois.length === 0) return items;

  // 2. Resolve study DOI for each entry (from the saved Zotero item)
  const repDoisMap = new Map<number, string>();
  for (const { itemID } of items) {
    const repItem = await Zotero.Items.getAsync(itemID);
    if (!repItem) continue;
    const rawDoi = ZoteroIntegration.extractDOI(repItem);
    const normDoi = rawDoi != null ? matcher.normalizeDoi(rawDoi) : null;
    if (normDoi) repDoisMap.set(itemID, normDoi);
  }

  // 3. ONE batch API call for all original DOIs
  let originalResults: DOICheckResult[] = [];
  try {
    originalResults = await matcher.checkBatch(uniqueOriginalDois);
  } catch (e) {
    Zotero.debug(`${debugTag} enrichOriginalsWithOutcomes batch check failed: ${e}`);
    return items;
  }

  // 4. Build lookup: normOrigDoi → { normStudyDoi → outcome }
  const outcomeIndex = new Map<string, Map<string, string>>();
  for (const result of originalResults) {
    const byRep = new Map<string, string>();
    for (const rep of result[studyField]) {
      const normRepDoi = matcher.normalizeDoi(rep.doi || "");
      if (normRepDoi && rep.outcome) byRep.set(normRepDoi, rep.outcome);
    }
    if (byRep.size > 0) outcomeIndex.set(result.doi, byRep);
  }

  // 5. Enrich each entry
  return items.map(({ itemID, originals }) => {
    const normRepDoi = repDoisMap.get(itemID);
    if (!normRepDoi) return { itemID, originals };
    const enrichedOriginals = originals.map((orig) => {
      const normOrigDoi = orig.doi ? matcher.normalizeDoi(orig.doi) : "";
      if (!normOrigDoi) return orig;
      const outcome = outcomeIndex.get(normOrigDoi)?.get(normRepDoi);
      return outcome ? { ...orig, outcome } : orig;
    });
    return { itemID, originals: enrichedOriginals };
  });
}

/**
 * Build HTML for the "Original Articles" note placed on a study item
 * that has multiple original articles.
 *
 * @param studyLabel - "Replication" or "Reproduction" used as the outcome label
 */
export function createOriginalArticlesNoteHtml(
  originals: RelatedStudy[],
  studyLabel: string,
  feedbackUrl: string,
  dataIssuesUrl: string,
): string {
  const warning =
    "*This note is automatically generated. If you edit it, a new note will be created on the next check and this version will be kept as-is.*";
  const feedbackHtml = getString("replication-checker-note-feedback", {
    url: feedbackUrl,
  });
  const dataIssuesHtml = getString("replication-checker-note-data-issues", {
    url: dataIssuesUrl,
  });
  const footer = escapeHtml(getString("replication-checker-note-footer"));

  let html = "<h2>Original Articles</h2>";
  html += `<i>${escapeHtml(warning)}</i><br>`;
  html += "<p>This study has multiple original articles</p>";
  html += "<ul>";
  for (const orig of originals) {
    html += "<li>";
    html += `<strong>${escapeHtml(orig.title || "Unknown Title")}</strong><br>`;
    if (orig.doi && orig.doi.startsWith("10.")) {
      html += `DOI: <a href="https://doi.org/${escapeHtml(orig.doi)}">${escapeHtml(orig.doi)}</a><br>`;
    }
    const outcomeText = orig.outcome
      ? orig.outcome.charAt(0).toUpperCase() + orig.outcome.slice(1)
      : "N/A";
    html += `${escapeHtml(studyLabel)}: <strong>${escapeHtml(outcomeText)}</strong><br>`;
    html += "</li>";
  }
  html += "</ul>";
  html += `
    <hr/>
    <div style="padding:10px; border-radius:5px; margin-top:15px;">
      <p><strong>${feedbackHtml}</strong></p>
      <p><strong>${dataIssuesHtml}</strong></p>
    </div>
  `;
  html += `<p><small>${footer}</small></p>`;
  return html;
}

/**
 * Add an "Original Articles" note to a study item that has multiple originals.
 * Skips creation if the note already exists (keeps user edits as-is).
 *
 * @param noteHtmlCreator - called lazily only when the note needs to be written
 */
export async function addOriginalArticlesNote(
  itemID: number,
  originals: RelatedStudy[],
  noteHtmlCreator: (originals: RelatedStudy[]) => string,
  debugTag: string,
): Promise<void> {
  try {
    const item = await Zotero.Items.getAsync(itemID);
    if (!item) return;
    const HEADING = "<h2>Original Articles</h2>";
    const noteIDs = item.getNotes();
    for (const noteID of noteIDs) {
      const note = await Zotero.Items.getAsync(noteID);
      if (!note) continue;
      if (note.getNote().startsWith(HEADING)) return; // Already exists — keep as-is
    }
    const noteHTML = noteHtmlCreator(originals);
    await ZoteroIntegration.addNote(itemID, noteHTML);
    Zotero.debug(`${debugTag} Created Original Articles note for item ${itemID}`);
  } catch (error) {
    Zotero.logError(
      new Error(
        `Error adding Original Articles note to item ${itemID}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      ),
    );
  }
}
