import { ArrowRight, FileText, Mail, MousePointerClick } from 'lucide-react'
import { profile } from '../content'
import { sectionHref } from '../lib/router'
import styles from './HomeHero.module.css'
import { SocialGlyph } from './icons'

/** The sun's overlay: who you are, shown on the zoomed-out view. */
export function HomeHero({ hidden }: { hidden: boolean }) {
  const [primaryEmail] = profile.emails

  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-hidden={hidden} inert={hidden}>
      <div className={styles.intro}>
        {profile.availability && (
          <p className={styles.status}>
            <span className={styles.pulse} aria-hidden="true" />
            {profile.availability}
          </p>
        )}
        <h1 id="hero-title" className={styles.title}>
          {profile.name}
        </h1>
        <p className={styles.role}>{profile.role}</p>
        <p className={styles.tagline}>{profile.tagline}</p>

        <div className={styles.actions}>
          <a className="button button-primary" href={sectionHref('projects')}>
            View projects
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button button-ghost" href={sectionHref('contact')}>
            Get in touch
          </a>
        </div>

        <ul className={styles.socials}>
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a className="icon-button" href={social.href} aria-label={social.label} target="_blank" rel="noreferrer">
                <SocialGlyph icon={social.icon} size={18} />
              </a>
            </li>
          ))}
          {primaryEmail && (
            <li>
              <a className="icon-button" href={`mailto:${primaryEmail.address}`} aria-label={`Email ${primaryEmail.address}`}>
                <Mail size={18} aria-hidden="true" />
              </a>
            </li>
          )}
          {profile.resumeUrl && (
            <li>
              <a className="icon-button" href={profile.resumeUrl} aria-label="Résumé" target="_blank" rel="noreferrer">
                <FileText size={18} aria-hidden="true" />
              </a>
            </li>
          )}
        </ul>
      </div>

      <p className={styles.hint} aria-hidden="true">
        <MousePointerClick size={16} />
        <span className={styles.hintPointer}>Click a planet to explore · drag to look around</span>
        <span className={styles.hintTouch}>Tap a planet to explore</span>
      </p>
    </section>
  )
}
