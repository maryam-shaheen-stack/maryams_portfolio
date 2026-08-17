// ============================================
// PROJECTS — rendered dynamically, never hard-coded in UI.
// Shape mirrors the future MongoDB `Project` schema exactly,
// so swapping this static array for an API fetch is a 1-line change.
// ============================================

export const projects = [
  {
    id: "perfume-3d",
    order: 1,
    year: "2026",
    featured: true,
    title: "3D Perfume Experience",
    shortDescription: "An immersive, cinematic luxury perfume website built with 3D, motion, and video.",
    fullDescription:
      "An experimental luxury perfume website focused on creating an immersive, cinematic product experience using 3D elements, animations, video, and interactive scrolling. Instead of simply displaying a product, the site uses floating 3D product elements, scroll-based movement, cinematic video, product transitions, particle effects, interactive sections and premium visual design. The goal was to explore how traditional product websites can be transformed into interactive digital experiences through 3D, motion, storytelling, and modern web technologies.",
    category: "Creative 3D Web Experience",
    technologies: ["JavaScript", "Spline", "3D Web", "CSS", "AI Video Generation"],
    image: "/images/projects/perfume-3d.jpg", // PLACEHOLDER
    video: "", // TODO: add project video
    liveUrl: "", // TODO
    githubUrl: "", // TODO
  },
  {
    id: "msqn-tutors",
    order: 2,
    year: "2025",
    featured: true,
    title: "MSQN Tutors",
    shortDescription: "A full-stack tutoring platform connecting students with educational resources.",
    fullDescription:
      "A full-stack tutoring platform designed to connect students with educational resources and tutoring services through a modern web interface. I developed the frontend interface, built backend functionality using Node.js and Express, connected the application with MongoDB, implemented database-driven functionality, structured the project as a full-stack web application, and worked on creating a user-friendly experience.",
    category: "Full-Stack Web Application",
    technologies: ["MongoDB", "Express.js", "Node.js", "JavaScript"],
    image: "/images/projects/msqn-tutors.jpg", // PLACEHOLDER
    video: "",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: "clothing-brand",
    order: 3,
    year: "2025",
    featured: true,
    title: "Clothing Brand E-Commerce",
    shortDescription: "A modern, product-focused full-stack clothing brand website.",
    fullDescription:
      "A modern clothing brand website designed to combine an attractive product-focused interface with full-stack functionality: responsive design, dynamic product handling, backend integration, a MongoDB database, admin functionality, and Instagram-based product imagery. This project strengthened my understanding of connecting frontend interfaces with backend APIs and database systems while maintaining a visually engaging user experience.",
    category: "Full-Stack E-Commerce / Brand Website",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    image: "/images/projects/clothing-brand.jpg", // PLACEHOLDER
    video: "",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: "fake-product-detection",
    order: 4,
    year: "2025",
    featured: true,
    title: "Fake Product Detection System",
    shortDescription: "A computer vision system classifying genuine vs. fake product images.",
    fullDescription:
      "A computer vision and machine learning project focused on identifying whether a product image belongs to a genuine or fake category. Work involved image dataset preparation, preprocessing, augmentation, computer vision techniques, machine learning model training, binary classification, and model evaluation. The system learns visual patterns from product images and classifies them into two categories.",
    category: "AI / Computer Vision",
    technologies: ["Python", "OpenCV", "NumPy", "TensorFlow / Keras"],
    image: "/images/projects/fake-product-detection.jpg", // PLACEHOLDER
    video: "",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: "plantpedia",
    order: 5,
    year: "2025",
    featured: false,
    title: "PlantPedia",
    shortDescription: "A WordPress educational platform for plant information.",
    fullDescription:
      "A WordPress-based educational platform focused on presenting plant-related information through a simple and accessible web experience. Focused on website structure and content organization, responsive design, educational content presentation, WordPress customization, and user-friendly navigation.",
    category: "Educational Website",
    technologies: ["WordPress"],
    image: "/images/projects/plantpedia.jpg", // PLACEHOLDER
    video: "",
    liveUrl: "",
    githubUrl: "",
  },
  {
    id: "mango-splash",
    order: 6,
    year: "2026",
    featured: false,
    title: "Mango Splash",
    shortDescription: "An AI-generated cinematic product advertisement concept.",
    fullDescription:
      "A short cinematic product animation concept created for a fictional mango juice brand, combining AI-generated visuals, product storytelling, and video editing. The animation follows a mango from the tree through a visual transformation into mango juice and finally into the branded Mango Splash bottle.",
    category: "AI Creative / Product Advertisement",
    technologies: ["AI Video Generation", "AI Image Generation", "CapCut"],
    image: "/images/projects/mango-splash.jpg", // PLACEHOLDER
    video: "",
    liveUrl: "",
    githubUrl: "",
  },
];

export const featuredProjects = projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);
export const otherProjects = projects.filter((p) => !p.featured).sort((a, b) => a.order - b.order);
