import LayoutGrid from "@/components/layout/LayoutGrid";

type SectionFrameProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function SectionFrame({ id, className = "", children }: SectionFrameProps) {
  return (
    <section id={id} className={`relative overflow-hidden ${className}`.trim()}>
      <LayoutGrid className="opacity-30" />
      <div className="pointer-events-none absolute inset-0 border border-hairline" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
