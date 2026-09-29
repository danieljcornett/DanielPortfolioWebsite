/**
 * The solar system map: which section lives on which planet, and how each planet looks and moves.
 * Order here is orbit order (closest to the sun first) and the order of the site navigation.
 */
import type { SectionId } from './types'

export type SurfaceType = 'terrestrial' | 'gas' | 'rocky'

export interface Surface {
  type: SurfaceType
  /** Four colors from darkest to lightest, blended by the planet shader */
  colors: [string, string, string, string]
  /** Rim glow color */
  atmosphere: string
  atmosphereStrength: number
  /** Noise frequency: higher means smaller surface features */
  scale: number
  /** Gas giants: number of latitude bands */
  bands?: number
  /** Gas giants: how turbulent the bands are */
  warp?: number
  /** Terrestrial: sea level between 0 and 1 */
  sea?: number
  /** Polar ice amount between 0 and 1 */
  caps?: number
  /** Any number; changes the surface pattern */
  seed: number
}

export interface Rings {
  /** Multiples of the planet radius */
  inner: number
  outer: number
  color: string
}

export interface PlanetDef {
  id: SectionId
  title: string
  /** Accent color for this planet's page, nav dot, and orbit highlight */
  accent: string
  radius: number
  orbit: number
  /** Seconds per orbit */
  period: number
  /** Starting position on the orbit, in radians */
  phase: number
  /** Axial tilt, in radians */
  tilt: number
  /** Self-rotation speed, in radians per second */
  spin: number
  surface: Surface
  rings?: Rings
  clouds?: boolean
}

export const SUN_RADIUS = 2.2

export const PLANETS: PlanetDef[] = [
  {
    id: 'about',
    title: 'About',
    accent: '#93c5fd',
    radius: 0.8,
    orbit: 5.8,
    period: 90,
    phase: 0.6,
    tilt: 0.41,
    spin: 0.18,
    clouds: true,
    surface: {
      type: 'terrestrial',
      colors: ['#082448', '#1b5c8f', '#3f7f3a', '#b89f6e'],
      atmosphere: '#7cc4ff',
      atmosphereStrength: 0.8,
      scale: 2.1,
      sea: 0.47,
      caps: 1,
      seed: 3.1,
    },
  },
  {
    id: 'projects',
    title: 'Projects',
    accent: '#fcd34d',
    radius: 1.45,
    orbit: 9.6,
    period: 150,
    phase: 2.4,
    tilt: 0.36,
    spin: 0.12,
    rings: { inner: 1.35, outer: 2.2, color: '#e2cda3' },
    surface: {
      type: 'gas',
      colors: ['#5b3a21', '#b8834f', '#efd9a8', '#9a4b2b'],
      atmosphere: '#ffd99a',
      atmosphereStrength: 0.55,
      scale: 1.8,
      bands: 9,
      warp: 1.4,
      seed: 7.7,
    },
  },
  {
    id: 'skills',
    title: 'Skills',
    accent: '#c4b5fd',
    radius: 0.72,
    orbit: 13.2,
    period: 210,
    phase: 4.3,
    tilt: 0.2,
    spin: 0.22,
    surface: {
      type: 'rocky',
      colors: ['#1c0b3a', '#4c1d95', '#8b5cf6', '#e9d5ff'],
      atmosphere: '#b69cff',
      atmosphereStrength: 0.5,
      scale: 2.6,
      caps: 0,
      seed: 12.4,
    },
  },
  {
    id: 'education',
    title: 'Education',
    accent: '#fda4af',
    radius: 0.95,
    orbit: 16.6,
    period: 270,
    phase: 1.1,
    tilt: 0.3,
    spin: 0.15,
    surface: {
      type: 'rocky',
      colors: ['#2a0f0c', '#7a2e1f', '#c4684a', '#f0b494'],
      atmosphere: '#ff9e80',
      atmosphereStrength: 0.45,
      scale: 3.1,
      caps: 0.7,
      seed: 21.9,
    },
  },
  {
    id: 'contact',
    title: 'Contact',
    accent: '#5eead4',
    radius: 1.15,
    orbit: 20.2,
    period: 340,
    phase: 3.3,
    tilt: 0.5,
    spin: 0.1,
    surface: {
      type: 'gas',
      colors: ['#0b3b44', '#1c8a8a', '#7fe0d6', '#c6fff6'],
      atmosphere: '#7ff5e8',
      atmosphereStrength: 1,
      scale: 1.4,
      bands: 5,
      warp: 0.6,
      seed: 5.5,
    },
  },
]

export const OUTER_ORBIT = Math.max(...PLANETS.map((p) => p.orbit + p.radius))

export function planetById(id: SectionId): PlanetDef {
  const planet = PLANETS.find((p) => p.id === id)
  if (!planet) throw new Error(`No planet for section "${id}"`)
  return planet
}
