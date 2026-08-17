import { Link } from "react-router-dom";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { usePortfolioData } from "../../context/PortfolioDataContext.jsx";
import { EmptyState } from "../ui/SiteStatus";
import "./education.css";

export default function EducationAchievements() {
  const { data: { education } } = usePortfolioData();

  return (
    <Section id="education" eyebrow="Education" title="Academic background" className="education">
      {education.length === 0 ? (
        <EmptyState>Education details are coming soon.</EmptyState>
      ) : (
        education.map((e) => (
          <Reveal key={e.id} className="education-card">
            <h3>{e.degree}</h3>
            <p className="education-inst">{e.institution}</p>
            <p className="education-status">{e.status}</p>
            <div className="education-areas">
              {e.areas.slice(0, 5).map((a) => <span key={a} className="area-tag">{a}</span>)}
            </div>
          </Reveal>
        ))
      )}
      <div className="education-more-wrap">
        <Link to="/education" className="btn btn-primary-light">View Education &amp; Achievements</Link>
      </div>
    </Section>
  );
}
