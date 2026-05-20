"use client";

import { useEffect, useState } from "react";

/**
 * Alterna entre los frames (posición inicial/final) cada ~700ms para
 * simular el movimiento. Si una imagen no carga (id no exacto, sin red),
 * la oculta sin romper la interfaz.
 */
export function ExerciseAnimation({
  images,
  alt,
  className = "",
}: {
  images: string[];
  alt: string;
  className?: string;
}) {
  const [frame, setFrame] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(
      () => setFrame((f) => (f + 1) % images.length),
      750,
    );
    return () => clearInterval(t);
  }, [images.length]);

  const allFailed = images.every((_, i) => failed[i]);

  if (allFailed) {
    return (
      <div
        className={`flex items-center justify-center bg-ink-850 text-bone-400 text-xs p-8 ${className}`}
      >
        Ilustración no disponible sin conexión
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          onError={() => setFailed((f) => ({ ...f, [i]: true }))}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-200"
          style={{ opacity: i === frame && !failed[i] ? 1 : 0 }}
        />
      ))}
      {/* Reserva de altura */}
      <div className="invisible">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={images[0]} alt="" className="w-full h-auto object-contain" />
      </div>
    </div>
  );
}
