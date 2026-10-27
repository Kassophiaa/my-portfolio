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
| Tech stack | React 19 + Vite 8 (JavaScript/JSX), ESLint 10, plain CSS (per-component files), self-hosted fonts in `public/fonts/`. **No runtime deps beyond React.** |
| Runtime (dev machine) | Node v26.8.1, npm 11.19.0 |
| Current stage | Real content in place (2026-10-27); a few items still `todo()` (email, LinkedIn, project roles/links/years, photo, résumé) |
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
| Performance | Lighthouse mobile ≥ pre-upgrade score (85) | Verified: median 92 (5 runs) |
| QR code on badge back | Skipped until résumé PDF + live URL exist | Deferred |
| Sample content | Replaced 2026-10-27; `SAMPLE_CONTENT = false` (flag + `SampleNotice` kept) | Done |
| Personal content | Name, role, CLSU 4th-year BSIT, location (Philippines), about, 4 real projects (DARIS, StudySync, Bloom Journal, StockLite) + this portfolio, skills, coursework, GitHub. Remaining gaps are `todo()` — see Content checklist | Mostly done |
| Skills levels | Each skill tagged `used` / `familiar` / `learning` in `skills.js`, shown as labelled rows per group; levels are Claude's conservative defaults — **owner to confirm** | Built |
| Skills layout | One group at a time: tab column beside a single panel (≥ 820 px; rail is sticky), swipeable tab row above it on phones. Arrow/Home/End keys move between tabs (owner asked 2026-10-28: "one column, interactive, not just scrolling") | Built + verified |
| Hero | Name ≤ 2 lines at all widths; tagline "IT student who builds ___" rotates through `profile.builds` (static under reduced motion; screen readers get full list); heavier intro; GitHub icon button w/ hover label (missing links hidden); hover on facts; desktop "Scroll" cue → #about | Built + verified |
| About | Count-up stats computed from data (projects on site, skills used, skills learning); "Read more" folds paragraphs 2–3 on < 900 px; interests as hover chips | Built + verified |
| Section separation | Alternating tinted bands (About, Skills, Contact; `--band` token per theme) + glowing pink/violet divider line on top of every section (owner asked 2026-10-28) | Built + verified |
| Motion over interaction (2026-10-28) | Owner: "too much interactive, want more animation". Removed: About "Read more", GitHub hover label, hover lifts on hero facts / about stats / interest chips. Added (auto, scroll-triggered): `[data-stagger]` one-by-one reveals (`useReveal` sets `--i`), section titles wipe up from a mask, eyebrow rule grows, section dividers draw from centre + flowing gradient, heading accent words flow pink↔violet, hero name light sweep, drifting hero lights, skill tiles pop in per tab, starfield breathes. All off under reduced motion | Built + verified |
| Project categories | Academic (DARIS), Personal (StudySync, Bloom Journal, Portfolio), Prototype (StockLite) | Built |

## 4. Project Structure

| Path | Responsibility |
|---|---|
| `src/data/profile.js` | **Edit here:** `SAMPLE_CONTENT` flag, name, intro, hero `facts`, about, `photo`, email, résumé, links, location, education |
| `src/components/SampleNotice.jsx` | Dismissible "sample content" pill, shown while `SAMPLE_CONTENT` is true |
| `public/fonts/` | Self-hosted latin WOFF2 (Bricolage Grotesque, Manrope, Playfair Display italic, JetBrains Mono) + `LICENSE.md` (OFL 1.1) |
| `src/data/projects.js` | **Edit here:** projects (`draft: true` = placeholder slot) |
| `src/data/skills.js` | **Edit here:** `skillLevels`, skill groups (`compact` = chips), `badgeSkills` (badge back) |
| `src/index.css` | **All color tokens** (dark + `[data-theme='light']`), base, `.glass`, buttons, `.tick-list`, `.pulse-dot`, motion |
| `src/components/badge/` | `BadgeCard` (faces), `StaticLanyard` (fallback/reduced motion), `LanyardBadge` (lazy physics chunk), `Badge.css` |
| `src/components/Hero.jsx` | Loads badge after `load` + idle; cursor glow |
| `src/components/Skills.jsx` | Tabbed groups (ARIA tabs), glass tiles + line-glyph map (unknown skills show initials) |
| `src/components/Contact.jsx` | `ContactForm` (mailto), email card, links |
| `src/hooks/` | `useTheme`, `useActiveSection`, `useReveal` (`[data-reveal]` → `is-visible`, sections → `is-inview`, `[data-stagger]` children get `--i`), `useCopy`, `useReducedMotion`, `useScrollFill` (timeline) |
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

**Layout + sample content (2026-10-26)** — checkpoint before it: commit `065448a`
- [x] Tighter section spacing; two-column section heads on desktop (page 6926 → 5685 px tall at 1440)
- [x] Hero facts strip (Studying / Year / Focus / Based in)
- [x] Projects: featured = full-width horizontal card, others in 3-col row; tech filters only for techs used by 2+ projects; shorter placeholder covers on phones
- [x] Skills: bento of glass panels (first full width), new line glyphs (PHP, MySQL, Figma, TS, Node, Testing)
- [x] Sample data in all data files + `SampleNotice`
- [x] Fixed 320px overflow from long coursework chips
- [x] Perf: found via trace that late web-font swaps forced full relayouts (0.36 s + 0.93 s at 4× CPU); self-hosted + preloaded fonts, badge waits for `document.fonts.ready`, badge layout coalesced/skipped when unchanged
- [x] Verified: build + lint; 69/69 browser checks incl. **copy email → clipboard**, **form validation + mailto URL** (address/subject/body), sample notice dismiss; Lighthouse mobile perf 94/72/92/91/92 (median 92), A11y/BP/SEO 100

