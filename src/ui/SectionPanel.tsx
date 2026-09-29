import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, type ComponentType } from 'react'
import { about, contact, education, projects, skills } from '../content'
import { accentStyle } from '../lib/layout'
import { useIsCompact, usePrefersReducedMotion } from '../lib/media'
import { navigate, sectionHref } from '../lib/router'
import { PLANETS } from '../planets'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Education } from '../sections/Education'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'
import type { SectionId } from '../types'
import styles from './SectionPanel.module.css'

const SECTIONS: Record<SectionId, { intro: string; View: ComponentType }> = {
  about: { intro: about.intro, View: About },
  projects: { intro: projects.intro, View: Projects },
  skills: { intro: skills.intro, View: Skills },
  education: { intro: education.intro, View: Education },
  contact: { intro: contact.intro, View: Contact },
}

const pad = (n: number) => String(n).padStart(2, '0')

/** The page for the open planet. It slides in once the camera has mostly arrived. */
export function SectionPanel({ active }: { active: SectionId | null }) {
  return <AnimatePresence mode="wait">{active && <Panel key={active} id={active} />}</AnimatePresence>
}

function Panel({ id }: { id: SectionId }) {
  const compact = useIsCompact()
  const reducedMotion = usePrefersReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)

  const index = PLANETS.findIndex((p) => p.id === id)
  const planet = PLANETS[index]
  const previous = PLANETS[(index - 1 + PLANETS.length) % PLANETS.length]
  const next = PLANETS[(index + 1) % PLANETS.length]
  const { intro, View } = SECTIONS[id]

  // Move focus into the new page so keyboard and screen reader users land on its title.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') navigate(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const offset = reducedMotion ? {} : compact ? { y: 56 } : { x: 40 }

  return (
    <motion.section
      className={styles.panel}
      style={accentStyle(planet.accent)}
      aria-labelledby="panel-title"
      initial={{ opacity: 0, ...offset }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: reducedMotion ? 0.2 : 0.6, delay: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      exit={{ opacity: 0, ...offset, transition: { duration: 0.22, ease: 'easeIn' } }}
    >
      <button type="button" className={`icon-button ${styles.close}`} onClick={() => navigate(null)}>
        <X size={20} aria-hidden="true" />
        <span className="sr-only">Close {planet.title} and zoom out</span>
      </button>

      <div className={styles.scroller}>
        <header className={styles.header}>
          <p className={styles.kicker}>
            <span className={styles.planetDot} aria-hidden="true" />
            Planet {pad(index + 1)} / {pad(PLANETS.length)}
          </p>
          <h2 id="panel-title" ref={headingRef} tabIndex={-1} className={styles.title}>
            {planet.title}
          </h2>
          <p className={styles.intro}>{intro}</p>
        </header>

        <div className={styles.body}>
          <View />
        </div>

        <nav className={styles.pager} aria-label="Other sections">
          <a className={styles.pagerLink} href={sectionHref(previous.id)} style={accentStyle(previous.accent)}>
            <ArrowLeft size={18} aria-hidden="true" />
            <span>
              <small>Previous</small>
              {previous.title}
            </span>
          </a>
          <a
            className={`${styles.pagerLink} ${styles.pagerNext}`}
            href={sectionHref(next.id)}
            style={accentStyle(next.accent)}
          >
            <span>
              <small>Next</small>
              {next.title}
            </span>
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </motion.section>
  )
}
