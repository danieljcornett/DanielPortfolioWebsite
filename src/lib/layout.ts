import type { CSSProperties } from 'react'

// Mirrors --panel-w, --gutter and --sheet-h in index.css so the camera can frame
// the focused planet in whatever part of the screen the section page leaves free.
const PANEL_MAX_WIDTH = 600
const PANEL_VW = 0.46
const GUTTER = 16
const SHEET_VH = 0.64

/** Fraction of the viewport the section page covers: from the right (x) or from the bottom (y). */
export function panelCoverage(width: number, compact: boolean) {
  if (compact) return { x: 0, y: SHEET_VH }
  return { x: (Math.min(PANEL_MAX_WIDTH, width * PANEL_VW) + GUTTER * 2) / width, y: 0 }
}

export function accentStyle(accent: string) {
  return { '--accent': accent } as CSSProperties
}
