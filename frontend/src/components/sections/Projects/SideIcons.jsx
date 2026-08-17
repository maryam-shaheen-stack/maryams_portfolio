import FloatingTechIcon from "./FloatingTechIcon";
import { TECH_ICONS } from "./TechIcons";

// Each icon enters from its own edge as the section scrolls into view —
// alternating between the column's own side and top/bottom keeps the
// motion varied instead of every icon sliding in the same way, matching
// the reference video where each item entered from a different edge.
function directionFor(side, index) {
  if (index % 3 === 0) return side; // left col -> from left, right col -> from right
  return index % 2 === 0 ? "top" : "bottom";
}

export default function SideIcons({ side, keys }) {
  return (
    <div className={`projects-side projects-side-${side}`} aria-hidden="true">
      {keys.map((key, i) => {
        const { Icon, label } = TECH_ICONS[key];
        return (
          <FloatingTechIcon key={key} from={directionFor(side, i)} floatDelay={i * 0.3}>
            <span className="tech-chip-icon">
              <Icon />
            </span>
            <span className="tech-chip-label">{label}</span>
          </FloatingTechIcon>
        );
      })}
    </div>
  );
}
