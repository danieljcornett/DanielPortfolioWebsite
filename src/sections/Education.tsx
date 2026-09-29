import { ArrowUpRight, Award, GraduationCap, MapPin } from 'lucide-react'
import { education } from '../content'
import styles from './sections.module.css'

export function Education() {
  return (
    <>
      <ol className={styles.timeline}>
        {education.degrees.map((degree) => (
          <li key={`${degree.school}-${degree.degree}`} className={styles.degree}>
            <p className={styles.meta}>
              <span>
                {degree.start} – {degree.end}
              </span>
              {degree.gpa && <span>GPA {degree.gpa}</span>}
            </p>
            <h3 className={styles.cardTitle}>{degree.degree}</h3>
            <p className={styles.iconLine}>
              <GraduationCap size={17} aria-hidden="true" />
              {degree.school}
            </p>
            <p className={styles.iconLine}>
              <MapPin size={17} aria-hidden="true" />
              {degree.location}
            </p>

            {degree.coursework.length > 0 && (
              <div className={styles.subsection}>
                <h4 className={styles.label}>Relevant coursework</h4>
                <ul className={styles.chips}>
                  {degree.coursework.map((course) => (
                    <li key={course} className={styles.chip}>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {degree.honors.length > 0 && (
              <ul className={styles.bullets}>
                {degree.honors.map((honor) => (
                  <li key={honor}>{honor}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>

      {education.certifications.length > 0 && (
        <section aria-labelledby="certifications">
          <h3 id="certifications" className={styles.label}>
            Certifications
          </h3>
          <ul className={styles.certs}>
            {education.certifications.map((cert) => (
              <li key={cert.name} className={styles.cert}>
                <span className={styles.certIcon} aria-hidden="true">
                  <Award size={20} />
                </span>
                <div className={styles.certText}>
                  <p className={styles.certName}>{cert.name}</p>
                  <p className={styles.muted}>
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
                {cert.credentialUrl && (
                  <a className="button button-small" href={cert.credentialUrl} target="_blank" rel="noreferrer">
                    Verify
                    <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only">{cert.name} (opens in a new tab)</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
