// Same pattern as lib/scrollStore.js, kept separate so the Hero and the
// Skills section each drive their own independent scroll-progress value.
let position = 0; // "virtual position" — a float across the tech list, e.g. 2.4
const listeners = new Set();

export function setSkillsPosition(p) {
  position = p;
  listeners.forEach((l) => l(position));
}

export function getSkillsPosition() {
  return position;
}

export function subscribeSkillsPosition(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
