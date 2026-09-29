import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type RefObject } from 'react'
import { MathUtils, Vector3, type Group, type Mesh, type PerspectiveCamera } from 'three'
import type { PlanetDef } from '../planets'
import type { SectionId } from '../types'
import {
  createAtmosphereMaterial,
  createCloudMaterial,
  createPlanetMaterial,
  createRingMaterial,
  uniformsOf,
} from './materials'
import { Orbit } from './Orbit'
import { FOCUS_AZIMUTH, orbitAngle, planetPosition, sim } from './simulation'

const ATMOSPHERE_SCALE = 1.12
const LABEL_GAP_PX = 14
const anchor = new Vector3()

interface Props {
  planet: PlanetDef
  /** This planet's section is open */
  active: boolean
  /** Any section is open */
  focused: boolean
  hovered: boolean
  animate: boolean
  /** DOM labels drawn over the canvas; this planet keeps its own label pinned beneath it. */
  labels: RefObject<Map<SectionId, HTMLElement>>
  onHover: (id: SectionId, hovering: boolean) => void
  onSelect: (id: SectionId) => void
}

export function Planet({ planet, active, focused, hovered, animate, labels, onHover, onSelect }: Props) {
  const orbitRef = useRef<Group>(null!)
  const scaleRef = useRef<Group>(null!)
  const tiltRef = useRef<Group>(null!)
  const spinRef = useRef<Group>(null!)
  const surfaceRef = useRef<Mesh>(null)
  const cloudsRef = useRef<Mesh>(null)
  const atmosphereRef = useRef<Mesh>(null)
  const ringsRef = useRef<Mesh>(null)
  const highlighted = hovered && !active

  const surface = useMemo(() => createPlanetMaterial(planet.surface), [planet.surface])
  const atmosphere = useMemo(
    () =>
      createAtmosphereMaterial(planet.surface.atmosphere, planet.surface.atmosphereStrength, ATMOSPHERE_SCALE),
    [planet.surface],
  )
  const clouds = useMemo(
    () => (planet.clouds ? createCloudMaterial(planet.surface.seed) : null),
    [planet.clouds, planet.surface.seed],
  )
  const rings = useMemo(
    () => (planet.rings ? createRingMaterial(planet.rings, planet.radius) : null),
    [planet.rings, planet.radius],
  )

  useEffect(
    () => () => {
      surface.dispose()
      atmosphere.dispose()
      clouds?.dispose()
      rings?.dispose()
    },
    [surface, atmosphere, clouds, rings],
  )

  useFrame((state, delta) => {
    const surfaceUniforms = uniformsOf(surfaceRef.current)
    const cloudUniforms = uniformsOf(cloudsRef.current)
    const atmosphereUniforms = uniformsOf(atmosphereRef.current)
    const ringUniforms = uniformsOf(ringsRef.current)
    if (!surfaceUniforms || !atmosphereUniforms) return

    planetPosition(planet, sim.time, orbitRef.current.position)
    // Lean the axis toward where the camera will view this planet from, so rings never show edge-on.
    tiltRef.current.rotation.y = orbitAngle(planet, sim.time) + FOCUS_AZIMUTH

    if (animate) {
      spinRef.current.rotation.y += delta * planet.spin
      surfaceUniforms.uTime.value += delta
      if (cloudsRef.current && cloudUniforms) {
        cloudsRef.current.rotation.y += delta * planet.spin * 0.3
        cloudUniforms.uTime.value += delta
      }
    }

    const hover = MathUtils.damp(surfaceUniforms.uHover.value, highlighted ? 1 : 0, 10, delta)
    surfaceUniforms.uHover.value = hover
    atmosphereUniforms.uHover.value = hover * 0.8
    scaleRef.current.scale.setScalar(1 + hover * 0.08)

    // Other planets fade back while a section is open so the focused one stands out.
    const dim = MathUtils.damp(surfaceUniforms.uDim.value, focused && !active ? 1 : 0, 4, delta)
    for (const uniforms of [surfaceUniforms, atmosphereUniforms, cloudUniforms, ringUniforms]) {
      if (uniforms) uniforms.uDim.value = dim
    }

    if (ringUniforms) {
      ringUniforms.uPlanetCenter.value.copy(orbitRef.current.position)
      ringUniforms.uPlanetRadius.value = planet.radius * scaleRef.current.scale.x
    }

    // Pin the label just below the planet's disc on screen.
    const label = labels.current.get(planet.id)
    if (label) {
      const camera = state.camera as PerspectiveCamera
      anchor.copy(orbitRef.current.position)
      const distance = anchor.distanceTo(camera.position)
      anchor.project(camera)
      const onScreen = anchor.z < 1 && Math.abs(anchor.x) < 1.2 && Math.abs(anchor.y) < 1.2
      label.style.visibility = onScreen ? 'visible' : 'hidden'
      if (onScreen) {
        const halfHeight = state.size.height / 2
        const extent = planet.rings ? planet.radius * planet.rings.outer * 0.7 : planet.radius * 1.25
        const radiusPx = (extent / (distance * Math.tan(MathUtils.degToRad(camera.fov / 2)))) * halfHeight
        const x = (anchor.x * 0.5 + 0.5) * state.size.width
        const y = (0.5 - anchor.y * 0.5) * state.size.height + radiusPx + LABEL_GAP_PX
        label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translateX(-50%)`
      }
    }
  })

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    // A long pointer travel means the visitor was dragging the view, not clicking.
    if (event.delta > 6) return
    event.stopPropagation()
    onSelect(planet.id)
  }

  const handleOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    onHover(planet.id, true)
  }

  // Generous invisible hit area so small planets are easy to click and tap.
  const hitRadius = planet.radius * 1.5 + 0.4

  return (
    <>
      <Orbit
        radius={planet.orbit}
        color={planet.accent}
        // The open planet's own orbit would cut straight through it, so it disappears.
        emphasis={active ? 'hidden' : focused ? 'dimmed' : hovered ? 'highlighted' : 'normal'}
      />
      <group ref={orbitRef}>
        <group ref={scaleRef}>
          <group ref={tiltRef} rotation-z={planet.tilt}>
            <group ref={spinRef}>
              <mesh ref={surfaceRef} material={surface}>
                <sphereGeometry args={[planet.radius, 96, 64]} />
              </mesh>
              {clouds && (
                <mesh ref={cloudsRef} material={clouds}>
                  <sphereGeometry args={[planet.radius * 1.02, 96, 64]} />
                </mesh>
              )}
            </group>
            {rings && planet.rings && (
              <mesh ref={ringsRef} material={rings} rotation-x={-Math.PI / 2}>
                <ringGeometry
                  args={[planet.radius * planet.rings.inner, planet.radius * planet.rings.outer, 160, 1]}
                />
              </mesh>
            )}
          </group>
          <mesh ref={atmosphereRef} material={atmosphere}>
            <sphereGeometry args={[planet.radius * ATMOSPHERE_SCALE, 64, 48]} />
          </mesh>
        </group>

        <mesh
          visible={false}
          onClick={handleClick}
          onPointerOver={handleOver}
          onPointerOut={() => onHover(planet.id, false)}
        >
          <sphereGeometry args={[hitRadius, 24, 16]} />
        </mesh>
      </group>
    </>
  )
}
