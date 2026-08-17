import PageHeader from "../components/ui/PageHeader";
import Section from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import { EmptyState } from "../components/ui/SiteStatus";
import { ACHIEVEMENT_ICONS } from "../components/sections/AchievementIcons.jsx";
import "../components/sections/education.css";
import "./pages.css";

export default function EducationPage() {
  const { data: { education, achievements, journey } } = usePortfolioData();

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="Education"
        title="Education & Achievements"
        subtitle="Academic background, milestones, and the path I'm building toward."
      />

      <Section eyebrow="Background" title="Academic background" className="education page-section">
        {education.length === 0 ? (
          <EmptyState>Education details are coming soon.</EmptyState>
        ) : (
          education.map((e) => (
            <Reveal key={e.id} className="education-card">
              <h3>{e.degree}</h3>
              <p className="education-inst">{e.institution}</p>
              <p className="education-status">{e.status}</p>
              <div className="education-areas">
                {e.areas.map((a) => <span key={a} className="area-tag">{a}</span>)}
              </div>
            </Reveal>
          ))
        )}
      </Section>

      <Section eyebrow="Highlights" title="Achievements" className="achievements page-section">
        <div className="achv-grid">
          {achievements.length === 0 ? (
            <EmptyState>Achievements are coming soon.</EmptyState>
          ) : (
            achievements.map((a, i) => {
              const Icon = ACHIEVEMENT_ICONS[a.icon];
              return (
                <Reveal key={a.id} delay={i * 60} className="achv-card">
                  <span className="achv-icon">{Icon && <Icon />}</span>
                  <h4>{a.title}</h4>
                  <p>{a.description}</p>
                </Reveal>
              );
            })
          )}
        </div>
      </Section>

      <Section eyebrow="Journey" title="Where I'm headed" className="journey page-section">
        <div className="journey-row">
          {journey.length === 0 ? (
            <EmptyState>The journey timeline is coming soon.</EmptyState>
          ) : (
            journey.map((j, i) => (
              <Reveal key={j.id} delay={i * 80} className="journey-card">
                <p className="journey-period">{j.period}</p>
                <h4>{j.title}</h4>
                <p>{j.description}</p>
              </Reveal>
            ))
          )}
        </div>
      </Section>
    </div>
  );
}
