import { Link } from "react-router-dom";
import { usePortfolioData } from "../../context/PortfolioDataContext.jsx";
import { toCloudinaryDownloadUrl } from "../../lib/cloudinary.js";

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

function DownloadIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v12" />
      <path d="M7 10.5 12 15.5 17 10.5" />
      <path d="M4.5 18.5h15" />
    </svg>
  );
}

export default function Nav() {
  const { data: { personal, social } } = usePortfolioData();
  const cvUrl = personal.cv?.url;

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
        <div className="nav-actions">
          {cvUrl && (
            <>
              <a href={cvUrl} target="_blank" rel="noreferrer" className="nav-cta nav-cta-ghost">
                Resume
              </a>
              <a
                href={toCloudinaryDownloadUrl(cvUrl)}
                download={personal.cv?.originalName || "resume.pdf"}
                className="nav-icon-btn"
                aria-label="Download resume"
                title="Download resume"
              >
                <DownloadIcon />
              </a>
            </>
          )}
          <a href={social.github} target="_blank" rel="noreferrer" className="nav-cta">GitHub</a>
        </div>
      </div>
    </header>
  );
}
