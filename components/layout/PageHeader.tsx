import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/system/ThemeToggle";
import { VerbosityToggle } from "@/components/system/VerbosityToggle";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  numeral?: string;
  className?: string;
  hideToggle?: boolean;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  numeral,
  className,
  hideToggle,
}: PageHeaderProps) {
  return (
    <header
      className={cn("pt-10 pb-6 px-5 border-b border-ink-800 relative", className)}
    >
      {!hideToggle && (
        <div className="absolute right-4 top-8 z-10 flex items-center gap-2">
          <VerbosityToggle />
          <ThemeToggle />
        </div>
      )}
      {numeral && (
        <span
          className="absolute right-28 top-7 numeral text-7xl text-ink-800 select-none pointer-events-none"
          aria-hidden
        >
          {numeral}
        </span>
      )}
      <p className="eyebrow text-sage-300">{eyebrow}</p>
      <h1 className="mt-2 font-display text-3xl font-light text-bone-50 leading-[1.1] tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-sm text-bone-300 leading-relaxed max-w-[30ch]">
          {subtitle}
        </p>
      )}
    </header>
  );
}
