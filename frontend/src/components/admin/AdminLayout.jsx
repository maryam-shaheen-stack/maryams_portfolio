import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import "../../pages/admin/admin.css";

// One entry per backend list/singleton resource (see backend/README.md).
// `to` paths are placeholders for now — Step 6 fills each in with a
// real table/form; RequireAuth + this sidebar are what Step 5 delivers.
const NAV_SECTIONS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/personal", label: "Personal" },
  { to: "/admin/social", label: "Social" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/skills-stack", label: "Skills Stack" },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/leadership", label: "Leadership" },
  { to: "/admin/education", label: "Education" },
  { to: "/admin/achievements", label: "Achievements" },
  { to: "/admin/journey", label: "Journey" },
  { to: "/admin/research", label: "Research" },
  { to: "/admin/certifications", label: "Certifications" },
  { to: "/admin/services", label: "Services" },
];

export default function AdminLayout() {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <span className="admin-eyebrow">Admin</span>
        </div>
        <nav className="admin-sidebar-nav">
          {NAV_SECTIONS.map((s) => (
            <NavLink
              key={s.to}
              to={s.to}
              end={s.end}
              className={({ isActive }) => "admin-sidebar-link" + (isActive ? " active" : "")}
            >
              {s.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <span className="admin-topbar-user">{admin?.email}</span>
          <button type="button" className="admin-btn" onClick={handleLogout}>
            Log out
          </button>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
