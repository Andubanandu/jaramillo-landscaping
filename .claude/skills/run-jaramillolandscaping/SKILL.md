---
name: run-jaramillolandscaping
description: run, screenshot, or smoke-test the Jaramillo Landscape static website; start the dev server; take screenshots of any page
---

# Run — Jaramillo Landscape

Static HTML/CSS/JS site (no build step). Driven by a Node.js HTTP server (port 3456) +
Playwright Chromium. The driver at `.claude/skills/run-jaramillolandscaping/driver.mjs`
starts the server itself, so there is no separate "start server first" step for agent use.

All commands run from **project root** (`c:/jaramillolandscaping`).

---

## Prerequisites

Node.js and npm already present. Install Playwright's Chromium once:

```bash
cd c:/jaramillolandscaping
npm install
npx playwright install chromium
```

No other OS packages are needed — the site is pure HTML/CSS/JS with no native binaries.

---

## Run (agent path) — driver commands

### Smoke-test all key pages

```bash
cd c:/jaramillolandscaping
MSYS_NO_PATHCONV=1 node .claude/skills/run-jaramillolandscaping/driver.mjs smoke
```

Starts the HTTP server, visits 9 pages, saves screenshots to
`.claude/skills/run-jaramillolandscaping/screenshots/`, prints each page title,
then exits. Verified output:

```
  ✓ home             "Expert Landscaping & Hardscaping in Treasure Valley, ID | Jaramillo Landscape"
  ✓ services         "Landscaping Services in Treasure Valley, ID | Jaramillo Landscape"
  ✓ free-estimate    "Free Estimate | Jaramillo Landscape — Treasure Valley, ID"
  ✓ contact          "Contact Us | Jaramillo Landscape — Treasure Valley, ID"
  ✓ reviews          "Customer Reviews | Jaramillo Landscape — Treasure Valley, ID"
  ✓ gallery          "Project Gallery | Jaramillo Landscape — Treasure Valley, ID"
  ✓ faq              "FAQ | Jaramillo Landscape — Treasure Valley, ID"
  ✓ about            "About Jaramillo Landscape | Treasure Valley's Trusted Landscapers"
  ✓ drainage         "Drainage Solutions in Treasure Valley, ID | Jaramillo Landscape"
  ✓ home-mobile-menu
✓ Smoke passed (9 pages)
```

### Screenshot a specific page

```bash
cd c:/jaramillolandscaping
MSYS_NO_PATHCONV=1 node .claude/skills/run-jaramillolandscaping/driver.mjs screenshot /free-estimate.html out.png
```

Saves a full-height 1280×900 screenshot to `out.png`. Use any path from the site
(e.g. `/contact.html`, `/drainage.html`, `/`).

### Start the server (stay alive — human path)

```bash
cd c:/jaramillolandscaping
node .claude/skills/run-jaramillolandscaping/driver.mjs serve
# → Serving c:/jaramillolandscaping on http://localhost:3456 — Ctrl-C to stop
```

Open `http://localhost:3456` in a browser. Ctrl-C to stop.

---

## Run (human path)

Same as `serve` above. There is no `npm start` script — use the driver's `serve` command.

---

## Test suite

Default Playwright example test (not site-specific):

```bash
cd c:/jaramillolandscaping
npx playwright test
```

---

## Gotchas

- **`MSYS_NO_PATHCONV=1` required in Git Bash for `screenshot` command.** When you pass
  `/drainage.html` as an argument in Git Bash, it auto-expands to a Windows absolute path
  (`C:/Program Files/Git/drainage.html`), corrupting the URL. The env var suppresses this.
  The `smoke` command uses hardcoded paths internally and does not need it, but it's
  harmless to include anyway.

- **The driver starts its own server on port 3456.** If something else is already
  listening on 3456, the server silently fails to bind. Stop the other process first.
  The driver checks if port 3456 is already serving (`GET /`) and skips starting
  a new server if it is — so running two driver invocations in parallel is safe as
  long as the first one left its server running.

- **No build step.** `styles.css` and `main.js` are pre-written. Edits to any `.html`,
  `.css`, or `.js` file are live immediately on the next request — no restart needed.

- **Forms use `mailto:` action with `enctype=text/plain`.** The `<form>` elements post
  to `mailto:jaramillolandscaping208@gmail.com`. Submitting in Playwright will open
  a mail client dialog on a desktop, but will silently no-op in headless mode — this
  is expected. The `onsubmit` redirect to `thank-you.html` is tested by filling the
  form fields; to test the redirect itself, click the submit button and check navigation.

- **Google Maps placeholder in contact.html.** A `<div class="maps-placeholder">` with
  a note "Replace this placeholder with an embedded Google Map before launch" is still
  present. Not a bug — intentional placeholder.

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `ERR_MODULE_NOT_FOUND: Cannot find package 'playwright'` | Run driver from project root (`cd c:/jaramillolandscaping`) so `node_modules` is found |
| `Cannot navigate to invalid URL … C:/Program Files/Git/…` | Add `MSYS_NO_PATHCONV=1` before the node command |
| `EADDRINUSE :3456` | Another process owns port 3456. `npx kill-port 3456` or stop the other driver instance |
| Blank/white screenshot | Usually means the page didn't load — check the URL path is correct and the server is running |
