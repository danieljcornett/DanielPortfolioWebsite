import { useSyncExternalStore } from 'react'
import { PLANETS } from '../planets'
import type { SectionId } from '../types'

// Hash routes (#/projects) work on any static host, and the back button zooms back out.
const sectionIds = new Set<string>(PLANETS.map((p) => p.id))

function parse(hash: string): SectionId | null {
  const id = hash.replace(/^#\/?/, '')
  return sectionIds.has(id) ? (id as SectionId) : null
}

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

const getSnapshot = () => parse(window.location.hash)

export function useActiveSection() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}

export function sectionHref(id: SectionId | null) {
  return id ? `#/${id}` : '#/'
}

export function navigate(id: SectionId | null) {
  if (getSnapshot() === id) return
  window.location.hash = id ? `/${id}` : '/'
}
