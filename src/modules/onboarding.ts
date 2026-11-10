/**
 * Onboarding tour for Replication Checker.
 *
 * Seven steps: a welcome screen, three spotlights on the main window (Tools
 * menu, item context menu, a paper with a match), a "worth knowing" screen,
 * spotlights on the plugin's Settings pane, and a finish screen. The screens
 * are onboarding.xhtml; the spotlights use the toolkit's guide, the same one
 * Better Notes uses.
 */

import { getString } from "../utils/strings";
import {
  TAG_HAS_BEEN_REPLICATED,
  TAG_IS_REPLICATION,
  TAG_REPLICATION_FAILURE,
  TAG_REPLICATION_MIXED,
  getTag,
} from "../utils/tags";
import { replicationChecker } from "./replicationChecker";

/**
 * ONBOARDING VERSION HISTORY
 * ─────────────────────────────────────────────────────────────────────────────
 * The onboarding is shown when the user's stored version is less than
 * ONBOARDING_VERSION. This means:
 *
 *   • First install: pref doesn't exist → onboarding shown automatically.
 *   • Regular updates: pref equals current version → onboarding NOT shown.
 *   • Major release: bump ONBOARDING_VERSION → onboarding shown once for all
 *     existing users, then suppressed again until the next bump.
 *
 * HOW TO TRIGGER ONBOARDING FOR A MAJOR RELEASE:
 *   1. Increment ONBOARDING_VERSION below (e.g. 1 → 2).
 *   2. Update the onboarding screen content in the locale .ftl files to
 *      highlight what is new in this release.
 *   3. Add an entry to the version history below so it is self-documenting.
 *
 * VERSION HISTORY:
 *   v1 — Initial release: basic replication checking, tagging, notes.
 *   v2 — Collections nested under one "FLoRA" container (existing libraries are
 *        migrated on first start); new "Your FLoRA Stats" screen covering the
 *        per-library stats pane, the library picker and the Replication Atlas.
 *   v3 — Guided tour on the real Zotero windows: menus, a matched paper and
 *        each Settings section, plus shared group libraries and the
 *        outcome-label caveat.
 */
const ONBOARDING_VERSION = 3;
const ONBOARDING_PREF = "replication-checker.onboardingVersion";

/** Marks the temporary example item, in every language, so it can always be found and erased. */
const EXAMPLE_TAG = "FLoRA tour example";
const TOTAL_STEPS = 7;

type DialogAction = "next" | "prev" | "skip" | "later" | "scan";
type Nav = "next" | "prev" | "stop";
type Result = { completed: boolean; shouldScan?: boolean };
type GuideStep = Parameters<InstanceType<typeof ztoolkit.Guide>["addStep"]>[0];
/** A spotlight: the toolkit step plus what to light up, or a menu to open. */
type Spot = GuideStep & { spots?: () => Element[][]; menu?: MenuSpot };
/** A real menu opened at `anchor`, which stays visible when the menu closes. */
type MenuSpot = {
  popupID: string;
  itemIDs: string[];
  anchor: () => Element;
  open: (popup: Element, anchor: Element) => void;
};

const ACCENT = "#853953";
/** Class on everything the tour draws, so it can all be cleared at once. */
const LAYER = "flora-tour-layer";

export class OnboardingManager {
  /**
   * Check if onboarding should be shown
   */
  shouldShowOnboarding(): boolean {
    try {
      const lastVersion = Zotero.Prefs.get(ONBOARDING_PREF);
      return !lastVersion || (lastVersion as number) < ONBOARDING_VERSION;
    } catch (e) {
      return true; // Show if preference doesn't exist
    }
  }

  /**
   * Mark onboarding as complete
   */
  markOnboardingComplete(): void {
    Zotero.Prefs.set(ONBOARDING_PREF, ONBOARDING_VERSION);
    Zotero.debug(
      `[ReplicationChecker] Onboarding marked complete (version ${ONBOARDING_VERSION})`,
    );
  }

