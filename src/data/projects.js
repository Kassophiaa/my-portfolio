import { todo } from '../lib/content.js'
import portfolioShot from '../assets/projects/portfolio.webp'

// Projects shown in the Projects section. Entries marked `// SAMPLE` are made-up
// examples — replace them with your real projects (or delete them).
// Links left as todo() show as "soon" instead of pointing at a fake URL.
export const projects = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    category: 'Personal',
    year: 2026,
    featured: true,
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
  {
    // SAMPLE
    id: 'library-system',
    title: 'Campus Library System',
    category: 'Academic',
    year: 2025,
    summary:
      'A web app for borrowing and returning books, with overdue reminders and a librarian dashboard.',
    description: [
      'Built as a team project for our Database Management Systems course. Students search the catalog and reserve books; librarians manage inventory and see what is overdue.',
    ],
    highlights: [
      'Designed the database schema (8 related tables)',
      'Built the search and reservation pages',
      'Wrote SQL reports for overdue and popular books',
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    role: 'Database and back-end developer (team of 4)',
    image: null,
    links: { live: todo('Demo URL'), repo: todo('Repository URL') },
  },
  {
    // SAMPLE
    id: 'budget-tracker',
    title: 'Pocket Budget',
    category: 'Personal',
    year: 2025,
    summary: 'A mobile-friendly expense tracker that groups spending by category and month.',
    description: [
      'I built this to keep track of my allowance. Expenses are saved in the browser, so it works offline and needs no account.',
    ],
    highlights: [
      'Monthly totals and category breakdown',
      'Works offline using localStorage',
      'Installable on a phone home screen',
    ],
    tech: ['React', 'JavaScript', 'CSS'],
    role: 'Solo project',
    image: null,
    links: { live: todo('Demo URL'), repo: todo('Repository URL') },
  },
  {
    // SAMPLE
    id: 'org-website',
    title: 'Student Org Website',
    category: 'Academic',
    year: 2024,
    summary: 'An events and announcements site for our IT student organization.',
    description: [
      'A static site where officers post upcoming events and members can find past announcements in one place.',
    ],
    highlights: ['Responsive layout for phones', 'Simple event list officers can update'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    role: 'Front-end developer',
    image: null,
    links: { live: todo('Demo URL'), repo: todo('Repository URL') },
  },
]
