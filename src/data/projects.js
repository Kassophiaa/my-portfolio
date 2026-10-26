import { todo } from '../lib/content.js'
import portfolioShot from '../assets/projects/portfolio.webp'

// Projects shown in the Projects section. `draft: true` entries are placeholders
// and render with a visible "draft slot" style — replace or delete them.
export const projects = [
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    category: 'Personal',
    year: 2026,
    featured: true,
    summary:
      'This site: a responsive, accessible portfolio built with React and Vite, designed from scratch.',
    description: [
      'A single-page portfolio for internship and OJT applications. Content lives in plain data files so it can be updated without touching layout code.',
    ],
    highlights: [
      'Dark and light themes that remember your choice',
      'Project filtering and keyboard-accessible detail dialogs',
      'Mobile-first layout with an accessible navigation menu',
      'Respects reduced-motion preferences',
    ],
    tech: ['React', 'Vite', 'JavaScript', 'CSS'],
    role: 'Design and development',
    // Retake after filling in personal details (it still shows TODO placeholders).
    image: portfolioShot,
    imageAlt: 'Screenshot of the portfolio hero section in dark theme',
    links: {
      live: todo('Live URL after deployment'),
      repo: 'https://github.com/fernandezkassandra226-creator/my-portfolio',
    },
  },
  {
    id: 'academic-1',
    draft: true,
    title: todo('Academic project title'),
    category: 'Academic',
    year: todo('Year'),
    summary: todo('One sentence: what it does and who it is for'),
    description: [],
    highlights: [],
    tech: [],
    role: todo('Your role'),
    image: null,
    links: { live: todo('Demo URL'), repo: todo('Repository URL') },
  },
  {
    id: 'personal-1',
    draft: true,
    title: todo('Personal project title'),
    category: 'Personal',
    year: todo('Year'),
    summary: todo('One sentence: what it does and why you built it'),
    description: [],
    highlights: [],
    tech: [],
    role: todo('Your role'),
    image: null,
    links: { live: todo('Demo URL'), repo: todo('Repository URL') },
  },
]