  /**
   * Run the tour.
   * @param showScanPrompt Whether the last step offers a library scan (first install)
   */
  async showOnboarding(showScanPrompt: boolean = false): Promise<Result> {
    const win = Zotero.getMainWindow();
    if (!win) {
      Zotero.debug(
        "[ReplicationChecker] Main window not available for onboarding",
      );
      return { completed: false };
    }

    let exampleCreated = false;
    let prefsWin: Window | null = null;
    let stage = 0;
    let fromEnd = false;
    let result: Result = { completed: false };

    try {
      while (stage < 5) {
        let nav: Nav;
        if (stage === 0) {
          const action = await this.showScreen(
            win,
            "welcome",
            1,
            showScanPrompt,
          );
          // "Remind me later" leaves the pref alone, so the tour opens again next start.
          if (action === "later") return { completed: false };
          nav = action === "next" ? "next" : "stop";
        } else if (stage === 1) {
          if (!exampleCreated) {
            await this.selectExample(win);
            exampleCreated = true;
          }
          nav = await this.runGuide(
            win.document,
            this.mainSteps(win),
            2,
            fromEnd,
          );
        } else if (stage === 2) {
          const action = await this.showScreen(win, "know", 5, showScanPrompt);
          nav =
            action === "next" ? "next" : action === "prev" ? "prev" : "stop";
        } else if (stage === 3) {
          if (!prefsWin || prefsWin.closed)
            prefsWin = await this.openSettings();
          nav = prefsWin
            ? await this.runGuide(
                prefsWin.document,
                this.settingsSteps(prefsWin.document),
                6,
                fromEnd,
              )
            : "next";
        } else {
          const action = await this.showScreen(
            win,
            "finish",
            7,
            showScanPrompt,
          );
          result = { completed: true, shouldScan: action === "scan" };
          break;
        }

        if (nav === "stop") break;
        fromEnd = nav === "prev";
        stage = Math.max(0, stage + (nav === "next" ? 1 : -1));
      }
    } catch (error) {
      Zotero.logError(error as Error);
    } finally {
      this.clearLayers(win.document);
      if (prefsWin && !prefsWin.closed) this.clearLayers(prefsWin.document);
      if (exampleCreated) await this.removeExamples();
    }

    // Recorded whether the user finished or skipped: skipping is a decision
    // about this version's tour, and must not reopen it on every start.
    this.markOnboardingComplete();
    return result;
  }

  /** Erase the example item, including one left by a tour Zotero quit during. */
  async removeExamples(): Promise<void> {
    try {
      const search = new Zotero.Search({
        libraryID: Zotero.Libraries.userLibraryID,
      });
      search.addCondition("tag", "is", EXAMPLE_TAG);
      const ids = await search.search();
      if (ids.length) await Zotero.Items.erase(ids);
    } catch (error) {
      Zotero.logError(error as Error);
    }
  }

  private showScreen(
    win: Window,
    screen: "welcome" | "know" | "finish",
    step: number,
    offerScan: boolean,
  ): Promise<DialogAction> {
    this.clearLayers(win.document);
    return new Promise((resolve) => {
      win.openDialog(
        "chrome://replicationChecker/content/onboarding.xhtml",
        "replication-checker-onboarding",
        "chrome,centerscreen,modal,resizable=no,titlebar=no,width=920,height=680",
        {
          getString,
          rtl: (Zotero as any).rtl,
          screen,
          step,
          total: TOTAL_STEPS,
          offerScan,
          onComplete: resolve,
        },
      );
    });
  }

