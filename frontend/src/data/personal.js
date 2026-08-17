// ============================================
// PERSONAL / SITE-WIDE CONTENT
// This file is the single source of truth for hero,
// about, contact and footer copy. In the admin-connected
// version this data is fetched from GET /api/personal.
// ============================================

export const personal = {
  name: "Maryam Shaheen",
  firstName: "Maryam",
  lastName: "Shaheen",

  hero: {
    headline: "Full-Stack Web Developer & Computer Science Student",
    tagline: "Currently learning • Building • Exploring",
    intro:
      "I'm a Computer Science student passionate about building modern, interactive, and user-focused web applications. I work with the MERN stack and enjoy combining web development, AI, cybersecurity, and creative digital experiences to turn ideas into functional products.",
    photo: "/images/maryam-photo.jpg", // PLACEHOLDER — replace with real photo asset
  },

  about: {
    paragraphs: [
      "I'm Maryam Shaheen, a Computer Science student with a strong interest in full-stack web development, AI, and cybersecurity.",
      "I enjoy taking an idea from concept to a working product, from designing the interface and developing interactive experiences to building backend systems and connecting databases.",
      "My primary development focus is the MERN stack, while I continue exploring AI, secure software development, networking, and modern web technologies.",
      "Beyond development, I've also been involved in technical communities and leadership activities, where I've worked with teams, organized sessions, hosted events, and collaborated with people from different technical backgrounds.",
      "My goal is to grow into a strong software engineer who can build useful, scalable, secure, and visually engaging digital products.",
    ],
    focus: ["MERN Stack", "3D Web Development", "AI", "Cybersecurity", "Creative Web Experiences"],
    education: "BS Computer Science",
  },

  contact: {
    heading: "Let's Build Something",
    subheading: "Have an idea, project, or opportunity? I'd love to turn it into something meaningful.",
    email: "PLACEHOLDER_EMAIL@example.com", // TODO: replace with real email
    resumeUrl: "", // TODO: add resume link
  },

  footer: {
    tagline: "Full-Stack Developer • Computer Science Student • AI & Cybersecurity Enthusiast",
    copyright: `© ${new Date().getFullYear()} Maryam Shaheen. Built with passion and code.`,
  },
};
