// Stylized, hand-drawn line icons for the Achievements section.
// Same construction as TechIcons.jsx (Projects/TechIcons.jsx) so the
// whole site shares one consistent icon language instead of emoji.

const common = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconTrophy(props) {
  return (
    <svg {...common} {...props}>
      <path d="M7 4h10v4.5a5 5 0 0 1-10 0Z" />
      <path d="M7 5H4.5a2.5 2.5 0 0 0 2.5 4.2M17 5h2.5a2.5 2.5 0 0 1-2.5 4.2" />
      <path d="M12 13.5v3" />
      <path d="M8.5 20.5h7" />
      <path d="M9.5 16.5h5l.7 4h-6.4Z" />
    </svg>
  );
}

export function IconLeadership(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5" />
      <path d="M12 3.2 12.9 5.1 15 5.4 13.5 6.8 13.9 8.9 12 7.9 10.1 8.9 10.5 6.8 9 5.4 11.1 5.1Z" />
    </svg>
  );
}

export function IconFullStack(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3" y="5" width="18" height="12.5" rx="1.6" />
      <path d="M8.5 9.5 6.5 11.5 8.5 13.5" />
      <path d="M15.5 9.5 17.5 11.5 15.5 13.5" />
      <path d="M12.7 8.7 11.3 14.3" />
      <path d="M8 20.5h8" />
    </svg>
  );
}

export function IconAI(props) {
  return (
    <svg {...common} {...props}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <circle cx="10.2" cy="11" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="13.8" cy="11" r="0.9" fill="currentColor" stroke="none" />
      <path d="M9.5 14c.7.6 1.5.9 2.5.9s1.8-.3 2.5-.9" />
      <path d="M12 7V3.5M7 12H3.5M20.5 12H17M9 3.5h6" />
      <path d="M5.5 6.5 7 7.8M18.5 6.5 17 7.8M5.5 17.5 7 16.2M18.5 17.5 17 16.2" />
    </svg>
  );
}

export function IconGlobe(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="3.6" ry="8.5" />
      <path d="M3.5 12h17" />
      <path d="M4.8 7.5h14.4M4.8 16.5h14.4" />
    </svg>
  );
}

export const ACHIEVEMENT_ICONS = {
  trophy: IconTrophy,
  leadership: IconLeadership,
  fullstack: IconFullStack,
  ai: IconAI,
  globe: IconGlobe,
};
