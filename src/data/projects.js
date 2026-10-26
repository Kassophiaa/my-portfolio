import { todo } from '../lib/content.js'
import portfolioShot from '../assets/projects/portfolio.webp'

// Projects shown in the Projects section. `category` drives the filters and tells
// visitors what kind of work it is: Academic, Personal, or Prototype.
// Links left as todo() show as "soon" instead of pointing at a fake URL.
// Missing `year` is hidden; missing `role` shows a TODO placeholder in the dialog.
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
    image: null,
    links: { live: todo('Demo URL'), repo: todo('Repository URL') },
  },
  {
    id: 'studysync',
    title: 'StudySync',
    category: 'Personal',
    summary: 'A study planner for keeping track of tasks, assignments, deadlines, and focus sessions.',
    description: [
      'A personal project built with React and TypeScript to keep schoolwork organized in one place.',
    ],
    highlights: ['Tasks and assignments', 'Deadline tracking', 'Focus sessions'],
    tech: ['React', 'TypeScript', 'CSS'],
    role: todo('Your role on this project'),
    image: null,
    links: { live: todo('Demo URL'), repo: todo('Repository URL') },
  },
  {
    id: 'bloom-journal',
    title: 'Bloom Journal',
    category: 'Personal',
    summary: 'A personal journaling app with an aesthetic interface.',
    description: ['A personal project built with React, focused on a calm, aesthetic journaling experience.'],
    highlights: ['Personal journal entries', 'Aesthetic, custom-styled interface'],
    tech: ['React', 'JavaScript', 'CSS'],
    role: todo('Your role on this project'),
    image: null,
    links: { live: todo('Demo URL'), repo: todo('Repository URL') },
  },
  {
    id: 'stocklite',
    title: 'StockLite',
    category: 'Prototype',
    summary: 'An inventory management dashboard concept for tracking products and stock movements.',
    description: [
      'A prototype exploring how a lightweight inventory dashboard could work. It is a concept, not a finished product.',
    ],
    highlights: ['Product tracking', 'Stock movement tracking'],
    tech: ['PHP', 'JavaScript', 'Preact', 'CSS'],
    role: todo('Your role on this project'),
    image: null,
    links: { live: todo('Demo URL'), repo: todo('Repository URL') },
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    category: 'Personal',
    year: 2026,
    summary:
      'This site: a responsive, accessible portfolio with a draggable lanyard ID badge, built with React and Vite.',
    description: [
      'A single-page portfolio for internship and OJT applications. Content lives in plain data files so it can be updated without touching layout code.',
    ],
    highlights: [
      'Draggable ID badge with hand-written rope physics',
      'Dark and light themes that remember your choice',
      'Project filtering and keyboard-accessible detail dialogs',
      'Respects reduced-motion preferences',
    ],
    tech: ['React', 'Vite', 'JavaScript', 'CSS'],
    role: 'Design and development',
    // Retake after filling in your real details.
    image: portfolioShot,
    imageAlt: 'Screenshot of the portfolio hero section with the lanyard ID badge',
    links: {
      live: todo('Live URL after deployment'),
      repo: 'https://github.com/fernandezkassandra226-creator/my-portfolio',
    },
  },
]
