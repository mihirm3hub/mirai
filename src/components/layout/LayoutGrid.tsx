type LayoutGridProps = {
  className?: string;
};

export default function LayoutGrid({ className = "" }: LayoutGridProps) {
  return (
    <div
      aria-hidden="true"
      className={`grid-overlay absolute inset-0 pointer-events-none ${className}`.trim()}
    />
  );
}
