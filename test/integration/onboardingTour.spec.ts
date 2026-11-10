import { assert } from "chai";
import { getPlugin } from "../fixtures/helpers";

/**
 * The tour's spotlights only open in a visible, focused window, which a test
 * run does not have, so these check what the tour relies on instead: the
 * example item, and that every element it points at exists.
 */
describe("Onboarding tour", function () {
  this.timeout(30000);

  async function exampleIDs(): Promise<number[]> {
    const search = new Zotero.Search({
      libraryID: Zotero.Libraries.userLibraryID,
    });
    search.addCondition("tag", "is", "FLoRA tour example");
    return search.search();
  }

  it("selects an example paper with a note, and erases it afterwards", async function () {
    const manager = getPlugin().onboardingManager;
    const win = Zotero.getMainWindow()!;

    await manager.selectExample(win);
    const [selected] = (win as any).ZoteroPane.getSelectedItems();
    assert.include(selected.getField("title"), "FLoRA tour example");
    const [noteID] = selected.getNotes();
    assert.include(
      Zotero.Items.get(noteID).getNote(),
      "10.1177/0956797614553946",
    );
    // Tagged as a replication, so Add Original and Ban Replication show in its menu.
    assert.include(
      selected.getTags().map((t: any) => t.tag),
      "Is Replication",
    );
    assert.lengthOf(await exampleIDs(), 2, "item and its note");

    await manager.removeExamples();
    assert.lengthOf(await exampleIDs(), 0);
  });

  it("points at menu items that exist", function () {
    const doc = Zotero.getMainWindow()!.document;
    for (const id of [
      "menu_ToolsPopup",
      "zotero-itemmenu",
      "zotero-items-tree",
      "zotero-item-pane",
      "replication-checker-tools-menu",
      "replication-checker-item-menu",
    ]) {
      assert.ok(doc.getElementById(id), id);
    }
    // Step 4 scrolls the item pane to the note before lighting it.
    assert.isFunction(
      (doc.querySelector("item-details") as any)?.scrollToPane,
      "item-details.scrollToPane",
    );
  });

  it("opens the Tools and right-click menus from anchors that stay visible", function () {
    const manager = getPlugin().onboardingManager;
    const win = Zotero.getMainWindow()!;
    const [tools, context] = manager.mainSteps(win);
    for (const [step, count] of [
      [tools, 1],
      [context, 3],
    ]) {
      assert.ok(win.document.getElementById(step.menu.popupID), step.title);
      assert.ok(step.menu.anchor(), step.title);
      assert.lengthOf(step.menu.itemIDs, count, step.title);
      for (const id of step.menu.itemIDs)
        assert.ok(win.document.getElementById(id), id);
    }
  });

  it("clears everything it draws", function () {
    const manager = getPlugin().onboardingManager;
    const doc = Zotero.getMainWindow()!.document;
    manager.spotlight(doc, [[doc.getElementById("zotero-items-tree")]]);
    assert.isAbove(doc.querySelectorAll(".flora-tour-layer").length, 1);
    manager.clearLayers(doc);
    assert.lengthOf(doc.querySelectorAll(".flora-tour-layer"), 0);
  });

  it("finds each Settings section", async function () {
    const manager = getPlugin().onboardingManager;
    const prefsWin = await manager.openSettings();
    assert.ok(prefsWin, "Settings opened on the plugin pane");
    try {
      const steps = manager.settingsSteps(prefsWin.document);
      assert.lengthOf(steps, 5);
      for (const step of steps) assert.ok(step.element(), step.title);
      // Each Settings spotlight lights one area, heading included.
      assert.deepEqual(
        steps.map((step: any) => step.spots().length),
        [1, 1, 1, 1, 1],
      );
      for (const step of steps)
        for (const group of step.spots())
          for (const el of group) assert.ok(el, step.title);
    } finally {
      prefsWin.close();
    }
  });
});
