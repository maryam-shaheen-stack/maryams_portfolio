import { useEffect, useRef, useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { adminApi } from "../../lib/adminApi";
import ImageUploadField from "../../components/admin/ImageUploadField.jsx";

/**
 * Singleton form for the Personal document (Part 6.5) — the biggest of
 * the two, since it holds nested hero/about/contact/footer objects
 * plus the hero photo and CV file (Part 6.6).
 *
 * IMPORTANT: PUT /personal does `$set: { hero: {...} }` etc — sending a
 * `hero` object without `photo`/`photoPublicId` would wipe them out,
 * since Mongo replaces the whole subdocument. So those two are carried
 * along in state (never shown as text inputs) and included in every
 * save, kept in sync by the photo upload widget below.
 */
export default function PersonalFormPage() {
  const { token } = useAdminAuth();

  const [values, setValues] = useState(() => emptyValues());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const [cv, setCv] = useState({ url: "", originalName: "", uploadedAt: null });
  const [cvBusy, setCvBusy] = useState(false);
  const [cvError, setCvError] = useState(null);
  const cvInputRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    adminApi
      .request("/personal", { token })
      .then((doc) => {
        setValues(toFormValues(doc));
        setCv(doc.cv || { url: "", originalName: "", uploadedAt: null });
      })
      .catch((err) => setError(err.message || "Failed to load."))
      .finally(() => setLoading(false));
  }, [token]);

  function handleChange(section, key, value) {
    setSaved(false);
    setValues((prev) =>
      section ? { ...prev, [section]: { ...prev[section], [key]: value } } : { ...prev, [key]: value }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    setSaved(false);
    try {
      const doc = await adminApi.request("/personal", { method: "PUT", token, body: toRequestBody(values) });
      setValues(toFormValues(doc));
      setSaved(true);
    } catch (err) {
      setError(err.message || "Save failed.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUploadCv(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCvBusy(true);
    setCvError(null);
    try {
      const formData = new FormData();
      formData.append("cv", file);
      const doc = await adminApi.request("/personal/cv", { method: "POST", token, body: formData });
      setCv(doc.cv);
    } catch (err) {
      setCvError(err.message || "Upload failed.");
    } finally {
      setCvBusy(false);
      if (cvInputRef.current) cvInputRef.current.value = "";
    }
  }

  async function handleDeleteCv() {
    if (!window.confirm("Remove the current CV? The download link will 404 until a new one is uploaded.")) return;
    setCvBusy(true);
    setCvError(null);
    try {
      const doc = await adminApi.request("/personal/cv", { method: "DELETE", token });
      setCv(doc.cv);
    } catch (err) {
      setCvError(err.message || "Delete failed.");
    } finally {
      setCvBusy(false);
    }
  }

  if (loading) return <p className="admin-page-lead">Loading…</p>;

  return (
    <div className="admin-resource-page">
      <h1 className="admin-page-title">Personal</h1>
      <p className="admin-page-lead">Site-wide copy: hero, about, contact, and footer.</p>

      <form className="admin-form" onSubmit={handleSubmit}>
        <fieldset className="admin-fieldset">
          <legend>Basics</legend>
          <label className="admin-field">
            <span>Full name</span>
            <input type="text" value={values.name} onChange={(e) => handleChange(null, "name", e.target.value)} required />
          </label>
          <label className="admin-field">
            <span>First name</span>
            <input
              type="text"
              value={values.firstName}
              onChange={(e) => handleChange(null, "firstName", e.target.value)}
              required
            />
          </label>
          <label className="admin-field">
            <span>Last name</span>
            <input
              type="text"
              value={values.lastName}
              onChange={(e) => handleChange(null, "lastName", e.target.value)}
              required
            />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Hero</legend>
          <label className="admin-field">
            <span>Headline</span>
            <input
              type="text"
              value={values.hero.headline}
              onChange={(e) => handleChange("hero", "headline", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Tagline</span>
            <input
              type="text"
              value={values.hero.tagline}
              onChange={(e) => handleChange("hero", "tagline", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Intro</span>
            <textarea
              rows={4}
              value={values.hero.intro}
              onChange={(e) => handleChange("hero", "intro", e.target.value)}
            />
          </label>

          <ImageUploadField
            label="Hero photo"
            imageUrl={values.hero.photo}
            fieldName="photo"
            onUpload={(formData) =>
              adminApi.request("/personal/photo", { method: "POST", token, body: formData })
            }
            onUploaded={(doc) => setValues(toFormValues(doc))}
          />
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>About</legend>
          <label className="admin-field">
            <span>Paragraphs</span>
            <textarea
              rows={6}
              value={values.about.paragraphs}
              placeholder={"One paragraph per line"}
              onChange={(e) => handleChange("about", "paragraphs", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Focus areas</span>
            <textarea
              rows={2}
              value={values.about.focus}
              placeholder="comma, separated, values"
              onChange={(e) => handleChange("about", "focus", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Education summary</span>
            <input
              type="text"
              value={values.about.education}
              onChange={(e) => handleChange("about", "education", e.target.value)}
            />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Contact</legend>
          <label className="admin-field">
            <span>Heading</span>
            <input
              type="text"
              value={values.contact.heading}
              onChange={(e) => handleChange("contact", "heading", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Subheading</span>
            <input
              type="text"
              value={values.contact.subheading}
              onChange={(e) => handleChange("contact", "subheading", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Email</span>
            <input
              type="text"
              value={values.contact.email}
              onChange={(e) => handleChange("contact", "email", e.target.value)}
            />
          </label>
        </fieldset>

        <fieldset className="admin-fieldset">
          <legend>Footer</legend>
          <label className="admin-field">
            <span>Tagline</span>
            <input
              type="text"
              value={values.footer.tagline}
              onChange={(e) => handleChange("footer", "tagline", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Copyright</span>
            <input
              type="text"
              value={values.footer.copyright}
              onChange={(e) => handleChange("footer", "copyright", e.target.value)}
            />
          </label>
        </fieldset>

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

      <fieldset className="admin-fieldset admin-cv-fieldset">
        <legend>CV</legend>
        {cv?.url ? (
          <p className="admin-page-lead">
            Current: <a href={cv.url} target="_blank" rel="noreferrer">{cv.originalName || "CV.pdf"}</a>
          </p>
        ) : (
          <p className="admin-page-lead">No CV uploaded yet.</p>
        )}

        <div className="admin-form-actions">
          <label className="admin-btn">
            {cvBusy ? "Working…" : "Upload new CV"}
            <input
              ref={cvInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleUploadCv}
              disabled={cvBusy}
              style={{ display: "none" }}
            />
          </label>
          {cv?.url && (
            <button type="button" className="admin-btn admin-btn-danger" onClick={handleDeleteCv} disabled={cvBusy}>
              Remove CV
            </button>
          )}
        </div>
        {cvError && (
          <p className="admin-auth-error" role="alert">
            {cvError}
          </p>
        )}
      </fieldset>
    </div>
  );
}

// ---- value <-> request-body conversion ----

function emptyValues() {
  return {
    name: "",
    firstName: "",
    lastName: "",
    hero: { headline: "", tagline: "", intro: "", photo: "", photoPublicId: "" },
    about: { paragraphs: "", focus: "", education: "" },
    contact: { heading: "", subheading: "", email: "" },
    footer: { tagline: "", copyright: "" },
  };
}

function toFormValues(doc) {
  return {
    name: doc.name || "",
    firstName: doc.firstName || "",
    lastName: doc.lastName || "",
    hero: {
      headline: doc.hero?.headline || "",
      tagline: doc.hero?.tagline || "",
      intro: doc.hero?.intro || "",
      // Carried through, not directly editable — see file-level note.
      photo: doc.hero?.photo || "",
      photoPublicId: doc.hero?.photoPublicId || "",
    },
    about: {
      paragraphs: Array.isArray(doc.about?.paragraphs) ? doc.about.paragraphs.join("\n") : "",
      focus: Array.isArray(doc.about?.focus) ? doc.about.focus.join(", ") : "",
      education: doc.about?.education || "",
    },
    contact: {
      heading: doc.contact?.heading || "",
      subheading: doc.contact?.subheading || "",
      email: doc.contact?.email || "",
    },
    footer: {
      tagline: doc.footer?.tagline || "",
      copyright: doc.footer?.copyright || "",
    },
  };
}

function toRequestBody(values) {
  return {
    name: values.name,
    firstName: values.firstName,
    lastName: values.lastName,
    hero: {
      headline: values.hero.headline,
      tagline: values.hero.tagline,
      intro: values.hero.intro,
      // Preserved as-is so saving the text fields never clobbers the
      // photo set via the upload widget.
      photo: values.hero.photo,
      photoPublicId: values.hero.photoPublicId,
    },
    about: {
      paragraphs: values.about.paragraphs
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      focus: values.about.focus
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      education: values.about.education,
    },
    contact: {
      heading: values.contact.heading,
      subheading: values.contact.subheading,
      email: values.contact.email,
    },
    footer: {
      tagline: values.footer.tagline,
      copyright: values.footer.copyright,
    },
  };
}
