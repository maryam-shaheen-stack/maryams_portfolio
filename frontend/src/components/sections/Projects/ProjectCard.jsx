import Reveal from "../../ui/Reveal";

export default function ProjectCard({ project, delay = 0, onViewMore }) {
  return (
    <Reveal className="project-card project-card--no-image" delay={delay}>
      <div className="project-card-body">
        <p className="eyebrow">{project.category}</p>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.shortDescription}</p>
        <button type="button" className="btn btn-ghost-light project-card-btn" onClick={() => onViewMore(project)}>
          View More
        </button>
      </div>
    </Reveal>
  );
}
