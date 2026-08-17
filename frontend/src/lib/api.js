// ============================================
// API CLIENT — talks to the Express/MongoDB backend.
// Base URL comes from VITE_API_URL (see .env.example); falls back to
// localhost for local dev against `npm run dev` in backend/.
// ============================================

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`);
  } catch {
    throw new Error("Could not reach the server. Check your connection and try again.");
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // response wasn't JSON — keep the generic message
    }
    throw new Error(message);
  }

  return res.json();
}

export const api = {
  personal: () => request("/personal"),
  social: () => request("/social"),
  projects: () => request("/projects"),
  skills: () => request("/skills"),
  skillsStack: () => request("/skills-stack"),
  experience: () => request("/experience"),
  leadership: () => request("/leadership"),
  education: () => request("/education"),
  achievements: () => request("/achievements"),
  journey: () => request("/journey"),
  research: () => request("/research"),
  certifications: () => request("/certifications"),
  services: () => request("/services"),
};

export { API_URL };
