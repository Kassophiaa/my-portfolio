import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Education from './components/Education.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BackToTop from './components/BackToTop.jsx'
import SampleNotice from './components/SampleNotice.jsx'
import { profile, education, SAMPLE_CONTENT } from './data/profile.js'
import { projects } from './data/projects.js'
import { badgeSkills, skillGroups } from './data/skills.js'
import { useActiveSection } from './hooks/useActiveSection.js'
import { useReveal } from './hooks/useReveal.js'
import { useScrollProgress } from './hooks/useScrollProgress.js'
import { useTheme } from './hooks/useTheme.js'
import './App.css'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const spyIds = ['top', ...sections.map((section) => section.id)]

export default function App() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(spyIds)
  useReveal()
  useScrollProgress()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header sections={sections} active={active} theme={theme} onToggleTheme={toggle} />
      <main id="main" tabIndex={-1}>
        <Hero profile={profile} skills={badgeSkills} />
        <About profile={profile} index={1} />
        <Projects projects={projects} index={2} />
        <Skills groups={skillGroups} index={3} />
        <Education education={education} index={4} />
        <Contact profile={profile} index={5} />
      </main>
      <Footer profile={profile} />
      <BackToTop />
      {SAMPLE_CONTENT && <SampleNotice />}
    </>
  )
}
