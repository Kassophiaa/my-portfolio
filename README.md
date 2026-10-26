# my-portfolio

Personal developer portfolio for internship/OJT applications, built with React + Vite.

> Status: UI complete; personal content still being added. Progress is tracked in [system/TRACKER.md](system/TRACKER.md).

## Editing content

All text lives in `src/data/` — no layout code needs to change:

- `profile.js` — name, intro, about, badge photo, email, résumé, links, education
- `projects.js` — projects (`draft: true` entries are placeholders)
- `skills.js` — skill groups, each skill tagged "used in projects", "familiar with", or "currently learning"

Anything still marked `todo(...)` shows on the site as a dashed **TODO** placeholder (for example the email
address — the contact form stays disabled until it is set).

Colors and theme tokens (dark + light) live at the top of `src/index.css`.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Live site

TBD