  /**
   * Show spotlights one at a time. Each is its own one-step guide, so Back and
   * Next are decided here: the toolkit's own stepping moves on by itself when a
   * callout closes for another reason, such as a menu closing.
   */
  private async runGuide(
    doc: Document,
    steps: Spot[],
    stepNumber: number,
    fromEnd: boolean,
  ): Promise<Nav> {
    let index = fromEnd ? steps.length - 1 : 0;
    let reshown = 0;
    // The step whose menu the user already closed: a reshow then skips the menu.
    let menuClosedFor = -1;
    for (;;) {
      const { spots, menu, ...guideStep } = steps[index];
      this.clearLayers(doc);
      const stepIndex = index;
      const showMenu = !!menu && menuClosedFor !== index;
      if (menu) guideStep.element = menu.anchor;
      let clicked: Nav | null = null;
      let panel: any = null;
      await new ztoolkit.Guide()
        .addStep({
          position: "end_before",
          showProgress: true,
          // The Settings spotlights are one step of the tour with sub-steps.
          progressText:
            stepNumber === 6
              ? `${stepNumber}/${TOTAL_STEPS} · ${index + 1}/${steps.length}`
              : `${stepNumber + index}/${TOTAL_STEPS}`,
          showButtons: ["prev", "next", "close"],
          prevBtnText: getString("onboarding-btn-back"),
          nextBtnText: getString("onboarding-btn-next"),
          closeBtnText: getString("onboarding-btn-skip"),
          ...guideStep,
          onMask: () => {
            if (showMenu) {
              this.spotlight(doc, []);
              this.openMenu(
                doc,
                menu!,
                () => panel,
                () => {
                  menuClosedFor = stepIndex;
                },
              );
              return;
            }
            this.spotlight(
              doc,
              menu ? [[menu.anchor()]] : (spots?.() ?? []),
              () => {
                // Keep the callout next to what it points at while the page scrolls.
                const anchor =
                  typeof guideStep.element === "function"
                    ? guideStep.element()
                    : guideStep.element;
                if (panel && anchor && typeof anchor !== "string")
                  panel.moveToAnchor(
                    anchor,
                    guideStep.position ?? "end_before",
                  );
              },
            );
          },
          onRender: ({ state }) => {
            panel = state.controller.panel;
            this.styleCallout(panel!);
          },
          onPrevClick: ({ state }) => {
            clicked = "prev";
            state.controller.abort();
          },
          onNextClick: () => {
            clicked = "next";
          },
          onCloseClick: () => {
            clicked = "stop";
          },
        })
        .show(doc);
      // The toolkit only cleans up between steps of one guide, so clear here.
      this.clearLayers(doc);

      if (clicked === null) {
        // Closed without a button (by something else): show it again, but not forever.
        if (++reshown > 2) return "stop";
        continue;
      }
      reshown = 0;
      menuClosedFor = -1;
      if (clicked === "stop") return "stop";
      index += clicked === "next" ? 1 : -1;
      if (index < 0) return "prev";
      if (index >= steps.length) return "next";
    }
  }

