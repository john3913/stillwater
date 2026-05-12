# Stillwater — Claude Code Guide

Everything a new Claude Code session needs to work productively on this project without re-reading the codebase from scratch.

---

## Project Identity

- **What:** Minnesota Health Care Directive planning app (MN Statute 145C)
- **Live:** stillwatercare.vercel.app
- **Repo:** github.com/john3913/stillwater
- **Local:** /tmp/stillwater
- **30 pages**, all data in localStorage, no server, no auth

---

## Tech Stack

- Next.js 16.2.5, App Router, Turbopack
- TypeScript
- Tailwind v4 — `@import "tailwindcss"` in globals.css. **No tailwind.config.js.**
- Fonts: Geist Sans (body, `--font-geist-sans`), Cormorant Garamond (display, `--font-cormorant`)
- Deployment: Vercel (project already linked via `.vercel/`)

---

## Complete Page Inventory

```
src/app/
  page.tsx                # Landing (server component — can render client children)
  layout.tsx              # Root layout: Geist + Cormorant fonts, dark-mode anti-flash script
  globals.css             # All keyframes, design system CSS classes
  EmailForm.tsx           # Client component on landing

  plan/
    layout.tsx            # Sticky nav + 6-node stepper + ThemeToggle + ProfileSwitcher
    page.tsx              # Dashboard: milestone overlays, featured cards, section grid, tools
    wishes/               # 7-step medical preference wizard
    proxy/                # Healthcare agent designation
    values/               # 4-question values flow
    letters/              # Personal messages (CRUD)
    arrangements/         # Burial, memorial, practical wishes
    documents/            # Signing, witness tracking, distribution list
    review/               # Full directive — print-formatted legal document
    share/                # Generates base64 /view#<hash> share link
    checkin/              # Annual check-in wizard (section-by-section review)
    first48/              # Printable family guide for first 48 hours + beyond
    readiness/            # Circular completion score + section gap analysis
    guide/                # Guided walkthrough (recommended section order)
    notify-proxy/         # Personalized letter for healthcare proxy
    conversation/         # Printable family conversation guide
    card/                 # Wallet card with QR code
    fridge/               # Large-format emergency one-pager
    agent-brief/          # Healthcare proxy briefing document
    doctor/               # Clinical goals-of-care summary
    legacy/               # 7-prompt life story & legacy reflections
    gifts/                # Sentimental item assignments
    medical/              # Medications, allergies, doctors, insurance
    vault/                # Document location directory
    polst/                # About POLST informational page
    welcome/              # Onboarding

  view/page.tsx           # Read-only shared plan (decodes base64 URL hash)

  components/
    ThemeToggle.tsx       # Sun/moon toggle; reads/writes localStorage('stillwater-theme')

  hooks/
    usePlan.ts            # Central state — ALL plan data, completions, profiles

  lib/
    planTypes.ts          # TypeScript types + defaultPlan + default* objects
    profiles.ts           # Multi-profile: loadProfiles, saveProfiles, createProfile
```

---

## The `usePlan` Hook

**Import:** `import { usePlan } from '@/hooks/usePlan';`

**All exports:**
```ts
plan, loaded,
profiles, activeId, activeProfileName, lastEdited,
switchProfile, createNewProfile, deleteProfile, renameProfile,
touchPlan,           // persist(plan) without changes — updates lastEdited
saveName, saveWishes, saveProxy, saveValues, saveLetter, deleteLetter,
saveArrangements, saveDocuments, saveProxyAndPrincipal,
saveLegacy, saveMedical, saveVault, saveGifts,
addDistributionEntry, updateDistributionEntry, removeDistributionEntry,
addGiftEntry, updateGiftEntry, removeGiftEntry,
wishesCompletion, proxyCompletion, valuesCompletion,
lettersCompletion, arrangementsCompletion, documentsCompletion,
overallCompletion,   // 0–100, average of 6 section completions
```

**`persist(updatedPlan)`** — saves to state + localStorage + updates `lastEdited` on active profile.

---

## Data Model

### localStorage Keys
| Key | Value |
|---|---|
| `stillwater-profiles` | `Profile[]` JSON (id, displayName, plan, lastEdited) |
| `stillwater-active-id` | active profile ID string |
| `stillwater-plan` | legacy key, kept in sync |
| `stillwater-theme` | `'light'` \| `'dark'` |
| `stillwater_milestone_25/50/75` | `'1'` once shown |
| `stillwater_celebrated` | `'1'` once shown (100% milestone) |

### Plan Sections (key fields)

**wishes:** `cpr`, `ventilator`, `dialysis`, `feedingTube`, `setting`, `painPriority`, `organDonation`, `additionalNotes`

**proxy:** `primaryName`, `primaryRelationship`, `primaryPhone`, `primaryEmail`, `primaryAddress`, `alternateName`, `alternatePhone`, `alternateRelationship`, `alternateAddress`, `secondAlternateName`, `secondAlternateRelationship`, `secondAlternatePhone`, `secondAlternateAddress`, `agentActMode`, `agentLimitations`, `additionalPowers` `{ whileCompetent, funeralBurial, mentalHealth, pregnancy, afterDivorce }`, `notes`

