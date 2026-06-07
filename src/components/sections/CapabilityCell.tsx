import type { Capability } from "@/data/capabilities";

export default function CapabilityCell({ capability }: { capability: Capability }) {
  return (
    <article className="group relative bg-ink px-6 py-8 transition duration-300 hover:bg-[#0d0d0d]">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs text-white/40">{capability.id}</span>
        <span className="h-px w-10 bg-white/20 transition group-hover:w-16 group-hover:bg-mirai" />
      </div>
      <h3 className="mt-6 text-lg font-medium text-white">{capability.title}</h3>
      <p className="mt-3 text-sm text-white/60">{capability.description}</p>
      <span className="pointer-events-none absolute inset-0 border border-hairline transition group-hover:border-mirai" />
    </article>
  );
}
