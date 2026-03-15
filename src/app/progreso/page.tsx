"use client";

import Link from "next/link";

const fases = [
  { num: 1, nombre: "Configuración" },
  { num: 2, nombre: "Mentoría" },
  { num: 3, nombre: "Conexión" },
  { num: 4, nombre: "Cierre" },
];

const stats = [
  { valor: "3/6", etiqueta: "sesiones completadas" },
  { valor: "2/5", etiqueta: "talleres asistidos" },
  { valor: "1", etiqueta: "entrevista conseguida" },
  { valor: "65%", etiqueta: "perfil completado" },
];

const sesiones = [
  {
    fecha: "5 Mar 2026",
    tema: "Diagnóstico inicial y plan de acción",
    mentor: "Elena García",
    notas: "Se evaluaron los objetivos profesionales y se estableció un plan de acción con metas a corto y largo plazo.",
  },
  {
    fecha: "12 Mar 2026",
    tema: "Revisión de CV",
    mentor: "Elena García",
    notas: "Se reestructuró el CV al formato europeo Europass, destacando las competencias transferibles.",
  },
  {
    fecha: "19 Mar 2026",
    tema: "Estrategia de LinkedIn",
    mentor: "Elena García",
    notas: "Se optimizó el perfil de LinkedIn con palabras clave del sector y se amplió la red de contactos.",
  },
];

const talleres = [
  { id: "1", titulo: "Preparación de CV Europeo", fecha: "8 Mar 2026" },
  { id: "2", titulo: "Estrategia de Networking Profesional", fecha: "1 Mar 2026" },
];

const objetivos = [
  { texto: "CV europeo completado", hecho: true },
  { texto: "LinkedIn optimizado", hecho: true },
  { texto: "Primera entrevista", hecho: false },
  { texto: "Red de 10+ contactos", hecho: false },
  { texto: "Prácticas/empleo", hecho: false },
];

export default function ProgresoPage() {
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
      <main className="flex-1 p-6 lg:p-10 max-w-5xl">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-8">
          Mi Progreso en el Programa
        </h1>

        {/* Timeline de fases */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-sm font-semibold text-[var(--gray-500)] mb-4 uppercase tracking-wide">
            Fase actual
          </h2>
          <div className="flex items-center justify-between">
            {fases.map((fase, i) => (
              <div key={fase.num} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      fase.num === 2
                        ? "bg-[var(--primary)] text-white"
                        : fase.num < 2
                        ? "bg-[var(--primary)] bg-opacity-20 text-[var(--primary)]"
                        : "bg-[var(--gray-200)] text-[var(--gray-400)]"
                    }`}
                  >
                    {fase.num < 2 ? "✓" : fase.num}
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      fase.num === 2
                        ? "font-semibold text-[var(--primary)]"
                        : "text-[var(--gray-400)]"
                    }`}
                  >
                    {fase.nombre}
                  </span>
                </div>
                {i < fases.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 ${
                      i < 1 ? "bg-[var(--primary)]" : "bg-[var(--gray-200)]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.etiqueta} className="bg-white rounded-xl p-5 shadow-sm text-center">
              <p className="text-2xl font-bold text-[var(--primary)]">{s.valor}</p>
              <p className="text-sm text-[var(--gray-500)] mt-1">{s.etiqueta}</p>
            </div>
          ))}
        </div>

        {/* Historial de sesiones */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Historial de sesiones
          </h2>
          <div className="space-y-4">
            {sesiones.map((s) => (
              <div
                key={s.fecha}
                className="border border-[var(--gray-200)] rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--gray-400)]">{s.fecha}</span>
                  <span className="text-sm text-[var(--gray-500)]">{s.mentor}</span>
                </div>
                <p className="font-medium text-[var(--foreground)]">{s.tema}</p>
                <p className="text-sm text-[var(--gray-500)] mt-1">{s.notas}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Talleres completados */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Talleres completados
          </h2>
          <div className="space-y-3">
            {talleres.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between border border-[var(--gray-200)] rounded-lg p-4"
              >
                <div>
                  <p className="font-medium text-[var(--foreground)]">{t.titulo}</p>
                  <p className="text-sm text-[var(--gray-400)]">{t.fecha}</p>
                </div>
                <Link
                  href={`/certificados/${t.id}`}
                  className="text-sm text-[var(--primary)] hover:underline font-medium"
                >
                  Ver certificado &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Objetivos */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Objetivos
          </h2>
          <ul className="space-y-3">
            {objetivos.map((o) => (
              <li key={o.texto} className="flex items-center gap-3 text-sm">
                <span
                  className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                    o.hecho
                      ? "bg-[var(--success)] text-white"
                      : "border border-[var(--gray-300)] text-[var(--gray-300)]"
                  }`}
                >
                  {o.hecho ? "✓" : "✗"}
                </span>
                <span
                  className={
                    o.hecho
                      ? "text-[var(--foreground)]"
                      : "text-[var(--gray-400)]"
                  }
                >
                  {o.texto}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Siguiente paso recomendado */}
        <div className="bg-[var(--primary)] bg-opacity-5 border border-[var(--primary)] border-opacity-20 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
            Siguiente paso recomendado
          </h2>
          <p className="text-[var(--gray-600)]">
            Inscríbete en el taller de preparación de entrevistas para avanzar
            hacia tu objetivo de conseguir tu primera entrevista. Este taller te
            ayudará a practicar preguntas comunes y mejorar tu presentación
            profesional.
          </p>
          <Link
            href="/talleres"
            className="inline-block mt-4 px-5 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors text-sm"
          >
            Ver talleres disponibles &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
