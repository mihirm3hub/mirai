type AnimatedLineProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
  delay?: number;
};

export default function AnimatedLine({ orientation = "horizontal", className = "", delay = 0 }: AnimatedLineProps) {
  const baseClass = orientation === "horizontal" ? "line-horizontal" : "line-vertical";

  return (
    <span
      className={`${baseClass} ${className}`.trim()}
      data-line
      style={{ animationDelay: `${delay}s` }}
    />
  );
}
