import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillsScene from "./SkillsScene";
import { usePortfolioData } from "../../../context/PortfolioDataContext.jsx";
import { setSkillsPosition } from "../../../lib/skillsScrollStore";
import { EmptyState } from "../../ui/SiteStatus";
import "./skills.css";

gsap.registerPlugin(ScrollTrigger);

const HOLD = 0.08; // fraction of scroll held at the very start/end so the
// first and last pair each get a calm beat before/after the motion begins.
const BAND_OFFSET = 130; // px a neighbor pair sits above/below the focus band
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;

// Group items into pairs — two cards advance together as a single slot,
// laid out side by side inside one 90%-wide flex row (see skills.css),
// which is what makes the pacing fix AND the "both boxes visible, full
// width, room for text" request the same underlying change.
function toPairs(list) {
  const pairs = [];
  for (let i = 0; i < list.length; i += 2) pairs.push(list.slice(i, i + 2));
  return pairs;
}

// Maps overall scroll progress (0-1) to a continuous "virtual position"
// across the slots, e.g. 2.35 = 35% of the way from slot 2 to slot 3.
function progressToVirtualPosition(progress, count) {
  if (progress <= HOLD) return 0;
  if (progress >= 1 - HOLD) return count - 1;
  const t = (progress - HOLD) / (1 - HOLD * 2);
  return t * (count - 1);
}

// Given how far a slot sits from the current virtual position, compute
// its opacity / scale / blur / vertical offset. delta = 0 is the focus
// band; |delta| = 1 is an immediate neighbor (faint preview); anything
// further is fully hidden. Both cards in a slot move together as one
// unit — horizontal placement is handled entirely by CSS flex, not JS.
function styleForDelta(delta) {
  const abs = Math.min(Math.abs(delta), 2);
  const near = clamp(abs, 0, 1); // 0 (focus) -> 1 (neighbor)
  const far = clamp((abs - 1) / 0.7, 0, 1); // 0 (neighbor) -> 1 (gone)

  const opacity = lerp(lerp(1, 0.22, near), 0, far);
  const scale = lerp(lerp(1, 0.82, near), 0.72, far);
  const blur = lerp(lerp(0, 4, near), 6, far);
  const y = delta * BAND_OFFSET;

  return { opacity, scale, blur, y };
}

export default function Skills() {
  const { data: { skillsStack } } = usePortfolioData();
  const wrapperRef = useRef(null);
  const pinRef = useRef(null);
  const slotRefs = useRef([]);
  const pairs = toPairs(skillsStack);

  useLayoutEffect(() => {
    const slots = slotRefs.current.filter(Boolean);
    const count = pairs.length;

    const ctx = gsap.context(() => {
      const render = (progress) => {
        const vp = progressToVirtualPosition(progress, count);
        setSkillsPosition(vp);
        slots.forEach((el, i) => {
          const { opacity, scale, blur, y } = styleForDelta(i - vp);
          gsap.set(el, {
            opacity,
            scale,
            y,
            filter: blur > 0.05 ? `blur(${blur}px)` : "none",
          });
        });
      };

      render(0);

      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        pin: pinRef.current,
        anticipatePin: 1,
        onUpdate: (self) => render(self.progress),
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  if (pairs.length === 0) {
    return (
      <section id="skills" className="skills-wrapper skills-wrapper--empty">
        <p className="skills-eyebrow">Technology</p>
        <EmptyState>Skills are coming soon.</EmptyState>
      </section>
    );
  }

  return (
    <section
      id="skills"
      className="skills-wrapper"
      ref={wrapperRef}
      style={{ height: `${pairs.length * 55 + 60}vh` }}
    >
      <div className="skills-pin" ref={pinRef}>
        <SkillsScene />

        <div className="skills-dom">
          <p className="skills-eyebrow">Technology</p>

          <div className="skills-focus-band">
            {pairs.map((pair, slotIndex) => (
              <div
                key={pair.map((s) => s.name).join("-")}
                ref={(el) => (slotRefs.current[slotIndex] = el)}
                className="skills-item"
              >
                <div className={`skills-pair-row ${pair.length === 1 ? "skills-pair-row--solo" : ""}`}>
                  {pair.map((skill) => {
                    const i = skillsStack.indexOf(skill);
                    return (
                      <div key={skill.name} className="skills-card">
                        <span className="skills-card-index">{String(i + 1).padStart(2, "0")}</span>
                        <span className="skills-card-name">{skill.name}</span>
                        <span className="skills-card-detail">{skill.detail}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
