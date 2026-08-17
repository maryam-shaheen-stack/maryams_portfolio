import { Link } from "react-router-dom";
import { usePortfolioData } from "../../context/PortfolioDataContext.jsx";

// Only links that lead to a dedicated page live in the navbar now —
// About & Skills stay homepage-only sections (no standalone page).
const LINKS = [
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/research", label: "Research" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const { data: { personal, social } } = usePortfolioData();

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="" aria-hidden="true" className="nav-logo-icon" />
          <span className="nav-logo-name">{personal.name}</span>
        </Link>
        <nav className="nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} to={l.href}>{l.label}</Link>
          ))}
        </nav>
        <a href={social.github} target="_blank" rel="noreferrer" className="nav-cta">GitHub</a>
      </div>
    </header>
  );
}
