import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { adminApi } from "../../lib/adminApi";
import ImageUploadField from "./ImageUploadField.jsx";

/**
 * Generic create/edit form for any "list" resource, driven by the same
 * config used by ResourceListPage. Field types supported:
 *   text | textarea | number | boolean | tags (string array, comma-
 *   separated in the UI)
 *
 * config.fields shape:
 *   [{ key, label, type, required?, placeholder? }]
 *
 * Route contract (registered per-resource in Part 6.3/6.4):
 *   /admin/<resource>/new         -> mode="create"
 *   /admin/<resource>/:id/edit    -> mode="edit", :id read via useParams
 */
export default function ResourceFormPage({ config, mode }) {
  const { token } = useAdminAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [values, setValues] = useState(() => emptyValues(config));
  const [loading, setLoading] = useState(mode === "edit");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (mode !== "edit") return;
    setLoading(true);
    setError(null);
    adminApi
      .request(`/${config.resourceKey}/${id}`, { token })
      .then((item) => {
        setValues(toFormValues(config, item));
        if (config.hasImageUpload) setImageUrl(item.image || "");
      })
      .catch((err) => setError(err.message || "Failed to load."))
      .finally(() => setLoading(false));
    // config.resourceKey is stable per mounted route; id/token are the
    // real deps that should trigger a re-fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, token]);

  function handleChange(key, value) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const body = toRequestBody(config, values);
      if (mode === "create") {
        await adminApi.request(`/${config.resourceKey}`, { method: "POST", token, body });
      } else {
        await adminApi.request(`/${config.resourceKey}/${id}`, { method: "PUT", token, body });
      }
      navigate(`/admin/${config.resourceKey}`);
    } catch (err) {
      setError(err.message || "Save failed.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="admin-page-lead">Loading…</p>;

  return (
    <div className="admin-resource-page">
      <h1 className="admin-page-title">
        {mode === "create" ? `New ${config.singularLabel}` : `Edit ${config.singularLabel}`}
      </h1>

      <form className="admin-form" onSubmit={handleSubmit}>
        {config.fields.map((f) => (
          <FormField key={f.key} field={f} value={values[f.key]} onChange={handleChange} />
        ))}

        {/* Image upload (Part 6.6) — only once the record exists, since
            the endpoint looks the doc up by slug and attaches to it. */}
        {config.hasImageUpload && mode === "edit" && (
          <ImageUploadField
            label="Image"
            imageUrl={imageUrl}
            onUpload={(formData) =>
              adminApi.request(`/${config.resourceKey}/${id}/image`, {
                method: "POST",
                token,
                body: formData,
              })
            }
            onUploaded={(doc) => setImageUrl(doc.image || "")}
          />
        )}
        {config.hasImageUpload && mode === "create" && (
          <p className="admin-page-lead">Save this {config.singularLabel.toLowerCase()} first, then come back here to upload an image.</p>
        )}

        {error && (
          <p className="admin-auth-error" role="alert">
            {error}
          </p>
        )}

        <div className="admin-form-actions">
          <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>
            {submitting ? "Saving…" : "Save"}
          </button>
          <button type="button" className="admin-btn" onClick={() => navigate(`/admin/${config.resourceKey}`)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({ field, value, onChange }) {
  const { key, label, type, required, placeholder } = field;

  if (type === "boolean") {
    return (
      <label className="admin-field admin-field-checkbox">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(key, e.target.checked)} />
        <span>{label}</span>
      </label>
    );
  }

  if (type === "textarea" || type === "tags") {
    return (
      <label className="admin-field">
        <span>{label}</span>
        <textarea
          rows={type === "tags" ? 2 : 4}
          value={value}
          placeholder={type === "tags" ? "comma, separated, values" : placeholder}
          required={required}
          onChange={(e) => onChange(key, e.target.value)}
        />
      </label>
    );
  }

  return (
    <label className="admin-field">
      <span>{label}</span>
      <input
        type={type === "number" ? "number" : "text"}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => onChange(key, e.target.value)}
      />
    </label>
  );
}

// ---- value <-> request-body conversion ----
// Form state keeps everything as strings/booleans the inputs can bind
// to directly; "tags" fields are edited as a comma-separated string and
// only become a real array right before the request goes out.

function emptyValues(config) {
  const values = {};
  for (const f of config.fields) {
    values[f.key] = f.type === "boolean" ? false : "";
  }
  return values;
}

function toFormValues(config, item) {
  const values = {};
  for (const f of config.fields) {
    const raw = item[f.key];
    if (f.type === "boolean") values[f.key] = Boolean(raw);
    else if (f.type === "tags") values[f.key] = Array.isArray(raw) ? raw.join(", ") : "";
    else if (f.type === "number") values[f.key] = raw ?? "";
    else values[f.key] = raw ?? "";
  }
  return values;
}

function toRequestBody(config, values) {
  const body = {};
  for (const f of config.fields) {
    const raw = values[f.key];
    if (f.type === "boolean") body[f.key] = Boolean(raw);
    else if (f.type === "number") body[f.key] = raw === "" ? undefined : Number(raw);
    else if (f.type === "tags") {
      body[f.key] = raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      body[f.key] = raw;
    }
  }
  return body;
}
