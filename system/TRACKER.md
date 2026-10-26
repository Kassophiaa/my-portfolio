# Project Tracker — my-portfolio

> Single source of truth for progress, requirements, decisions, and remaining tasks.
> **Rules:** Read before each session. Update on task completion, requirement change, decision, or blocker.
> Only mark `[x]` after verification. Unknown info = `TBD` (never invent). If tracker ≠ code, trust code and fix tracker.
> Update Checklist + Next Action at the end of every session.

---

## 1. Project Overview

| Item | Value |
|---|---|
| Purpose | Personal developer portfolio for internship/OJT applications |
| Tech stack | React 19 + Vite 8 (JavaScript/JSX), ESLint 10, plain CSS (per-component files), Google Fonts. **No runtime deps beyond React.** |
| Runtime (dev machine) | Node v26.8.1, npm 11.19.0 |
| Current stage | Cosmic restyle + lanyard badge done; waiting on owner content |
| Repository URL | https://github.com/fernandezkassandra226-creator/my-portfolio (from `git remote`) |
| Deployment | Not deployed. Host: TBD |

## 2. Project Goals

- **Target audience:** Internship/OJT recruiters, HR staff, technical reviewers at companies in/near the owner's city (city TBD)
- **Purpose:** Present skills, projects, education, and contact info in one shareable link
- **Expected outcome:** A fast, responsive, accessible site linked from résumé/applications that leads to interviews
- **Application deadline(s):** TBD

## 3. Requirements

| Area | Requirement | Status |
|---|---|---|
| Sections | Hero, About, Projects, Skills, Education, Contact (no blog, stats, testimonials) | Built |
| Theme | "Cosmic UX": plum `#0D0818`, violet glows, purple glass cards, pink gradient accent, violet/lavender secondary, Playfair italic accent word, pink uppercase section labels. Tokens in `src/index.css` `:root` | Built |
| Light mode | Kept as lavender "daylight" variant (owner chose 2026-10-26) | Built |
| Hero badge | Lanyard ID card: drag + swing/settle physics, idle sway, 3D tilt, holo shimmer, click/button flip (back = skills + links), lazy-loaded; touch drag w/ heavier damping; static under reduced motion | Built + verified |
| Badge tech | 2D hand-written Verlet rope, no deps (owner chose 2026-10-26) | Decided |
| Contact form | Glass form that opens the visitor's email app via `mailto` — no backend (owner chose 2026-10-26). Disabled until email is set | Built |
| Interactions | Card lift/glow + sliding pink arrow; staggered reveals; skill glass tiles; scroll-filled timeline; hero cursor glow (desktop) | Built + verified |
| Responsiveness | 320px → 1920px, no horizontal overflow | Verified |
| Accessibility | Keyboard, visible focus (pink), skip link, labels, reduced motion, WCAG AA contrast | Verified (see Checklist) |
| Performance | Lighthouse mobile ≥ pre-upgrade score (85) | Verified: 85 |
| QR code on badge back | Skipped until résumé PDF + live URL exist | Deferred |
| Personal content | Must come from owner — never invented | **Pending** |

## 4. Project Structure

| Path | Responsibility |
|---|---|
| `src/data/profile.js` | **Edit here:** name, intro, about, `photo`, email, résumé, links, location, education |
| `src/data/projects.js` | **Edit here:** projects (`draft: true` = placeholder slot) |
| `src/data/skills.js` | **Edit here:** skill groups (non-"learning" items also appear on the badge back) |
| `src/index.css` | **All color tokens** (dark + `[data-theme='light']`), base, `.glass`, buttons, `.tick-list`, `.pulse-dot`, motion |
| `src/components/badge/` | `BadgeCard` (faces), `StaticLanyard` (fallback/reduced motion), `LanyardBadge` (lazy physics chunk), `Badge.css` |
| `src/components/Hero.jsx` | Loads badge after `load` + idle; cursor glow |
| `src/components/Skills.jsx` | Glass tiles + line-glyph map (unknown skills show initials) |
| `src/components/Contact.jsx` | `ContactForm` (mailto), email card, links |
| `src/hooks/` | `useTheme`, `useActiveSection`, `useReveal`, `useCopy`, `useReducedMotion`, `useScrollFill` (timeline) |
| `src/assets/projects/portfolio.webp` | 960px screenshot of the new hero (still shows TODO placeholders) |
| `index.html` | Meta/OG, non-blocking Google Fonts, pre-paint theme script |
| `public/robots.txt`, `public/favicon.svg` | SEO + icon |

## 5. Development Phases

| # | Phase | Status |
|---|---|---|
| 1–3 | Setup, planning, design | Done |
| 4 | Content | **Blocked on owner** |
| 5 | Implementation (v1 + cosmic upgrade) | Done |
| 6 | Testing | Automated browser + Lighthouse done; real-device check pending |
| 7 | Deployment | Not started |
| 8 | Maintenance | Not started |