  /**
   * Dim the window except the given groups, each in a rounded hole with a ring.
   * Holes and rings move with the page when it scrolls, and `follow` runs too,
   * so the callout can move with them.
   */
  private spotlight(
    doc: Document,
    groups: Element[][],
    follow?: () => void,
  ): void {
    const HTML = "http://www.w3.org/1999/xhtml";
    const SVG = "http://www.w3.org/2000/svg";
    const pad = 6;
    const rect = (attrs: Record<string, string | number>) => {
      const r = doc.createElementNS(SVG, "rect");
      for (const [k, v] of Object.entries(attrs)) r.setAttribute(k, String(v));
      return r;
    };
    const svg = doc.createElementNS(SVG, "svg");
    svg.setAttribute(
      "style",
      "position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;pointer-events:none",
    );
    svg.classList.add(LAYER);
    const mask = doc.createElementNS(SVG, "mask");
    mask.id = `flora-tour-mask-${Date.now()}`;
    mask.append(rect({ width: "100%", height: "100%", fill: "white" }));

    const lit = groups.map((group) => {
      const hole = rect({ rx: 8, fill: "black" });
      const ring = doc.createElementNS(HTML, "div") as HTMLElement;
      ring.classList.add(LAYER);
      mask.append(hole);
      return { group, hole, ring };
    });

    const place = () => {
      for (const { group, hole, ring } of lit) {
        const boxes = group
          .map((el) => el.getBoundingClientRect())
          .filter((b) => b.width && b.height);
        if (!boxes.length) continue;
        const left = Math.min(...boxes.map((b) => b.left)) - pad;
        const top = Math.min(...boxes.map((b) => b.top)) - pad;
        const width = Math.max(...boxes.map((b) => b.right)) + pad - left;
        const height = Math.max(...boxes.map((b) => b.bottom)) + pad - top;
        for (const [k, v] of Object.entries({
          x: left,
          y: top,
          width,
          height,
        })) {
          hole.setAttribute(k, String(v));
        }
        ring.setAttribute(
          "style",
          `position:fixed;left:${left}px;top:${top}px;width:${width}px;height:${height}px;` +
            `box-sizing:border-box;border:2px solid ${ACCENT};border-radius:8px;` +
            "box-shadow:0 0 0 4px rgba(133,57,83,0.35);z-index:10000;pointer-events:none",
        );
      }
      follow?.();
    };

    svg.append(
      mask,
      rect({
        width: "100%",
        height: "100%",
        fill: "rgba(20,10,15,0.6)",
        mask: `url(#${mask.id})`,
      }),
    );
    doc.documentElement!.append(svg, ...lit.map(({ ring }) => ring));
    place();

    const win = doc.defaultView!;
    doc.addEventListener("scroll", place, true);
    win.addEventListener("resize", place);
    this.onClear(doc, () => {
      doc.removeEventListener("scroll", place, true);
      win.removeEventListener("resize", place);
    });
  }

  private clearHooks = new WeakMap<Document, (() => void)[]>();

  private onClear(doc: Document, hook: () => void): void {
    this.clearHooks.set(doc, [...(this.clearHooks.get(doc) ?? []), hook]);
  }

  private clearLayers(doc: Document | undefined): void {
    if (!doc) return;
    doc.querySelectorAll(`.${LAYER}`).forEach((el: Element) => el.remove());
    this.clearHooks.get(doc)?.forEach((hook) => hook());
    this.clearHooks.delete(doc);
  }

  /**
   * Open a real menu with our entries outlined and the rest faded, and move the
   * callout beside it. While a menu is open the first click elsewhere only
   * closes it, so leaving this step takes two clicks.
   */
  private openMenu(
    doc: Document,
    menu: MenuSpot,
    panel: () => any,
    onClosed: () => void,
  ): void {
    const popup = doc.getElementById(menu.popupID)! as any;
    const styled: HTMLElement[] = [];
    const restore = () => {
      for (const child of styled) {
        for (const prop of [
          "opacity",
          "outline",
          "outline-offset",
          "border-radius",
        ]) {
          child.style.removeProperty(prop);
        }
      }
    };
    const shown = () => {
      for (const child of Array.from(popup.children) as HTMLElement[]) {
        if (menu.itemIDs.includes(child.id)) {
          child.style.outline = `2px solid ${ACCENT}`;
          child.style.outlineOffset = "-2px";
          child.style.borderRadius = "4px";
        } else {
          child.style.opacity = "0.3";
        }
        styled.push(child);
      }
      // Beside the menu, level with our entry, instead of on top of it.
      doc.defaultView!.setTimeout(() => {
        const box = popup.getOuterScreenRect?.();
        const item = doc.getElementById(menu.itemIDs[0]) as any;
        if (box && panel())
          panel().moveTo(box.right + 12, item?.screenY ?? box.top);
      }, 50);
    };
    const hidden = () => {
      restore();
      onClosed();
    };
    popup.addEventListener("popupshown", shown, { once: true });
    popup.addEventListener("popuphidden", hidden, { once: true });
    menu.open(popup, menu.anchor());
    this.onClear(doc, () => {
      popup.removeEventListener("popupshown", shown);
      popup.removeEventListener("popuphidden", hidden);
      restore();
      if (popup.state !== "closed") popup.hidePopup();
    });
  }

