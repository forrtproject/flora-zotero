# GitHub Pages Setup Guide

This guide explains how to enable and configure GitHub Pages for the Zotero Replication Checker documentation.

## One-Time Setup (Required)

You need to enable GitHub Pages in your repository settings **once**. After that, the workflow will automatically deploy on every push to main.

### Steps:

1. **Go to Repository Settings**
   - Navigate to https://github.com/forrtproject/flora-zotero/settings

2. **Find Pages Section**
   - In the left sidebar, click **Pages**

3. **Configure Source**
   - **Source**: Select "GitHub Actions"
   - ✅ That's it! No need to select a branch

4. **Save**
   - GitHub will automatically use the workflow in `.github/workflows/pages.yml`

---

## What Gets Published

| Page | Built from |
| --- | --- |
| `/` | `docs/Website.md` |
| `/documentation/` and its eight sub-pages | `README.md`, sliced by heading |
| `/contributing/` | `Contributing.md` |
| `/release-guide/` | `.github/RELEASE_GUIDE.md` |

Every page is built as `<name>/index.html`, so its URL is a real directory and
does not depend on the host retrying `<name>` as `<name>.html`. That also keeps
`page.url` equal to the URL that is actually linked, which the canonical tag,
the `og:url` tag and the active nav item all rely on.

---

## How the documentation is split

`README.md` stays the single source of truth, but it is **not** published whole:
a three-hundred-line page buries Installation below two screens of overview.
`docs/_data/docs_nav.yml` maps README headings onto one short page per task, and
`scripts/build_docs.py` does the slicing.

That same file is what the layout renders as the docs sidebar, so the nav can
never list a page that does not exist.

**The build fails loudly on drift**, which is the point:

- a heading named in `docs_nav.yml` that is missing from the README
- a README heading that is neither placed on a page nor listed under `excluded`
- an `excluded` entry for a heading that no longer exists

Renaming a README section therefore breaks the build rather than silently
dropping it from the site. To move content between pages, edit `sections:` in
`docs_nav.yml`; to deliberately keep something off the site, add it to
`excluded:` with the reason.

---

## Where the site lives

The site shell is committed to the repo, not generated inside the workflow, so
it can be reviewed and previewed like any other code:

| File | What it is |
| --- | --- |
| `docs/_config.yml` | Jekyll config: title, nav, FORRT links, plugin facts |
| `docs/_data/docs_nav.yml` | Docs structure: sidebar groups and the README slicing |
| `docs/_layouts/default.html` | Page shell: top bar, docs sidebar, content, footer |
| `docs/assets/css/site.css` | The whole design system |
| `docs/Website.md` | Home page content and landing sections |
| `docs/logo/`, `docs/media/` | Logos, share images, tutorial video |
| `scripts/build_docs.py` | Assembles the derived pages (run by CI and the preview) |
| `.github/workflows/pages.yml` | Runs the builder, then Jekyll |

The generated pages (`docs/index.md`, `docs/documentation/`,
`docs/contributing/`, `docs/release-guide/`) are gitignored — they are build
output.

---

## Customization

The design is ported from the **FLoRA Replication Atlas**
(https://forrt.org/flora-replication-atlas/) so the two FORRT properties read as
one product family:

- **Colors**: plum primary (`#853953`), near-black chrome (`#2c2c2c`), light
  grey ground (`#f3f4f4`)
- **Type**: Domine for display, Source Sans 3 for body
- **Layout**: 52px sticky dark top bar, 1120px left-aligned content column,
  thin dark footer bar
- **Home page**: Atlas landing structure — hero, then hairline-separated
  sections (bento trio, worked example, definition rows, prose with a link rail)

### Customizing colors and type

Edit the tokens at the top of `docs/assets/css/site.css`:

```css
:root {
  --primary: #853953;        /* Plum — links, CTA, display headings */
  --neutral: #2c2c2c;        /* Top bar and footer bar */
  --surface: #f3f4f4;        /* Page ground */
  --font-display: "Domine", Georgia, serif;
  --font-body: "Source Sans 3", "Segoe UI", system-ui, sans-serif;
}
```

Outcome colours (`--success`, `--warning`, `--error`) encode replication
results, not decoration — keep them distinct from the brand plum.

### Previewing locally

Jekyll (Ruby) is not needed for a visual check:

```bash
python scripts/preview-pages.py
# then open docs/.preview/index.html
```

The script assembles the same pages the workflow does, resolves the Liquid the
layout uses, and converts the markdown. It is a preview, not a Jekyll
replacement — the real build still only runs in the workflow.

---

## Where the Homepage URL Appears

Once GitHub Pages is enabled, the homepage URL (`https://forrtproject.github.io/flora-zotero/`) will appear in:

1. **Plugin Metadata**
   - When users view plugin details in Zotero
   - Clickable link to documentation

2. **GitHub Repository**
   - Shows in the "About" section
   - Appears in search results

3. **Release Notes**
   - Automatically included in release descriptions

---

## Testing

After enabling GitHub Pages:

1. **Push to main branch**
   ```bash
   git push origin main
   ```

2. **Check Actions tab**
   - Go to https://github.com/forrtproject/flora-zotero/actions
   - Look for "Deploy to GitHub Pages" workflow

3. **Wait 1-2 minutes**
   - First deployment takes slightly longer

4. **Visit the site**
   - https://forrtproject.github.io/flora-zotero/

---

## Auto-Deploy

The workflow automatically runs when:
- ✅ You push to the `main` branch
- ✅ You manually trigger it (Actions → Deploy to GitHub Pages → Run workflow)

**What it does:**
1. Runs `scripts/build_docs.py`, which assembles every derived page
2. Copies the favicon and share images
3. Fetches `update.json` from the latest release
4. Builds the site with Jekyll against `docs/_config.yml` and
   `docs/_layouts/default.html`
5. Deploys to GitHub Pages

---

## Adding pages

**A documentation page** — add an entry to `docs/_data/docs_nav.yml` under the
right group, naming the README headings it should contain:

```yaml
  - title: Troubleshooting
    slug: troubleshooting
    lede: >-
      What to try when a check finds nothing, or finds the wrong thing.
    sections:
      - Troubleshooting        # must match a README heading exactly
```

That is the whole change: the builder writes the page, and the sidebar, the
overview cards and the footer pick it up automatically.

**A standalone page** (not part of the docs) — add it to `build()` in
`scripts/build_docs.py` alongside Contributing and the Release Guide, and add a
`navigation:` entry in `docs/_config.yml` so it is linked from the top bar, the
footer and the "Keep reading" row.

---

## Troubleshooting

### Pages Not Deploying

**Check:**
1. Is GitHub Pages enabled in Settings → Pages?
2. Source set to "GitHub Actions"?
3. Check Actions tab for errors

### 404 Error

**Fix:**
- Wait 2-3 minutes after first deployment
- Check workflow completed successfully
- Verify URL: https://forrtproject.github.io/flora-zotero/

### Old Content Showing

**Fix:**
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- GitHub Pages may cache for a few minutes
- Check workflow ran successfully

---

## Quick Start Checklist

- [ ] Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
- [ ] Push to main branch to trigger deployment
- [ ] Wait 1-2 minutes
- [ ] Visit https://forrtproject.github.io/flora-zotero/
- [ ] Check plugin metadata shows correct homepage
- [ ] Done! ✅

---

## Learn More

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Themes](https://pages.github.com/themes/)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)
