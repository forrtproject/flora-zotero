# Changelog

All notable changes to the Zotero Replication Checker are documented here.
Entries are added automatically by the release workflow from `docs/Release.md`.
Versions are listed newest-first.

---

## [v0.1.12] - 2026-03-31
- Fixed **"Ban Replication" context menu appearing on non-replication items**: the menu item is now visible only on items tagged `Is Replication` or `Is Reproduction`, removing the broader `Added by Replication Checker` condition that caused it to show on unrelated items
- Added **FLoRA Stats pane** in Preferences: shows live counts (total library items, originals tracked, articles with/identified as replications, articles with/identified as reproductions); updates automatically whenever items change in Zotero — no manual refresh needed; "Fetch from FLoRA" button posts tracked original DOIs to the FLoRA API and reports how many are known to FLoRA and their total replication/reproduction counts; "Open in FLoRA Annotator →" opens the FLoRA Annotator page for users to see the complete replication report
- **Updated FLoRA Stats tag hints**: the Preferences pane now shows "(Has Been Replicated) (Has Been Reproduced)" next to "Original articles tracked", "(Has Been Replicated)" next to "Articles with replications", and "(Has Been Reproduced)" next to "Articles with reproductions"
- Added **four configurable folder names** in Preferences: separate text fields for the Replications folder, Reproductions folder, Originals folder (linked to replications), and Originals folder (linked to reproductions) — all renamed live in Zotero without data loss
- Added **Select Originals dialog**: when multiple original studies are available for a replication, users are offered a choice dialog to select which originals to add rather than being forced to add all
- Improved **result notifications**: "added X new replication(s)" and "updated Y existing replication(s)" are now reported separately with the destination folder name, providing clearer feedback; same for original study additions
- **Merged "Has Replication" → "Has Been Replicated" and "Has Reproduction" → "Has Been Reproduced" tags**: items tagged by previous versions are still recognised via backward-compatible legacy lookups, so no manual re-tagging is required
- **Dynamic context menu label**: the "Add Original" menu item now reads "Add Original(s)" when the selected item has multiple originals (detected via `Replication: Multiple Originals` or `Reproduction: Multiple Originals` tags)
- **Improved "is replication" dialog flow**: when a single original is found the dialog shows a 2-button prompt ("Add Original" / Cancel); when multiple originals are found it shows a 3-button prompt ("Add All Originals" / "Select which originals to add" / Cancel)
- Added **Download button** and **"About the dataset" section** to Website.md and README.md with definitions of replications and reproductions, inclusion criteria, outcome coding, and the replication vs. reproduction distinction


## [v0.1.11] - 2026-03-21
- Added **Portuguese (Europe) language support** (pt-PT): The plugin is now available in five languages — English, German, Spanish, Portuguese (Brazil), and Portuguese (Europe)
- Fixed **snowballing library bug**: Repeated checks on selected items or collections no longer trigger automatic "add original articles?" prompts, which previously caused a cascading loop where each run would find new originals → replications → more originals, growing the library indefinitely. Originals can still be added explicitly via the right-click "Add Original" menu item; the auto-check for newly added items retains the prompt as a discovery feature
- Fixed **manual collection rename being reverted**: If the user renames the "FLoRA Replications" or "FLoRA Reproductions" collection directly in Zotero, the plugin now keeps their name instead of reverting it back on the next check
- Fixed **legacy collection name not recognised on upgrade**: Collections named "Replication folder" (from older plugin versions) are now correctly identified and migrated instead of creating a duplicate collection
- Added **translated tags**: Tags added to Zotero items (e.g. "Has Replication", "Is Replication", outcome tags) are now displayed in the user's language. Items tagged by older plugin versions (English tags) remain fully recognised for backward compatibility


## [v0.1.10] - 2026-03-15

- Added **Multiple Originals support**: replication/reproduction items with more than one original article now receive a dedicated "Original Articles" note listing each original's title, DOI, and outcome (fetched in a single batch API call after items are created)
- Added **Multiple Originals tags**: `Replication: Multiple Originals` / `Reproduction: Multiple Originals` tags applied instead of outcome tags when an item has more than one original
- Fixed **consecutive folder renames**: changing the Replication or Reproduction folder name multiple times in Preferences now correctly renames the same existing collection each time, instead of creating a new one on every rename
- **Fall back to full library check**: When a library (not a collection) is selected, the plugin now runs checkEntireLibrary() instead of showing a "no collection selected" error

## [v0.1.9] - 2026-03-04

- Added email parameter to API requests for usage tracking

## [v0.1.8] - 2026-03-03

- Added **outcome quote handling**: extended RelatedStudy with `outcome_quote_source`; when the quote source is "abstract", an outcome quote is displayed in the replication UI and stored in the item's Extra field
- Improved localization: minor wording fixes and clarifications in German, Spanish, and Brazilian Portuguese locale files

## [v0.1.7] - 2026-02-22

- Improved **deduplication**: more robust handling of BibTeX-imported items and edge cases in existing-item detection
- Added locales: French (fr), Korean (ko), Chinese Simplified (zh-CN), Arabic (ar)
- Fixed jq errors in GitHub Pages workflow when the latest release has no `update.json` asset

## [v0.1.6] - 2026-02-16

- Renamed project repository to **flora_zotero**
- Added **batch "Add to Library"**: users can add multiple replications in one step from the results dialog
- Added theme-aware icons that adapt to Zotero's light/dark theme
- Improved `update.json` fetching — always pulls from the latest GitHub release

## [v0.1.5] - 2026-02-10

- Added **SHA-512 hash verification** in `update.json` (`update_hash: "sha512:…"`) so Zotero can verify XPI integrity during auto-updates

## [v0.1.4] - 2026-02-10

- Fixed XPI filename in release workflow: use the scaffold-generated filename instead of a hardcoded name, preventing mismatches between the XPI and `update.json`/download links

## [v0.1.3] - 2026-02-10

- Switched data source from **FReD** to **FLoRA** (FORRT Library of Reproduction and Replication Attempts)
- Added **Reproduction support**: detects computational reproductions with dedicated notes and "Has Reproduction" / "Is Reproduction" tags

## [v0.1.2] - 2026-01-27

- Minor stability improvements and build fixes

## [v0.1.1] - 2026-01-27

- Added **"Add Original" feature**: right-click a replication to add its original article to your library
- Added **Ban Replications**: right-click to ban a replication from being re-added; manage the blacklist in Preferences
- Added **Auto-Check Library**: scheduled checks (daily/weekly/monthly) for new replications
- Added **Read-Only Library support**: detects read-only group libraries and copies originals/replications to your Personal library
- Improved onboarding flow

## [v0.1.0] - 2025-12-09

- Initial release of the Zotero Replication Checker
- Privacy-preserving DOI lookup via 3-character MD5 hash prefixes
- Replication detection with "Has Replication" / "Is Replication" tags and child notes
- Bidirectional related-item linking between originals and replications
- Configurable replication folder name in Preferences
- Auto-check for newly added items
- English and German localization
