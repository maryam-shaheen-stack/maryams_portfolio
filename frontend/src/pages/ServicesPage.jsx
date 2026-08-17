import { Link } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import Section from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import { EmptyState } from "../components/ui/SiteStatus";
import { SERVICE_ICONS } from "../components/sections/ServiceIcons.jsx";
import "../components/sections/services.css";
import "./services-page.css";
import "./pages.css";

export default function ServicesPage() {
  const { data: { services } } = usePortfolioData();

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="Services"
        title="How I Can Help"
        subtitle="A collaborator for web development work, from a single feature to a full-stack build."
      />
      <Section className="page-section">
        <div className="page-stack">
          {services.length === 0 ? (
            <EmptyState>Services are coming soon.</EmptyState>
          ) : (
            services.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              return (
                <Reveal key={s.id} delay={i * 60} className="service-detail-card">
                  <span className="service-icon">{Icon && <Icon />}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p className="service-detail-desc">{s.description}</p>
                    <ul className="service-deliverables">
                      {s.deliverables.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                </Reveal>
              );
            })
          )}
        </div>
        <div className="services-page-cta">
          <p>Have a project in mind?</p>
          <Link to="/contact" className="btn btn-primary-light">Get in Touch</Link>
        </div>
      </Section>
    </div>
  );
}
