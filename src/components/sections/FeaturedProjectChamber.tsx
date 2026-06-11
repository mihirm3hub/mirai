import AnimatedLine from "@/components/ui/AnimatedLine";
import ProjectVisualPlaceholder from "@/components/sections/ProjectVisualPlaceholder";
import type { FeaturedProject } from "@/data/projects";

export default function FeaturedProjectChamber({ project }: { project: FeaturedProject }) {
  const accentClass = project.accent === "mirai" ? "text-mirai" : "text-cyan";

  return (
    <article className="chamber flex min-h-[420px] w-[min(100%,1100px)] shrink-0 flex-col gap-8 border border-hairline bg-inkDeep/60 p-8 sm:flex-row">
      <div className="flex flex-1 flex-col justify-between gap-8">
        <div className="flex flex-col gap-4">
          <span className={`font-mono text-sm ${accentClass}`}>{project.id}</span>
          <h3 className="max-w-[12ch] text-3xl font-medium leading-[0.95] text-white sm:text-4xl">
            {project.title}
          </h3>
        </div>
        <div className="flex flex-col gap-5">
          <p className="max-w-[30ch] text-base leading-7 text-white/65">{project.description}</p>
          <div className="grid grid-cols-2 gap-3 text-sm uppercase tracking-[0.22em] text-white/70">
            {project.stack.map((item) => (
              <span
                key={item}
                className="flex min-h-14 items-center justify-center border border-hairline px-4 py-3 text-center"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <AnimatedLine className="w-full" />
      </div>
      <div className="flex flex-1">
        <ProjectVisualPlaceholder accent={project.accent} />
      </div>
    </article>
  );
}
