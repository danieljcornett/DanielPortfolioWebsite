import { ImageIcon } from 'lucide-react'
import styles from './ImagePlaceholder.module.css'

/** Stand-in for an image you haven't added yet. 16:9 unless the surrounding layout says otherwise. */
export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className={styles.placeholder} role="img" aria-label={`${label} (placeholder)`}>
      <ImageIcon size={22} aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
