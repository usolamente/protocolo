"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/useT";

const NAV = [
  { href: "/", key: "nav.home", icon: HomeIcon },
  { href: "/entreno", key: "nav.training", icon: BarbellIcon },
  { href: "/calendario", key: "nav.week", icon: CalendarIcon },
  { href: "/reto", key: "nav.challenge", icon: GridIcon },
  { href: "/bienestar", key: "nav.care", icon: LotusIcon },
];

export function BottomNav() {
  const pathname = usePathname();
  const t = useT();

  return (
    <nav
      aria-label="Navegación principal"
      className={cn(
        "fixed bottom-0 inset-x-0 z-40",
        "border-t border-ink-800 bg-ink-950/95 backdrop-blur-md",
        "safe-area-bottom-nav",
      )}
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="mx-auto max-w-md flex justify-between px-2 py-1.5">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-1 rounded-2xl transition-all",
                  active
                    ? "text-sage-300 bg-sage-900/30"
                    : "text-bone-400 hover:text-bone-200",
                )}
              >
                <Icon className="w-5 h-5" />
                <span
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ letterSpacing: "0.08em" }}
                >
                  {t(item.key)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────
// Iconos SVG (1.5 stroke, sin dependencias)
// ─────────────────────────────────────────────────────────

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M10 21v-6h4v6" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
    >
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <rect x="14" y="14" width="6" height="6" />
    </svg>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7z" />
    </svg>
  );
}

function BarbellIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="9" width="3" height="6" />
      <rect x="19" y="9" width="3" height="6" />
      <rect x="5" y="10" width="2" height="4" />
      <rect x="17" y="10" width="2" height="4" />
      <line x1="7" y1="12" x2="17" y2="12" />
    </svg>
  );
}

function LotusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 4c-2 3-2 6 0 9 2-3 2-6 0-9z" />
      <path d="M5 11c0 4 3 6 7 6s7-2 7-6c-2-1-4 0-7 3-3-3-5-4-7-3z" />
      <path d="M3 17c2 2 6 3 9 3s7-1 9-3" />
    </svg>
  );
}
