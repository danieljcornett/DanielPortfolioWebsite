import { useCursor } from '@react-three/drei'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AdditiveBlending, MathUtils, type Mesh, type SpriteMaterial } from 'three'
import { SUN_RADIUS } from '../planets'
import { createGlowTexture, createSunMaterial, uniformsOf } from './materials'

interface Props {
  animate: boolean
  /** Clicking the sun zooms back out. Only passed while a section is open. */
  onSelect?: () => void
}

export function Sun({ animate, onSelect }: Props) {
  const mesh = useRef<Mesh>(null)
  const halo = useRef<SpriteMaterial>(null)
  const material = useMemo(() => createSunMaterial(), [])
  const glow = useMemo(() => createGlowTexture(), [])
  const [hovered, setHovered] = useState(false)
  useCursor(hovered && onSelect !== undefined)

  useEffect(
    () => () => {
      material.dispose()
      glow.dispose()
    },
    [material, glow],
  )

  useFrame((state, delta) => {
    const uniforms = uniformsOf(mesh.current)
    if (uniforms && animate) uniforms.uTime.value += delta
    // Up close to an inner planet the camera sits inside the halo, which would wash the view out.
    if (halo.current) halo.current.opacity = MathUtils.smoothstep(state.camera.position.length(), 6, 18)
  })

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    // A long pointer travel means the visitor was dragging the view, not clicking.
    if (!onSelect || event.delta > 6) return
    event.stopPropagation()
    onSelect()
  }

  return (
    <group>
      <mesh
        ref={mesh}
        material={material}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[SUN_RADIUS, 96, 64]} />
      </mesh>
      <sprite scale={SUN_RADIUS * 7}>
        <spriteMaterial ref={halo} map={glow} blending={AdditiveBlending} depthWrite={false} transparent />
      </sprite>
    </group>
  )
}
