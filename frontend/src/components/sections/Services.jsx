import { Link } from "react-router-dom";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { usePortfolioData } from "../../context/PortfolioDataContext.jsx";
import { EmptyState } from "../ui/SiteStatus";
import { SERVICE_ICONS } from "./ServiceIcons.jsx";
import "./services.css";

const PREVIEW_COUNT = 3;

export default function Services() {
  const { data: { services } } = usePortfolioData();
  const preview = services.slice(0, PREVIEW_COUNT);

  return (
    <Section
      id="services"
      eyebrow="Services"
      title="How I can help"
      subtitle="A few of the ways I collaborate with people and teams, see the full list for details."
      className="services"
    >
      <div className="services-grid">
        {preview.length === 0 ? (
          <EmptyState>Services are coming soon.</EmptyState>
        ) : (
          preview.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <Reveal key={s.id} delay={i * 90} className="service-card">
                <span className="service-icon">{Icon && <Icon />}</span>
                <h3>{s.title}</h3>
                <p>{s.shortDescription}</p>
              </Reveal>
            );
          })
        )}
      </div>
      <div className="services-more-wrap">
        <Link to="/services" className="btn btn-primary-light">View All Services</Link>
      </div>
    </Section>
  );
}
