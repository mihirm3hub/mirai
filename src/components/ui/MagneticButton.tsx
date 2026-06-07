"use client";

type MagneticButtonProps = {
  href?: string;
  label: string;
  variant?: "primary" | "ghost";
  className?: string;
};

export default function MagneticButton({ href, label, variant = "primary", className = "" }: MagneticButtonProps) {
  const handleMove = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
  };

  const handleLeave = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    event.currentTarget.style.transform = "translate3d(0, 0, 0)";
  };

  const baseClass =
    "inline-flex items-center justify-center gap-2 border text-sm uppercase tracking-[0.3em] transition duration-300";
  const variantClass =
    variant === "primary"
      ? "border-transparent bg-mirai text-black shadow-[0_0_30px_rgba(214,255,63,0.25)]"
      : "border-hairline text-white/80 hover:border-mirai hover:text-white";

  const classes = `${baseClass} ${variantClass} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {label}
    </button>
  );
}
