import { Link } from "react-router-dom";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { usePortfolioData } from "../../context/PortfolioDataContext.jsx";
import { EmptyState } from "../ui/SiteStatus";
import "./research.css";

export default function Research() {
  const { data: { research } } = usePortfolioData();

  return (
    <Section id="research" eyebrow="Research" title="Conference &amp; publications" className="research">
      {research.length === 0 ? (
        <EmptyState>Research and publications are coming soon.</EmptyState>
      ) : (
        research.slice(0, 1).map((r) => (
          <Reveal key={r.id} className="research-card">
            <p className="eyebrow">{r.venue} · {r.type}</p>
            <h3>{r.title}</h3>
            <p className="research-status">{r.status}</p>
            <p className="research-desc research-desc-clamp">{r.description}</p>
          </Reveal>
        ))
      )}
      <div className="research-more-wrap">
        <Link to="/research" className="btn btn-primary-light">View Research</Link>
      </div>
    </Section>
  );
}
