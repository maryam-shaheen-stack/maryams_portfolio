import { useRef, useState } from "react";

/**
 * Reusable "current image + pick a new one + upload" widget for any
 * multipart image endpoint (Part 6.6). Used by ResourceFormPage
 * (project/certification image) and PersonalFormPage (hero photo).
 *
 * The endpoint always responds with the full updated parent document;
 * `onUploaded(doc)` hands that back to the caller so it can pull the
 * new image URL (and anything else it needs) out of it.
 */
export default function ImageUploadField({ label, imageUrl, onUpload, onUploaded, fieldName = "image" }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  function handleFileChange(e) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setError(null);
    setPreview(f ? URL.createObjectURL(f) : null);
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append(fieldName, file);
      const doc = await onUpload(formData);
      onUploaded?.(doc);
      setFile(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const shown = preview || imageUrl;

  return (
    <div className="admin-field admin-image-field">
      <span>{label}</span>
      <div className="admin-image-upload">
        {shown ? (
          <img src={shown} alt="" className="admin-image-preview" />
        ) : (
          <div className="admin-image-preview admin-image-preview-empty">No image</div>
        )}
        <div className="admin-image-upload-controls">
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} />
          <button
            type="button"
            className="admin-btn"
            onClick={handleUpload}
            disabled={!file || uploading}
          >
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </div>
      </div>
      {error && (
        <p className="admin-auth-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
