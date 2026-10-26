import { todo } from '../lib/content.js'

// Personal details. Replace every todo(...) with real information.
// Anything left as todo() is shown on the site as a clearly marked placeholder.
export const profile = {
  name: todo('Your full name'),
  role: 'IT Student · Aspiring Software Developer',
  location: todo('City, Province'),
  availability: 'Open to internship / OJT',
  intro:
    'I’m an IT student looking for an internship or OJT where I can contribute to real software, learn from experienced developers, and grow my skills on an actual team.',

  about: [
    'I’m studying Information Technology and I’m most interested in software development — turning an idea into something people can actually use.',
    'What I want most right now is real-world experience: working with an existing codebase, getting code reviewed, and learning how professional teams plan, build, and ship.',
    'I learn best by building. I’m comfortable asking questions, taking feedback, and picking up whatever tools a team already uses.',
  ],
  interests: ['Web development', 'Building useful tools', 'Clean, accessible UI'],
  seeking: [
    'Internship or OJT in software development',
    'A team where I can learn from experienced developers',
    'On-site in or near my city, or hybrid',
  ],

  // Set to e.g. 'you@example.com'
  email: todo('Your email address'),
  // Put the PDF in public/ (e.g. public/resume.pdf) and set this to '/resume.pdf'
  resume: null,

  links: [
    // Derived from this repository's git remote — confirm this is your public profile.
    { id: 'github', label: 'GitHub', href: 'https://github.com/fernandezkassandra226-creator' },
    { id: 'linkedin', label: 'LinkedIn', href: todo('LinkedIn profile URL') },
  ],
}

export const education = {
  degree: todo('Degree, e.g. Bachelor of Science in Information Technology'),
  school: todo('School / university'),
  period: todo('Year started – expected graduation'),
  details: todo('Year level, major, or track'),
  coursework: [],
  // Only add certifications you have actually earned: { name, issuer, year, href }
  certifications: [],
}
