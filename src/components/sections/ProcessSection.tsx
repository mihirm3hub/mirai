import SectionFrame from "@/components/layout/SectionFrame";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessDiagram from "@/components/sections/ProcessDiagram";

export default function ProcessSection() {
  return (
    <SectionFrame id="process" className="bg-inkDeep px-6 py-24 md:px-12">
      <div className="mx-auto flex w-[min(1200px,92vw)] flex-col gap-12">
        <SectionHeading eyebrow="Process" title="Research to deployment, mapped as a technical system." />
        <ProcessDiagram />
      </div>
    </SectionFrame>
  );
}
