import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, type ComponentRef } from 'react'
import { Color, MathUtils } from 'three'

const SEGMENTS = 256
const WHITE = new Color('#ffffff')

export type OrbitEmphasis = 'normal' | 'highlighted' | 'dimmed' | 'hidden'

const OPACITY: Record<OrbitEmphasis, number> = {
  normal: 0.16,
  highlighted: 0.6,
  dimmed: 0.05,
  hidden: 0,
}

interface Props {
  radius: number
  color: string
  emphasis: OrbitEmphasis
}

export function Orbit({ radius, color, emphasis }: Props) {
  const line = useRef<ComponentRef<typeof Line>>(null)
  const accent = useMemo(() => new Color(color), [color])
  const points = useMemo(
    () =>
      Array.from({ length: SEGMENTS + 1 }, (_, i) => {
        const angle = (i / SEGMENTS) * Math.PI * 2
        return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number]
      }),
    [radius],
  )

  useFrame((_, delta) => {
    const material = line.current?.material
    if (!material) return
    material.opacity = MathUtils.damp(material.opacity, OPACITY[emphasis], 6, delta)
    material.color.lerp(emphasis === 'highlighted' ? accent : WHITE, 1 - Math.exp(-8 * delta))
  })

  return (
    <Line
      ref={line}
      points={points}
      color="white"
      lineWidth={1}
      transparent
      opacity={OPACITY.normal}
      depthWrite={false}
    />
  )
}
