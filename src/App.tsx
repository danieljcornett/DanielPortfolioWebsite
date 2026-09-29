import { lazy, Suspense, useEffect } from 'react'
import { profile } from './content'
import { useActiveSection } from './lib/router'
import { planetById } from './planets'
import { Header } from './ui/Header'
import { HomeHero } from './ui/HomeHero'
import { SceneBoundary } from './ui/SceneBoundary'
import { SectionPanel } from './ui/SectionPanel'

// The 3D scene is the heaviest part of the site, so it loads separately while the text renders.
const SolarSystem = lazy(() => import('./scene/SolarSystem'))

export default function App() {
  const active = useActiveSection()

  useEffect(() => {
    document.title = active
      ? `${planetById(active).title} · ${profile.name}`
      : `${profile.name} · Portfolio`
  }, [active])

  return (
    <>
      <SceneBoundary>
        <Suspense fallback={null}>
          <SolarSystem active={active} />
        </Suspense>
      </SceneBoundary>
      <Header active={active} />
      <main>
        <HomeHero hidden={active !== null} />
        <SectionPanel active={active} />
      </main>
    </>
  )
}
