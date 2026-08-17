import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "./HeroScene";
import { splitLetters } from "./splitLetters";
import { setHeroProgress } from "../../../lib/scrollStore";
import { getLenis } from "../../../lib/lenis";
import { usePortfolioData } from "../../../context/PortfolioDataContext.jsx";
import "./hero.css";

// Same-page section links (#projects, #contact) need to go through Lenis
// explicitly — a plain <a href="#hash"> jumps the native scroll position
// instantly, which fights Lenis's virtualized scroll and leaves it out of
// sync (the exact thing ScrollToTop.jsx already handles for cross-route
// hash links; this is the same fix for in-page ones).
function scrollToSection(e, hash) {
  e.preventDefault();
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { immediate: false });
  else el.scrollIntoView({ behavior: "smooth" });
}

gsap.registerPlugin(ScrollTrigger);

const FIRST = splitLetters("MARYAM");
const LAST = splitLetters("SHAHEEN");

export default function Hero() {
  const { data: { personal, social } } = usePortfolioData();
  const wrapperRef = useRef(null);
  const pinRef = useRef(null);
  const lettersRef = useRef([]);
  const photoWrapRef = useRef(null);
  const introRef = useRef(null);
  const hintRef = useRef(null);

  useLayoutEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const letters = lettersRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      // Deterministic pseudo-random scatter per letter (stable across renders)
      const scatter = letters.map((_, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        return {
          x: dir * (40 + (i * 37) % 120),
          y: (i % 3 === 0 ? -1 : 1) * (30 + (i * 53) % 140),
          rot: dir * (15 + (i * 29) % 40),
          z: -(80 + (i * 61) % 260),
        };
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          pin: pinRef.current,
          anticipatePin: 1,
          onUpdate: (self) => setHeroProgress(self.progress),
        },
        defaults: { ease: "none" },
      });

      // --- STATE 1 (0 - 0.20): calm hold on the name only. Nothing else moves. ---
      tl.to(hintRef.current, { opacity: 0, y: -10, duration: 0.06 }, 0.12);

      // --- STATE 3 (0.20 - 0.48): name breaks — letters separate into depth ---
      // Fully resolves (opacity 0) BEFORE the photo starts, so the two never overlap.
      letters.forEach((el, i) => {
        const s = scatter[i];
        tl.to(
          el,
          {
            x: s.x,
            y: s.y,
            z: s.z,
            rotateZ: s.rot,
            filter: "blur(6px)",
            opacity: 0,
            duration: 0.28,
          },
          0.2
        );
      });

      // --- STATE 4 (0.50 - 0.70): photo emerges into the space the name left behind ---
      // Starts only after the name has fully dissolved (0.48) — a brief beat of empty
      // space (0.48–0.50) makes the "space opens" moment readable.
      tl.fromTo(
        photoWrapRef.current,
        { opacity: 0, scale: 0.82, clipPath: "circle(0% at 50% 50%)", filter: "blur(14px)" },
        { opacity: 1, scale: 1, clipPath: "circle(75% at 50% 50%)", filter: "blur(0px)", duration: 0.2, ease: "power2.out" },
        0.5
      );

      // --- STATE 5 (0.70 - 0.85): photo settles into its resting position ---
      tl.to(photoWrapRef.current, { scale: 0.62, y: -60, duration: 0.15, ease: "power2.inOut" }, 0.7);

      // --- STATE 6 (0.85 - 1.0): introduction appears, once the photo is at rest ---
      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
        0.85
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-wrapper" ref={wrapperRef}>
      <div className="hero-pin" ref={pinRef}>
        <HeroScene />

        <div className="hero-dom">
          <div className="hero-name" aria-label={personal.name}>
            <div className="hero-name-line">
              {FIRST.map((l, i) => (
                <span
                  key={l.id}
                  ref={(el) => (lettersRef.current[i] = el)}
                  className="hero-letter"
                >
                  {l.char}
                </span>
              ))}
            </div>
            <div className="hero-name-line">
              {LAST.map((l, i) => (
                <span
                  key={l.id}
                  ref={(el) => (lettersRef.current[FIRST.length + i] = el)}
                  className="hero-letter"
                >
                  {l.char}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-photo-wrap" ref={photoWrapRef}>
            <div className="hero-photo-frame">
              <img src={personal.hero.photo} alt={personal.name} className="hero-photo" />
            </div>
          </div>

          <div className="hero-intro" ref={introRef}>
            <p className="eyebrow">{personal.hero.tagline}</p>
            <h1 className="hero-intro-name">{personal.name}</h1>
            <p className="hero-intro-role">{personal.hero.headline}</p>
            <p className="hero-intro-text">{personal.hero.intro}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary" onClick={(e) => scrollToSection(e, "#projects")}>View My Work</a>
              <a href="#contact" className="btn btn-ghost" onClick={(e) => scrollToSection(e, "#contact")}>Contact Me</a>
              <a href={social.github} target="_blank" rel="noreferrer" className="btn btn-link">GitHub</a>
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="btn btn-link">LinkedIn</a>
            </div>
          </div>

          <div className="scroll-hint" ref={hintRef}>
            <span>Scroll</span>
            <span className="scroll-hint-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
