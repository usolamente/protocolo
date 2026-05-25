"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useProtocolStore } from "@/lib/store";

const MODULES = [
  {
    href: "/reto",
    name: "Reto",
    color: "text-sage-300",
    desc: "El reto de 30 días de calistenia (sentadillas, plancha, flexiones, abdominales). Es un añadido diario de volumen progresivo, independiente del foco del día.",
  },
  {
    href: "/spartan",
    name: "Spartan",
    color: "text-terra-300",
    desc: "El circuito HIIT de 15 ejercicios. Es tu finalizador metabólico los días de potencia y para mantener el fondo de cara a pádel y fútbol.",
  },
  {
    href: "/hipertrofia",
    name: "Pesas",
    color: "text-bone-100",
    desc: "El registro del entrenamiento de fuerza del día (el que ves en Hoy y Semana). Apuntas series, repes y peso para asegurar la sobrecarga progresiva 5×5.",
  },
  {
    href: "/bienestar",
    name: "Cuidado",
    color: "text-sage-200",
    desc: "Tu autocuidado: respiración 3-6, diario estoico, termoterapia (sauna y piscina) y una rutina para la espalda. Cierra el círculo de recuperación y serenidad.",
  },
];

export function HowItWorks() {
  const [open, setOpen] = useState(false);
  const verbosity = useProtocolStore((s) => s.config.verbosity);
  if (verbosity === "synthetic") return null;

  return (
    <section className="px-5 py-2">
      <Card className="p-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between text-left"
          aria-expanded={open}
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-300" aria-hidden />
            <p className="font-mono text-[10px] tracking-widest uppercase text-sage-300">
              ¿Cómo funciona la app?
            </p>
          </div>
          <svg
            viewBox="0 0 24 24"
            className={`w-4 h-4 text-bone-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && (
          <div className="mt-3 space-y-3 animate-fade-up">
            <p className="text-[13px] text-bone-300 leading-relaxed">
              <span className="text-bone-100">Hoy</span> y{" "}
              <span className="text-bone-100">Semana</span> son tu mapa: qué
              toca cada día (foco de pesas, deporte, dieta). Las otras cuatro
              pestañas son las herramientas que ejecutas:
            </p>
            <ul className="space-y-2.5">
              {MODULES.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="block rounded-xl border border-ink-800 bg-ink-850 px-3 py-2.5 hover:border-ink-700 transition-colors"
                  >
                    <p
                      className={`font-mono text-[11px] tracking-widest uppercase ${m.color}`}
                    >
                      {m.name}
                    </p>
                    <p className="text-[12px] text-bone-300 leading-snug mt-1">
                      {m.desc}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </section>
  );
}
