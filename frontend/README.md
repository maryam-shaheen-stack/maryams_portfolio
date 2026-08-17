# Maryam Shaheen — Portfolio (Frontend, Phase 1)

Cinematic, scroll-driven 3D portfolio. This is the **frontend foundation**:
hero experience + all content sections, wired to real content, no backend yet.

## Stack
React 19 · Vite · Three.js · @react-three/fiber · @react-three/drei · GSAP + ScrollTrigger · Lenis

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to /dist
npm run preview   # serve the production build locally
```

## Project structure

```
src/
  data/            <- ALL editable content lives here (plain JS objects/arrays).
                      This is the exact shape the future MongoDB collections
                      and admin dashboard will use -- swapping a data/*.js file
                      for a fetch() call is a small, mechanical change.
    personal.js    <- hero copy, about paragraphs, contact/footer text
    social.js      <- github/linkedin/email links
    skills.js      <- skills grouped by category
    projects.js    <- all 6 projects (featured + other)
    experience.js  <- work experience + leadership
    research.js    <- ICTIST 2026 research entry
    education.js   <- degree info
    achievements.js<- highlights + journey timeline + services

  components/
    ui/            <- Nav, Section wrapper, Reveal (scroll-fade), shared CSS
    sections/
      Hero/        <- the cinematic scroll sequence (see below)
      About.jsx, Skills.jsx, FeaturedProjects.jsx, OtherProjects.jsx,
      Experience.jsx, Research.jsx, EducationAchievements.jsx,
      Contact.jsx, Footer.jsx

  hooks/           <- useLenis (mounts smooth scroll), useHeroProgress
  lib/             <- lenis.js (Lenis<->GSAP bridge), scrollStore.js (shared
                      scroll-progress value read by both the DOM timeline
                      and the R3F canvas)
  styles/          <- theme.css (all color variables), global.css
```

## How the hero works

`Hero.jsx` wraps a 420vh-tall section. GSAP's ScrollTrigger pins the
viewport-height inner element and scrubs one master timeline against
scroll position (fed by Lenis). The same `progress` value (0-1) is pushed
into `lib/scrollStore.js`, which the R3F `HeroScene` reads every frame --
so the DOM letter-animation and the WebGL particles/camera/lighting stay
perfectly in sync without two separate scroll systems.

Timeline stages: name hold (0-0.16) -> letters fragment into depth
(0.16-0.42) -> photo emerges via clip-path + blur (0.4-0.68) -> photo
settles back (0.68-0.8) -> introduction fades in (0.8-1.0).

## Placeholder assets

`public/images/maryam-photo.jpg` and `public/images/projects/*.jpg` are
generated placeholders in the theme colors -- swap them for real photos/
project screenshots any time; nothing else needs to change since the
paths are referenced from `data/*.js`.

## Known TODOs in the data files

Search for `TODO` / `PLACEHOLDER` in `src/data/` -- these are the exact
spots that need real values (email, resume link, GitHub/LinkedIn URLs,
project live/demo links, project images).

## What's NOT in this phase

Backend (Express/MongoDB/auth) and the admin dashboard are planned next --
see `NEXT_STEPS.md` in the project root.
