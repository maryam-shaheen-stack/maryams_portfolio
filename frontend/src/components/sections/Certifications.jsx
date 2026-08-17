import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { usePortfolioData } from "../../context/PortfolioDataContext.jsx";
import { EmptyState } from "../ui/SiteStatus";
import { getLenis } from "../../lib/lenis";
import "./certifications.css";

const BASE_SPEED_PX_S = 95; // track speed at rest
const HOVER_TIME_SCALE = 0.28; // how much it slows on hover (not a full stop)

export default function Certifications() {
  const { data: { certifications } } = usePortfolioData();
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const hoveringRef = useRef(false);
  const decayTimeoutRef = useRef(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || certifications.length === 0) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        // Respect the OS-level preference: no continuous auto-motion.
        // Cards stay laid out (only the first, non-duplicated set is
        // reachable via tabIndex anyway) and remain scrollable manually.
        track.style.overflowX = "auto";
        return;
      }

      const build = () => {
        tweenRef.current?.kill();
        const setWidth = track.scrollWidth / 2; // one duplicated set
        const duration = Math.max(setWidth / BASE_SPEED_PX_S, 8);
        tweenRef.current = gsap.to(track, {
          xPercent: -50,
          duration,
          ease: "none",
          repeat: -1,
        });
      };

      build();

      // Rebuild on resize so speed stays visually consistent across
      // breakpoints (xPercent itself already stays mathematically exact —
      // this only re-tunes duration).
      let resizeTimer;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(build, 200);
      };
      window.addEventListener("resize", onResize);

      // Subtle scroll-velocity influence: a brief speed lift while the
      // user is actively scrolling, decaying straight back to the resting
      // speed (or hover speed) shortly after — never reverses direction,
      // never something the user has to fight.
      const lenis = getLenis();
      const onScroll = ({ velocity }) => {
        if (!tweenRef.current) return;
        const boost = Math.min(Math.abs(velocity) * 0.06, 0.5);
        const base = hoveringRef.current ? HOVER_TIME_SCALE : 1;
        gsap.to(tweenRef.current, { timeScale: base + boost, duration: 0.3, overwrite: true });
        clearTimeout(decayTimeoutRef.current);
        decayTimeoutRef.current = setTimeout(() => {
          gsap.to(tweenRef.current, { timeScale: base, duration: 0.9 });
        }, 150);
      };
      lenis?.on("scroll", onScroll);

      return () => {
        window.removeEventListener("resize", onResize);
        lenis?.off("scroll", onScroll);
      };
    }, track);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    hoveringRef.current = true;
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: HOVER_TIME_SCALE, duration: 0.5, overwrite: true });
  };
  const handleLeave = () => {
    hoveringRef.current = false;
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5, overwrite: true });
  };

  // Render the list twice, back to back — the tween moves exactly one
  // set's width (xPercent -50 of the doubled track) then repeats, so the
  // wrap point is invisible: set B is already sitting where set A started.
  const doubled = certifications.length > 0 ? [...certifications, ...certifications] : [];

  return (
    <Section id="certifications" eyebrow="Certifications" title="Continuous learning" className="certifications">
      <Reveal>
        <p className="cert-subtitle">
          Continuous learning through technology, development and innovation.
        </p>
      </Reveal>

      {certifications.length === 0 ? (
        <EmptyState>Certifications are coming soon.</EmptyState>
      ) : (
        <div className="cert-marquee" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          <div className="cert-glow" aria-hidden="true" />
          <div className="cert-track" ref={trackRef}>
            {doubled.map((cert, i) => (
              <a
                key={`${cert.id}-${i}`}
                href={cert.credentialUrl || undefined}
                target={cert.credentialUrl ? "_blank" : undefined}
                rel={cert.credentialUrl ? "noreferrer" : undefined}
                className="cert-card"
                tabIndex={i < certifications.length ? 0 : -1}
                aria-hidden={i >= certifications.length}
              >
                <div className="cert-image-wrap">
                  <img src={cert.image} alt={cert.title} loading="lazy" />
                </div>
                <div className="cert-body">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-meta">
                    {cert.organization}
                    {cert.date ? ` · ${cert.date}` : ""}
                  </p>
                  {cert.credentialUrl && <span className="cert-link">View credential →</span>}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
