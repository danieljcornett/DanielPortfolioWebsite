import { profile } from '../content'
import { accentStyle } from '../lib/layout'
import { sectionHref } from '../lib/router'
import { PLANETS } from '../planets'
import type { SectionId } from '../types'
import styles from './Header.module.css'

export function Header({ active }: { active: SectionId | null }) {
  return (
    <header className={styles.header} data-section-open={active !== null}>
      <a className={styles.brand} href={sectionHref(null)} aria-label={`${profile.name}, back to the solar system`}>
        <span className={styles.mark} aria-hidden="true">
          {profile.initials}
        </span>
        <span className={styles.name}>{profile.name}</span>
      </a>

      <nav className={styles.nav} aria-label="Sections">
        <ul className={styles.list}>
          {PLANETS.map((planet) => (
            <li key={planet.id}>
              <a
                className={styles.link}
                href={sectionHref(planet.id)}
                style={accentStyle(planet.accent)}
                aria-current={planet.id === active ? 'page' : undefined}
              >
                <span className={styles.dot} aria-hidden="true" />
                {planet.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
