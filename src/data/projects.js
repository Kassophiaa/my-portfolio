import { todo } from '../lib/content.js'

// Screenshots and demo videos live in src/assets/projects/ and are picked by file name
// (without the extension): shot('daris') → daris.png, demo('daris-demo') → daris-demo.mp4.
// Screenshots: landscape, about 16:10 (e.g. 1280×800). Videos (.mp4 or .webm, name ending
// in "-demo") play in the details window and only download when a visitor presses play.
const screenshots = import.meta.glob('../assets/projects/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})
const videos = import.meta.glob('../assets/projects/*-demo.{mp4,webm}', {
  eager: true,
  import: 'default',
})
const find = (files, name) =>
  Object.entries(files).find(([path]) => path.split('/').pop().replace(/\.\w+$/, '') === name)?.[1] ?? null
const shot = (name) => find(screenshots, name)
const demo = (name) => find(videos, name)

// Projects shown in the Projects section, in this order. Each one follows the same outline:
//   category  Academic, Personal, or Prototype
//   status    where it stands today (e.g. 'Completed', 'In progress')
//   summary   one line for the card
//   description  overview: what it is and the problem it solves
//   highlights   key features (shown as "Key features")
//   tech, role
//   next      optional: known limitations / what's planned (shown as "What's next")
//   video     optional demo recording; links.live is a deployed URL
// Links left as todo() show as "soon" instead of pointing at a fake URL.
// Missing `year` or `status` is hidden; missing `role` shows a TODO placeholder in the dialog.
export const projects = [
  {
    id: 'daris',
    title: 'DARIS',
    category: 'Academic',
    featured: true,
    summary:
      'Academic capstone: a web system for managing disciplinary cases, records, notifications, and workflows.',
    description: [
      'My academic capstone project, built with Laravel and MySQL. It brings disciplinary cases, the records that go with them, notifications, and the steps of the process together in one system.',
    ],
    highlights: [
      'Management of disciplinary cases',
      'Record keeping backed by a MySQL database',
      'Notifications',
      'Workflows for handling cases',
    ],
    tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    role: todo('Your role on this project'),
    status: 'Completed',
    image: shot('daris'),
    imageAlt: 'DARIS dashboard with case totals, cases per month, cases by status, and upcoming hearings',
    video: demo('daris-demo'),
    links: { live: todo('Demo URL'), repo: todo('Repository URL') },
  },
  {
    id: 'spendwise',
    title: 'SpendWise',
    category: 'Personal',
    year: 2026,
    summary:
      'A responsive personal finance tracker for income, expenses, budgets, and savings goals, with charts and CSV export.',
    description: [
      'A personal finance tracker built with React and TypeScript. It runs without an account in browser-local mode and starts with clearly labeled sample entries, so the dashboard is useful from the first launch.',
      'Amounts are stored as whole centavos to avoid rounding errors and shown in PHP. A Supabase schema with row-level security is ready for the planned cloud version.',
    ],
    highlights: [
      'Overview of account balances, period income and expenses, and a six-month chart',
      'Category breakdown, monthly budget progress, and savings goals',
      'Add, edit, search, and filter transactions; delete with confirmation',
      'Export the filtered entries as CSV',
      'Responsive layout for mobile, tablet, and desktop',
      'Supabase migration with row-level security on every user-owned table',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'Recharts', 'Supabase', 'CSS'],
    role: 'Design and development',
    status: 'In progress',
    next: [
      'Sign-in and cloud sync with Supabase (data is saved in the browser for now)',
      'Account transfers and recurring transactions',
      'Custom categories and automated tests',
    ],
    image: shot('spendwise'),
    imageAlt: 'SpendWise overview with total balance, income, expenses, a cash-flow chart, and a spending breakdown',
    video: demo('spendwise-demo'),
    links: {
      live: todo('Live URL after deployment'),
      repo: todo('Repository URL (make the GitHub repo public first)'),
    },
  },
  {
    id: 'daywall',
    title: 'DayWall',
    category: 'Personal',
    year: 2026,
    summary:
      'A routine, goals, and day planner that runs as a Windows desktop wallpaper: offline, no account needed.',
    description: [
      'A personal planner that lives on the desktop. It shows the current part of the day on a 24-hour clock ring, what’s now and next, and the day’s goals, all as a live wallpaper through Lively Wallpaper.',
      'It works completely offline and needs no account: everything is saved on the laptop itself. The build produces a single HTML file that serves as the wallpaper.',
    ],
    highlights: [
      '24-hour clock ring with "Now" and "Next" blocks and time left',
      'Separate School and Home routines with an editor',
      'Daily goals, a skincare checklist, and a 15-day challenge with progress tracking',
      'Saves everything locally; nothing is sent to the internet',
      'Single-file build that runs as a live wallpaper in Lively',
      'Light on battery: updates once per second with no constant animations',
    ],
    tech: ['React', 'JavaScript', 'Vite', 'CSS'],
    role: 'Design and development',
    status: 'Completed',
    image: shot('daywall'),
    imageAlt: 'DayWall wallpaper showing a 24-hour clock ring, the current block, and the day’s timeline',
    video: demo('daywall-demo'),
    links: {
      // It's a desktop wallpaper, so the recording is the demo.
      live: null,
      repo: todo('Repository URL (make the GitHub repo public first)'),
    },
  },
  {
    id: 'fintrack',
    title: 'FinTrack',
    category: 'Personal',
    year: 2026,
    summary:
      'A personal finance dashboard for tracking income, expenses, savings, and investments, with selective data sharing with financial advisors.',
    description: [
      'FinTrack helps users track their income, expenses, savings, and investments in one place, and connect with financial advisors by choosing exactly which data each advisor can see.',
      'It has three roles, each with its own area: clients manage their finances, advisors work with the clients who shared data with them, and administrators oversee the platform.',
    ],
    highlights: [
      'Dashboard with monthly income, expenses, net savings, and investment return',
      'Six-month income vs. expenses chart and top spending categories',
      'Income, expense, investment, and bank account / e-wallet management with live search',
      'Advisor discovery with selective data sharing that can be changed or revoked at any time',
      'Advisor workspace: shared client data (unshared sections stay locked), advice, messaging, and ratings and reviews',
      'Admin dashboard: platform overview, user management, data-sharing permissions, and rating moderation',
      'Notifications for new advice, new clients, access changes, and ratings',
    ],
    tech: ['PHP 8', 'MySQL', 'mysqli', 'jQuery', 'Bootstrap 5', 'Bootstrap Icons', 'Chart.js'],
    role: todo('Your role on this project'),
    image: shot('fintrack-main-page'),
    imageAlt:
      'FinTrack client dashboard with total balance, monthly income, expenses, savings, investments, a six-month income vs. expenses chart, and top spending',
    video: demo('fintrack-live-demo'),
    links: {
      live: todo('Demo URL'),
      repo: 'https://github.com/Kassophiaa/FinTrack',
    },
  },
  {
    id: 'mealmap',
    title: 'MealMap',
    category: 'Personal',
    year: 2026,
    summary:
      'A meal planner and grocery manager that plans the week, tracks the pantry and expiry dates, and suggests recipes from what you already have.',
    description: [
      'MealMap helps users plan the week’s meals, keep a recipe collection, track pantry items and their expiry dates, and turn the meal plan into a grocery list that already accounts for what’s in the pantry.',
      'Its main feature, Cook from Pantry, checks every recipe against the pantry and shows a match percentage, the exact quantities still missing, and which recipes use items that expire soon. It runs in a local demo mode with sample data, or with Supabase for accounts and cloud storage.',
    ],
    highlights: [
      'Weekly meal planner (breakfast, lunch, dinner, optional snack) with servings, week navigation, and copy last week',
      'Recipe collection with search, filters, serving-size scaling, and a full-screen cooking mode',
      'Pantry tracking with expiry and low-stock warnings',
      'Grocery list generated from the meal plan, with pantry stock subtracted and duplicates combined',
      'Cook from Pantry: recipes ranked by pantry match, prioritising items that expire soon',
      'Unit conversion and ingredient-name matching, covered by unit tests',
      'Supabase mode with sign-in and row-level security; local demo mode without an account',
    ],
    tech: ['React', 'JavaScript', 'Vite', 'Tailwind CSS', 'React Router', 'Recharts', 'Supabase', 'Vitest'],
    role: 'Design and development',
    status: 'Completed',
    image: shot('mealmap-dashboard'),
    imageAlt:
      'MealMap dashboard with today’s meals, recipe, pantry, expiry, and shopping-list figures, and cook-from-pantry suggestions',
    video: demo('mealmap-demo'),
    links: {
      live: todo('Demo URL'),
      repo: todo('Repository URL (make the GitHub repo public first)'),
    },
  },
  {
    id: 'clsu-merit',
    title: 'CLSU Merit',
    category: 'Personal',
    year: 2026,
    summary:
      'A semester GWA and academic honors calculator for Central Luzon State University students.',
    description: [
      'CLSU Merit lets a student record their subjects each semester and calculates the semester GWA and honor, plus an overall GWA across all semesters so far.',
      'The honor cut-offs are set in a configuration file and are placeholders, not verified official CLSU policy. Each student manages only their own record; there is no administrator.',
    ],
    highlights: [
      'Student sign-up and login with a student ID; each student sees only their own grades',
      'Semester records: add, edit, and delete subjects with units and grades (including INC and DRP)',
      'Semester GWA and overall GWA, weighted by units',
      'Honors classification from configurable rules, with Latin honor standing so far',
      'Remarks per subject and a semester GWA trend chart',
      'CSV import and export; a local Flask website and a terminal menu',
      '162 automated tests',
    ],
    tech: ['Python', 'Flask', 'Jinja', 'JavaScript', 'CSS', 'pytest'],
    role: todo('Your role on this project'),
    image: shot('clsu-merit-dashboard'),
    imageAlt: 'CLSU Merit dashboard with the overall GWA, total units, and a list of semesters with their GWA and honor',
    video: demo('clsu-merit-demo'),
    links: {
      live: todo('Demo URL'),
      repo: todo('Repository URL (make the GitHub repo public first)'),
    },
  },
  {
    id: 'studysync',
    title: 'StudySync',
    category: 'Personal',
    year: 2026,
    summary:
      'A student productivity workspace for tasks, subjects, a weekly study planner, a focus timer, and study progress.',
    description: [
      'StudySync keeps schoolwork in one place: tasks and their due dates, subjects, planned study sessions, and a focus timer that records the time studied.',
      'Built with React and TypeScript. It works without an account and saves everything in the browser; a Supabase schema with owner-only security is ready for the planned cloud version.',
    ],
    highlights: [
      'Home dashboard with today’s plan, upcoming tasks, a weekly chart, goal progress, and study streak',
      'Tasks: add, edit, complete, and delete with undo; search and filter by status, subject, and priority',
      'Subjects whose renames carry over to tasks, plans, and history',
      'Weekly study planner and monthly calendar with overlap warnings',
      'Focus timer with focus, short-break, and long-break modes and optional browser notifications',
      'Progress page with study time by day and by subject',
      'JSON backup and restore; responsive layout with mobile bottom navigation',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'React Router', 'Recharts', 'date-fns', 'CSS'],
    role: 'Design and development',
    status: 'In progress',
    next: ['Sign-in and cloud sync with Supabase (data is saved in the browser for now)'],
    image: shot('studysync-dashboard'),
    imageAlt:
      'StudySync home dashboard with quick actions, study time today and this week, tasks done, study streak, and upcoming tasks',
    video: demo('studysync-demo'),
    links: {
      live: todo('Demo URL'),
      repo: todo('Repository URL (make the GitHub repo public first)'),
    },
  },
]