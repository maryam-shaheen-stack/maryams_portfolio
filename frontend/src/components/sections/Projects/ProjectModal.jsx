import { useEffect } from "react";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="project-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="project-modal-image" style={{ backgroundImage: `url(${project.image})` }} />
        <div className="project-modal-body">
          <p className="eyebrow">{project.category} · {project.year}</p>
          <h3>{project.title}</h3>
          <p className="project-modal-desc">{project.fullDescription}</p>
          <div className="tech-row">
            {project.technologies.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
          <div className="featured-links">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary-light">
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost-light">
                GitHub
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <span className="link-placeholder">Links coming soon</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
