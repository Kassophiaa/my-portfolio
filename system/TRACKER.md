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
| Tech stack | React 19 + Vite 8 (JavaScript/JSX), ESLint 10, plain CSS (per-component files), Google Fonts |
| Runtime (dev machine) | Node v26.8.1, npm 11.19.0 |
| Current stage | Phase 5 — Implementation done with placeholder content; waiting on owner content |
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
| Sections | Hero, About, Projects, Skills, Education, Contact (no blog, stats, testimonials) | Agreed + built |
| Design | Dark charcoal base, violet + mint accents, expressive type, polished light theme, no template look | Agreed + built |
| Interactions | Mobile menu, active nav, smooth scroll, persistent theme, project filter + detail dialog, copy email, résumé download, unavailable/missing states, reduced motion | Agreed + built |
| Responsiveness | Mobile-first; 320px → 1920px with no horizontal overflow | Agreed + verified |
| Accessibility | Semantic HTML, keyboard nav, visible focus, skip link, labels, reduced motion, WCAG AA target | Agreed + partially verified |
| Performance | Minimal deps (none added), lazy images | Agreed |
| SEO | Title, description, OG tags, favicon | Done (title has no name yet) |
| Contact | Direct `mailto:` + copy; no fake form, no backend | Agreed + built |
| Personal content | Must come from owner — never invented | **Pending (see Blockers)** |

## 4. Project Structure

| Path | Responsibility |
|---|---|
| `src/data/profile.js` | **Edit here:** name, intro, about, email, résumé, links, location, education |
| `src/data/projects.js` | **Edit here:** projects (`draft: true` = placeholder slot) |
| `src/data/skills.js` | **Edit here:** skill groups |
| `src/lib/content.js` | `todo()` marker + `isMissing()` helper for missing content |
| `src/components/Field.jsx` | Renders value or dashed "TODO" placeholder |
| `src/components/*.jsx` + `*.css` | One component + stylesheet per section (Header, Hero, About, Projects/ProjectCard/ProjectDialog, Skills, Education, Contact, Footer, SectionHeading, Icon) |
| `src/hooks/` | `useTheme` (localStorage `portfolio-theme`), `useActiveSection` (scroll spy), `useReveal` (entrance animation), `useCopy` (clipboard) |
| `src/index.css` | Design tokens (both themes), base, buttons, chips, `.todo`, motion + reduced-motion |
| `src/App.jsx` / `App.css` | Section order + nav list; footer styles |
| `src/assets/projects/portfolio.jpg` | Real screenshot of this site (still shows TODO placeholders) |
| `index.html` | Meta/OG tags, fonts, pre-paint theme script |
| `public/favicon.svg` | Custom `< _ >` mark |

## 5. Development Phases

| # | Phase | Status |
|---|---|---|
| 1 | Setup | Done |
| 2 | Planning | Done (sections agreed in brief) |
| 3 | Design | Done |
| 4 | Content | **Blocked on owner** |
| 5 | Implementation | Done (with placeholders) |
| 6 | Testing | Automated browser checks done; Lighthouse + real-device check pending |
| 7 | Deployment | Not started |
| 8 | Maintenance | Not started |

## 6. Task Checklist

**Setup**
- [x] React + Vite scaffold, build/lint/dev server verified
- [x] Git repo with GitHub remote (found 2026-10-26)

**Implementation (2026-10-26)**
- [x] Removed template boilerplate (`src/assets/*.png/svg`, `public/icons.svg`)
- [x] Content separated into `src/data/*`; missing info rendered as visible TODO placeholders
- [x] Header: sliding active pill, scroll spy, mobile menu (Esc, focus, scroll lock), theme toggle
- [x] Hero with data-driven code card; About; Projects (filters + `<dialog>` details); Skills; Education timeline; Contact (mailto, copy, résumé, links); Footer
- [x] SEO meta, OG tags, favicon, skip link, reduced-motion support

**Verified 2026-10-26** (`npm run build`, `npm run lint`, Playwright + Edge against `vite preview`)
- [x] No horizontal overflow at 320/390/768/1280/1920 px, dark + light
- [x] Theme follows system, toggles, persists across reload
- [x] Mobile menu open/close/Escape/focus return/link navigation
- [x] Active nav + indicator alignment; filters (All/Academic/#React) + live announcement
- [x] Dialog: keyboard open, Escape + backdrop close, focus return, unavailable live link
- [x] Reduced motion: content visible, no smooth scroll, animations disabled
- [x] Skip link, single h1, no duplicate ids, no console errors
- [ ] Copy-email success path (untestable until a real email is set)
- [ ] Résumé download (no PDF yet)
- [ ] Lighthouse audit; check on a real phone

**Content (owner)**
- [ ] Name, location, email, LinkedIn → `src/data/profile.js`
- [ ] Degree, school, years, details, coursework, real certifications → `education` in `profile.js`
- [ ] Real projects (2–4) with summary, tech, links, screenshots → `src/data/projects.js`; delete draft slots
- [ ] Confirm/adjust skills in `src/data/skills.js` (pre-filled from this project's stack) + add "Currently learning"
- [ ] Review About copy (written from the brief) for accuracy
- [ ] Add `public/resume.pdf` and set `resume: '/resume.pdf'`
- [ ] Confirm GitHub URL is your public profile and the repo is public
- [ ] Put name in `index.html` `<title>`/`og:title`; retake `portfolio.jpg` screenshot

**Deployment**
- [ ] Choose host (Vercel / Netlify / GitHub Pages) and deploy
- [ ] Set project `links.live`; record URL here and in README

## 7. Technical Decisions

| Decision | Reason |
|---|---|
| React + Vite (JS) | Requested stack |
| Plain CSS, one file per component, tokens on `:root` / `[data-theme]` | No deps, easy theming |
| No new runtime dependencies | Performance; native `<dialog>`, IntersectionObserver, Clipboard API suffice |
| `todo()` placeholders instead of fake data | Never invent personal info; missing items are obvious |
| Theme set by inline script in `index.html` before paint | Prevents light/dark flash |
| `mailto:` + copy button, no contact form | No backend needed; avoid fake form |
| Google Fonts: Bricolage Grotesque, Manrope, Instrument Serif, JetBrains Mono | Expressive, distinctive type; system fallbacks set |
| Browser tests run from scratchpad (playwright-core + system Edge), not added to project | Keep project deps minimal |

## 8. Issues and Blockers

| Issue | Next action |
|---|---|
| Personal content missing (name, email, school, projects, résumé, LinkedIn, location) | Owner to supply; edit `src/data/*` |
| Site shows TODO placeholders — not ready to send to recruiters | Fill content before sharing/deploying |
| Changes not committed | Owner to review, then commit |

## 9. Progress Log

- **2026-10-26** — Verified scaffold; created tracker + README.
- **2026-10-26** — Built full portfolio UI (6 sections, themes, nav, filters, dialog, contact). Build + lint pass; automated browser checks pass (see Checklist).

## 10. Next Action

**Owner fills `src/data/profile.js`** (name, email, location, LinkedIn, education) and sends real project details — then replace the draft project slots and retake the screenshot.
