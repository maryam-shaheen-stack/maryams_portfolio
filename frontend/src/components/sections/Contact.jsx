import { Link } from "react-router-dom";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";
import { usePortfolioData } from "../../context/PortfolioDataContext.jsx";
import "./contact.css";

export default function Contact() {
  const { data: { personal, social } } = usePortfolioData();

  return (
    <Section id="contact" className="contact">
      <Reveal className="contact-inner">
        <p className="eyebrow">Contact</p>
        <h2>{personal.contact.heading}</h2>
        <p className="contact-sub">{personal.contact.subheading}</p>
        <div className="contact-links">
          <a href={social.email} className="btn btn-primary">Email Me</a>
          <a href={social.github} target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
          <a href={social.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn</a>
        </div>
        <Link to="/contact" className="btn btn-link contact-page-link">More contact details →</Link>
      </Reveal>
    </Section>
  );
}
