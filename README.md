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

## Filling in your content

| What | Where |
| --- | --- |
| All text: name, bio, projects, skills, education, contact | `src/content.ts` |
| Page title and link-preview text | `index.html` |
| Your photo, résumé PDF, project screenshots | `public/`, then reference them in `src/content.ts` (e.g. `photo: '/me.jpg'`) |
| Planet order, colors, sizes, and orbits | `src/planets.ts` |

Leave an optional field empty (`resumeUrl: ''`, no `image`) and the UI hides it or shows a placeholder.

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

Routing uses the URL hash (`/#/projects`), so deep links and the back button work on any static host
(GitHub Pages, Netlify, Vercel) with no server config.

Accessibility and fallbacks: the header nav reaches every section by keyboard, Escape closes a page,
`prefers-reduced-motion` stops the orbits and skips the camera flight, and if WebGL is unavailable
the site still works over a plain starry background.
