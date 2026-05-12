# Stillwater

> Planning ahead, with love.

Stillwater is a free, private Minnesota Health Care Directive planning app. It guides you through documenting your medical wishes, naming a healthcare proxy, and leaving a legacy of clarity for the people you love — all without an account, without a server, and without storing anything outside your own device.

**Live:** [stillwatercare.vercel.app](https://stillwatercare.vercel.app)

---

## What It Does

Minnesota Statute 145C allows residents to document detailed healthcare directives. Stillwater walks through every section the law permits, generates printable legal documents, and helps you share your plan with family — privately, via a base64-encoded URL that never touches a server.

---

## Features

### Core Plan Sections

| Section | What it covers |
|---|---|
| **Wishes** | CPR, ventilators, dialysis, feeding tubes, care setting, pain priority, organ donation |
| **Proxy** | Primary agent + successors, powers granted, limitations |
| **Values** | What matters most, quality vs. length of life, fears, hopes, spiritual beliefs |
| **Letters** | Personal messages timed for death, incapacity, or anytime |
| **Arrangements** | Burial, memorial wishes, will location, attorney, financial advisor |
| **Documents** | Legal signing, witness tracking, distribution to care team |

### Planning Tools

- **Plan readiness check** — circular completion score with section gap analysis
- **Guided walkthrough** — step through sections in recommended order
- **Annual check-in wizard** — section-by-section review, updates `lastEdited`
- **Guide for my family** — personalized printable first-48-hours guide
- **Notify your proxy** — personalized letter for your healthcare agent
- **Conversation guide** — printable family discussion guide
- **Wallet card** — credit-card size with QR code
- **Fridge sheet** — large-format emergency one-pager for first responders
- **Review directive** — full legal document for printing and signing
- **Agent briefing** — personal letter to healthcare proxy
- **Doctor summary** — clinical goals-of-care one-pager
- **Share with family** — private base64 link (plan encoded in URL, no server)

### Legacy & Estate

- **My story** — 7 reflective prompts, printable legacy record
- **Personal gifts** — sentimental item assignments for loved ones
- **Document vault** — where to find will, insurance, legal documents
- **Medical profile** — medications, allergies, doctors, insurance

### Experience

- **Dark mode** — persisted preference, anti-flash, respects system default
- **Multiple profiles** — plan for yourself and a loved one on one device
- **Milestone moments** — emotional celebrations at 25%, 50%, 75%, 100%
- **Annual review reminder** — nudge at 180 days, urgent at 365
- **Per-section completion** — six independent progress trackers

---

## Tech Stack

| | |
|---|---|
| Framework | Next.js 16.2.5, App Router, Turbopack |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, no config file) |
| Fonts | Geist Sans (body), Cormorant Garamond (display) |
| Storage | `localStorage` only — nothing leaves the device |
| Hosting | Vercel |

---

## Running Locally

```bash
git clone https://github.com/john3913/stillwater.git
cd stillwater
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Building & Deploying

```bash
npm run build                      # verify clean build (30 pages)
vercel --yes                       # deploy preview
vercel alias set <preview-url> stillwatercare.vercel.app  # promote to production
```

---

## Architecture

### No Server
All plan data lives in `localStorage`. There is no backend, no database, no auth. It's a pure client-side Next.js app that uses the App Router for routing.

### Data Model
Plan data is stored as a `PlanData` object. The multi-profile system wraps it in `Profile[]` under `stillwater-profiles`. The `usePlan` hook at `src/hooks/usePlan.ts` manages all reads, writes, completion calculations, and profile switching.

### Sharing
The share feature encodes the full plan as a base64 URL fragment (`/view#<base64>`). The view page decodes it client-side. No data touches a server at any point.

### Dark Mode
An inline script in `layout.tsx` reads `localStorage('stillwater-theme')` and applies `html.dark` before hydration to prevent flash. The `ThemeToggle` component (sun/moon icon) appears in both the home nav and plan layout nav.

---

## Privacy

Your plan is stored only on this device. Nothing is uploaded to any server. The only network request is loading the app itself. Sharing generates a URL that encodes your plan data directly in the link — no server ever sees it.

---

## License

MIT
