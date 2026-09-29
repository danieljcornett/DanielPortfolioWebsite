import { Briefcase, FileText, MapPin } from 'lucide-react'
import { about, profile } from '../content'
import styles from './sections.module.css'

export function About() {
  return (
    <>
      <div className={styles.aboutIntro}>
        {profile.photo ? (
          <img className={styles.portrait} src={profile.photo} alt={`Portrait of ${profile.name}`} />
        ) : (
          <div className={styles.portrait} role="img" aria-label="Photo placeholder">
            <span>{profile.initials}</span>
            <small>Your photo</small>
          </div>
        )}
        <div className={styles.prose}>
          {about.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <dl className={styles.facts}>
        {about.facts.map((fact) => (
          <div key={fact.label} className={styles.fact}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      {about.experience.length > 0 && (
        <section aria-labelledby="about-experience">
          <h3 id="about-experience" className={styles.label}>
            Experience
          </h3>
          <ol className={styles.entries}>
            {about.experience.map((job) => (
              <li key={`${job.company}-${job.title}`} className={styles.entry}>
                <p className={styles.meta}>{job.dates}</p>
                <h4 className={styles.cardTitle}>{job.title}</h4>
                <p className={styles.iconLine}>
                  <Briefcase size={17} aria-hidden="true" />
                  {job.company}
                </p>
                {job.location && (
                  <p className={styles.iconLine}>
                    <MapPin size={17} aria-hidden="true" />
                    {job.location}
                  </p>
                )}
                {job.highlights.length > 0 && (
                  <ul className={styles.bullets}>
                    {job.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>
      )}

      {about.activities.length > 0 && (
        <section aria-labelledby="about-activities">
          <h3 id="about-activities" className={styles.label}>
            Leadership &amp; activities
          </h3>
          <ul className={styles.activities}>
            {about.activities.map((activity) => (
              <li key={activity.name} className={styles.activity}>
                <div className={styles.activityHead}>
                  <h4 className={styles.activityName}>{activity.name}</h4>
                  {activity.dates && <p className={styles.activityDates}>{activity.dates}</p>}
                </div>
                <p className={styles.activityRole}>{activity.role}</p>
                <p className={styles.muted}>{activity.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {about.interests.length > 0 && (
        <section aria-labelledby="about-interests">
          <h3 id="about-interests" className={styles.label}>
            Outside of code
          </h3>
          <ul className={styles.chips}>
            {about.interests.map((interest) => (
              <li key={interest} className={styles.chip}>
                {interest}
              </li>
            ))}
          </ul>
        </section>
      )}

      {profile.resumeUrl && (
        <p>
          <a className="button button-accent" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            <FileText size={18} aria-hidden="true" />
            View résumé
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </p>
      )}
    </>
  )
}
