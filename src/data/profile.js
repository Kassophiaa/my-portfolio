import { todo } from '../lib/content.js'

// ─────────────────────────────────────────────────────────────────────────────
// SAMPLE CONTENT: every value marked `// SAMPLE` is made-up example text.
// Replace it with your real details, then set SAMPLE_CONTENT to false to hide
// the "sample content" notice on the site. Search the project for "SAMPLE".
// ─────────────────────────────────────────────────────────────────────────────
export const SAMPLE_CONTENT = true

export const profile = {
  name: 'Alex Santos', // SAMPLE
  role: 'IT Student · Aspiring Software Developer',
  location: 'Metro Manila, Philippines', // SAMPLE
  availability: 'Open to internship / OJT',
  intro:
    'I’m an IT student looking for an internship or OJT where I can contribute to real software, learn from experienced developers, and grow my skills on an actual team.',

  // Short facts shown under the hero buttons
  facts: [
    { label: 'Studying', value: 'BS Information Technology' }, // SAMPLE
    { label: 'Year', value: '3rd year · graduating 2027' }, // SAMPLE
    { label: 'Focus', value: 'Web development' }, // SAMPLE
  ],

  about: [
    'I’m a third-year Information Technology student who got hooked on software development after building my first web page for a class project — turning an idea into something people can actually use still feels great.', // SAMPLE
    'What I want most right now is real-world experience: working with an existing codebase, getting code reviewed, and learning how professional teams plan, build, and ship.',
    'Outside class I build small tools for problems I run into — a budget tracker, a study timer, a site for our student org. I learn best by building, asking questions, and taking feedback.', // SAMPLE
  ],
  interests: ['Web development', 'Building useful tools', 'Clean, accessible UI', 'Databases'], // SAMPLE
  seeking: [
    'Internship or OJT in software development',
    'A team where I can learn from experienced developers',
    'On-site in or near Metro Manila, or hybrid', // SAMPLE
  ],

  // Badge photo: import an image from src/assets (e.g. `import photo from '../assets/me.webp'`)
  // and set `photo: photo`. Square, ~480×480 px, WebP keeps it light.
  photo: null,

  // example.com is a reserved demo domain — mail to it goes nowhere.
  email: 'alex.santos@example.com', // SAMPLE
  // Put the PDF in public/ (e.g. public/resume.pdf) and set this to '/resume.pdf'
  resume: null,

  links: [
    // Derived from this repository's git remote — confirm this is your public profile.
    { id: 'github', label: 'GitHub', href: 'https://github.com/fernandezkassandra226-creator' },
    // Left empty on purpose: a made-up LinkedIn URL could point at a real stranger's profile.
    { id: 'linkedin', label: 'LinkedIn', href: todo('LinkedIn profile URL') },
  ],
}

export const education = {
  degree: 'Bachelor of Science in Information Technology', // SAMPLE
  school: 'Sample State University', // SAMPLE
  period: '2023 – 2027 (expected)', // SAMPLE
  details: '3rd year · Web and Mobile Development track', // SAMPLE
  coursework: [
    // SAMPLE
    'Computer Programming 1 & 2',
    'Data Structures and Algorithms',
    'Database Management Systems',
    'Web Systems and Technologies',
    'Systems Analysis and Design',
  ],
  // Only add certifications you have actually earned: { name, issuer, year, href }
  certifications: [],
}
