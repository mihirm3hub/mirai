import SectionFrame from "@/components/layout/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";

const focusAreas = ["Spatial Computing", "Computer Vision", "WebXR", "Simulation", "AI Interfaces"];

export default function FounderSection() {
  return (
    <SectionFrame className="bg-ink px-6 py-24 md:px-12">
      <div className="mx-auto grid w-[min(1200px,92vw)] gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex min-h-[360px] items-center justify-center border border-hairline bg-inkDeep">
          <div className="text-xs uppercase tracking-[0.4em] text-white/40">Portrait Placeholder</div>
        </div>
        <div className="flex flex-col gap-6">
          <SectionHeading eyebrow="Founder" title="Mihir Mainkar" />
          <p className="text-lg text-white/70">XR / Computer Vision / AI Systems Engineer</p>
          <p className="text-sm text-white/60">
            Building spatial systems that connect perception, embodied intelligence, and real-time interfaces.
          </p>
          <div className="flex flex-wrap gap-3">
            {focusAreas.map((area) => (
              <span key={area} className="border border-hairline px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
