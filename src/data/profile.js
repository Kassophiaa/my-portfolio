import { todo } from '../lib/content.js'

// Shows the "sample content" notice on the site. All sample text has been replaced;
// anything still missing is a todo() and renders as a visible TODO placeholder.
export const SAMPLE_CONTENT = false

export const profile = {
  name: 'Kassandra Sophia Fernandez',
  role: 'IT Student · Aspiring Software Developer',
  location: 'Philippines',
  availability: 'Open to internship / OJT',
  intro:
    'I’m a fourth-year IT student at Central Luzon State University looking for a software development internship or OJT where I can gain real-world experience, contribute to projects, and learn from experienced developers.',

  // Short facts shown under the hero buttons
  facts: [
    { label: 'Studying', value: 'BS Information Technology' },
    { label: 'Year', value: '4th year · CLSU' },
    { label: 'Focus', value: 'Software development' },
  ],

  about: [
    'I’m Kassandra, a fourth-year Information Technology student at Central Luzon State University. I enjoy software development because it lets me take a problem and turn it into something practical that people can actually use.',
    'Most of what I know comes from building: a capstone system for managing disciplinary cases, a study planner, a journaling app, and an inventory dashboard concept. Along the way I’ve come to enjoy problem-solving, working with databases, and figuring out why something doesn’t work.',
    'Right now I’m looking for an internship or OJT where I can gain real-world experience, contribute to actual projects, and learn from experienced developers. Data analysis is a secondary interest of mine, and I keep learning new tools and practices as I go.',
  ],
  interests: [
    'Software development',
    'Building practical applications',
    'Problem-solving',
    'Databases',
    'Data analysis (secondary interest)',
  ],
  seeking: [
    'Internship or OJT in software development',
    'Real-world experience contributing to projects',
    'A team where I can learn from experienced developers',
  ],

  // Badge photo: import an image from src/assets (e.g. `import photo from '../assets/me.webp'`)
  // and set `photo: photo`. Square, ~480×480 px, WebP keeps it light.
  photo: null,

  // The contact form and "Copy email" turn on once this is a real address.
  email: todo('Your email address'),
  // Put the PDF in public/ (e.g. public/resume.pdf) and set this to '/resume.pdf'
  resume: null,

  links: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/fernandezkassandra226-creator' },
    // Left empty on purpose: a made-up LinkedIn URL could point at a real stranger's profile.
    { id: 'linkedin', label: 'LinkedIn', href: todo('LinkedIn profile URL') },
  ],
}

export const education = {
  degree: 'Bachelor of Science in Information Technology',
  school: 'Central Luzon State University (CLSU)',
  period: 'Currently enrolled',
  details: 'Fourth year',
  coursework: [
    'Computer Programming',
    'Data Structures and Algorithms',
    'Database Management Systems',
    'Web Systems and Technologies',
    'Systems Analysis and Design',
  ],
  // Only add certifications you have actually earned: { name, issuer, year, href }
  certifications: [],
}