  /** Burgundy title and Next button, to match the tour's screens. */
  private styleCallout(panel: Element): void {
    const header = panel.querySelector(
      ".guide-panel-header",
    ) as HTMLElement | null;
    if (header) header.style.color = ACCENT;
    const next = panel.querySelector("#next-button") as HTMLElement | null;
    if (next) {
      next.style.cssText =
        `appearance:none;background:${ACCENT};color:#fff;border:1px solid ${ACCENT};` +
        "border-radius:6px;padding:3px 14px;font-weight:600";
    }
  }

  private mainSteps(win: Window): Spot[] {
    const doc = win.document;
    const tree = () => doc.getElementById("zotero-items-tree")!;
    return [
      {
        title: getString("onboarding-tour-tools-title"),
        description: getString("onboarding-tour-tools-body"),
        menu: {
          popupID: "menu_ToolsPopup",
          itemIDs: ["replication-checker-tools-menu"],
          anchor: () => doc.getElementById("menu_ToolsPopup")!.parentElement!,
          open: (popup) => {
            (popup.parentElement as any).open = true;
          },
        },
      },
      {
        title: getString("onboarding-tour-menu-title"),
        description: getString("onboarding-tour-menu-body"),
        position: "after_start",
        menu: {
          popupID: "zotero-itemmenu",
          itemIDs: [
            "replication-checker-item-menu",
            "replication-checker-add-original-menu",
            "replication-checker-ban-menu",
          ],
          anchor: () =>
            doc.querySelector("#zotero-items-tree .row.selected") ?? tree(),
          // Where a right-click on the selected paper opens it.
          open: (popup, anchor) => {
            const box = anchor.getBoundingClientRect();
            (popup as any).openPopupAtScreen(
              (win as any).mozInnerScreenX + box.left + 120,
              (win as any).mozInnerScreenY + box.bottom,
              true,
            );
          },
        },
      },
      {
        element: () => doc.getElementById("zotero-item-pane")!,
        title: getString("onboarding-tour-example-title"),
        description: getString("onboarding-tour-example-body"),
        position: "start_before",
        onBeforeRender: async () => {
          // The note and tags sit below the item's details, out of view.
          (doc.querySelector("item-details") as any)?.scrollToPane?.("notes");
          await Zotero.Promise.delay(400);
        },
        spots: () => {
          const sections = ["notes", "tags"]
            .map((pane) =>
              doc.querySelector(`#zotero-item-pane [data-pane="${pane}"]`),
            )
            .filter((el): el is Element => !!el);
          return sections.length
            ? sections.map((el) => [el])
            : [[doc.getElementById("zotero-item-pane")!]];
        },
      },
    ];
  }

  private settingsSteps(doc: Document): Spot[] {
    const byId = (id: string) => doc.getElementById(id)!;
    const section = (id: string) => byId(id).closest("groupbox")!;
    const step = (
      key: string,
      first: () => Element,
      spots: () => Element[][],
    ): Spot => ({
      element: first,
      title: getString(`onboarding-tour-${key}-title`),
      description: getString(`onboarding-tour-${key}-body`),
      onBeforeRender: async () => {
        first().scrollIntoView({ block: "start" });
        await Zotero.Promise.delay(250);
      },
      spots,
    });
    const from = (firstID: string, lastID: string) => () => [
      [byId(firstID), byId(lastID)],
    ];
    return [
      step(
        "autocheck",
        () => byId("pref-autocheck-title-label"),
        from(
          "pref-autocheck-title-label",
          "pref-autocheck-new-items-hint-label",
        ),
      ),
      step(
        "libraries",
        () => byId("pref-autocheck-libraries-title-label"),
        from(
          "pref-autocheck-libraries-title-label",
          "pref-group-add-hint-label",
        ),
      ),
      step(
        "stats",
        () => section("stat-total"),
        () => [[section("stat-total")]],
      ),
      step(
        "banned",
        () => section("blacklist-table"),
        () => [[section("blacklist-table")]],
      ),
      step(
        "names",
        () => section("collection-names-table"),
        () => [[section("collection-names-table")]],
      ),
    ];
  }

