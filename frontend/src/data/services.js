// ============================================
// SERVICES — freelance / collaboration offerings.
// Shape mirrors the future MongoDB `Service` schema, so this can later
// be swapped for an API fetch without touching the UI.
// ============================================

export const services = [
  {
    id: "s1",
    order: 1,
    icon: "fullstack",
    title: "Full-Stack Development",
    shortDescription: "End-to-end web applications, from database to interface.",
    description:
      "Building complete web applications with a connected frontend, backend, REST APIs and database: planned, structured and shipped as a single working product rather than disconnected pieces.",
    deliverables: ["Frontend + backend build", "API design & integration", "Database setup & modeling", "Deployment-ready handoff"],
  },
  {
    id: "s2",
    order: 2,
    icon: "frontend",
    title: "Frontend Development",
    shortDescription: "Responsive, interactive and modern interfaces.",
    description:
      "Creating clean, responsive, and interactive user interfaces with attention to layout, motion and usability, from a design or idea to a fully working, production-ready frontend.",
    deliverables: ["Responsive UI build", "Component-based structure", "Animations & micro-interactions", "Cross-device testing"],
  },
  {
    id: "s3",
    order: 3,
    icon: "backend",
    title: "Backend Development",
    shortDescription: "Server-side logic and REST APIs that hold up.",
    description:
      "Developing server-side applications and REST APIs with Node.js and Express, covering routing, authentication, business logic and clean, maintainable backend architecture.",
    deliverables: ["REST API development", "Auth & routing logic", "Server-side architecture", "API documentation"],
  },
  {
    id: "s4",
    order: 4,
    icon: "database",
    title: "Database Integration",
    shortDescription: "MongoDB and database-driven application logic.",
    description:
      "Designing and connecting MongoDB databases to power dynamic, data-driven applications: schema design, queries, and reliable data flow between frontend and backend.",
    deliverables: ["Schema design", "MongoDB integration", "CRUD functionality", "Data validation"],
  },
  {
    id: "s5",
    order: 5,
    icon: "creative",
    title: "Creative Web Experiences",
    shortDescription: "3D, animation and cinematic product storytelling.",
    description:
      "Building visually engaging websites that go beyond a standard layout: scroll-based motion, 3D elements, and interactive storytelling for brands and products that want to stand out.",
    deliverables: ["Scroll-based animation", "3D / interactive elements", "Cinematic product pages", "Custom visual direction"],
  },
  {
    id: "s6",
    order: 6,
    icon: "ai",
    title: "AI & Computer Vision",
    shortDescription: "Practical AI features: image processing & ML.",
    description:
      "Exploring and implementing practical AI solutions involving image processing, computer vision and machine learning, from dataset preparation to a working, integrated feature.",
    deliverables: ["Model training & evaluation", "Image processing pipelines", "ML integration into apps", "Dataset preparation"],
  },
];
