import { useEffect, useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { adminApi } from "../../lib/adminApi";

/**
 * Singleton form for the Social document — no list, no delete, just a
 * GET on mount and a PUT to save (Part 6.5). Flat shape (github,
 * linkedin, email) so it doesn't need the nested-field handling
 * PersonalFormPage does.
 */
export default function SocialFormPage() {
  const { token } = useAdminAuth();
  const [values, setValues] = useState({ github: "", linkedin: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    adminApi
      .request("/social", { token })
      .then((doc) =>
        setValues({
          github: doc.github || "",
          linkedin: doc.linkedin || "",
          email: doc.email || "",
        })
      )
      .catch((err) => setError(err.message || "Failed to load."))
      .finally(() => setLoading(false));
  }, [token]);

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    setSaved(false);
    try {
      await adminApi.request("/social", { method: "PUT", token, body: values });
      setSaved(true);
    } catch (err) {
      setError(err.message || "Save failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="admin-page-lead">Loading…</p>;

  return (
    <div className="admin-resource-page">
      <h1 className="admin-page-title">Social</h1>
      <p className="admin-page-lead">Links shown around the site: footer, contact section, etc.</p>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label className="admin-field">
          <span>GitHub URL</span>
          <input
            type="text"
            value={values.github}
            placeholder="https://github.com/..."
            onChange={(e) => handleChange("github", e.target.value)}
          />
        </label>

        <label className="admin-field">
          <span>LinkedIn URL</span>
          <input
            type="text"
            value={values.linkedin}
            placeholder="https://linkedin.com/in/..."
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
        </label>

        <label className="admin-field">
          <span>Email</span>
          <input
            type="text"
            value={values.email}
            placeholder="you@example.com"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </label>

        {error && (
          <p className="admin-auth-error" role="alert">
            {error}
          </p>
        )}
        {saved && !error && <p className="admin-page-lead">Saved.</p>}

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
            {submitting ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
