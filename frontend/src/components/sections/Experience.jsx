import { Link } from "react-router-dom";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { usePortfolioData } from "../../context/PortfolioDataContext.jsx";
import { EmptyState } from "../ui/SiteStatus";
import "./experience.css";

const PREVIEW_COUNT = 2;

export default function Experience() {
  const { data: { experience, leadership } } = usePortfolioData();
  const items = [...experience, ...leadership].slice(0, PREVIEW_COUNT);

  return (
    <Section id="experience" eyebrow="Experience" title="Work &amp; leadership" className="experience">
      <div className="timeline">
        {items.length === 0 ? (
          <EmptyState>Experience details are coming soon.</EmptyState>
        ) : (
          items.map((item, i) => (
            <Reveal key={item.id} delay={i * 100} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-body">
                <p className="eyebrow">{item.period}</p>
                <h3>{item.role}</h3>
                <p className="timeline-org">{item.org}</p>
                <p className="timeline-desc timeline-desc-clamp">{item.description}</p>
              </div>
            </Reveal>
          ))
        )}
      </div>
      <div className="experience-more-wrap">
        <Link to="/experience" className="btn btn-primary-light">View Full Experience</Link>
      </div>
    </Section>
  );
}
