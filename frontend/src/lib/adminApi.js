// ============================================
// ADMIN API CLIENT — talks to the auth + write routes on the Express
// backend. Separate from lib/api.js (public, read-only, no auth) since
// every call here needs a token and 401s need special handling.
// ============================================

import { API_URL } from "./api";

// Thrown specifically on a 401 so callers (AdminAuthContext) can tell
// "your session is gone, log in again" apart from other failures.
export class AuthError extends Error {}

async function parseErrorMessage(res) {
  try {
    const body = await res.json();
    if (body?.error) return body.error;
  } catch {
    // response wasn't JSON — fall through to generic message
  }
  return `Request failed (${res.status})`;
}

/**
 * Authenticated request helper for admin routes. Pass `token` from
 * AdminAuthContext. `body` (if given) is sent as JSON unless it's a
 * FormData instance (file uploads), in which case the browser sets
 * the correct multipart Content-Type itself.
 */
async function authedRequest(path, { method = "GET", token, body } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (body !== undefined && !isFormData) headers["Content-Type"] = "application/json";

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
    });
  } catch {
    throw new Error("Could not reach the server. Check your connection and try again.");
  }

  if (res.status === 401) {
    throw new AuthError(await parseErrorMessage(res));
  }

  if (!res.ok) {
    throw new Error(await parseErrorMessage(res));
  }

  if (res.status === 204) return null;
  return res.json();
}

export const adminApi = {
  // Public (no token needed) — exchanges credentials for a token.
  login: (email, password) =>
    authedRequest("/auth/login", { method: "POST", body: { email, password } }),

  // Verifies a stored token is still valid and re-fetches the admin's
  // own info, so a page refresh doesn't force a re-login unnecessarily.
  me: (token) => authedRequest("/auth/me", { token }),

  // Generic escape hatch for Step 6's per-section CRUD — e.g.
  // adminApi.request("/projects", { method: "POST", token, body }).
  request: authedRequest,
};