**values:** `whatMatters`, `qualityVsQuantity`, `biggestFear`, `biggestHope`, `scenarioTerminal`, `scenarioBrainInjury`, `scenarioDementia`, `conditionsToStop`, `preferredCareLocation`, `preferredCareLocationName`, `spiritualBeliefs`, `importantRituals`

**letters:** `Letter[]` — `{ id, to, subject, body, deliverWhen }`

**arrangements:** `afterPassing`, `afterPassingNotes`, `serviceType`, `serviceNotes`, `music`, `readings`, `finalResting`, `willLocation`, `insuranceLocation`, `attorney`, `financialAdvisor`, `guardianPreference`

**documents:** `isSigned`, `isWitnessed`, `distribution: DistributionEntry[]`, and vault/location fields

---

## Design System

### Constants (define at top of every file that uses them)
```ts
const GRAD = 'linear-gradient(135deg, #5B8DEF 0%, #9B5CAF 55%, #C47090 100%)';
```

### Section Colors
```
Wishes       #7C5CAF   violet
Proxy        #C47090   blush
Values       #5E9E7E   sage
Letters      #C08858   amber
Arrangements #9B68D0   purple
Documents    #3E8868   forest
```

### Core Palette
```
bg           #FAF8FF   lavender white (page background)
bg-alt       #F5F0FF
heading      #1A1030
body         #4A3870
muted        #8070A8
soft         #A090C0
border       #E0D8F5
```

### CSS Classes (globals.css)
| Class | Purpose |
|---|---|
| `.btn-primary` | Color-wave animated gradient button with shimmer + glow |
| `.btn-sm` | Compact variant — padding 0.6rem 1.3rem, font-size 0.75rem |
| `.btn-secondary` | Frosted glass outline button |
| `.back-btn` | Frosted glass pill back button with left-chevron SVG |
| `.card-lift` | Hover: translateY(-3px) + shadow + border lighten |
| `.accent-bar` | Left gradient strip that sparks on `.group:hover` (`bar-slide` keyframe) |
| `.feat-card` | Featured card with hover sheen sweep (`feat-shimmer` keyframe) |
| `.animate-fade-up` | `fade-up 0.6s ease both` — use with inline `animationDelay` for stagger |

### CSS Keyframes
```
wave-fwd / wave-bwd   Water wave translate (translateX 0↔-50%)
pulse-ring            Stepper in-progress ripple (scale 1→2.5, opacity 0.65→0)
bar-slide             Accent bar light spark (translateY -150%→350%)
feat-shimmer          Featured card hover sheen (left -60%→130%)
float-a / float-b / float-c   Blob drift — ALWAYS use different durations (14s/17s/20s)
fade-up               Entrance animation (translateY 12px→0, opacity 0→1)
color-wave            Button gradient cycling (background-position)
btn-shimmer           Button shimmer sweep
drift-1 / drift-2 / drift-3   Hero orb float paths
radiant-wave          Constellation expanding rings
orb-breathe           Pulsing glow orb
```

### Dark Mode
- `html.dark` class on `<html>` element
- Anti-flash inline script in `layout.tsx` reads localStorage before hydration
- CSS overrides in `globals.css` cover: `bg-white`, `bg-[#FAF8FF]`, nav, text colors, borders, inputs
- Inline styles **cannot** be overridden by CSS — dark mode is best-effort (~80% coverage)
- `ThemeToggle` in home nav + plan layout nav

---

## Patterns

### Every New Plan Page
```tsx
'use client';
import Link from 'next/link';
import { usePlan } from '@/hooks/usePlan';

export default function MyPage() {
  const { loaded, plan } = usePlan();
  if (!loaded) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <Link href="/plan" className="back-btn">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Your plan
        </Link>
      </div>
      {/* content */}
    </div>
  );
}
```

### Featured Card (3-col on dashboard)
```tsx
<Link href="/plan/something"
  className="feat-card group relative overflow-hidden flex flex-col gap-4 rounded-3xl p-6 transition-all hover:-translate-y-0.5 animate-fade-up"
  style={{ background: 'linear-gradient(135deg, #E8F5EE 0%, #EDF7F3 100%)', border: '1px solid #B8DFC8',
    boxShadow: '0 2px 18px rgba(62,136,104,0.1)', animationDelay: '320ms' }}>
  {/* Floating orb — pick float-a/b/c, unique duration, never same as sibling cards */}
  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-25 pointer-events-none"
    style={{ background: 'radial-gradient(circle, #A8DFC0, transparent 70%)', animation: 'float-c 20s ease-in-out infinite' }} />
  {/* Icon */}
  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white"
    style={{ background: 'linear-gradient(135deg, #5E9E7E, #7AAE8E)', boxShadow: '0 4px 14px rgba(94,158,126,0.3)' }}>
    <svg className="w-6 h-6" .../>
  </div>
  <div className="flex-1">
    <p className="font-semibold text-[#2E1A60] text-base mb-1">Title</p>
    <p className="text-xs text-[#6070A8] leading-relaxed">Description</p>
  </div>
  <div className="flex items-center gap-1.5 text-xs font-medium text-[#5E9E7E]">
    CTA text
    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" .../>
  </div>
</Link>
```

