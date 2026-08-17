import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import "./page-header.css";

/** Consistent hero-style header for standalone pages (Projects, Experience, etc.)
 *  Keeps the same visual language as the homepage sections — just doesn't
 *  touch anything on "/" so the homepage transitions stay exactly as they were. */
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="page-header">
      <div className="container">
        <Reveal className="page-header-inner">
          <Link to="/" className="page-back">
            <span aria-hidden="true">←</span> Back to Home
          </Link>
          {eyebrow && <p className="eyebrow page-header-eyebrow">{eyebrow}</p>}
          {title && <h1 className="page-header-title">{title}</h1>}
          {subtitle && <p className="page-header-subtitle">{subtitle}</p>}
        </Reveal>
      </div>
    </header>
  );
}