**Mobile hero (2026-10-26)** — owner: "show the ID first on mobile; desktop is good"
- [x] < 960 px: badge first (`order: -1`), strap hangs from page top (all widths), intro centred under it on tablets; desktop unchanged
- [x] Touch: `touch-action: pan-y` on badge — vertical swipe scrolls page, sideways drag swings, tap flips; swing-in nudge desktop-only
- [x] ≤ 360 px badge footer fits on one line; sample notice compact on phones
- [x] Verified: 71/71 browser checks incl. badge-above-intro, strap at page top, vertical swipe on card scrolls (0 → 344 px), sideways touch drag, no overflow at 320 px

**Real content (2026-10-27)** — verified: lint + build; Playwright/Edge vs preview: no overflow 320/390/768/1440, no console errors, no "Alex/Santos/Sample State/example.com" in page text, filters (All 5, Academic 1, Personal 3, Prototype 1, #CSS/#JavaScript/#React/#PHP), dialog open/close, form disabled without email, badge back fits 8 skills, 6 skill groups (last spans full width)
- [x] Name, role, location, intro, hero facts, about, interests, seeking → `profile.js`
- [x] Education: CLSU, BSIT, fourth year, coursework (no dates/awards)
- [x] Projects: DARIS (featured), StudySync, Bloom Journal, StockLite + portfolio; dialog hides missing year
- [x] Skills regrouped by area with level rows; new glyphs (responsive, REST) + aliases
- [x] `index.html` title/meta with name; `portfolio.webp` retaken (dark, 960×600)
- [ ] **Email** → `profile.email` (form + copy stay disabled until set)
- [ ] LinkedIn URL (or remove the entry), badge photo, `public/resume.pdf`
- [ ] Per project: role, year, repo/demo links, screenshots
- [ ] Confirm skill levels (esp. Database Design, CRUD, SQL as "used"; C/C++/Java/Python, XAMPP, Postman as "familiar"; REST API, Python for Data Analysis, Testing as "learning")
- [ ] Optional: city/province and work arrangement (on-site/hybrid/remote)

**Skills tabs (2026-10-28)** — checkpoint before it: commit `71d36e4`
- [x] Bento replaced with tab list + one panel; content animates in on switch
- [x] Verified: lint + build; Playwright/Edge vs preview at 320/390/768/1440: no overflow, 6 tabs, click + arrow keys switch, focus follows, wraps, no console errors

**Home + About polish (2026-10-28)**
- [x] Hero: smaller name, rotating tagline, larger/heavier intro, GitHub button, phone button grid, scroll cue
- [x] About: stats count-up, mobile "Read more", interest chips, larger body text
- [x] Verified: lint + build; Playwright/Edge at 320/390/768/1024/1440: no overflow, name ≤ 2 lines, word rotates, stats reach 5/21/3, Read more toggles (< 900) / hidden (≥ 900), no console errors; reduced motion: static word + final numbers; dark theme screenshot checked
- [ ] Owner: review rotating phrases in `profile.builds`

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
| Fonts self-hosted (latin subset) + `<link rel=preload>` | Trace showed late Google-Fonts swaps caused full relayouts; preloading makes them ready before first render. Lighthouse median 85 → 92 |
| Sample content flagged in code + on page (`SAMPLE_CONTENT`) | Owner wanted editable sample info; notice prevents shipping fake details by accident |
| `todo()` placeholders instead of fake data | Never invent personal info |
| Browser tests/Lighthouse run from scratchpad (playwright-core, system Edge/Chrome) | Keep project deps minimal |

## 8. Issues and Blockers

| Issue | Next action |
|---|---|
| Contact form disabled — no email yet | Owner provides email |
| Lighthouse perf varies run to run (one outlier 72 in 5 runs) | Re-check on deployed host |
| Layout + sample + real-content changes not committed | Owner to review, then commit |

## 9. Progress Log

- **2026-10-26** — Verified scaffold; created tracker + README.
- **2026-10-26** — Built v1 portfolio UI (6 sections, themes, nav, filters, dialog, contact). Committed as `92d8314`.
- **2026-10-26** — Cosmic restyle + lanyard ID badge + interactive touches + glass mailto form. Committed as `065448a`.
- **2026-10-26** — Layout pass (spacing, section heads, featured project, skills bento, hero facts) + sample content + self-hosted fonts. 69/69 checks; Lighthouse median 92.
- **2026-10-26** — Mobile/tablet hero: ID badge first, strap from page top, swipe-friendly touch handling. 71/71 checks.
- **2026-10-27** — Replaced all sample content with owner's real details; skills now show used/familiar/learning levels; screenshot retaken.
- **2026-10-28** — Skills section switched to tabs (one group visible at a time). Not committed.
- **2026-10-28** — Home + About layout, type, and interaction pass (see checklist). Not committed.
- **2026-10-28** — Clear section separation: alternating bands + glowing dividers; checked light/dark 1440 + light 390, no overflow. Not committed.
- **2026-10-28** — Fewer hover/click extras, more automatic animation (see Requirements). Lint + build; Playwright at 320–1440 with gradual scrolling: staggered items + titles end visible, dividers drawn, skill tiles visible, no overflow/console errors; reduced motion static. Not committed.

## 10. Next Action

**Owner provides email** (`profile.email`), confirms skill levels, and adds per-project role/year/links — then commit and choose a host.
