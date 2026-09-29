import { FileText } from 'lucide-react'
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
