import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";

const PortfolioDataContext = createContext(null);

// Fallback shape for `personal` so nothing crashes on the rare case the
// provider renders before data is ready — normal loads never hit this
// because App gates rendering behind `loading`.
const EMPTY_PERSONAL = {
  name: "",
  firstName: "",
  lastName: "",
  hero: { headline: "", tagline: "", intro: "", photo: "" },
  about: { paragraphs: [], focus: [], education: "" },
  contact: { heading: "", subheading: "", email: "" },
  footer: { tagline: "", copyright: "" },
  cv: { url: "" },
};

const EMPTY_SOCIAL = { github: "", linkedin: "", email: "" };

// Adds a stable `id` (mirrors the old static-data shape so components
// that key lists on `.id` don't need to change) and sorts by `order`.
function normalizeList(list) {
  if (!Array.isArray(list)) return [];
  return [...list]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item) => ({ ...item, id: item.slug || item._id || item.id }));
}

async function loadAll() {
  // Promise.allSettled so one missing/broken resource (e.g. the admin
  // hasn't added Research yet) doesn't take down the whole site.
  const [
    personal,
    social,
    projects,
    skills,
    skillsStack,
    experience,
    leadership,
    education,
    achievements,
    journey,
    research,
    certifications,
    services,
  ] = await Promise.allSettled([
    api.personal(),
    api.social(),
    api.projects(),
    api.skills(),
    api.skillsStack(),
    api.experience(),
    api.leadership(),
    api.education(),
    api.achievements(),
    api.journey(),
    api.research(),
    api.certifications(),
    api.services(),
  ]);

  // `personal` and `social` are the only two the whole layout depends on
  // (Nav, Footer, Hero, Contact all read from them) — if either is
  // missing, treat it as a hard failure so the user sees a clear error
  // instead of a broken/blank page.
  if (personal.status === "rejected") throw personal.reason;
  if (social.status === "rejected") throw social.reason;

  const projectList = normalizeList(projects.status === "fulfilled" ? projects.value : []);

  return {
    personal: personal.value,
    social: social.value,
    projects: projectList,
    featuredProjects: projectList.filter((p) => p.featured),
    otherProjects: projectList.filter((p) => !p.featured),
    skillCategories: normalizeList(skills.status === "fulfilled" ? skills.value : []),
    skillsStack: normalizeList(skillsStack.status === "fulfilled" ? skillsStack.value : []),
    experience: normalizeList(experience.status === "fulfilled" ? experience.value : []),
    leadership: normalizeList(leadership.status === "fulfilled" ? leadership.value : []),
    education: normalizeList(education.status === "fulfilled" ? education.value : []),
    achievements: normalizeList(achievements.status === "fulfilled" ? achievements.value : []),
    journey: normalizeList(journey.status === "fulfilled" ? journey.value : []),
    research: normalizeList(research.status === "fulfilled" ? research.value : []),
    certifications: normalizeList(certifications.status === "fulfilled" ? certifications.value : []),
    services: normalizeList(services.status === "fulfilled" ? services.value : []),
  };
}

export function PortfolioDataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(() => {
    setLoading(true);
    setError(null);
    loadAll()
      .then((result) => setData(result))
      .catch((err) => setError(err.message || "Something went wrong loading the site."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const value = {
    data: data || { personal: EMPTY_PERSONAL, social: EMPTY_SOCIAL },
    loading,
    error,
    retry: fetchAll,
  };

  return <PortfolioDataContext.Provider value={value}>{children}</PortfolioDataContext.Provider>;
}

export function usePortfolioData() {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) {
    throw new Error("usePortfolioData must be used inside a PortfolioDataProvider");
  }
  return ctx;
}
