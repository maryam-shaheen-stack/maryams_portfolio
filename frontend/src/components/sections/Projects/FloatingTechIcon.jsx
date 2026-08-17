import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Same idea as the floating perfume bottle: this isn't a one-shot "reveal
// once and freeze" element. Its entrance is scrubbed directly to scroll
// position (so it moves in and out smoothly if you scroll back up, exactly
// like the Hero/Skills timelines), and once it's on screen it keeps a
// gentle continuous drift instead of sitting static — echoing how the
// headphones in the reference video were always in motion, not a static
// image that just fades in and stops.
const OFFSETS = {
  top: { x: 0, y: -110, rot: -10 },
  bottom: { x: 0, y: 110, rot: 10 },
  left: { x: -130, y: 0, rot: -12 },
  right: { x: 130, y: 0, rot: 12 },
};

export default function FloatingTechIcon({ from = "bottom", floatDelay = 0, children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const offset = OFFSETS[from] || OFFSETS.bottom;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(outer, { opacity: 1, x: 0, y: 0, rotate: 0, filter: "none" });
        return;
      }

      gsap.set(outer, { opacity: 0, x: offset.x, y: offset.y, rotate: offset.rot, filter: "blur(8px)" });

      gsap.to(outer, {
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
        filter: "blur(0px)",
        ease: "none",
        scrollTrigger: {
          trigger: outer,
          start: "top 92%",
          end: "top 50%",
          scrub: 0.5,
        },
      });

      // Continuous idle float once it has entered — a slow, looping
      // bob + tilt on a separate inner element so it never fights with
      // the scroll-scrubbed entrance transform above.
      gsap.to(inner, {
        y: "+=9",
        rotate: 3.5,
        duration: 2.4,
        delay: floatDelay,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, outer);

    return () => ctx.revert();
  }, [from, floatDelay]);

  return (
    <div ref={outerRef} className="tech-float-outer">
      <div ref={innerRef} className="tech-float-inner">
        {children}
      </div>
    </div>
  );
}
