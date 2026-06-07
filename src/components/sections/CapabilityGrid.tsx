type CapabilityGridProps = {
  children: React.ReactNode;
};

export default function CapabilityGrid({ children }: CapabilityGridProps) {
  return (
    <div className="grid gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}
