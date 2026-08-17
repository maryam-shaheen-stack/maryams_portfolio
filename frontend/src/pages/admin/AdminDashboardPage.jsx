import { Link } from "react-router-dom";

// Static welcome screen for now — Step 6 can turn this into a real
// summary (counts per resource, "last updated" timestamps, etc.) once
// the section pages exist to pull that data from.
const QUICK_LINKS = [
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/personal", label: "Personal info" },
  { to: "/admin/social", label: "Social" },
];

export default function AdminDashboardPage() {
  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-lead">
        Use the sidebar to manage each section of the portfolio site.
      </p>

      <div className="admin-quicklinks">
        {QUICK_LINKS.map((l) => (
          <Link key={l.to} to={l.to} className="admin-quicklink-card">
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
