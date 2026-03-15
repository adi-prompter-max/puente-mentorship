"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_WORKSHOPS } from "@/lib/mock-data";

const NAV_ITEMS = [
  { label: "Inicio", href: "/", icon: "🏠" },
  { label: "Talleres", href: "/talleres", icon: "📚" },
  { label: "Empleos", href: "/empleos", icon: "💼" },
  { label: "Perfil", href: "/perfil", icon: "👤" },
];

const AGENDAS: Record<string, string[]> = {
  "cv-europeo": [
    "Bienvenida y presentación de participantes",
    "Diferencias entre CV español, Europass y formato libre",
    "Estructura óptima: datos personales, experiencia, formación",
    "Cómo adaptar la experiencia internacional al mercado español",
    "Ejercicio práctico: revisión de CV en parejas",
    "Ronda de preguntas y cierre",
  ],
  "regulaciones-migratorias": [
    "Introducción al marco legal migratorio en España",
    "Tipos de permisos: estancia por estudios, residencia, trabajo",
    "Proceso de modificación de permiso de estudios a trabajo",
    "Plazos, requisitos y documentación necesaria",
    "Errores comunes y cómo evitarlos",
    "Turno de preguntas con la abogada",
  ],
  "networking-linkedin": [
    "Por qué LinkedIn es clave en el mercado español",
    "Optimización de perfil: foto, titular, extracto",
    "Cómo buscar y conectar con reclutadores",
    "Estrategias de contenido para ganar visibilidad",
    "Ejercicio: enviar 5 solicitudes de conexión estratégicas",
    "Cierre y plan de acción semanal",
  ],
  "entrevistas-tecnicas": [
    "Panorama de procesos de selección tech en España",
    "Estructuras de datos y algoritmos más preguntados",
    "System design: cómo abordar preguntas de diseño",
    "Simulacro de entrevista en vivo con feedback",
    "Behavioral questions: método STAR adaptado",
    "Recursos y plataformas de práctica recomendadas",
  ],
  "elevator-pitch": [
    "Qué es un elevator pitch y por qué importa",
    "Estructura: quién eres, qué ofreces, qué buscas",
    "Marca personal: identificar tu propuesta de valor",
    "Práctica individual: escribe tu pitch en 60 segundos",
    "Presentaciones en grupo con feedback constructivo",
    "Cómo adaptar tu pitch según la audiencia",
  ],
};

export default function TallerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const workshop = MOCK_WORKSHOPS.find((w) => w.id === id);
  const [enrollState, setEnrollState] = useState<
    "idle" | "loading" | "success"
  >("idle");

  if (!workshop) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[var(--foreground)]">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Taller no encontrado</h1>
          <Link
            href="/talleres"
            className="text-[var(--primary)] hover:underline text-sm"
          >
            ← Volver a talleres
          </Link>
        </div>
      </div>
    );
  }

  const spotsPercent =
    ((workshop.maxSpots - workshop.spots) / workshop.maxSpots) * 100;
  const agenda = AGENDAS[workshop.id] || AGENDAS["cv-europeo"];
  const otherWorkshops = MOCK_WORKSHOPS.filter((w) => w.id !== id).slice(0, 2);

  const handleEnroll = () => {
    setEnrollState("loading");
    setTimeout(() => setEnrollState("success"), 1000);
  };

  return (
    <div className="flex min-h-screen bg-white text-[var(--foreground)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
        </Link>
        <nav className="space-y-1 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                item.href === "/talleres"
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--gray-500)] hover:bg-[var(--gray-100)] hover:text-[var(--foreground)]"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10 max-w-3xl">
        <Link
          href="/talleres"
          className="text-sm text-[var(--primary)] hover:underline mb-6 inline-block"
        >
          ← Volver a talleres
        </Link>

        <h1 className="text-2xl font-bold mb-3">{workshop.title}</h1>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs bg-[var(--gray-100)] text-[var(--gray-500)] px-3 py-1 rounded-full">
            {workshop.date}
          </span>
          <span className="text-xs bg-[var(--gray-100)] text-[var(--gray-500)] px-3 py-1 rounded-full">
            {workshop.time}
          </span>
          <span
            className={`text-xs px-3 py-1 rounded-full ${
              workshop.format.includes("Online")
                ? "bg-blue-100 text-blue-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {workshop.format}
          </span>
        </div>

        {/* Mentor card */}
        <div className="flex items-center gap-4 border border-[var(--gray-200)] rounded-xl p-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {workshop.mentor
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div>
            <p className="font-semibold text-sm">{workshop.mentor}</p>
            <p className="text-xs text-[var(--gray-400)]">Mentor del taller</p>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-2">Descripción</h2>
          <p className="text-sm text-[var(--gray-500)] leading-relaxed">
            {workshop.description}
          </p>
        </section>

        {/* Agenda */}
        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-3">Agenda del taller</h2>
          <ol className="space-y-2">
            {agenda.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-[var(--gray-500)] pt-0.5">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Spots */}
        <section className="mb-8">
          <h2 className="font-semibold text-lg mb-2">Plazas disponibles</h2>
          <div className="flex justify-between text-sm text-[var(--gray-400)] mb-1">
            <span>
              {workshop.maxSpots - workshop.spots}/{workshop.maxSpots} plazas
              ocupadas
            </span>
            <span>{workshop.spots} disponibles</span>
          </div>
          <div className="w-full h-2 bg-[var(--gray-100)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--primary)] rounded-full transition-all"
              style={{ width: `${spotsPercent}%` }}
            />
          </div>
        </section>

        {/* Enroll button */}
        <div className="mb-12">
          {enrollState === "idle" && (
            <button
              onClick={handleEnroll}
              className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Inscribirme
            </button>
          )}
          {enrollState === "loading" && (
            <button
              disabled
              className="px-6 py-2.5 bg-[var(--gray-300)] text-white rounded-lg font-medium text-sm cursor-not-allowed"
            >
              Procesando...
            </button>
          )}
          {enrollState === "success" && (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4 text-sm text-green-800">
              ¡Te has inscrito! Te enviaremos un recordatorio antes del taller.
            </div>
          )}
        </div>

        {/* Other workshops */}
        <section>
          <h2 className="font-semibold text-lg mb-4">Otros talleres</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {otherWorkshops.map((w) => (
              <div
                key={w.id}
                className="border border-[var(--gray-200)] rounded-xl p-4 flex flex-col gap-2"
              >
                <h3 className="font-semibold text-sm">{w.title}</h3>
                <p className="text-xs text-[var(--gray-400)]">
                  {w.date} · {w.time}
                </p>
                <p className="text-xs text-[var(--gray-500)]">{w.mentor}</p>
                <Link
                  href={`/talleres/${w.id}`}
                  className="text-sm text-[var(--primary)] hover:underline mt-1"
                >
                  Ver detalles →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
