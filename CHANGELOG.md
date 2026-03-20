# Changelog

All notable changes to the Zotero Replication Checker are documented here.
Entries are added automatically by the release workflow from `docs/Release.md`.
Versions are listed newest-first.

---

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
