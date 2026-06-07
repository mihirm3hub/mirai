type TechnicalLabelProps = {
  label: string;
  className?: string;
};

export default function TechnicalLabel({ label, className = "" }: TechnicalLabelProps) {
  return (
    <span
      className={`font-mono text-[0.65rem] uppercase tracking-[0.32em] text-white/60 ${className}`.trim()}
    >
      {label}
    </span>
  );
}
