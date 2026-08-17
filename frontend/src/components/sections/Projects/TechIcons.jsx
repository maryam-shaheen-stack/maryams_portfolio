// Stylized, hand-drawn line icons for the tech stack shown beside the
// Projects section. These are original abstract glyphs (not brand logos)
// so they stay visually consistent with the Atelier palette.

const common = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconReact(props) {
  return (
    <svg {...common} {...props}>
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconThree(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 3 21 8.5v7L12 21 3 15.5v-7Z" />
      <path d="M12 3v18M3 8.5l9 5 9-5" />
    </svg>
  );
}

export function IconNode(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 2.5 20.5 7.3v9.4L12 21.5 3.5 16.7V7.3Z" />
      <path d="M9 12.2c0-1.4 1.2-2.4 3-2.4s3 1 3 2.4-1.2 2.1-3 2.1-3 .8-3 2.2 1.2 2.5 3 2.5 3-1 3-2.5" transform="scale(0.62) translate(6.5 6)" />
    </svg>
  );
}

export function IconMongo(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 2.5c3 3.4 5 7.2 5 10.8a5 5 0 0 1-10 0c0-3.6 2-7.4 5-10.8Z" />
      <path d="M12 13v8.5" />
    </svg>
  );
}

export function IconJS(props) {
  return (
    <svg {...common} {...props}>
      <path d="M9 4c-1.6 0-2.4.9-2.4 2.2 0 3.1 4.4 2.6 4.4 5.4 0 1-.6 1.6-1.7 1.6-1 0-1.6-.5-2-1.3" />
      <path d="M17.6 4c-1.7 0-2.7 1-2.7 2.6v9.6c0 1.7-.7 2.5-2 2.5-1 0-1.7-.4-2.3-1.2" />
    </svg>
  );
}

export function IconPython(props) {
  return (
    <svg {...common} {...props}>
      <path d="M12 3c-2.8 0-4.3.9-4.3 2.4v2.3h4.6v.7H5.8C4 8.4 3 9.9 3 12.4s1 4 2.8 4h1.7v-2.6c0-2 1.7-3.4 4.3-3.4h3.4c1.6 0 2.8-1.2 2.8-2.8V5.4C18 3.9 16.5 3 13.7 3Z" />
      <path d="M12 21c2.8 0 4.3-.9 4.3-2.4v-2.3h-4.6v-.7h6.5c1.8 0 2.8-1.5 2.8-4s-1-4-2.8-4h-1.7v2.6c0 2-1.7 3.4-4.3 3.4H8.8c-1.6 0-2.8 1.2-2.8 2.8v2.2C6 20.1 7.5 21 10.3 21Z" />
      <circle cx="9" cy="5.6" r="0.55" fill="currentColor" stroke="none" />
      <circle cx="15" cy="18.4" r="0.55" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconGit(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="7" cy="6" r="1.8" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="12" r="1.8" />
      <path d="M7 7.8V16.2" />
      <path d="M8.6 6.5c3 0 5.4 2.4 6.6 4" />
    </svg>
  );
}

export function IconExpress(props) {
  return (
    <svg {...common} {...props}>
      <path d="M3 17 8.5 12 3 7" />
      <path d="M10.5 17h9" />
      <path d="M13.2 17c0-3.4 1.3-5.4 3.6-5.4S20 13.2 20 15.5" />
    </svg>
  );
}

export const TECH_ICONS = {
  react: { Icon: IconReact, label: "React" },
  three: { Icon: IconThree, label: "Three.js" },
  node: { Icon: IconNode, label: "Node.js" },
  express: { Icon: IconExpress, label: "Express" },
  mongo: { Icon: IconMongo, label: "MongoDB" },
  js: { Icon: IconJS, label: "JavaScript" },
  python: { Icon: IconPython, label: "Python" },
  git: { Icon: IconGit, label: "Git" },
};
