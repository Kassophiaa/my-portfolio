const photos = import.meta.glob('../assets/profile/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})

// Shows the "sample content" notice on the site. All sample text has been replaced;
// anything still missing is a todo() and renders as a visible TODO placeholder.
export const SAMPLE_CONTENT = false

export const profile = {
  name: 'Kassandra Sophia Fernandez',
  // The home screen greets with this; the ID badge and page title keep the full name.
  heroName: 'Kassy',
  role: 'IT Student · Aspiring Software Developer',
  // Role line on the ID badge
  badgeRole: 'BSIT Student · CLSU',
  location: 'Nueva Ecija, Philippines',
  // The one place (besides Contact) that mentions the internship search.
  intro:
    'Fourth-year BS Information Technology student at Central Luzon State University, looking for a software development internship or OJT.',

  // Hero tagline cycles through these: "IT Student who builds ___."
  builds: [
    'web applications that solve real problems',
    'tools that make everyday tasks easier',
    'data-informed solutions',
  ],

  // Who you are, how you got here, where you're heading. The internship ask lives
  // in the hero and Contact, so it isn't repeated here.
  about: [
    'I’m Kassy. I enjoy turning ideas into practical applications and understanding how the pieces of a system fit together, from the interface people click to the logic behind it.',
    'My path started with C and programming logic, moved through PHP and object-oriented programming, then into app development with FlutterFlow and Firebase. Now I build with React and Laravel, and our capstone, DARIS, brought those skills together in one system.',
    'Outside class, I build personal projects (a study planner, a finance tracker, a meal planner, and a desktop routine planner) to practice debugging and problem-solving. I want to grow into a dependable software developer, and I’m curious about how data analysis can support better decisions.',
  ],
  interests: [
    'Web Development',
    'Software Development',
    'Database Management',
    'UI/UX Design',
    'Artificial Intelligence',
    'Data Analytics',
  ],

  // OJT info. About shows the status and goals; the back of the ID badge shows
  // hours, start, and setup.
  ojt: {
    status: 'Looking for an OJT / internship',
    hours: '400 hours',
    start: 'January 2027',
    setup: 'On-site',
    // Optional: set a preferred location (e.g. 'Nueva Ecija or nearby') to show it.
    location: null,
    goals: [
      'Real-world experience contributing to projects',
      'A team where I can learn from experienced developers',
    ],
  },
  // Not shown on the page right now (the hero and Contact already say this);
  // kept here in case you want an "I'm looking for" list back.
  seeking: [
    'Internship or OJT in software development',
    'Real-world experience contributing to projects',
    'A team where I can learn from experienced developers',
  ],

  // Badge photo: drop one image into src/assets/profile/ (any name). Square works best;
  // other shapes are cropped to a square around the upper-middle (where a face usually is).
  photo: Object.values(photos)[0] ?? null,

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
    // badge: false keeps it off the ID badge (only room for two links there)
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/kassophiaa/', badge: false },
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
      text: 'Completed my DARIS capstone, a discipline and reformation information system. Now exploring software development further by building personal projects and strengthening my technical skills.',
      topics: ['React', 'Laravel', 'PHP', 'MySQL', 'Personal Projects'],
    },
  ],
  // Certificates, shown under the timeline as a scrolling row; click one to view it.
  // Only add things you actually completed. To add one: put the original in
  // public/certificates/, make the two .webp images from it, then copy an entry below.
  // Certificate files live in public/certificates/:
  //   <file>              the original PDF/PNG ("Open original" in the viewer)
  //   thumbs/<slug>.webp  card preview, full/<slug>.webp  large image in the viewer
  // `verify` is the issuer's own verification page, when there is one. Newest first.
  credentials: [
    {
      type: 'Certificate',
      name: 'AWS Academy Graduate – Cloud Foundations',
      issuer: 'AWS Academy · 20 hours',
      date: 'Oct 2026',
      slug: 'aws-cloud-foundations',
      file: 'aws-cloud-foundations.pdf',
      verify: { label: 'Verify on Credly', href: 'https://www.credly.com/go/YphleYGR' },
      skills: ['AWS', 'Cloud'],
    },
    {
      type: 'Certificate',
      name: 'Creating Compelling Reports',
      issuer: 'Cisco Networking Academy · DICT-ITU DTC',
      date: 'Mar 2026',
      slug: 'cisco-creating-compelling-reports',
      file: 'cisco-creating-compelling-reports.pdf',
    },
    {
      type: 'Project certificate',
      name: 'Data Visualization using Plotly',
      issuer: 'Coursera Project Network',
      date: 'Mar 2026',
      slug: 'coursera-plotly',
      file: 'coursera-plotly.pdf',
      verify: { label: 'Verify on Coursera', href: 'https://coursera.org/verify/05QE7T8IYY8R' },
      skills: ['Python', 'Plotly'],
    },
    {
      type: 'Project certificate',
      name: 'Data Visualization using Bokeh',
      issuer: 'Coursera Project Network',
      date: 'Mar 2026',
      slug: 'coursera-bokeh',
      file: 'coursera-bokeh.pdf',
      verify: { label: 'Verify on Coursera', href: 'https://coursera.org/verify/PLDB16HJIHSB' },
      skills: ['Python', 'Bokeh'],
    },
    {
      type: 'Certificate',
      name: 'Security and Connectivity Support',
      issuer: 'Cisco Networking Academy · DICT-ITU DTC',
      date: 'Mar 2026',
      slug: 'cisco-security-and-connectivity-support',
      file: 'cisco-security-and-connectivity-support.pdf',
    },
    {
      type: 'Certificate',
      name: 'IT Customer Support Basics',
      issuer: 'Cisco Networking Academy · DICT-ITU DTC',
      date: 'Mar 2026',
      slug: 'cisco-it-customer-support-basics',
      file: 'cisco-it-customer-support-basics.pdf',
    },
    {
      type: 'Course',
      name: 'Data Visualization',
      issuer: 'Kaggle Learn',
      date: 'Mar 2026',
      slug: 'kaggle-data-visualization',
      file: 'kaggle-data-visualization.png',
      skills: ['Python'],
    },
    {
      type: 'Course',
      name: 'Pandas',
      issuer: 'Kaggle Learn',
      date: 'Feb 2026',
      slug: 'kaggle-pandas',
      file: 'kaggle-pandas.png',
      skills: ['Python', 'Pandas'],
    },
  ],
}
