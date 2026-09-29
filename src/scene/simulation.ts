import type { Vector3 } from 'three'
import type { PlanetDef } from '../planets'

/**
 * The shared orbital clock. It is mutated every frame, so it lives outside React state.
 * `speed` eases to 0 while a section is open, bringing the planets to a gentle stop.
 */
export const sim = { time: 0, speed: 1 }

/**
 * When a section opens, the camera views its planet from this far around (in radians) from the
 * planet's sunlit side. Planets lean their axis toward that viewpoint so rings always show open.
 */
export const FOCUS_AZIMUTH = 0.95

export function orbitAngle(planet: PlanetDef, time: number) {
  return planet.phase + (time / planet.period) * Math.PI * 2
}

export function planetPosition(planet: PlanetDef, time: number, target: Vector3) {
  const angle = orbitAngle(planet, time)
  return target.set(Math.cos(angle) * planet.orbit, 0, -Math.sin(angle) * planet.orbit)
}
