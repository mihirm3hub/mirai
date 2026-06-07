import AnimatedLine from "@/components/ui/AnimatedLine";
import ProjectVisualPlaceholder from "@/components/sections/ProjectVisualPlaceholder";
import type { FeaturedProject } from "@/data/projects";

export default function FeaturedProjectChamber({ project }: { project: FeaturedProject }) {
  const accentClass = project.accent === "mirai" ? "text-mirai" : "text-cyan";

  return (
    <article className="chamber flex min-h-[420px] w-[min(100%,1100px)] shrink-0 flex-col gap-8 border border-hairline bg-inkDeep/60 p-8 sm:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        <span className={`font-mono text-sm ${accentClass}`}>{project.id}</span>
        <h3 className="text-3xl font-medium text-white sm:text-4xl">{project.title}</h3>
        <p className="text-sm text-white/65">{project.description}</p>
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
          {project.stack.map((item) => (
            <span key={item} className="border border-hairline px-3 py-2">
              {item}
            </span>
          ))}
        </div>
        <AnimatedLine className="w-full" />
      </div>
      <div className="flex flex-1">
        <ProjectVisualPlaceholder accent={project.accent} />
      </div>
    </article>
  );
}