### Section Card (6-grid on dashboard)
```tsx
<Link className="group relative block bg-white rounded-2xl pl-6 pr-6 pt-6 pb-5 card-lift animate-fade-up"
  style={{ border: '1px solid #E0D8F5', boxShadow: '0 1px 3px rgba(90,62,138,0.05)',
    animationDelay: `${i * 60}ms` }}
  onMouseEnter={e => { e.currentTarget.style.borderColor = '#C4B0E8'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(90,62,138,0.12)'; }}
  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E0D8F5'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(90,62,138,0.05)'; }}>
  {/* Left gradient accent bar */}
  <div className="accent-bar absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full"
    style={{ background: `linear-gradient(to bottom, ${s.barFrom}, ${s.barTo})` }} />
  {/* content */}
</Link>
```

### Milestone / Completion Overlay
```tsx
{activeMilestone && (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-6"
    style={{ background: 'rgba(26,16,48,0.75)', backdropFilter: 'blur(10px)' }}>
    <div className="relative max-w-md w-full rounded-3xl p-10 text-center overflow-hidden animate-fade-up"
      style={{ background: 'linear-gradient(135deg, #EBF2FF, #EDE8FF, #FDE8EF)',
        border: '1px solid rgba(155,92,175,0.2)', boxShadow: '0 24px 80px rgba(91,141,239,0.22)' }}>
      {/* content */}
    </div>
  </div>
)}
```

### Saved State (after form submit)
```tsx
<div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 animate-fade-up">
  <div className="relative mb-8">
    <div className="w-20 h-20 rounded-full flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #5E9E7E, #7AAE8E)', boxShadow: '0 8px 36px rgba(94,158,126,0.32)' }}>
      <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    {/* bloom glow */}
    <div className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
      style={{ background: 'linear-gradient(135deg, #5E9E7E, #7AAE8E)', filter: 'blur(18px)', transform: 'scale(1.3)' }} />
  </div>
  <h2 className="font-[family-name:var(--font-cormorant)] text-4xl font-light mb-3"
    style={{ background: 'linear-gradient(135deg, #5E9E7E 0%, #3E8868 100%)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
    Your values are saved.
  </h2>
  {/* Next section CTA */}
  <Link href="/plan/letters" className="btn-primary btn-sm">Next: Letters →</Link>
</div>
```

### Ambient Wave Background (plan pages)
```tsx
<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden no-print">
  <svg viewBox="0 0 200 100" preserveAspectRatio="none"
    style={{ position: 'absolute', bottom: 0, left: 0, width: '200%', height: '45%',
      animation: 'wave-bwd 38s linear infinite', opacity: 0.042 }}>
    <path fill="#9B5CAF" d="M0,32 q25,-22 50,0 q25,22 50,0 q25,-22 50,0 q25,22 50,0 L200,100 L0,100 Z" />
  </svg>
  <svg viewBox="0 0 200 100" preserveAspectRatio="none"
    style={{ position: 'absolute', bottom: 0, left: 0, width: '200%', height: '45%',
      animation: 'wave-fwd 26s linear infinite', opacity: 0.055 }}>
    <path fill="#5B8DEF" d="M0,58 q25,-16 50,0 q25,16 50,0 q25,-16 50,0 q25,16 50,0 L200,100 L0,100 Z" />
  </svg>
</div>
```

---

## Deployment

```bash
cd /tmp/stillwater
vercel --yes
# copy the preview URL from output, then:
vercel alias set <preview-url>.vercel.app stillwatercare.vercel.app
```

Build first to catch TypeScript errors before deploying:
```bash
npm run build
```

---

## Rules

### Always
- `'use client'` at top of every plan page
- `max-w-4xl mx-auto px-6 py-12` for plan page containers
- `if (!loaded) return null;` before rendering plan data
- Use `onMouseEnter/Leave` for hover border/shadow on arbitrary Tailwind colors (CSS can't do `hover:border-[#C4B0E8]` reliably with inline style overrides)
- Stagger `animate-fade-up` with inline `animationDelay` for sibling cards
- Give adjacent featured cards **distinct color families** — never two blue, never two sage

### Never
- Add server-side code, API routes (except `/api/draft`), database, or auth
- Use `max-w-2xl` for plan page containers
- Share the same `float-a/b/c` keyframe duration between sibling blob orbs — always use different values (e.g., 14s, 17s, 20s)
- Add verbose comments or multi-line docstrings
- Forget `position: relative` + `overflow: hidden` on cards that contain absolute-positioned orbs

---

## Visual Principles

The user responds strongly to:
- **Layered atmospheric depth**: ambient waves + floating orbs + frosted glass
- **Micro-interactions**: hover shimmer, icon scale, arrow translate, accent bar spark
- **Editorial restraint**: generous whitespace, Cormorant serif headings, muted palette
- **Emotional specificity**: milestone copy ("You've begun. That's the hardest step."), family guide grief note

High bar: every major visual feature has earned "Wow!" or "Beautiful!" — don't hold back.