  /** Select the example paper in My Library, so the menu and item pane steps have something to show. */
  private async selectExample(win: Window): Promise<void> {
    const pane = (win as any).ZoteroPane;
    const libraryID = Zotero.Libraries.userLibraryID;
    const itemID = await this.createExample(libraryID);
    await pane.collectionsView.selectLibrary(libraryID);
    await pane.selectItem(itemID);
  }

  /**
   * The welcome screen's paper with a real replication note and every tag a
   * match gets. Also tagged as a replication, so Add Original and Ban
   * Replication show in its menu. No DOI, so a check never touches it.
   */
  private async createExample(libraryID: number): Promise<number> {
    const item = new Zotero.Item("journalArticle");
    item.libraryID = libraryID;
    item.setField(
      "title",
      `${getString("onboarding-example-prefix")}: Power posing: Brief nonverbal displays affect neuroendocrine levels and risk tolerance`,
    );
    item.setField("publicationTitle", "Psychological Science");
    item.setField("date", "2010");
    item.setCreators([
      { firstName: "Dana R.", lastName: "Carney", creatorType: "author" },
      { firstName: "Amy J. C.", lastName: "Cuddy", creatorType: "author" },
      { firstName: "Andy J.", lastName: "Yap", creatorType: "author" },
    ]);
    for (const tag of [
      EXAMPLE_TAG,
      getTag(TAG_HAS_BEEN_REPLICATED),
      getTag(TAG_IS_REPLICATION),
      getTag(TAG_REPLICATION_FAILURE),
      getTag(TAG_REPLICATION_MIXED),
    ])
      item.addTag(tag);
    await item.saveTx();

    const note = new Zotero.Item("note");
    note.libraryID = libraryID;
    note.parentID = item.id;
    note.setNote(replicationChecker.createReplicationNote(EXAMPLE_STUDIES));
    note.addTag(EXAMPLE_TAG);
    await note.saveTx();
    return item.id;
  }

  /** Open Settings on the Replication Checker pane and wait for it to fill in. */
  private async openSettings(): Promise<Window | null> {
    const pane = (Zotero as any).PreferencePanes.pluginPanes.find(
      (p: any) => p.pluginID === "replication-checker@forrt.org",
    );
    if (!pane) return null;
    const prefsWin: Window = (Zotero.Utilities.Internal as any).openPreferences(
      pane.id,
    );
    for (let i = 0; i < 40; i++) {
      await Zotero.Promise.delay(250);
      if (prefsWin.document?.querySelector("#collection-names-table button"))
        return prefsWin;
    }
    return null;
  }
}

/** Three replications of Carney et al. (2010), in the form a FLoRA match has. */
const EXAMPLE_STUDIES = [
  {
    title_r:
      "Assessing the robustness of power posing: No effect on hormones and risk tolerance in a large sample of men and women",
    author_r:
      "Ranehill, E., Dreber, A., Johannesson, M., Leiberg, S., Sul, S., & Weber, R. A.",
    year_r: 2015,
    journal_r: "Psychological Science",
    doi_r: "10.1177/0956797614553946",
    outcome: "mixed",
  },
  {
    title_r:
      "Embodying power: A preregistered replication and extension of the power pose effect",
    author_r: "Garrison, K. E., Tang, D., & Schmeichel, B. J.",
    year_r: 2016,
    journal_r: "Social Psychological and Personality Science",
    doi_r: "10.1177/1948550616652209",
    outcome: "failed",
  },
  {
    title_r:
      "Embodied power, testosterone, and overconfidence as a causal pathway to risk-taking",
    author_r: "Ronay, R., Tybur, J. M., van Huijstee, D., & Morssinkhof, M.",
    year_r: 2017,
    journal_r: "Comprehensive Results in Social Psychology",
    doi_r: "10.1080/23743603.2016.1248081",
    outcome: "failed",
  },
];

// Export singleton instance
export const onboardingManager = new OnboardingManager();
