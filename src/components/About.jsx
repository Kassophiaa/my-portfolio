import SectionHeading from './SectionHeading.jsx'
import './About.css'

// Compact OJT summary for the side card, under "Interested in".
function OjtFact({ ojt }) {
  return (
    <div className="about__fact">
      {/* Label kept for screen readers only; the status pill says it visually */}
      <dt className="visually-hidden">On-the-job training</dt>
      <dd className="about__ojt">
        <span className="about__ojt-status">
          <span className="about__ojt-dot" aria-hidden="true" />
          {ojt.status}
        </span>

        {ojt.goals?.length > 0 && (
          <ul className="tick-list tick-list--check about__ojt-goals" aria-label="What I’m looking for">
            {ojt.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        )}
      </dd>
    </div>
  )
}

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

            {profile.ojt && <OjtFact ojt={profile.ojt} />}
          </dl>
        </div>
      </div>
    </section>
  )
}
