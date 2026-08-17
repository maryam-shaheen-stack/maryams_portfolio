import PageHeader from "../components/ui/PageHeader";
import Section from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import { EmptyState } from "../components/ui/SiteStatus";
import "../components/sections/experience.css";
import "./pages.css";

export default function ExperiencePage() {
  const { data: { experience, leadership } } = usePortfolioData();
  const items = [...experience, ...leadership];

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="Experience"
        title="Work & Leadership"
        subtitle="Practical, team-based experience, from real project work to community leadership."
      />
      <Section className="page-section">
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
                  <p className="timeline-desc">{item.description}</p>
                  {item.responsibilities && (
                    <ul className="timeline-list">
                      {item.responsibilities.map((r) => <li key={r}>{r}</li>)}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))
          )}
        </div>
      </Section>
    </div>
  );
}
