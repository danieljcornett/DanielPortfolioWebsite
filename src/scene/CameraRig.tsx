import { CameraControls, CameraControlsImpl } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { MathUtils, Vector3, type PerspectiveCamera } from 'three'
import { panelCoverage } from '../lib/layout'
import { OUTER_ORBIT, planetById } from '../planets'
import type { SectionId } from '../types'
import { FOCUS_AZIMUTH, planetPosition, sim } from './simulation'

const { ACTION } = CameraControlsImpl

/** The overview camera sits above the orbital plane, looking down at about 32 degrees. */
const HOME_DIRECTION = new Vector3(0, 0.62, 1).normalize()
/**
 * Nudge the overview off-center so it balances the intro text: right on wide screens (text sits
 * bottom-left), down on phones (text sits on top). Fractions of half the screen width/height.
 */
const HOME_SHIFT_WIDE = 0.1
const HOME_SHIFT_COMPACT = 0.16
const FOCUS_ELEVATION = 0.3
/** How much of the uncovered screen area the focused planet fills. */
const FOCUS_FILL = 0.62
/** Roughly how long the zoom takes, in seconds. */
const TRANSITION_TIME = 0.85

const UP = new Vector3(0, 1, 0)
const target = new Vector3()
const eye = new Vector3()

interface Props {
  active: SectionId | null
  compact: boolean
  animate: boolean
}

export function CameraRig({ active, compact, animate }: Props) {
  const controls = useRef<CameraControlsImpl>(null)
  const camera = useThree((state) => state.camera) as PerspectiveCamera
  const width = useThree((state) => state.size.width)
  const height = useThree((state) => state.size.height)
  // While a planet is still slowing down, the camera keeps re-aiming at it every frame.
  const tracking = useRef(false)

  useEffect(() => {
    const cc = controls.current
    if (!cc) return
    if (active) {
      tracking.current = true
      return
    }
    tracking.current = false

    // Fit the whole system: width limits portrait screens, the tilted disc's depth limits wide ones.
    const aspect = width / height
    const tanHalf = Math.tan(MathUtils.degToRad(camera.fov / 2))
    const fitRadius = compact ? OUTER_ORBIT * 0.8 : OUTER_ORBIT * (1 + HOME_SHIFT_WIDE)
    const distance = Math.max(fitRadius / (tanHalf * aspect), (fitRadius * 0.62) / tanHalf)
    eye.copy(HOME_DIRECTION).multiplyScalar(distance)

    cc.minDistance = distance * 0.5
    cc.maxDistance = distance * 1.5
    cc.setLookAt(eye.x, eye.y, eye.z, 0, 0, 0, animate)
    if (compact) cc.setFocalOffset(0, -HOME_SHIFT_COMPACT * distance * tanHalf, 0, animate)
    else cc.setFocalOffset(-HOME_SHIFT_WIDE * distance * tanHalf * aspect, 0, 0, animate)
  }, [active, width, height, compact, animate, camera.fov])

  useFrame(() => {
    const cc = controls.current
    if (!cc || !active || !tracking.current) return

    const planet = planetById(active)
    planetPosition(planet, sim.time, target)

    // Back off until the planet (and its rings) fills the part of the screen the page leaves free.
    const aspect = width / height
    const tanHalf = Math.tan(MathUtils.degToRad(camera.fov / 2))
    const cover = panelCoverage(width, compact)
    const extent = planet.rings ? planet.radius * planet.rings.outer : planet.radius * 1.15
    const distance = Math.max(
      extent / (FOCUS_FILL * tanHalf * (1 - cover.y)),
      extent / (FOCUS_FILL * tanHalf * aspect * (1 - cover.x)),
    )

    eye
      .copy(target)
      .negate()
      .setY(0)
      .normalize()
      .applyAxisAngle(UP, FOCUS_AZIMUTH)
      .setY(FOCUS_ELEVATION)
      .normalize()
      .multiplyScalar(distance)
      .add(target)

    cc.minDistance = distance * 0.6
    cc.maxDistance = distance * 2
    cc.setLookAt(eye.x, eye.y, eye.z, target.x, target.y, target.z, animate)
    // Slide the view so the planet sits in the middle of the uncovered area.
    cc.setFocalOffset(cover.x * distance * tanHalf * aspect, cover.y * distance * tanHalf, 0, animate)

    if (sim.speed === 0) tracking.current = false
  })

  return (
    <CameraControls
      ref={controls}
      makeDefault
      smoothTime={TRANSITION_TIME}
      draggingSmoothTime={0.12}
      minPolarAngle={0.12 * Math.PI}
      maxPolarAngle={0.47 * Math.PI}
      mouseButtons={{ left: ACTION.ROTATE, middle: ACTION.DOLLY, right: ACTION.NONE, wheel: ACTION.DOLLY }}
      touches={{ one: ACTION.TOUCH_ROTATE, two: ACTION.TOUCH_DOLLY, three: ACTION.NONE }}
    />
  )
}
