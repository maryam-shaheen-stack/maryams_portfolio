import { usePortfolioData } from "../../context/PortfolioDataContext.jsx";
import "./footer.css";

export default function Footer() {
  const { data: { personal, social } } = usePortfolioData();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{personal.name}</p>
          <p className="footer-tagline">{personal.footer.tagline}</p>
        </div>
        <div className="footer-links">
          <a href={social.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={social.email}>Email</a>
        </div>
      </div>
      <p className="footer-copy">{personal.footer.copyright}</p>
    </footer>
  );
}
