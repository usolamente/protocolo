"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n/useT";

type Size = "small" | "medium" | "large";

const STORAGE_KEY = "protocolo-size";

function applySize(size: Size) {
  const root = document.documentElement;
  root.classList.remove("size-small", "size-medium", "size-large");
  root.classList.add(`size-${size}`);
}

const ORDER: Size[] = ["small", "medium", "large"];

export function SizeToggle({ className = "" }: { className?: string }) {
  const t = useT();
  const [size, setSize] = useState<Size>("small");

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Size | null) ?? "small";
    setSize(stored);
  }, []);

  const cycle = () => {
    const idx = ORDER.indexOf(size);
    const next = ORDER[(idx + 1) % ORDER.length];
    setSize(next);
    localStorage.setItem(STORAGE_KEY, next);
    applySize(next);
  };

  // Tres glifos crecientes para el icono según el tamaño actual.
  const tick = size === "small" ? 11 : size === "medium" ? 14 : 17;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`${t("size.label")}: ${t(`size.${size}`)}`}
      title={`${t("size.label")}: ${t(`size.${size}`)}`}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-700 bg-ink-850 text-bone-200 transition-colors hover:border-sage-400 hover:text-sage-300 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Dos A: una pequeña fija y otra que crece con el tamaño actual */}
        <text
          x="6"
          y="18"
          fontFamily="serif"
          fontSize="9"
          fill="currentColor"
          stroke="none"
        >
          A
        </text>
        <text
          x="13"
          y="18"
          fontFamily="serif"
          fontSize={tick}
          fill="currentColor"
          stroke="none"
        >
          A
        </text>
      </svg>
    </button>
  );
}
