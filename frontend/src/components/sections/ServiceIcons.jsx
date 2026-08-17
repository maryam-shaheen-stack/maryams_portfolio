// Stylized, hand-drawn line icons for the Services section. Same
// construction as AchievementIcons.jsx / Projects/TechIcons.jsx so the
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

export function IconFullStackService(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3" y="4" width="18" height="8" rx="1.6" />
      <rect x="3" y="14" width="18" height="6" rx="1.6" />
      <circle cx="6.3" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="8.3" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <path d="M7 17h4" />
    </svg>
  );
}

export function IconFrontend(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3" y="4.5" width="18" height="13" rx="1.6" />
      <path d="M3 8.5h18" />
      <circle cx="6" cy="6.5" r="0.55" fill="currentColor" stroke="none" />
      <path d="M7 12.5 9.5 15 7 17.3" transform="translate(-1.5 -2.3)" />
      <path d="M8 14.5h5" />
    </svg>
  );
}

export function IconBackend(props) {
  return (
    <svg {...common} {...props}>
      <rect x="4" y="3.5" width="16" height="5.5" rx="1.4" />
      <rect x="4" y="10.2" width="16" height="5.5" rx="1.4" />
      <rect x="4" y="17" width="16" height="4" rx="1.2" />
      <circle cx="7.2" cy="6.2" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="7.2" cy="13" r="0.55" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconDatabase(props) {
  return (
    <svg {...common} {...props}>
      <ellipse cx="12" cy="6" rx="7.5" ry="2.6" />
      <path d="M4.5 6v12c0 1.4 3.4 2.6 7.5 2.6s7.5-1.2 7.5-2.6V6" />
      <path d="M4.5 12c0 1.4 3.4 2.6 7.5 2.6s7.5-1.2 7.5-2.6" />
    </svg>
  );
}

export function IconCreative(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 3v3.4M12 17.6V21M3 12h3.4M17.6 12H21" />
      <path d="M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
      <circle cx="12" cy="12" r="3.4" />
    </svg>
  );
}

export function IconAIService(props) {
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

export const SERVICE_ICONS = {
  fullstack: IconFullStackService,
  frontend: IconFrontend,
  backend: IconBackend,
  database: IconDatabase,
  creative: IconCreative,
  ai: IconAIService,
};
