# Contributing to the Zotero Replication Checker

We welcome bug reports, suggestions, translations, documentation, tests, and code contributions. Follow the [FORRT Code of Conduct](https://forrt.org/coc/). For broader involvement, [get in touch with FORRT](https://forrt.org/about/get-involved/).

## Start with an issue

Search [existing issues](https://github.com/forrtproject/flora-zotero/issues) before opening one. For bugs, include Zotero and operating system versions, plugin version, steps to reproduce, expected behaviour, and actual behaviour. Use synthetic items or public example DOIs. Remove library contents, account information, tokens, and private paths from logs and screenshots.

Discuss substantial features, changes to scientific outcome labels, and changes to network requests or library mutations before implementing them. Small fixes and documentation improvements can go straight to a pull request. Data corrections should be raised with the [FLoRA validation project](https://github.com/forrtproject/flora-validation).

## Set up a development checkout

Use Node.js 22 and npm (the developer guide records Node 22.17.0 and npm 10.9.2). Zotero 7 or later is needed for manual and integration testing; Node unit tests do not require Zotero.

Fork this repository, then replace `YOUR-USERNAME` below with your GitHub username:

```bash
git clone https://github.com/YOUR-USERNAME/flora-zotero.git
cd flora-zotero
git remote add upstream https://github.com/forrtproject/flora-zotero.git
git switch -c describe-your-change
npm ci
npm test
npm run build
```

The build is written to `.scaffold/build/`. Install its `.xpi` through Zotero's **Tools → Add-ons (or Plugins) → gear icon → Install Add-on From File**. Integration tests overwrite that XPI with a test build, so run `npm run build` again before installing it manually. See the [developer guide](docs/README_dev.md) for the source map, fixtures, and development commands, and the [localisation guide](docs/LOCALIZATION.md) for translations.

## Test safely

Use a separate disposable Zotero profile **and data directory**, with sync disabled and no personal or group library connected. Confirm those locations before installing a development build or running integration tests: this plugin creates items, notes, tags, collections, and related-item links, and moves banned items to the trash. Its integration tests also permanently erase items and collections, clear blacklists, and overwrite plugin preferences. Never point a test run at your normal Zotero library. See [Zotero's profile guidance](https://www.zotero.org/support/kb/profile_directory) for creating and selecting profiles.

```bash
npm test                  # Node unit tests; mocked Zotero environment
npm run lint:check        # Prettier and ESLint
npm run build             # Bundle and TypeScript check
npm run test:integration  # Scaffold launches Zotero, runs tests, then exits
```

The installed scaffold creates an isolated integration profile and data directory under `.scaffold/test/`. Keep them disposable and never connect them to a real library. Set `ZOTERO_PLUGIN_ZOTERO_BIN_PATH` to your local Zotero executable for development serving and local integration runs. For `npm start` (development serving), explicitly set disposable profile and data paths. A gitignored `.env` in the repository root can contain, for example:

```dotenv
ZOTERO_PLUGIN_ZOTERO_BIN_PATH=/path/to/Zotero/executable
ZOTERO_PLUGIN_PROFILE_PATH=/absolute/path/to/disposable-profile
ZOTERO_PLUGIN_DATA_DIR=/absolute/path/to/disposable-data
```

Replace the example paths with your local paths. See the [scaffold documentation](https://zotero-plugin-dev.github.io/zotero-plugin-scaffold/) for platform-specific setup. `npm run test:integration-dev` keeps the isolated test Zotero open for debugging.

Use `test/fixtures/` and mocked HTTP responses for regression tests. Integration tests under `test/integration/` run inside Zotero; `apiSmoke.spec.ts` deliberately contacts the live FLoRA API, so the integration suite is not fully offline. If a check cannot run, say which one and why in the PR. The build workflow runs unit tests, build, and integration tests on pull requests. A fork PR may fail at the final build-comment step because its token cannot write PR comments; inspect the earlier test/build steps separately.

For library changes, check repeated scans, preservation of existing user notes, blacklist behaviour, read-only libraries, and automatic-check loops in the disposable profile. Preserve the prefix-based lookup and local exact matching; do not add raw library identifiers, full DOIs, or library contents to ordinary lookup requests or any future telemetry. The explicit user-initiated Atlas lookup has a different contract: discuss changes to it with maintainers. Keep replication and reproduction outcomes distinct and preserve the source's interpretation.

## Open a pull request

Keep each PR focused. Describe the user-visible change, link its issue, list checks and results, and provide sanitised screenshots for UI changes. Add regression tests for changed behaviour and preserve localisation placeholders. The repository-wide lint command can report pre-existing formatting failures. Check your changed files with `npx prettier --check <files>` and `npx eslint <source-files>` and report existing failures separately. Avoid unrelated formatting changes; `npm run lint:fix` can modify many files, so inspect the diff before committing.

Maintainers review scientific interpretation, privacy, and Zotero-library safety as well as implementation. Contributors do not need to publish a release. Maintainers coordinate version changes, `docs/Release.md`, tags, update manifests, and the [release workflow](.github/workflows/release.yml). Do not run `npm run release`, push release tags, or dispatch a release workflow as part of an ordinary contribution.
