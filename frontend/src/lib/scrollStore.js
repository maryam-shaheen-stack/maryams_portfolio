// Minimal external store so the R3F canvas (outside the DOM animation
// tree) can read the exact same hero scroll progress that GSAP/ScrollTrigger
// is driving on the DOM layer — one source of truth, two renderers.
let progress = 0;
const listeners = new Set();

export function setHeroProgress(p) {
  progress = p;
  listeners.forEach((l) => l(progress));
}

export function getHeroProgress() {
  return progress;
}

export function subscribeHeroProgress(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
