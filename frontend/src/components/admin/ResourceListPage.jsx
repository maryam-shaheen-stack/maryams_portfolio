import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { adminApi } from "../../lib/adminApi";

/**
 * Generic list page for any "list" resource (projects, skills, experience,
 * etc.) described by a resource config — see lib/resourceConfigs.js
 * (added in Part 6.3). Not used for personal/social, which are
 * singletons with their own dedicated form pages (Part 6.5).
 *
 * config shape:
 *   {
 *     resourceKey: "projects",      // matches the backend route segment
 *     idField: "slug",              // "slug" for most, "id" for skills-stack
 *     label: "Projects",
 *     singularLabel: "Project",
 *     columns: [{ key, label, render?(value, item) }],
 *   }
 */
export default function ResourceListPage({ config }) {
  const { token } = useAdminAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [movingId, setMovingId] = useState(null);

  // Key name the backend's PATCH .../reorder body expects per row —
  // "slug" for every makeListRouter resource, "id" for skills-stack.
  const reorderKey = config.reorderKey || config.idField;

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    adminApi
      .request(`/${config.resourceKey}`, { token })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Failed to load."))
      .finally(() => setLoading(false));
  }, [config.resourceKey, token]);

  useEffect(() => {
    load();
  }, [load]);

  // Swaps `item` with its neighbour in the given direction and PATCHes
  // just those two rows' new `order` values — the reorder endpoint only
  // touches the entries it's given, so there's no need to resend the
  // whole list. Server responds with the freshly-sorted collection.
  async function handleMove(item, direction) {
    const index = items.findIndex((i) => i[config.idField] === item[config.idField]);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (index === -1 || swapIndex < 0 || swapIndex >= items.length) return;

    const neighbour = items[swapIndex];
    const id = item[config.idField];
    setMovingId(id);
    try {
      const body = {
        order: [
          { [reorderKey]: item[config.idField], order: neighbour.order },
          { [reorderKey]: neighbour[config.idField], order: item.order },
        ],
      };
      const docs = await adminApi.request(`/${config.resourceKey}/reorder`, {
        method: "PATCH",
        token,
        body,
      });
      setItems(Array.isArray(docs) ? docs : []);
    } catch (err) {
      window.alert(err.message || "Reorder failed.");
    } finally {
      setMovingId(null);
    }
  }

  async function handleDelete(item) {
    const id = item[config.idField];
    if (!window.confirm(`Delete "${item.title || item.name || item.role || id}"? This can't be undone.`)) {
      return;
    }
    setDeletingId(id);
    try {
      await adminApi.request(`/${config.resourceKey}/${id}`, { method: "DELETE", token });
      setItems((prev) => prev.filter((i) => i[config.idField] !== id));
    } catch (err) {
      window.alert(err.message || "Delete failed.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="admin-resource-page">
      <div className="admin-resource-header">
        <h1 className="admin-page-title">{config.label}</h1>
        <Link to={`/admin/${config.resourceKey}/new`} className="admin-btn admin-btn-primary">
          + Add {config.singularLabel}
        </Link>
      </div>

      {loading && <p className="admin-page-lead">Loading…</p>}
      {error && (
        <p className="admin-auth-error" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="admin-page-lead">No {config.label.toLowerCase()} yet.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              {config.columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              const id = item[config.idField];
              const busy = movingId === id;
              return (
                <tr key={id}>
                  {config.columns.map((c) => (
                    <td key={c.key}>{c.render ? c.render(item[c.key], item) : String(item[c.key] ?? "")}</td>
                  ))}
                  <td className="admin-table-actions">
                    <div className="admin-reorder-controls">
                      <button
                        type="button"
                        className="admin-btn admin-btn-icon"
                        aria-label="Move up"
                        onClick={() => handleMove(item, "up")}
                        disabled={index === 0 || movingId !== null}
                      >
                        {busy ? "…" : "↑"}
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn-icon"
                        aria-label="Move down"
                        onClick={() => handleMove(item, "down")}
                        disabled={index === items.length - 1 || movingId !== null}
                      >
                        {busy ? "…" : "↓"}
                      </button>
                    </div>
                    <Link to={`/admin/${config.resourceKey}/${id}/edit`} className="admin-btn">
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger"
                      onClick={() => handleDelete(item)}
                      disabled={deletingId === id}
                    >
                      {deletingId === id ? "Deleting…" : "Delete"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
