import MagneticButton from "@/components/ui/MagneticButton";
import { navItems } from "@/lib/constants";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-6 border-b border-hairline px-6 py-5 md:px-12">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-mirai" />
        <span className="text-sm uppercase tracking-[0.4em] text-white/70">MIRAI Studio</span>
      </div>
      <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.35em] text-white/60 md:flex">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="transition hover:text-white">
            {item.label}
          </a>
        ))}
      </div>
      <MagneticButton href="#contact" label="Contact" variant="ghost" className="px-5 py-3" />
    </nav>
  );
}
