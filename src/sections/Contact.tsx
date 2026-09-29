import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { contact, profile } from '../content'
import { SocialGlyph } from '../ui/icons'
import styles from './sections.module.css'

export function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      // Clipboard access can be blocked; the mailto button still works.
    }
  }

  const links = profile.socials.filter((social) => social.icon !== 'email')

  return (
    <>
      <div>
        <p className={styles.statement}>{contact.heading}</p>
        <p className={styles.lead}>{contact.message}</p>
      </div>

      <div className={styles.emailRow}>
        <a className="button button-accent" href={`mailto:${profile.email}`}>
          <Mail size={18} aria-hidden="true" />
          {profile.email}
        </a>
        <button type="button" className="button" onClick={copyEmail}>
          {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
        </button>
      </div>

      {links.length > 0 && (
        <ul className={styles.socialCards}>
          {links.map((social) => (
            <li key={social.label}>
              <a className={styles.socialCard} href={social.href} target="_blank" rel="noreferrer">
                <span className={styles.socialIcon}>
                  <SocialGlyph icon={social.icon} size={20} />
                </span>
                <span className={styles.socialText}>
                  <strong>{social.label}</strong>
                  <span className={styles.muted}>{social.handle}</span>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" className={styles.socialArrow} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <p className={styles.note}>{contact.responseNote}</p>
    </>
  )
}
