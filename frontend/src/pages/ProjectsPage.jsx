import { useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import Section from "../components/ui/Section";
import ProjectCard from "../components/sections/Projects/ProjectCard";
import ProjectModal from "../components/sections/Projects/ProjectModal";
import { usePortfolioData } from "../context/PortfolioDataContext.jsx";
import { EmptyState } from "../components/ui/SiteStatus";
import "../components/sections/Projects/projects.css";
import "./pages.css";

export default function ProjectsPage() {
  const { data: { featuredProjects, otherProjects } } = usePortfolioData();
  const [activeProject, setActiveProject] = useState(null);
  const projects = [...featuredProjects, ...otherProjects];

  return (
    <div className="page-body">
      <PageHeader
        eyebrow="Work"
        title="All Projects"
        subtitle="Full-stack, AI, and creative web projects, built end to end, from idea to working product."
      />
      <Section className="page-section">
        <div className="page-projects-grid">
          {projects.length === 0 ? (
            <EmptyState>No projects have been added yet.</EmptyState>
          ) : (
            projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} delay={(i % 6) * 60} onViewMore={setActiveProject} />
            ))
          )}
        </div>
      </Section>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
