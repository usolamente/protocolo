import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function Card({ children, className, as: As = "div" }: CardProps) {
  return (
    <As
      className={cn(
        "relative bg-ink-900/70 backdrop-blur-sm border border-ink-800 rounded-2xl p-5 shadow-soft",
        "transition-colors hover:border-ink-700",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function CardEyebrow({
  children,
  accent = false,
}: {
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <p className={cn("eyebrow", accent ? "text-sage-300" : "text-bone-300")}>
      {children}
    </p>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-2xl font-light text-bone-50 leading-tight",
        className,
      )}
    >
      {children}
    </h2>
  );
}
