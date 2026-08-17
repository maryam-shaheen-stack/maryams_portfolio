import { useLocation } from "react-router-dom";

// Catches every /admin/<section> route not yet given a real page.
// Step 6 replaces this, section by section, with an actual table/form
// route — nothing here needs to change as that happens, since more
// specific routes registered above this catch-all in App.jsx will
// simply take precedence.
export default function AdminSectionPlaceholder() {
  const location = useLocation();
  const section = location.pathname.replace("/admin/", "");

  return (
    <div className="admin-placeholder">
      <h1 className="admin-page-title">{section}</h1>
      <p className="admin-page-lead">
        The table/form for this section lands in Step 6.
      </p>
    </div>
  );
}
