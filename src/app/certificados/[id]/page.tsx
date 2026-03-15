"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const certificados: Record<string, { titulo: string; fecha: string; duracion: string; mentor: string }> = {
  "1": {
    titulo: "Preparación de CV Europeo",
    fecha: "8 de marzo de 2026",
    duracion: "3 horas",
    mentor: "Elena García Martínez",
  },
  "2": {
    titulo: "Estrategia de Networking Profesional",
    fecha: "1 de marzo de 2026",
    duracion: "2.5 horas",
    mentor: "Miguel Ángel Torres",
  },
};

export default function CertificadoPage() {
  const { id } = useParams<{ id: string }>();
  const [toast, setToast] = useState<string | null>(null);

  const cert = certificados[id] ?? {
    titulo: "Taller del Programa Puente",
    fecha: "15 de marzo de 2026",
    duracion: "2 horas",
    mentor: "Elena García Martínez",
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--gray-100)] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0 bg-white">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
        </Link>
        <nav className="space-y-1 text-sm">
          {[
            { icon: "📜", label: "Scroll" },
            { icon: "📁", label: "Proyectos" },
            { icon: "📥", label: "Bandeja" },
            { icon: "💼", label: "Empleos" },
            { icon: "🔍", label: "Buscar" },
            { icon: "👥", label: "Mi Red" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--gray-500)] hover:bg-[var(--gray-100)] cursor-pointer transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Certificate Card */}
        <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full border-4 border-[var(--primary)]">
          <div className="p-10 text-center">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 bg-[var(--primary)] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">P</span>
              </div>
            </div>

            <p className="text-xs tracking-[0.3em] uppercase text-[var(--gray-400)] mb-6">
              Fundación Universidad-Empresa
            </p>

            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1 tracking-wide">
              CERTIFICADO DE PARTICIPACIÓN
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 my-6">
              <div className="h-px w-16 bg-[var(--primary)]" />
              <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              <div className="h-px w-16 bg-[var(--primary)]" />
            </div>

            <p className="text-[var(--gray-500)] mb-2">Se certifica que</p>
            <p className="text-xl font-semibold text-[var(--foreground)] mb-4">
              Priya Sharma
            </p>

            <p className="text-[var(--gray-500)] mb-2">
              ha completado satisfactoriamente el taller:
            </p>
            <p className="text-lg font-semibold text-[var(--primary)] mb-6">
              {cert.titulo}
            </p>

            <div className="grid grid-cols-3 gap-4 text-sm text-[var(--gray-500)] mb-6">
              <div>
                <p className="font-medium text-[var(--foreground)]">Fecha</p>
                <p>{cert.fecha}</p>
              </div>
              <div>
                <p className="font-medium text-[var(--foreground)]">Duración</p>
                <p>{cert.duracion}</p>
              </div>
              <div>
                <p className="font-medium text-[var(--foreground)]">Mentor/a</p>
                <p>{cert.mentor}</p>
              </div>
            </div>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 my-6">
              <div className="h-px w-24 bg-[var(--gray-300)]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--gray-300)]" />
              <div className="h-px w-24 bg-[var(--gray-300)]" />
            </div>

            <p className="text-xs text-[var(--gray-400)]">
              Fundación Universidad-Empresa &middot; Programa Puente
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => showToast("Descarga iniciada. El PDF se generará en breve.")}
            className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors"
          >
            Descargar PDF
          </button>
          <button
            onClick={() => showToast("Enlace de LinkedIn copiado al portapapeles.")}
            className="px-6 py-2.5 border border-[var(--gray-300)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--gray-100)] transition-colors"
          >
            Compartir en LinkedIn
          </button>
        </div>

        <Link
          href="/progreso"
          className="mt-4 text-sm text-[var(--primary)] hover:underline"
        >
          &larr; Volver a mi progreso
        </Link>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-[var(--foreground)] text-white px-5 py-3 rounded-lg shadow-lg text-sm animate-pulse">
            {toast}
          </div>
        )}
      </main>
    </div>
  );
}
