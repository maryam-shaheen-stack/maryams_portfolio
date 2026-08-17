// ============================================
// CERTIFICATIONS — rendered dynamically, never hard-coded in UI.
// Shape mirrors the future MongoDB `Certification` schema exactly,
// so swapping this static array for an API fetch is a 1-line change
// (see projects.js for the same pattern already used elsewhere).
//
// SAMPLE DATA — replace with real certificates. Once the Admin
// Dashboard is live, this file goes away entirely and the section
// fetches from the API instead.
// ============================================

export const certifications = [
  {
    id: "cert-1",
    order: 1,
    title: "Full-Stack Web Development",
    organization: "Add issuing organization",
    date: "2025",
    image: "/images/certifications/placeholder-1.jpg", // PLACEHOLDER
    credentialUrl: "", // TODO: add verification link
  },
  {
    id: "cert-2",
    order: 2,
    title: "React: Advanced Concepts",
    organization: "Add issuing organization",
    date: "2025",
    image: "/images/certifications/placeholder-2.jpg", // PLACEHOLDER
    credentialUrl: "",
  },
  {
    id: "cert-3",
    order: 3,
    title: "Introduction to Machine Learning",
    organization: "Add issuing organization",
    date: "2025",
    image: "/images/certifications/placeholder-3.jpg", // PLACEHOLDER
    credentialUrl: "",
  },
  {
    id: "cert-4",
    order: 4,
    title: "Cybersecurity Fundamentals",
    organization: "Add issuing organization",
    date: "2026",
    image: "/images/certifications/placeholder-4.jpg", // PLACEHOLDER
    credentialUrl: "",
  },
  {
    id: "cert-5",
    order: 5,
    title: "Python for Data Science",
    organization: "Add issuing organization",
    date: "2026",
    image: "/images/certifications/placeholder-5.jpg", // PLACEHOLDER
    credentialUrl: "",
  },
  {
    id: "cert-6",
    order: 6,
    title: "Git & Version Control",
    organization: "Add issuing organization",
    date: "2025",
    image: "/images/certifications/placeholder-6.jpg", // PLACEHOLDER
    credentialUrl: "",
  },
];
