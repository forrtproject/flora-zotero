import { config } from "../../package.json";

/** Access the addon instance inside Zotero */
export function getPlugin() {
  return (Zotero as any)[config.addonInstance];
}

/** Access the ReplicationCheckerPlugin instance */
export function getChecker() {
  return (Zotero as any)[config.addonInstance].checker;
}

/** Access the ReproductionHandler instance */
export function getReproductionHandler() {
  return (Zotero as any)[config.addonInstance].reproductionHandler;
}

/** Create a test journal article with a DOI */
export async function createTestItem(
  doi: string,
  title?: string,
): Promise<Zotero.Item> {
  const item = new Zotero.Item("journalArticle");
  (item as any).libraryID = Zotero.Libraries.userLibraryID;
  item.setField("title", title || `Test Item ${doi}`);
  item.setField("DOI", doi);
  await item.saveTx();
  return item;
}

/** Delete items created during tests (call in afterEach) */
export async function cleanupItems(items: Zotero.Item[]): Promise<void> {
  for (const item of items) {
    try {
      const noteIDs = item.getNotes();
      for (const noteID of noteIDs) {
        const note = await Zotero.Items.getAsync(noteID);
        if (note) await note.eraseTx();
      }
      await item.eraseTx();
    } catch {
      /* already deleted */
    }
  }
}

/** Delete a collection and its contents */
export async function cleanupCollection(
  collection: Zotero.Collection,
): Promise<void> {
  try {
    await collection.eraseTx();
  } catch {
    /* already deleted */
  }
}

/** Override Zotero.HTTP.request to return controlled responses */
export function mockHTTP(
  handler: (method: string, url: string, opts: any) => any,
) {
  const original = Zotero.HTTP.request;
  Zotero.HTTP.request = handler as any;
  return () => {
    Zotero.HTTP.request = original;
  };
}
