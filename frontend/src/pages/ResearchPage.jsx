import PageHeader from "../components/ui/PageHeader";
import Section from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import { EmptyState } from "../components/ui/SiteStatus";
import "../components/sections/research.css";
import "./pages.css";

export default function ResearchPage() {
  const { data: { research } } = usePortfolioData();

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="Research"
        title="Conference & Publications"
        subtitle="Research work presented and contributed to alongside a collaborative team."
      />
      <Section className="page-section">
        <div className="page-stack">
          {research.length === 0 ? (
            <EmptyState>Research and publications are coming soon.</EmptyState>
          ) : (
            research.map((r) => (
              <Reveal key={r.id} className="research-card">
                <p className="eyebrow">{r.venue} · {r.type}</p>
                <h3>{r.title}</h3>
                <p className="research-status">{r.status}</p>
                <p className="research-desc">{r.description}</p>
                <div className="research-team">
                  {r.team.map((name) => <span key={name} className="team-tag">{name}</span>)}
                </div>
              </Reveal>
            ))
          )}
        </div>
      </Section>
    </div>
  );
}
