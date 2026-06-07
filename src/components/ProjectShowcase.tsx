import type { FeaturedProject } from "@/data/projects";

export default function ProjectShowcase({ projects }: { projects: FeaturedProject[] }) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <article className="project-card" key={project.id}>
          <span>{project.stack.join(" / ")}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </article>
      ))}
    </div>
  );
}
