# Pchum Ben Cultural Heritage Web Portal (បុណ្យភ្ជុំបិណ្ឌ)

An authentic, modern, and spiritually immersive web portal dedicated to **Pchum Ben (Ancestors' Day)** in Cambodia. Built with pure HTML5, vanilla CSS, and vanilla modern JavaScript (ES6+), optimized for zero-dependency static deployment on **GitHub Pages**, Vercel, Netlify, or any web server.

---

## 🚀 GitHub Deployment Guide (Fixing GitHub Errors)

If you encountered errors when pushing to GitHub or deploying to GitHub Pages, this repository has been fully upgraded with the necessary configuration files to resolve them:

### Why GitHub Errors Occur & How They Are Resolved:
1. **`.nojekyll` file included in root**:
   - By default, GitHub Pages processes repositories using the **Jekyll** static site generator.
   - Without `.nojekyll`, Jekyll attempts to parse files, ignores directories, and can fail builds with `Liquid Exception` or `Page build failed`.
   - The `.nojekyll` file tells GitHub Pages to serve raw static assets directly with 100% reliability.

2. **Automated GitHub Actions Workflow (`.github/workflows/deploy.yml`)**:
   - Uses the official GitHub Pages deployment action (`actions/deploy-pages@v4`).
   - Automatically builds and deploys the site whenever you push to `main` or `master`.

3. **Resilient Data Store (`js/data-store.js`)**:
   - Prevents blank screens caused by browser CORS origin restrictions or subpath URL variations.
   - If `fetch()` encounters any issue, it immediately and seamlessly falls back to embedded cached data so the website **never breaks or appears empty**.

4. **Universal Lightbox (`lib/lightbox/lightbox.js`)**:
   - Exposes `window.openGalleryLightbox` globally so image viewing on `pagodas.html`, `food.html`, and `gallery.html` works without `ReferenceError`.

5. **Intelligent `404.html`**:
   - Includes standalone styling and dynamic repository path resolution, ensuring visitors never get stuck on a broken page.

---

### Step-by-Step Setup on GitHub Pages:

#### Method A: Using GitHub Actions (Recommended)
1. Push this repository to your GitHub account (e.g. `main` or `master` branch).
2. Go to your repository on GitHub.
3. Click on **Settings** &rarr; **Pages** (in the left sidebar).
4. Under **Build and deployment** &rarr; **Source**, select:
   👉 **`GitHub Actions`**
5. That's it! The included `.github/workflows/deploy.yml` workflow will automatically run, build, and publish your site at:
   `https://<your-username>.github.io/<repo-name>/`

#### Method B: Deploy from Branch (Classic)
1. Go to **Settings** &rarr; **Pages**.
2. Under **Build and deployment** &rarr; **Source**, select:
   👉 **`Deploy from a branch`**
3. Select branch: `main` (or `master`) and folder: `/ (root)`.
4. Click **Save**.
5. Thanks to the root `.nojekyll` file, your site will be published in 1-2 minutes without Jekyll errors!

---

## 🌟 Key Features

1. **Dual Language Support (ភាសាខ្មែរ / English)**:
   - Instant language switching across all pages with `js/lang-switch.js`.
   - Authentic Khmer typography via Google Fonts: `Moul` (headings) and `Kantumruy Pro` / `Battambang` (body).

2. **Live Dynamic Countdown**:
   - Calculates time remaining until the next Pchum Ben Day and Kann Ben period (`js/countdown.js`).
   - Supports both Western Arabic (`0-9`) and traditional Khmer numerals (`០-៩`).

3. **Temple Atmosphere Sound Synthesizer**:
   - Built with the HTML5 Web Audio API in `js/main.js`.
   - Generates harmonic Tibetan / Buddhist temple bell frequencies (216Hz meditative chord) with zero external audio files.

4. **Interactive 15-Day Timeline (`timeline.html`)**:
   - Covers all 14 days of Kann Ben and Day 15 (Pchum Thom).
   - Filter by ceremony category: Dawn Bos Bay Ben, Offerings & Num Ansom, Chanting & Sermons, Grand Culmination.
   - Dual data loading via `js/data-store.js` and `data/timeline.json`.

5. **Monastery Directory (`pagodas.html`)**:
   - Filterable list of historic pagodas across Cambodia (Phnom Penh, Siem Reap, Battambang, Kandal, Kampong Cham).
   - Live search by temple name, highlights, or features (e.g., Buffalo races at Wat Vihear Suork).
   - Bookmark temples to personal pilgrimage list in `localStorage`.

6. **Photo & Video Lightbox Gallery (`gallery.html`)**:
   - Filterable image collection with full-screen dark modal lightbox (`lib/lightbox/`).

7. **Sacred Culinary Showcase (`food.html`)**:
   - Cultural history and recipes for Num Ansom Chrouk, Num Ansom Chek, Kralan, and Num Korm, detailing spiritual symbolism (Shiva Lingam & Yoni).
   - Interactive 5-step wrapping guide and Virtual Offering Tray builder.

8. **Visitor Etiquette & Travel Guide (`guide.html`)**:
   - Pagoda Do's & Don'ts, traditional white silk attire rules, respectful monk interactions, and national holiday travel logistics.

9. **Multi-Year Festival Calendar (`calendar.html`)**:
   - Official Gregorian and Khmer lunar dates from 2024 to 2030 loaded via `data/dates.json` and `js/data-store.js`.

10. **Global Quick Search (Ctrl + K / Cmd + K)**:
    - Press `Ctrl + K` anywhere on the site to quickly find rituals, foods, pagodas, history, and festival dates.

---

## 📁 Directory Structure

```text
pchum-ben-project/
│
├── .github/
│   └── workflows/
│       └── deploy.yml          ← Automated GitHub Pages deployment workflow
│
├── .nojekyll                   ← Disables Jekyll to prevent GitHub Pages build failures
├── .gitignore                  ← Git ignore rules (OS, IDE, temporary files)
├── .gitattributes              ← Ensures LF line ending consistency
├── README.md                   ← Project documentation and deployment guide
│
├── index.html                  ← Home: hero, countdown, highlights, merit gong
├── about.html                  ← What is Pchum Ben? (Preta, 7 generations)
├── history.html                ← Buddhist origins, King Bimbisara legend
├── timeline.html               ← 15 days of Kann Ben + Pchum Thom
├── traditions.html             ← Rituals (Bos Bay Ben, Bangskol, Sand Stupas)
├── food.html                   ← Offerings, recipes, Num Ansom, virtual tray
├── pagodas.html                ← Monastery directory by province & search
├── gallery.html                ← Photos, documentaries, and fullscreen lightbox
├── guide.html                  ← Visitor etiquette, dress code, travel tips
├── calendar.html               ← Lunisolar calendar dates (2024–2030)
├── contact.html                ← Contact form, FAQs, story submission
├── 404.html                    ← Custom 404 error page with auto-path recovery
│
├── css/
│   ├── style.css               ← Main styles & royal gold design system
│   ├── responsive.css          ← Mobile and tablet responsive rules
│   └── khmer-fonts.css         ← Khmer font setup (Moul, Kantumruy Pro, Battambang)
│
├── js/
│   ├── main.js                 ← Navbar, scroll effects, Web Audio temple bell, Ctrl+K search
│   ├── data-store.js           ← Resilient data loader with instant offline fallbacks
│   ├── countdown.js            ← Days until Pchum Ben with Khmer digits
│   ├── timeline.js             ← Interactive 15-day timeline logic
│   ├── gallery.js              ← Lightbox and category filters
│   └── lang-switch.js          ← Khmer / English instant toggle
│
├── data/
│   ├── dates.json              ← Pchum Ben dates by year (2024-2030)
│   ├── pagodas.json            ← Monastery directory data
│   └── timeline.json           ← 15-day ceremony schedule data
│
├── img/
│   ├── hero/                   ← Hero banner images
│   ├── pagodas/                ← Monastery photography
│   ├── food/                   ← Num Ansom, Kralan, Num Korm photos
│   ├── rituals/                ← Bos Bay Ben, alms, Bangskol chanting photos
│   └── icons/                  ← Logo, favicon, sacred lotus SVG icons
│
└── lib/
    ├── bootstrap/              ← Lightweight Bootstrap grid utilities
    ├── animate/                ← Micro-animations (floating lotus, glow)
    └── lightbox/               ← Fullscreen photo lightbox modal
```

---

## 💻 Running the Project Locally

You can run this project locally with any simple static server:

```bash
# Using Python 3
python -m http.server 8080

# Or with Node.js
npx serve .

# Or with VS Code
# Right click "index.html" -> "Open with Live Server"
```

Then open `http://localhost:8080` in your web browser.

You can also open `index.html` directly in any web browser by double-clicking the file—the built-in `js/data-store.js` ensures that all dynamic pages function completely without CORS errors.
