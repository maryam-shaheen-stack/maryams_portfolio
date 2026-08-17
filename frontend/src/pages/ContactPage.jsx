import PageHeader from "../components/ui/PageHeader";
import Section from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import "./contact-page.css";
import "./pages.css";

export default function ContactPage() {
  const { data: { personal, social } } = usePortfolioData();

  const CHANNELS = [
    { key: "email", label: "Email", value: "Send a message directly", href: social.email, external: false },
    { key: "github", label: "GitHub", value: "Check out my code & repos", href: social.github, external: true },
    { key: "linkedin", label: "LinkedIn", value: "Connect professionally", href: social.linkedin, external: true },
  ];

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="Contact"
        title={personal.contact.heading}
        subtitle={personal.contact.subheading}
      />
      <Section className="page-section">
        <div className="contact-channels">
          {CHANNELS.map((c, i) => (
            <Reveal key={c.key} delay={i * 80} className="contact-channel-card">
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer" : undefined}
                className="contact-channel-link"
              >
                <span className="contact-channel-label">{c.label}</span>
                <span className="contact-channel-value">{c.value}</span>
                <span className="contact-channel-arrow" aria-hidden="true">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
