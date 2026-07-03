# Rozmova — Speak Ukrainian (Android install guide)

Rozmova runs as an installable web app (PWA). Hosted once, it installs on any
Android phone from Chrome with its own home-screen icon, runs full screen, and
uses Android's built-in Ukrainian voice and speech recognition.

## 1. Host it on GitHub Pages (free, ~10 minutes, one time)

1. Create a free account at github.com (skip if you have one).
2. Click **+ → New repository**. Name it `rozmova`, set it to **Public**, click **Create repository**.
3. Click **uploading an existing file** and drag in ALL files from this folder
   (`index.html`, `manifest.webmanifest`, `sw.js`, the three `icon-*.png` files).
   Click **Commit changes**.
4. Go to **Settings → Pages**. Under "Branch", choose `main`, folder `/ (root)`, click **Save**.
5. Wait ~2 minutes. Your app is now live at:
   `https://YOUR-USERNAME.github.io/rozmova/`

## 2. Install on the phone (~2 minutes)

1. On the Android phone, open that URL in **Chrome**.
2. Chrome menu (⋮) → **Add to Home screen** → **Install**.
3. Open Rozmova from the home screen.
4. First time only:
   - Tap the mic and **Allow** microphone access (remembered permanently).
   - The app runs in standalone mode, so paste an **Anthropic API key** into the
     field at the top to enable the AI tutor. Create one at
     **console.anthropic.com → API keys** (requires adding a small amount of
     credit; typical use costs a few cents per week). The key is stored only on
     the phone.

## 3. Done — daily routine

Open Review first and clear what's due (2–5 min), then one lesson round or a
few minutes of Chat. The streak counter keeps you honest.

## Notes

- Progress (words, streak, lessons) is saved on the phone automatically.
- Updating the app later: replace `index.html` in the GitHub repo and bump the
  `CACHE` name in `sw.js` (e.g. `rozmova-v2`) so phones pick up the new version.
- The same URL also works great on desktop Chrome/Edge.
