/** Splits a string into per-character objects for GSAP letter animation. */
export function splitLetters(text) {
  return text.split("").map((char, i) => ({ char: char === " " ? "\u00A0" : char, id: `${text}-${i}` }));
}
