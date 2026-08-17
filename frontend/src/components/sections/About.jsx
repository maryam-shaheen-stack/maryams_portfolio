import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { usePortfolioData } from "../../context/PortfolioDataContext.jsx";
import "./about.css";

export default function About() {
  const { data: { personal } } = usePortfolioData();

  return (
    <Section id="about" eyebrow="About" title="Who I am" className="about">
      <div className="about-grid">
        <Reveal className="about-copy">
          {personal.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={150} className="about-focus">
          <p className="about-focus-label">Currently focused on</p>
          <ul>
            {personal.about.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="about-edu">{personal.about.education}</p>
        </Reveal>
      </div>
    </Section>
  );
}
