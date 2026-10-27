import SectionHeading from './SectionHeading.jsx'
import './About.css'

export default function About({ profile, index }) {
  const [lead, ...rest] = profile.about

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
          <div className="about__main">
            <div className="about__story" data-reveal data-stagger>
              <p className="about__lead">{lead}</p>
              {rest.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <dl className="about__facts glass" data-reveal style={{ '--delay': 2 }}>
            <div className="about__fact">
              <dt className="mono">Interested in</dt>
              <dd>
                <ul className="about__chips" data-reveal data-stagger>
                  {profile.interests.map((item) => (
                    <li key={item} className="chip about__chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="about__fact">
              <dt className="mono">Looking for</dt>
              <dd>
                <ul className="tick-list tick-list--check" data-reveal data-stagger>
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
