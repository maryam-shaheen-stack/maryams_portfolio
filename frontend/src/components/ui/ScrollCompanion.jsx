import { useEffect, useRef } from "react";

/**
 * A "</>" code-tag badge that trails down the page as you scroll, tracing
 * a curvy (sine-wave) path left-to-right instead of hugging one edge —
 * echoes the way sections/content already alternate sides throughout the
 * site. Pure DOM + SVG (no WebGL), driven by a rAF loop reading raw
 * scroll position, so it's cheap enough to leave on for mobile too.
 */
const AMPLITUDE_VW = 30; // how far it swings each side of center
const FREQUENCY = 2.2; // sine cycles across one full page scroll
const TOP_START_VH = 12; // stays clear of the fixed nav
const TOP_END_VH = 80; // stays clear of the footer

export default function ScrollCompanion() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !wrapRef.current) return;

    let raf = null;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      const angle = p * FREQUENCY * Math.PI * 2;
      const left = 50 + Math.sin(angle) * AMPLITUDE_VW;
      const top = TOP_START_VH + p * (TOP_END_VH - TOP_START_VH);
      const tilt = Math.cos(angle) * 8; // subtle bank into the turn

      if (wrapRef.current) {
        wrapRef.current.style.left = `${left}vw`;
        wrapRef.current.style.top = `${top}vh`;
        wrapRef.current.style.setProperty("--tilt", `${tilt}deg`);
      }
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => raf && cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={wrapRef} className="scroll-companion" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        className="scroll-companion-icon"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="8 6 2 12 8 18" />
        <line x1="14.5" y1="4" x2="9.5" y2="20" />
        <polyline points="16 6 22 12 16 18" />
      </svg>
    </div>
  );
}
