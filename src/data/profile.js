// Shows the "sample content" notice on the site. All sample text has been replaced;
// anything still missing is a todo() and renders as a visible TODO placeholder.
export const SAMPLE_CONTENT = false

export const profile = {
  name: 'Kassandra Sophia Fernandez',
  // The home screen greets with this; the ID badge and page title keep the full name.
  heroName: 'Kassandra',
  role: 'IT Student · Aspiring Software Developer',
  location: 'Nueva Ecija, Philippines',
  availability: 'Open to internship / OJT',
  intro:
    'I’m a fourth-year IT student at Central Luzon State University looking for a software development internship or OJT where I can gain real-world experience, contribute to projects, and learn from experienced developers.',

  // Hero tagline cycles through these: "IT Student who builds ___."
  builds: [
    'web applications that solve real problems',
    'tools that make everyday tasks easier',
    'data-informed solutions',
  ],

  about: [
    'I’m Kassandra, a fourth-year BS Information Technology student at Central Luzon State University. I enjoy turning ideas into practical applications and learning how the pieces of a system work together, from the user interface to the database behind it.',
    'Most of my learning comes from building and improving projects. My experience includes contributing to DARIS, our academic capstone for managing disciplinary case workflows, as well as developing personal projects for study planning, journaling, and inventory management. These projects have helped me practice web development, database concepts, debugging, and problem-solving.',
    'I’m looking for a Software Developer OJT where I can apply what I’ve learned, collaborate with a team, receive feedback, and grow into a dependable developer. I’m also interested in data analysis and how information can be used to support better decisions.',
  ],
  interests: [
    'Software development',
    'Building practical applications',
    'Problem-solving',
    'Databases',
    'Data analysis (secondary interest)',
  ],
  // Not shown on the page right now (the hero and Contact already say this);
  // kept here in case you want an "I'm looking for" list back.
  seeking: [
    'Internship or OJT in software development',
    'Real-world experience contributing to projects',
    'A team where I can learn from experienced developers',
  ],

  // Badge photo: import an image from src/assets (e.g. `import photo from '../assets/me.webp'`)
  // and set `photo: photo`. Square, ~480×480 px, WebP keeps it light.
  photo: null,

  email: 'kassandrasophiafernandez@gmail.com',
  // Web3Forms access key (free at https://web3forms.com, sent to the email above).
  // With it, the contact form delivers messages straight to your inbox; without it
  // (null), the form opens the visitor's own email app instead. Safe to keep public.
  contactFormKey: '034398cb-839c-4b82-8167-dc0c55fe585a',
  // Put the PDF in public/ (e.g. public/resume.pdf) and set this to '/resume.pdf'
  resume: null,

  links: [
    { id: 'github', label: 'GitHub', href: 'https://github.com/kassophiaa' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/kassophiaa/' },
  ],
}

export const education = {
  degree: 'Bachelor of Science in Information Technology',
  school: 'Central Luzon State University (CLSU)',
  status: 'Currently in fourth year',
  // One entry per school year, oldest first. The last one is marked "Now".
  years: [
    {
      period: 'First year',
      title: 'Programming Fundamentals',
      text: 'Built a foundation in programming with C, focusing on programming logic and basic problem-solving.',
      topics: ['C', 'Programming Logic', 'Problem-Solving'],
    },
    {
      period: 'Second year',
      title: 'PHP and Object-Oriented Programming',
      text: 'Learned PHP and object-oriented programming concepts for building dynamic web applications.',
      topics: ['PHP', 'Object-Oriented Programming', 'Web Development'],
    },
    {
      period: 'Third year',
      title: 'App Development and Data Analysis',
      text: 'Explored mobile app development with FlutterFlow and Firebase while learning Python and data analysis fundamentals.',
      topics: ['FlutterFlow', 'Firebase', 'Python', 'Data Analysis'],
    },
    {
      period: 'Fourth year',
      title: 'Software Development and Beyond',
      text: 'Completed DARIS, my capstone project, applying web development and database management skills to build a discipline and reformation information system. Currently exploring new technologies and building personal projects to strengthen my software development skills.',
      topics: ['React', 'Laravel', 'PHP', 'MySQL', 'Personal Projects'],
    },
  ],
  // Only add certificates you have actually earned: { name, issuer, year, href, image }
  certifications: [],
}
