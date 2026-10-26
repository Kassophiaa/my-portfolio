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
| Tech stack | React 19 + Vite 8 (JavaScript/JSX), ESLint 10, plain CSS |
| Runtime (dev machine) | Node v26.8.1, npm 11.19.0 |
| Current stage | Phase 1 — Setup complete; Phase 2 — Planning not started |
| Repository URL | TBD (folder is not a git repo yet) |
| Deployment | Not deployed. Host: TBD |

## 2. Project Goals

- **Target audience:** Internship/OJT recruiters, HR staff, and technical reviewers. Specific companies/roles: TBD
- **Purpose:** Present skills, projects, education, and contact info in one shareable link
- **Expected outcome:** A fast, responsive, accessible site linked from resume/applications that leads to interviews
- **Application deadline(s):** TBD

## 3. Requirements

| Area | Requirement | Status |
|---|---|---|
| Features / sections | TBD (candidates: Hero, About, Skills, Projects, Education, Contact) — needs owner confirmation | TBD |
| Design preferences | TBD (colors, fonts, style, dark mode?) | TBD |
| Responsiveness | Must work on mobile, tablet, desktop (mobile-first) | Agreed (baseline) |
| Accessibility | Semantic HTML, keyboard navigable, alt text, sufficient contrast (WCAG AA target) | Agreed (baseline) |
| Performance | Lightweight bundle, optimized images, no unnecessary deps | Agreed (baseline) |
| SEO | Real `<title>`, meta description, Open Graph tags, favicon | Agreed (baseline) |
| Personal content | Name, bio, skills, projects, links, resume file — **must come from owner** | TBD |

## 4. Project Structure

| Path | Responsibility |
|---|---|
| `system/TRACKER.md` | This tracker |
| `index.html` | HTML entry; `<title>` still `my-portfolio`, no meta tags yet |
| `src/main.jsx` | React root mount |
| `src/App.jsx`, `src/App.css` | **Vite template boilerplate** — to be replaced in implementation phase |
| `src/index.css` | Template global styles — to be replaced |
| `src/assets/` | Template images (`hero.png`, `react.svg`, `vite.svg`) — remove when replaced |
| `public/` | Static files (`favicon.svg`, `icons.svg` from template) |
| `vite.config.js` | Vite config with `@vitejs/plugin-react` |
| `eslint.config.js` | Lint rules (react-hooks, react-refresh) |
| `package.json` | Scripts: `dev`, `build`, `lint`, `preview` |
| `README.md` | Short project readme + commands |

## 5. Development Phases

| # | Phase | Status |
|---|---|---|
| 1 | Setup | Done |
| 2 | Planning (sections, content inventory) | Not started |
| 3 | Design (layout, colors, typography) | Not started |
| 4 | Content (owner-supplied info) | Not started |
| 5 | Implementation | Not started |
| 6 | Testing (responsive, a11y, Lighthouse) | Not started |
| 7 | Deployment | Not started |
| 8 | Maintenance | Not started |

## 6. Task Checklist

**Setup**
- [x] React + Vite project scaffolded, dependencies installed
- [x] `npm run build` passes (verified 2026-10-26)
- [x] `npm run lint` passes with no errors (verified 2026-10-26)
- [x] Dev server serves `http://localhost:5173` (HTTP 200, verified 2026-10-26)
- [x] `system/TRACKER.md` created
- [x] README replaced with project-specific version
- [ ] Initialize git repo + first commit
- [ ] Create remote repository (GitHub?) and record URL

**Planning**
- [ ] Confirm portfolio sections
- [ ] Collect owner content (name, bio, skills, projects, education, contact links, resume PDF)
- [ ] Decide component structure (`src/components/`, `src/data/`)

**Design**
- [ ] Choose color palette, fonts, dark mode yes/no
- [ ] Sketch layout (mobile + desktop)

**Implementation**
- [ ] Remove template boilerplate (`App.jsx`, CSS, `src/assets/*`)
- [ ] Build sections from confirmed list
- [ ] Add SEO meta tags + real title/favicon

**Testing**
- [ ] Responsive check (mobile/tablet/desktop)
- [ ] Accessibility check (keyboard, contrast, alt text)
- [ ] Lighthouse audit

**Deployment**
- [ ] Choose host and deploy
- [ ] Record live URL here and in README

## 7. Technical Decisions

| Decision | Reason |
|---|---|
| React + Vite (JS, not TS) | Requested stack; existing scaffold uses JSX; simpler for a small site |
| Keep official Vite React template as base | Already installed and verified; no extra setup needed |
| Plain CSS for now (no UI framework) | Keeps bundle small; revisit in Design phase if needed |
| Personal content stored separately from components (planned: `src/data/`) | Easy updates without touching layout code — TBD confirm in Planning |

## 8. Issues and Blockers

| Issue | Next action |
|---|---|
| Not a git repository | Run `git init` and commit when owner approves |
| No personal content provided yet | Owner to supply content (see Planning tasks) |
| Template boilerplate still rendered | Replace during Implementation (intentionally kept for now) |

## 9. Progress Log

- **2026-10-26** — Verified existing Vite + React 19 scaffold (build, lint, dev server OK). Created tracker and project README. No portfolio UI built yet.

## 10. Next Action

**Planning: confirm the portfolio sections and gather the owner's content** (name, short bio, skills, 2–4 projects with links, education, contact/social links, resume PDF). Record the answers in Requirements before any UI work.
