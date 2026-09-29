import { useCallback, useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Phones: the section page becomes a bottom sheet and the nav becomes a dock. Keep in sync with index.css. */
export const COMPACT_QUERY = '(max-width: 767px)'

export const useIsCompact = () => useMediaQuery(COMPACT_QUERY)

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
