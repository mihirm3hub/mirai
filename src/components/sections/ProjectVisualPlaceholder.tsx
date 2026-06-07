type ProjectVisualPlaceholderProps = {
  accent: "mirai" | "cyan";
};

export default function ProjectVisualPlaceholder({ accent }: ProjectVisualPlaceholderProps) {
  const accentClass = accent === "mirai" ? "border-mirai" : "border-cyan";
  const glowClass = accent === "mirai" ? "bg-mirai/10" : "bg-cyan/10";

  return (
    <div className={`relative h-full min-h-[260px] w-full border border-hairline bg-ink ${glowClass}`}>
      <div className={`absolute inset-6 border border-dashed ${accentClass}`} />
      <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.4em] text-white/40">
        Visual Placeholder
      </div>
    </div>
  );
}
