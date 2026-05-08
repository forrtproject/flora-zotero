# GitHub Pages Setup Guide

This guide explains how to enable and configure GitHub Pages for the Zotero Replication Checker documentation.

## 🚀 One-Time Setup (Required)

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

## 📄 What Gets Published

The GitHub Pages workflow automatically publishes:

- **Homepage**: `README.md` → https://forrtproject.github.io/flora-zotero/
- **Release Guide**: `.github/RELEASE_GUIDE.md` → https://forrtproject.github.io/flora-zotero/release-guide
- **Contributing** (if exists): `CONTRIBUTING.md` → https://forrtproject.github.io/flora-zotero/contributing

---

## 🎨 Customization

The site uses:
- **Theme**: Custom FORRT-inspired design
- **Colors**: Dark teal (#004055), cream backgrounds (#fefdf6), light gray (#f8f9fa)
- **Style**: Clean, professional academic look matching the main FORRT website
- **Custom Layout**: Fully custom HTML/CSS defined in the workflow

### Customizing Colors

Edit `.github/workflows/pages.yml` and modify the CSS variables in the custom layout:

```css
:root {
  --primary-color: #004055;      /* Dark teal/blue */
  --background-cream: #fefdf6;   /* Off-white/cream */
  --section-gray: #f8f9fa;       /* Light gray */
  --text-dark: #212529;
  --text-muted: #6c757d;
}
```

### Design Features
- **Sticky navigation bar** with hover effects
- **Responsive layout** for mobile and desktop
- **Enhanced markdown styling** with FORRT color scheme
- **Professional footer** linking back to main FORRT site

---

## 🔗 Where the Homepage URL Appears

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

## 🧪 Testing

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

## 🔄 Auto-Deploy

The workflow automatically runs when:
- ✅ You push to the `main` branch
- ✅ You manually trigger it (Actions → Deploy to GitHub Pages → Run workflow)

**What it does:**
1. Copies `README.md` to `docs/index.md`
2. Copies other documentation files
3. Builds the site with Jekyll
4. Deploys to GitHub Pages

---

## 📝 Adding New Pages

To add new documentation pages:

1. **Create a markdown file**
   ```bash
   # Example: Create a FAQ page
   touch FAQ.md
   ```

2. **Edit the workflow**
   ```yaml
   # In .github/workflows/pages.yml, add:
   if [ -f "FAQ.md" ]; then
     cp FAQ.md docs/faq.md
   fi
   ```

3. **Commit and push**
   ```bash
   git add FAQ.md .github/workflows/pages.yml
   git commit -m "Add FAQ page"
   git push origin main
   ```

4. **Access at**
   - https://forrtproject.github.io/flora-zotero/faq

---

## 🐛 Troubleshooting

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

## 🎯 Quick Start Checklist

- [ ] Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
- [ ] Push to main branch to trigger deployment
- [ ] Wait 1-2 minutes
- [ ] Visit https://forrtproject.github.io/flora-zotero/
- [ ] Check plugin metadata shows correct homepage
- [ ] Done! ✅

---

## 📚 Learn More

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Themes](https://pages.github.com/themes/)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)
