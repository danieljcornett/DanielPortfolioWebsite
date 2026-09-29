import { useCursor } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { useCallback, useRef, useState } from 'react'
import { accentStyle } from '../lib/layout'
import { useIsCompact, usePrefersReducedMotion } from '../lib/media'
import { navigate } from '../lib/router'
import { PLANETS } from '../planets'
import type { SectionId } from '../types'
import { Backdrop } from './Backdrop'
import { CameraRig } from './CameraRig'
import { Planet } from './Planet'
import { SimDriver } from './SimDriver'
import styles from './SolarSystem.module.css'
import { Sun } from './Sun'

const goHome = () => navigate(null)

export default function SolarSystem({ active }: { active: SectionId | null }) {
  const compact = useIsCompact()
  const reducedMotion = usePrefersReducedMotion()
  const animate = !reducedMotion
  const [ready, setReady] = useState(false)
  // If the browser drops the GPU context, fade the scene out rather than leave a blank canvas.
  const [contextLost, setContextLost] = useState(false)
  const [hovered, setHovered] = useState<SectionId | null>(null)
  const labels = useRef(new Map<SectionId, HTMLElement>())
  useCursor(hovered !== null && hovered !== active)

  const hover = useCallback((id: SectionId, hovering: boolean) => {
    setHovered((current) => (hovering ? id : current === id ? null : current))
  }, [])

  return (
    <div className={styles.stage} data-ready={ready && !contextLost} aria-hidden="true">
      <Canvas
        // 1.5x keeps edges crisp on retina screens at roughly half the GPU memory of 2x.
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ fov: 40, near: 0.1, far: 1000, position: [0, 70, 170] }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', () => setContextLost(true))
          gl.domElement.addEventListener('webglcontextrestored', () => setContextLost(false))
          setReady(true)
        }}
      >
        <color attach="background" args={['#030409']} />
        <SimDriver paused={active !== null || reducedMotion} />
        <Backdrop animate={animate} />
        <Sun animate={animate} onSelect={active ? goHome : undefined} />
        {PLANETS.map((planet) => (
          <Planet
            key={planet.id}
            planet={planet}
            active={planet.id === active}
            focused={active !== null}
            hovered={planet.id === hovered}
            animate={animate}
            labels={labels}
            onHover={hover}
            onSelect={navigate}
          />
        ))}
        <CameraRig active={active} compact={compact} animate={animate} />
        <EffectComposer multisampling={compact ? 0 : 2}>
          <Bloom mipmapBlur luminanceThreshold={1} luminanceSmoothing={0.3} intensity={1.2} radius={0.8} />
          <Vignette offset={0.3} darkness={0.7} />
          <ToneMapping mode={ToneMappingMode.AGX} />
        </EffectComposer>
      </Canvas>

      {/* Mouse/touch shortcuts only; the header nav is the accessible way to reach each section. */}
      <div className={styles.labels}>
        {PLANETS.map((planet) => (
          <div
            key={planet.id}
            ref={(element) => {
              if (element) labels.current.set(planet.id, element)
              return () => {
                labels.current.delete(planet.id)
              }
            }}
            className={styles.label}
            data-hidden={active !== null}
            data-hovered={planet.id === hovered}
            style={accentStyle(planet.accent)}
            onClick={() => navigate(planet.id)}
            onPointerEnter={() => hover(planet.id, true)}
            onPointerLeave={() => hover(planet.id, false)}
          >
            {planet.title}
          </div>
        ))}
      </div>
    </div>
  )
}