## 6. Task Checklist

**Cosmic upgrade (2026-10-26)** — checkpoint before it: commit `92d8314`
- [x] Palette/typography tokens, glass surfaces, section glows, pink labels, accent words
- [x] Lanyard badge (physics, flip, tilt, shimmer, clip/ring, lazy chunk ~2.5 KB gz)
- [x] Project card glow + sliding arrow; skill glass tiles; timeline scroll fill; hero cursor glow
- [x] Contact glass form (mailto)
- [x] Perf fixes: deferred physics, async fonts, WebP image, robots.txt

**Verified 2026-10-26** (`npm run build`, `npm run lint`, Playwright + Edge vs `vite preview`: 62/62 checks)
- [x] No horizontal overflow 320–1920 px, dark + light
- [x] Theme toggle/persistence; mobile menu; active nav; filters; dialog; skip link; no console errors
- [x] Badge: lazy chunk loads after idle; strap anchored at page top (desktop) / stage (mobile); drag follows pointer; swings and settles (≈4 s); click + keyboard flip; hidden face inert; hover tilt
- [x] Badge touch drag via emulated touch events (CDP) in mobile context; settles
- [x] Reduced motion: static badge, physics never loaded, no cursor glow, flip still works
- [x] Card arrow slide-in, timeline fill on scroll, form disabled without email
- [x] Lighthouse mobile: Perf 85 (baseline 85), A11y 100, Best Practices 100, SEO 100 (light theme)
- [x] Dark-theme contrast computed: lowest pair muted on glass 4.61:1 (AA)
- [ ] Contact form send path + copy email (needs real email)
- [ ] Test badge on a real phone (only emulated touch tested)

**Content (owner)**
- [ ] Name, location, email, LinkedIn, **badge photo** → `src/data/profile.js`
- [ ] Degree, school, years, details, coursework, real certifications → `education`
- [ ] Real projects (2–4) with screenshots → `src/data/projects.js`; delete draft slots
- [ ] Confirm skills in `src/data/skills.js` + add "Currently learning"
- [ ] Review About copy for accuracy
- [ ] Add `public/resume.pdf`, set `resume: '/resume.pdf'`
- [ ] Confirm GitHub URL is your public profile and the repo is public
- [ ] Put name in `index.html` `<title>`/`og:title`; retake `portfolio.webp`

**Deployment**
- [ ] Choose host (Vercel / Netlify / GitHub Pages) and deploy
- [ ] Set project `links.live`; record URL here and in README
- [ ] Optional: QR code to résumé on badge back (needs live URL)

## 7. Technical Decisions

| Decision | Reason |
|---|---|
| React + Vite (JS), plain CSS, tokens on `:root` / `[data-theme]` | Requested stack; easy theming |
| No new runtime dependencies | Performance; native `<dialog>`, IntersectionObserver, Clipboard API, hand-written physics suffice |
| Badge: 2D Verlet rope (11 particles) + 2-particle card pendulum, fixed 60 Hz step | ~2.5 KB vs ~1 MB for R3F + Rapier; owner approved |
| Badge loads after `load` + `requestIdleCallback`; static badge shows first | Cut TBT 400 ms → 0 ms; no layout shift |
| Badge card stays dark in light mode | Reads as a physical ID card; keeps contrast |
| Contact form uses `mailto` | No backend/accounts; no fake form; owner approved |
| Google Fonts loaded via preload + onload (non-blocking) | FCP; system fallbacks set |
| `todo()` placeholders instead of fake data | Never invent personal info |
| Browser tests/Lighthouse run from scratchpad (playwright-core, system Edge/Chrome) | Keep project deps minimal |

## 8. Issues and Blockers

| Issue | Next action |
|---|---|
| Personal content missing (name, photo, email, school, projects, résumé, LinkedIn, location) | Owner to supply; edit `src/data/*` |
| Site shows TODO placeholders — not ready to send to recruiters | Fill content before sharing/deploying |
| FCP ~3.4 s on Lighthouse mobile (SPA must download JS before render; same as before upgrade) | Optional later: prerender/SSG if needed |
| Upgrade changes not committed | Owner to review, then commit |

## 9. Progress Log

- **2026-10-26** — Verified scaffold; created tracker + README.
- **2026-10-26** — Built v1 portfolio UI (6 sections, themes, nav, filters, dialog, contact). Committed as `92d8314`.
- **2026-10-26** — Cosmic restyle + lanyard ID badge + interactive touches + glass mailto form. 62/62 browser checks; Lighthouse mobile 85/100/100/100.

## 10. Next Action

**Owner fills `src/data/profile.js`** (name, photo, email, location, LinkedIn, education) and sends real project details — then replace draft slots, retake the screenshot, and test the badge on a real phone.
