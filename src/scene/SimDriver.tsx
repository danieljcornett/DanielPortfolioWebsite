import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useRef } from 'react'
import { MathUtils } from 'three'
import { sim } from './simulation'

/** Advances the orbital clock, easing it to a stop while `paused`. */
export function SimDriver({ paused }: { paused: boolean }) {
  // Opening the site straight onto a section (or with reduced motion) starts with the planets still.
  const pausedOnMount = useRef(paused)
  useLayoutEffect(() => {
    if (pausedOnMount.current) sim.speed = 0
  }, [])

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1)
    sim.speed = MathUtils.damp(sim.speed, paused ? 0 : 1, paused ? 3.5 : 1.2, dt)
    if (paused && sim.speed < 0.002) sim.speed = 0
    sim.time += dt * sim.speed
  }, -1)

  return null
}
