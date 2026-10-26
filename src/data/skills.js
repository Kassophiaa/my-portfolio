// Keep this honest: list only what you can talk about in an interview.
// Each skill has a level, shown as a labelled row inside its group:
//   used     — used in a project on this site (or in building the site itself)
//   familiar — know the basics from coursework or practice, not yet in a listed project
//   learning — actively studying now
export const skillLevels = [
  { id: 'used', label: 'Used in projects' },
  { id: 'familiar', label: 'Familiar with' },
  { id: 'learning', label: 'Currently learning', live: true },
]

const used = (...names) => names.map((name) => ({ name, level: 'used' }))
const familiar = (...names) => names.map((name) => ({ name, level: 'familiar' }))
const learning = (...names) => names.map((name) => ({ name, level: 'learning' }))

// `compact` groups list concepts and practices, so they render as chips instead of icon tiles.
export const skillGroups = [
  {
    id: 'languages',
    label: 'Programming languages',
    items: [...used('JavaScript', 'PHP', 'SQL'), ...familiar('C', 'C++', 'Java', 'Python')],
  },
  {
    id: 'frontend',
    label: 'Frontend development',
    items: [
      ...used('HTML5', 'CSS3', 'React', 'TypeScript', 'Responsive Web Design'),
      ...familiar('Bootstrap'),
    ],
  },
  {
    id: 'backend',
    label: 'Backend and databases',
    items: [
      ...used('Laravel', 'MySQL', 'Database Design', 'CRUD Operations'),
      ...learning('REST API Fundamentals'),
    ],
  },
  {
    id: 'tools',
    label: 'Tools and workflow',
    items: [
      ...used('Git', 'GitHub', 'Visual Studio Code', 'Vite', 'npm'),
      ...familiar('GitHub Desktop', 'Figma', 'XAMPP', 'Postman'),
    ],
  },
  {
    id: 'data',
    label: 'Data and analysis',
    note: 'A secondary interest alongside software development.',
    compact: true,
    items: [
      ...familiar('Microsoft Excel', 'SQL Queries', 'Basic Data Analysis'),
      ...learning('Python for Data Analysis'),
    ],
  },
  {
    id: 'practices',
    label: 'Development practices',
    compact: true,
    items: [
      ...used(
        'Debugging and Troubleshooting',
        'Responsive UI Development',
        'Problem-Solving',
        'Basic Version Control Workflows',
      ),
      ...learning('Software Testing Fundamentals'),
    ],
  },
]

// Shown on the back of the hero ID badge. Keep to short names at the "used" level.
export const badgeSkills = ['JavaScript', 'PHP', 'React', 'TypeScript', 'Laravel', 'MySQL', 'HTML5', 'CSS3']
