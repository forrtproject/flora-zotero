# Zotero Replication Checker — Developer Guide

## Installation

### Prerequisites

- Zotero 7 or later ([installation guide](https://www.zotero.org/support/installation))
- Node.js v22.17.0 (or compatible)
- npm 10.9.2+

### Build from Source

```bash
# Install dependencies
npm install

# Build the plugin
npm run build
```

The built XPI is written to `.scaffold/build/zotero-replication-checker.xpi`.

**Install in Zotero:** Tools → Add-ons → ⚙️ → Install Add-on From File, then select the XPI.

---

## Project Structure

```
flora_zotero/
├── addon/                           # Static assets packaged into the XPI
│   ├── bootstrap.js                 # XPI bootstrap entry point (loads index.ts exports)
│   ├── content/
│   │   ├── icons/                   # Extension icons (SVG + PNG)
│   │   └── preferences.xhtml        # Preferences UI: auto-check, folder names, ban tables
│   ├── locale/
│   │   └── en-US/
│   │       └── replication-checker.ftl   # All user-facing strings (Fluent format)
│   ├── manifest.json                # Runtime manifest template
│   └── prefs.js                     # Default preference values
│
├── src/                             # TypeScript source
│   ├── modules/
│   │   ├── replicationChecker.ts    # Main replication logic (library scans, item creation,
│   │   │                            #   collection management, ban, read-only library support)
│   │   ├── reproductionHandler.ts   # Parallel reproduction logic (same structure as above)
│   │   ├── blacklistManager.ts      # Banned replications — extends BaseBlacklistManager,
│   │   │                            #   DOI-first dedup, dual DOI/URL removal
│   │   ├── reproductionBlacklistManager.ts  # Banned reproductions — extends BaseBlacklistManager,
│   │   │                            #   URL-first dedup, URL-only removal
│   │   ├── baseBlacklistManager.ts  # Abstract generic base class for both blacklist managers
│   │   ├── dataSource.ts            # HTTP communication with the FLoRA API
│   │   ├── batchMatcher.ts          # Privacy-preserving DOI matching via MD5 hash prefixes
│   │   └── onboarding.ts            # First-run onboarding tour
│   ├── utils/
│   │   ├── zoteroIntegration.ts     # Zotero API wrappers: DOI extraction, tagging,
│   │   │                            #   note creation, BibTeX parsing
│   │   ├── studyUtils.ts            # Shared utilities for both main modules:
│   │   │                            #   escapeHtml, parseAuthors, copyItemToLibrary,
│   │   │                            #   buildMultipleOriginalsMap, enrichOriginalsWithOutcomes,
│   │   │                            #   createOriginalArticlesNoteHtml, addOriginalArticlesNote
│   │   ├── strings.ts               # getString() Fluent localization helper
│   │   ├── tags.ts                  # All Zotero tag name constants (single source of truth)
│   │   └── doi.ts                   # normalizeDoi() — lowercase + strip URL prefix
│   ├── types/
│   │   └── replication.ts           # TypeScript interfaces: DOICheckResult, RelatedStudy,
│   │                                #   BlacklistEntry, ReproductionBlacklistEntry, etc.
│   ├── addon.ts                     # Addon class (instantiated by index.ts)
│   ├── hooks.ts                     # Lifecycle hooks: onStartup, onMainWindowLoad,
│   │                                #   onShutdown; UI registration (menus, pref pane),
│   │                                #   FTL loading, blacklist UI initialization
│   └── index.ts                     # Entry point — exports hooks to bootstrap.js
│
├── test/
│   ├── fixtures/
│   │   ├── helpers.ts               # Test utilities: getChecker(), getReproductionHandler(),
│   │   │                            #   createTestItem(), cleanupItems(), mockHTTP()
│   │   ├── apiResponses.ts          # Canned API response fixtures and mock HTTP handlers
│   │   └── bibtexSamples.ts         # BibTeX string samples for parser tests
│   ├── unit/                        # Node.js unit tests (no Zotero required)
│   │   ├── setup.ts                 # Minimal Zotero global stub + pref reset hooks
│   │   ├── batchMatcher.test.ts     # DOI normalization + BatchMatcher logic
│   │   ├── bibtex.test.ts           # BibTeX parser + Zotero type mapping
│   │   ├── blacklistManager.test.ts # BlacklistManager add/check/remove/clear
│   │   ├── dataSource.test.ts       # APIDataSource HTTP request construction
│   │   └── ftlStrings.test.ts       # FTL file completeness (all keys present + no duplicates)
│   └── integration/                 # In-Zotero integration tests (require running Zotero)
│       ├── setup.spec.ts            # Plugin and matcher initialization
│       ├── apiSmoke.spec.ts         # Live FLoRA API connectivity check
│       ├── itemCreation.spec.ts     # Full replication item creation flow
│       ├── reproductions.spec.ts    # Full reproduction item creation flow
│       ├── collectionManagement.spec.ts  # Collection create/rename/legacy-upgrade
│       ├── cycleDetection.spec.ts   # No-infinite-loop guard for auto-check
│       ├── errorHandling.spec.ts    # Graceful handling of missing items / API failures
│       └── multipleOriginals.spec.ts     # Multiple-originals note and tag logic
│
├── docs/
│   ├── README_dev.md                # This file
│   ├── Release.md                   # Release notes draft (cleared after each release)
│   ├── LOCALIZATION.md              # How to add or update translations
│   └── Website.md                   # Markdown source for the public documentation page
│
├── .github/
│   ├── workflows/
│   │   └── release.yml              # GitHub Actions: build XPI, publish release,
│   │                                #   prepend CHANGELOG.md, reset Release.md
│   └── RELEASE_GUIDE.md             # Step-by-step release checklist
├── CHANGELOG.md                     # Cumulative release history (auto-updated by CI)
├── package.json
├── tsconfig.json
└── zotero-plugin.config.ts          # zotero-plugin-scaffold build/serve/test config
```

---

## What Each Source File Does

### `src/index.ts`

Thin entry point. Exports the `hooks` object so `bootstrap.js` can bind lifecycle events.

### `src/addon.ts`

Singleton `Addon` class that holds shared state (`data.initialized`, references to managers). Instantiated once in `index.ts`.

### `src/hooks.ts`

Registers all Zotero lifecycle callbacks:

- `onStartup` — initializes both blacklist managers, the replication checker, and the reproduction handler; registers the item notifier for auto-check.
- `onMainWindowLoad` — injects Tools menu items and right-click context menus; loads FTL strings.
- `onShutdown` / `onMainWindowUnload` — tears down notifiers and menu entries.
- `initBlacklistUI` — wires the ban-table UI in the Preferences pane.
- `loadFTLStrings` / `parseFTL` — load and parse the `.ftl` locale file at runtime.

### `src/modules/replicationChecker.ts`

The largest file (~2,800 lines). Responsibilities:

- `checkEntireLibrary`, `checkSelectedItems`, `checkSelectedCollection`, `checkNewItems` — the four entry points triggered from the UI.
- `notifyUserAndAddReplications` — deduplicates results, checks blacklist, calls `addReplicationsToFolder`.
- `addReplicationsToFolder` — creates replication Zotero items + notes inside a DB transaction, then adds "Original Articles" notes outside the transaction.
- `handleReadOnlyLibrary` — copies originals and creates replications in the user's Personal library when the source library is read-only.
- `findOrRenameReplicationCollection` — finds or creates the "FLoRA Replications" collection, respects manual renames by updating the stored preference, recognises legacy "Replication folder" name on upgrade.
- `banSelectedReplications` — moves items to trash, adds to blacklist.
- Uses shared utilities from `studyUtils.ts` for HTML generation, author formatting, and item copying.

### `src/modules/reproductionHandler.ts`

Parallel module to `replicationChecker.ts` for reproduction studies (~1,230 lines). Same structural pattern: check flow → add to folder → handle read-only. Delegates to the same `studyUtils.ts` shared utilities, passing `"reproductions"` / `"Reproduction"` parameters where behaviour differs.

### `src/modules/baseBlacklistManager.ts`

Abstract generic base class `BaseBlacklistManager<TEntry>`. Owns:

- Persistent storage via `Zotero.Prefs` (JSON-serialised).
- `urlIndex` and `doiIndex` Sets for O(1) lookup.
- Schema versioning with a `migrateEntries` hook for subclasses.
- Shared methods: `init`, `rebuildIndex`, `normalizeDOI`, `normalizeUrl`, `saveBlacklist`, `getEntries`, `clearBlacklist`, `getCount`.

### `src/modules/blacklistManager.ts`

Thin subclass for replications. DOI-first dedup; dual DOI/URL removal. Backfills `type` field missing from pre-v2 entries via `migrateEntries`.

### `src/modules/reproductionBlacklistManager.ts`

Thin subclass for reproductions. URL-first dedup (reproductions often lack DOIs); URL-only removal.

### `src/modules/dataSource.ts`

`APIDataSource` — all FLoRA API HTTP logic. Sends MD5 hash prefixes, parses JSON responses, maps API fields to `DOICheckResult` / `RelatedStudy` shapes.

### `src/modules/batchMatcher.ts`

`BatchMatcher` — privacy-preserving DOI matching:

1. Normalises DOIs via `normalizeDoi`.
2. Hashes each DOI with MD5, takes the first 5 hex characters as a prefix.
3. Sends batched prefix queries to `dataSource`.
4. Full DOI comparison happens client-side after the server returns candidate matches.

### `src/modules/onboarding.ts`

Displays a one-time tour dialog the first time the plugin is installed.

### `src/utils/zoteroIntegration.ts`

Zotero API wrappers used by both main modules:

- `extractDOI` — reads DOI from item fields.
- `addNote` / `updateNote` — create or replace Zotero notes.
- `parseBibtex` / `bibtexTypeToZoteroType` / `fillMissingFieldsFromBibtex` — BibTeX helpers for item creation.
- `tagItem`, `removeTag` — tag management.

### `src/utils/studyUtils.ts`

Shared utilities extracted to eliminate duplication between `replicationChecker.ts` and `reproductionHandler.ts`:

- `escapeHtml(text)` — HTML-escape any value.
- `parseAuthors(authors, noAuthorsKey)` — format FLoRA author array → "Smith, J. & Jones, A."; falls back to a localized "No authors" string.
- `copyItemToLibrary(sourceItemID, targetLibraryID, debugTag)` — copy a Zotero item across libraries, preserving all fields and creators.
- `buildMultipleOriginalsMap(matcher, dois, debugTag)` — batch-query which study DOIs have more than one original article.
- `enrichOriginalsWithOutcomes(matcher, items, studyField, debugTag)` — enrich originals with per-study outcomes in a single API call.
- `createOriginalArticlesNoteHtml(originals, studyLabel, feedbackUrl, dataIssuesUrl)` — build the "Original Articles" note HTML.
- `addOriginalArticlesNote(itemID, originals, noteHtmlCreator, debugTag)` — idempotently add the note (skips if already present).

### `src/utils/strings.ts`

`getString(key, args?)` — looks up a Fluent string by key, optionally interpolating named arguments.

### `src/utils/tags.ts`

Named constants for every Zotero tag the plugin uses (e.g. `TAG_HAS_REPLICATION`, `TAG_IS_REPRODUCTION`). Import from here — never hardcode tag strings elsewhere.

### `src/utils/doi.ts`

`normalizeDoi(doi)` — lowercase, strip `https://doi.org/` prefix, return `null` for non-DOIs.

### `src/types/replication.ts`

All shared TypeScript interfaces: `DOICheckResult`, `RelatedStudy`, `BlacklistEntry`, `BlacklistEntryBase`, `ReproductionBlacklistEntry`, `ZoteroItemData`, etc.

---

## Building

```bash
npm run build
```

This runs two steps:

1. `zotero-plugin-scaffold` bundles and packs the XPI.
2. `tsc --noEmit` type-checks the source (errors appear as warnings and do **not** block the build, but should always be zero).

**Success indicator:** `✔ Build finished in X.XXs`

**Output:** `.scaffold/build/zotero-replication-checker.xpi`

To type-check without building:

```bash
npx tsc --noEmit
```

---

## Debugging

**Enable Zotero debug output:**

1. Help → Debug Output Logging → Enable
2. Help → Show Debug Output
3. Filter for `[ReplicationChecker]`, `[ReproductionHandler]`, `[BatchMatcher]`, `[APIDataSource]`

**Open Developer Tools:** Tools → Developer Tools (or `Ctrl+Shift+I`)

**Expected debug messages:**

```text
[BatchMatcher] Checking X DOIs...
[APIDataSource] Querying API with X prefixes
[ReplicationChecker] Copied item X to library Y
[ReplicationChecker] Created "FLoRA Replications" collection
[ReproductionHandler] Found X reproductions for DOI ...
```

---

## Testing

The project has two separate test suites that run in different environments.

### Unit Tests (Node.js — no Zotero needed)

```bash
npm run test:unit
# or equivalently:
npm test
```

**How it works:** Mocha runs via `tsx` (TypeScript execution), loading `test/unit/setup.ts` first. That file provides a minimal `Zotero` global stub (debug/logError/Prefs/HTTP). Preferences are reset between every test via a `beforeEach` root hook.

**What is tested:**

| File | What it covers |
| --- | --- |
| `batchMatcher.test.ts` | `normalizeDoi`, MD5 prefix generation, batch result matching, dedup |
| `bibtex.test.ts` | BibTeX parser and Zotero item-type mapping |
| `blacklistManager.test.ts` | `BlacklistManager` add / isBlacklisted / remove / clear / migration |
| `dataSource.test.ts` | `APIDataSource` HTTP request construction and response parsing |
| `ftlStrings.test.ts` | FTL file completeness: all keys referenced in code are present, no duplicates |

**Interpreting results:** All tests should pass. A failing `ftlStrings.test.ts` means a localization key was added in code but not in the `.ftl` file (or vice versa).

### Integration Tests (Requires Running Zotero)

```bash
# Run and close Zotero when done (CI mode):
npm run test:integration

# Run and keep Zotero open for debugging:
npm run test:integration-dev
```

**How it works:** `zotero-plugin-scaffold` launches a real Zotero instance, installs the plugin, and runs the `test/integration/**/*.spec.ts` files inside the Zotero JS environment using Mocha + Chai.

**What is tested:**

| File | What it covers |
| --- | --- |
| `setup.spec.ts` | Plugin initializes; matcher is non-null; Zotero APIs are accessible |
| `apiSmoke.spec.ts` | Live FLoRA API returns results for a known DOI (network required) |
| `itemCreation.spec.ts` | Full replication item creation: tags, notes, related links, collection placement |
| `reproductions.spec.ts` | Full reproduction item creation flow |
| `collectionManagement.spec.ts` | Collection creation, pref-driven rename, manual rename respects user choice, legacy name on upgrade |
| `cycleDetection.spec.ts` | Auto-check does not trigger on items just added by the plugin itself |
| `errorHandling.spec.ts` | Missing items, failed API calls, and empty results are handled gracefully |
| `multipleOriginals.spec.ts` | Items with multiple originals get the correct tag and "Original Articles" note |

**Fixtures:**

- `test/fixtures/helpers.ts` — `getChecker()`, `getReproductionHandler()`, `createTestItem()`, `cleanupItems()`, `cleanupCollection()`, `mockHTTP()`
- `test/fixtures/apiResponses.ts` — Canned API responses and `createMockHTTPHandler()` for offline tests
- `test/fixtures/bibtexSamples.ts` — Sample BibTeX strings

**Tips:**

- Use `this.timeout(30000)` in slow integration tests (default is 2 s).
- `mockHTTP(handler)` intercepts `Zotero.HTTP.request` and returns a canned response; always restore it in `afterEach`.
- Clean up test items and collections in `afterEach` to avoid polluting subsequent tests.

---

## Making a Release

### 1. Write Release Notes in `docs/Release.md`

Edit [docs/Release.md](Release.md) and add one bullet point per notable change. Use markdown. Example:

```markdown
- Fixed **collection rename loop**: manual Zotero renames are now preserved instead of being reverted
- Added **reproduction support** for FLoRA reproduction studies
```

Do **not** add version numbers or dates — the CI workflow adds those automatically.

### 2. Create a GitHub Release

Go to **GitHub → Releases → Draft a new release**:

- Tag: `v0.1.X` (matching `package.json` version)
- Title: `v0.1.X`
- Body: paste the same bullet points from `Release.md`

When you publish the release, the `release.yml` GitHub Action runs automatically and:

1. Builds the XPI.
2. Uploads `zotero-replication-checker.xpi` as a release asset.
3. Prepends a new entry to `CHANGELOG.md` with the version, date, and your bullet points.
4. Clears `docs/Release.md` back to its template state.
5. Commits both files to `main` with `[skip ci]`.

### 3. Bump the Version (for next release)

After releasing, update the version in `package.json` and `addon/manifest.json` to the next planned version.

---

## Architecture Notes

### Privacy-Preserving DOI Matching

The plugin never sends full DOIs to the server. Each DOI is MD5-hashed and only the first 5 hex characters (a "prefix") are sent. The server returns all entries matching any of those prefixes; the client then does exact DOI comparison locally. This means the server learns only that *someone* queried items in a large DOI hash bucket, not which specific papers are in a user's library.

### Shared Base Class Pattern

`BaseBlacklistManager<TEntry>` holds all persistence and indexing logic. The two thin subclasses (`BlacklistManager` for replications, `ReproductionBlacklistManager` for reproductions) implement only the four abstract methods that differ: `addToBlacklist`, `isBlacklisted`, `removeFromBlacklist`, `getEntriesWithMetadata`.

### Shared Utility Functions (`studyUtils.ts`)

Both `replicationChecker.ts` and `reproductionHandler.ts` are structurally parallel. Logic that is identical in both (HTML escaping, author formatting, item copying, multiple-originals handling) lives in `src/utils/studyUtils.ts` and is imported by both. The only caller-visible differences are passed as parameters:

- `studyField: "replications" | "reproductions"` — which API field to read outcomes from
- `studyLabel: "Replication" | "Reproduction"` — display label in note HTML
- `noAuthorsKey` — FTL key for the "No authors" fallback string
- `debugTag: "[ReplicationChecker]" | "[ReproductionHandler]"` — prefix for log messages

### Transaction Discipline

Zotero item creation (including `addRelatedItem` and `save`) must run inside a `Zotero.DB.executeTransaction` block. Note creation (`addNote`) uses `saveTx` internally and **cannot** be nested in a transaction. The pattern used throughout: create items inside a transaction, collect IDs that need notes, then add notes in a separate loop outside the transaction.

### Collection Management

`findOrRenameReplicationCollection` (and its reproduction equivalent) follows a three-step lookup:

1. **Stored ID** — retrieve the collection by previously saved ID. If the user has manually renamed it in Zotero since the last check, update the stored preference to match their name.
2. **Preference name** — search for a top-level collection matching the name stored in preferences. If found, save its ID.
3. **Legacy name fallback** — if the target name is the default name, also search for legacy names (e.g. `"Replication folder"`) to recognise collections from older plugin versions.

If none of the above finds a collection, a new one is created.

---

## Roadmap

- [ ] Add caching to avoid re-checking items with no changes
- [x] Support for checking new items automatically
- [x] Support for read-only group libraries
- [x] Multi-language support (English & German)
- [x] Reproduction study support (FLoRA reproduction attempts)
- [x] Multiple-originals handling with "Original Articles" notes
- [x] Ban/blacklist functionality for replications and reproductions
- [x] Unit and integration test suite
- [ ] Export replication/reproduction report
- [ ] Additional language translations (French, Spanish, etc.)
- [ ] Option to customize collection names per-library
