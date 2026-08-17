import { useState } from "react";
import { Link } from "react-router-dom";
import Section from "../../ui/Section";
import { usePortfolioData } from "../../../context/PortfolioDataContext.jsx";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SideIcons from "./SideIcons";
import { EmptyState } from "../../ui/SiteStatus";
import "./projects.css";

const LEFT_ICONS = ["react", "three", "js", "git"];
const RIGHT_ICONS = ["node", "express", "mongo", "python"];

export default function Projects() {
  const { data: { featuredProjects } } = usePortfolioData();
  const [activeProject, setActiveProject] = useState(null);
  const cards = featuredProjects;

  return (
    <Section
      id="projects"
      eyebrow="Work"
      title="Featured Projects"
      subtitle="A selection of full-stack, AI, and creative web projects, built end to end."
      className="projects-section"
    >
      <div className="projects-layout">
        <SideIcons side="left" keys={LEFT_ICONS} />

        <div className="projects-center">
          <div className="projects-grid">
            {cards.length === 0 ? (
              <EmptyState>Featured projects are coming soon.</EmptyState>
            ) : (
              cards.map((p, i) => (
                <ProjectCard key={p.id} project={p} delay={(i % 4) * 90} onViewMore={setActiveProject} />
              ))
            )}
          </div>

          <div className="projects-more-wrap">
            <Link to="/projects" className="btn btn-primary-light">View All Projects</Link>
          </div>
        </div>

        <SideIcons side="right" keys={RIGHT_ICONS} />
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </Section>
  );
}
