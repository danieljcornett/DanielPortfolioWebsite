import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { contact, profile } from '../content'
import { SocialGlyph } from '../ui/icons'
import styles from './sections.module.css'

export function Contact() {
  // The address that was just copied, so its button can show a check mark for a moment.
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(null), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copyEmail = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(address)
    } catch {
      // Clipboard access can be blocked; the mailto link still works.
    }
  }

  return (
    <>
      <div>
        <p className={styles.statement}>{contact.heading}</p>
        <p className={styles.lead}>{contact.message}</p>
      </div>

      <ul className={styles.emails}>
        {profile.emails.map((email) => {
          // On narrow screens, wrap long addresses before the "@" rather than mid-word.
          const at = email.address.lastIndexOf('@')
          return (
            <li key={email.address} className={styles.emailCard}>
              <a className={styles.emailLink} href={`mailto:${email.address}`}>
                <span className={styles.socialIcon}>
                  <Mail size={20} aria-hidden="true" />
                </span>
                <span className={styles.socialText}>
                  <strong>{email.label}</strong>
                  <span className={styles.emailAddress}>
                    {email.address.slice(0, at)}
                    <wbr />
                    {email.address.slice(at)}
                  </span>
                </span>
              </a>
              <button
                type="button"
                className="icon-button"
                onClick={() => copyEmail(email.address)}
                aria-label={`Copy ${email.label.toLowerCase()} email address`}
              >
                {copied === email.address ? (
                  <Check size={18} aria-hidden="true" />
                ) : (
                  <Copy size={18} aria-hidden="true" />
                )}
              </button>
            </li>
          )
        })}
      </ul>
      <p className="sr-only" aria-live="polite">
        {copied ? `Copied ${copied}` : ''}
      </p>

      {profile.socials.length > 0 && (
        <ul className={styles.socialCards}>
          {profile.socials.map((social) => (
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
