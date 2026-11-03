/**
 * Onboarding module for Replication Checker
 * Displays a multi-screen welcome guide for first-time users
 */

import { getString } from "../utils/strings";

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
 *   v3 — Redesigned guide: shared group library settings, scheduled-check
 *        libraries, encrypted Atlas links and the outcome-label caveat.
 */
const ONBOARDING_VERSION = 3;
const ONBOARDING_PREF = "replication-checker.onboardingVersion";

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
    Zotero.debug(`[ReplicationChecker] Onboarding marked complete (version ${ONBOARDING_VERSION})`);
  }

  /**
   * Show the onboarding dialog
   * @param showScanPrompt Whether to show the scan prompt on the last page (for first-time users)
   */
  async showOnboarding(showScanPrompt: boolean = false): Promise<{ completed: boolean; shouldScan?: boolean }> {
    return new Promise((resolve) => {
      const win = Zotero.getMainWindow();
      if (!win) {
        Zotero.debug("[ReplicationChecker] Main window not available for onboarding");
        resolve({ completed: false });
        return;
      }

      this.createDialog(win, showScanPrompt, resolve);
    });
  }

  /**
   * Create the onboarding dialog window
   */
  private createDialog(
    parentWindow: Window,
    showScanPrompt: boolean,
    onComplete: (result: { completed: boolean; shouldScan?: boolean }) => void
  ): void {
    const dialogFeatures = "chrome,centerscreen,modal,resizable=no,titlebar=no,width=920,height=680";

    // Open the dialog using chrome:// URL
    parentWindow.openDialog(
      "chrome://replicationChecker/content/onboarding.xhtml",
      "replication-checker-onboarding",
      dialogFeatures,
      {
        getString,
        rtl: (Zotero as any).rtl,
        showScanPrompt: showScanPrompt,
        onComplete: (result: { completed: boolean; shouldScan?: boolean }) => {
          // Recorded whether the user finished or skipped: the pref tracks that
          // this version's onboarding has been *presented*, and skipping is a
          // decision about it. Marking only on completion would re-open the
          // dialog on every startup for anyone who dismissed it.
          this.markOnboardingComplete();
          onComplete(result);
        },
      }
    );
  }
}

// Export singleton instance
export const onboardingManager = new OnboardingManager();
