import SectionHeading from './SectionHeading.jsx'
import './About.css'

export default function About({ profile, index }) {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about">
        <SectionHeading
          index={index}
          label="About me"
          id="about-title"
          title={
            <>
              Curious, hands&#8209;on, and <em className="accent-serif">eager to learn.</em>
            </>
          }
        />

        <div className="about__grid">
          <div className="about__story" data-reveal>
            {profile.about.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'about__lead' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="about__facts glass" data-reveal style={{ '--delay': 1 }}>
            <div className="about__fact">
              <dt className="mono">Interested in</dt>
              <dd>
                <ul className="tick-list">
                  {profile.interests.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="about__fact">
              <dt className="mono">Looking for</dt>
              <dd>
                <ul className="tick-list tick-list--check">
                  {profile.seeking.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
