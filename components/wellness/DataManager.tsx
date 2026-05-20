"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { useProtocolStore } from "@/lib/store";
import { toISODate } from "@/lib/utils";

export function DataManager() {
  const exportData = useProtocolStore((s) => s.exportData);
  const importData = useProtocolStore((s) => s.importData);
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<{
    kind: "ok" | "error";
    msg: string;
  } | null>(null);

  const handleExport = () => {
    try {
      const json = exportData();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `protocolo-backup-${toISODate()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatus({ kind: "ok", msg: "Copia exportada correctamente." });
    } catch {
      setStatus({ kind: "error", msg: "No se pudo exportar." });
    }
  };

  const handleImportClick = () => fileRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const ok = importData(text);
      setStatus(
        ok
          ? { kind: "ok", msg: "Datos importados. Recarga si no ves los cambios." }
          : { kind: "error", msg: "Archivo no válido." },
      );
      if (fileRef.current) fileRef.current.value = "";
    };
    reader.onerror = () =>
      setStatus({ kind: "error", msg: "No se pudo leer el archivo." });
    reader.readAsText(file);
  };

  return (
    <Card as="section">
      <p className="eyebrow text-sage-300">Tus datos</p>
      <h2 className="font-display text-2xl font-light text-bone-50 mt-1 leading-tight">
        Copia de seguridad
      </h2>
      <p className="mt-2 text-sm text-bone-300 leading-relaxed">
        Tu progreso se guarda solo en este teléfono. Exporta una copia en un
        archivo para guardarla en Archivos o Drive, y reimpórtala si cambias de
        dispositivo o reinstalas la app.
      </p>

      <div className="mt-4 flex gap-3">
        <button onClick={handleExport} className="btn btn-secondary flex-1">
          Exportar
        </button>
        <button onClick={handleImportClick} className="btn btn-secondary flex-1">
          Importar
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        onChange={handleFile}
        className="hidden"
        aria-hidden
      />

      {status && (
        <p
          className={`mt-3 text-[12px] leading-snug ${
            status.kind === "ok" ? "text-sage-300" : "text-terra-300"
          }`}
        >
          {status.msg}
        </p>
      )}

      <p className="mt-3 text-[11px] text-bone-400 italic leading-relaxed">
        Importar sustituye el progreso actual por el del archivo.
      </p>
    </Card>
  );
}
