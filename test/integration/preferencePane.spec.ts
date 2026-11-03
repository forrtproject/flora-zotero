import { assert } from "chai";
import { getPlugin } from "../fixtures/helpers";

describe("Preference pane", function () {
  this.timeout(30000);

  const DOI = "10.1234/pref-pane-test";
  let win: Window | null = null;

  before(async function () {
    await getPlugin().blacklistManager.addToBlacklist({
      itemID: 0,
      doi: DOI,
      title: "Pane Test Replication",
      originalTitle: "Pane Test Original",
      dateAdded: new Date().toISOString(),
      type: "replication" as const,
    });
  });

  after(async function () {
    win?.close();
    await getPlugin().blacklistManager.removeFromBlacklist(DOI);
  });

  it("fills in the banned list and collection names", async function () {
    const pane = (Zotero as any).PreferencePanes.pluginPanes.find(
      (p: any) => p.pluginID === "replication-checker@forrt.org",
    );
    assert.ok(pane, "pane is registered");
    win = (Zotero.Utilities.Internal as any).openPreferences(pane.id);

    // Wait until the pane's script has had a chance to run.
    let doc: Document | undefined;
    for (let i = 0; i < 40; i++) {
      await Zotero.Promise.delay(250);
      doc = win!.document;
      if (doc.querySelector(".blacklist-entry")) break;
    }

    assert.ok(doc!.getElementById("blacklist-list"), "pane loaded");
    assert.ok(doc!.querySelector(".blacklist-entry"), "banned entry is listed");
    const cell = doc!.querySelector(
      "#collection-names-table tr[data-spec] td:last-child",
    );
    assert.ok(
      cell?.querySelector("button"),
      "collection row has a rename button",
    );
  });
});
