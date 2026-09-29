import { Stars } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import { createNebulaMaterial } from './materials'

export function Backdrop({ animate }: { animate: boolean }) {
  const nebula = useMemo(() => createNebulaMaterial(), [])
  useEffect(() => () => nebula.dispose(), [nebula])

  return (
    <>
      <mesh material={nebula} renderOrder={-1}>
        <sphereGeometry args={[400, 96, 64]} />
      </mesh>
      <Stars radius={160} depth={80} count={7000} factor={5} saturation={0.15} fade speed={animate ? 0.6 : 0} />
    </>
  )
}
