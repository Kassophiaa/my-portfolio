import { textOf } from '../lib/content.js'

export default function Footer({ profile }) {
  const name = textOf(profile.name, 'Portfolio')
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>
          © {new Date().getFullYear()} {name}. Designed and built with React + Vite.
        </p>
      </div>
    </footer>
  )
}
