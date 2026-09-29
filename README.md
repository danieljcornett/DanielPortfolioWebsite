# Personal Portfolio

A solar-system portfolio: the sun is the home screen, and each section lives on a planet.
Click a planet (or use the nav) and the camera zooms to it while that section's page slides in.

Built with React, TypeScript, Vite, and React Three Fiber.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check, then build to dist/
npm run lint
```

## How it fits together

```
src/
  content.ts        everything visitors read
  planets.ts        which section lives on which planet, and how each planet looks
  App.tsx           scene + header + home hero + section page
  scene/            the 3D solar system (lazy-loaded)
    SolarSystem.tsx   canvas, post-processing, planet labels
    CameraRig.tsx     overview framing and the zoom-to-planet transition
    Planet.tsx, Sun.tsx, Orbit.tsx, Backdrop.tsx
    materials.ts      procedural GLSL surfaces (no texture files)
    simulation.ts     shared orbital clock
  sections/         the page shown for each planet
  ui/               header nav, home hero, section page shell, icons
  lib/              hash router, media queries, layout constants
```

