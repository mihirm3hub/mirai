type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
};

export default function SectionHeading({ eyebrow, title, align = "left" }: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`flex flex-col gap-6 ${alignment}`}>
      <span className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-mirai">
        {eyebrow}
      </span>
      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-medium tracking-tight text-white">
        {title}
      </h2>
    </div>
  );
}
