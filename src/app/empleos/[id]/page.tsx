"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MOCK_JOBS } from "@/lib/mock-data";

const NAV_ITEMS = [
  { label: "Inicio", href: "/", icon: "🏠" },
  { label: "Talleres", href: "/talleres", icon: "📚" },
  { label: "Empleos", href: "/empleos", icon: "💼" },
  { label: "Perfil", href: "/perfil", icon: "👤" },
];

const REQUIREMENTS: Record<string, string[]> = {
  "becario-marketing": [
    "Estudiante universitario/a en Marketing, Comunicación o similar",
    "Nivel de español B2 o superior",
    "Conocimientos básicos de Google Ads y Meta Ads",
    "Capacidad analítica y atención al detalle",
    "Disponibilidad de incorporación inmediata",
  ],
  "asistente-investigacion": [
    "Estudiante de máster o doctorado en ciencias sociales",
    "Experiencia en métodos de investigación cualitativos y cuantitativos",
    "Nivel de español C1 y nivel de inglés B2",
    "Conocimientos de SPSS, R o Python para análisis de datos",
    "Interés demostrado en temas de migración e integración",
  ],
  "dev-junior-frontend": [
    "Conocimientos sólidos de React, TypeScript y CSS",
    "Familiaridad con control de versiones (Git)",
    "Capacidad de trabajar en equipo en entorno remoto",
    "Nivel de inglés B2 para comunicación técnica",
    "Se valora experiencia con Next.js y testing",
  ],
  "ingeniero-procesos": [
    "Estudiante de último año o recién graduado/a en Ingeniería Química o Industrial",
    "Conocimientos de simulación de procesos (Aspen Plus, HYSYS)",
    "Nivel de español B2 o superior",
    "Capacidad analítica y resolución de problemas",
    "Disponibilidad para trabajar presencialmente en Madrid",
  ],
  "analista-datos": [
    "Grado en Matemáticas, Estadística, Ingeniería o similar",
    "Experiencia con SQL, Python y herramientas de visualización (Tableau, Power BI)",
    "Conocimientos de modelos estadísticos y machine learning básico",
    "Nivel de español B2 e inglés B2",
    "Capacidad de comunicar insights a perfiles no técnicos",
  ],
  "community-manager": [
    "Experiencia gestionando redes sociales profesionalmente (1+ año)",
    "Español nativo o C2 y conocimiento de mercados LATAM",
    "Habilidades de copywriting y creación de contenido visual",
    "Conocimientos de herramientas como Hootsuite, Canva o similar",
    "Capacidad de trabajar en un entorno dinámico y rápido",
  ],
};

const BENEFITS: Record<string, string[]> = {
  "becario-marketing": [
    "Formación continua con equipo de marketing internacional",
    "Horario flexible compatible con estudios",
    "Posibilidad de incorporación tras las prácticas",
    "Oficina en el centro de Madrid",
  ],
  "asistente-investigacion": [
    "Acceso a bases de datos y recursos académicos",
    "Publicación conjunta en revistas científicas",
    "Horario flexible de 20h/semana",
    "Entorno multicultural e interdisciplinar",
  ],
  "dev-junior-frontend": [
    "Trabajo 100% remoto con equipo internacional",
    "Presupuesto anual de formación (1.500€)",
    "Seguro médico privado",
    "23 días de vacaciones + viernes de verano",
  ],
  "ingeniero-procesos": [
    "Prácticas remuneradas con plan de formación estructurado",
    "Comedor subvencionado y transporte",
    "Posibilidad de contrato tras las prácticas",
    "Proyecto con impacto real en sostenibilidad",
  ],
  "analista-datos": [
    "Plan de carrera definido con revisiones semestrales",
    "Seguro médico y dental",
    "Jornada intensiva en verano",
    "Formación en certificaciones cloud (AWS/GCP)",
  ],
  "community-manager": [
    "Trabajo híbrido (3 días remoto, 2 oficina Barcelona)",
    "Descuentos en servicios Glovo",
    "Equipo joven y multicultural",
    "Stock options tras primer año",
  ],
};

export default function EmpleoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const job = MOCK_JOBS.find((j) => j.id === id);

  const [showModal, setShowModal] = useState(false);
  const [motivation, setMotivation] = useState("");
  const [attachCV, setAttachCV] = useState(true);
  const [applyState, setApplyState] = useState<
    "idle" | "loading" | "success"
  >("idle");

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[var(--foreground)]">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Oferta no encontrada</h1>
          <Link
            href="/empleos"
            className="text-[var(--primary)] hover:underline text-sm"
          >
            ← Volver a empleos
          </Link>
        </div>
      </div>
    );
  }

  const requirements = REQUIREMENTS[job.id] || REQUIREMENTS["becario-marketing"];
  const benefits = BENEFITS[job.id] || BENEFITS["becario-marketing"];

  const relatedJobs = MOCK_JOBS.filter((j) => j.id !== id).filter(
    (j) => j.company === job.company || j.type === job.type
  ).slice(0, 3);

  const companyInitials = job.company
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSubmit = () => {
    setApplyState("loading");
    setTimeout(() => setApplyState("success"), 1500);
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
                item.href === "/empleos"
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
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-3xl">
          <Link
            href="/empleos"
            className="text-sm text-[var(--primary)] hover:underline mb-6 inline-block"
          >
            ← Volver a empleos
          </Link>

          {/* Company header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-[var(--gray-100)] flex items-center justify-center font-bold text-[var(--gray-500)] text-lg flex-shrink-0">
              {companyInitials}
            </div>
            <div>
              <p className="font-semibold">{job.company}</p>
              <p className="text-sm text-[var(--gray-400)]">{job.location}</p>
            </div>
          </div>

          {/* Job title + badges */}
          <h1 className="text-2xl font-bold mb-3">{job.role}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                job.type === "Prácticas"
                  ? "bg-purple-100 text-purple-700"
                  : job.type === "Tiempo completo"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {job.type}
            </span>
            <span className="text-xs bg-[var(--gray-100)] text-[var(--gray-500)] px-3 py-1 rounded-full">
              {job.salary}
            </span>
            <span className="text-xs bg-[var(--gray-100)] text-[var(--gray-400)] px-3 py-1 rounded-full">
              Publicado: {job.posted}
            </span>
            <span className="text-xs bg-[var(--gray-100)] text-[var(--gray-400)] px-3 py-1 rounded-full">
              Fecha límite: {job.deadline}
            </span>
          </div>

          {/* Description */}
          <section className="mb-8">
            <h2 className="font-semibold text-lg mb-2">Descripción</h2>
            <p className="text-sm text-[var(--gray-500)] leading-relaxed">
              {job.description}
            </p>
          </section>

          {/* Requirements */}
          <section className="mb-8">
            <h2 className="font-semibold text-lg mb-3">Requisitos</h2>
            <ul className="space-y-2">
              {requirements.map((req, i) => (
                <li key={i} className="flex gap-2 text-sm text-[var(--gray-500)]">
                  <span className="text-[var(--primary)] flex-shrink-0 mt-0.5">
                    •
                  </span>
                  {req}
                </li>
              ))}
            </ul>
          </section>

          {/* Benefits */}
          <section className="mb-8">
            <h2 className="font-semibold text-lg mb-3">Beneficios</h2>
            <ul className="space-y-2">
              {benefits.map((ben, i) => (
                <li key={i} className="flex gap-2 text-sm text-[var(--gray-500)]">
                  <span className="text-[var(--success)] flex-shrink-0 mt-0.5">
                    •
                  </span>
                  {ben}
                </li>
              ))}
            </ul>
          </section>

          {/* Apply button */}
          <div className="mb-12">
            {applyState === "success" ? (
              <div className="border border-green-200 bg-green-50 rounded-lg p-4 text-sm text-green-800">
                ¡Postulación enviada! La empresa revisará tu perfil.
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Postularme
              </button>
            )}
          </div>

          {/* Related jobs */}
          {relatedJobs.length > 0 && (
            <section>
              <h2 className="font-semibold text-lg mb-4">
                Ofertas similares
              </h2>
              <div className="space-y-3">
                {relatedJobs.map((rj) => (
                  <div
                    key={rj.id}
                    className="border border-[var(--gray-200)] rounded-xl p-4"
                  >
                    <h3 className="font-semibold text-sm">{rj.role}</h3>
                    <p className="text-xs text-[var(--gray-400)] mt-1">
                      {rj.company} · {rj.location}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          rj.type === "Prácticas"
                            ? "bg-purple-100 text-purple-700"
                            : rj.type === "Tiempo completo"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {rj.type}
                      </span>
                      <span className="text-xs text-[var(--gray-400)]">
                        {rj.salary}
                      </span>
                    </div>
                    <Link
                      href={`/empleos/${rj.id}`}
                      className="text-sm text-[var(--primary)] hover:underline mt-2 inline-block"
                    >
                      Ver oferta →
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && applyState !== "success" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              if (applyState === "idle") setShowModal(false);
            }}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <h3 className="font-semibold text-lg mb-4">
              Postularse a {job.role}
            </h3>

            <label className="block text-sm font-medium text-[var(--gray-500)] mb-1">
              Carta de motivación (opcional)
            </label>
            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              rows={4}
              placeholder="Cuéntale a la empresa por qué te interesa esta oferta..."
              className="w-full border border-[var(--gray-200)] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent placeholder:text-[var(--gray-400)] resize-none mb-4"
            />

            <label className="flex items-center gap-2 text-sm text-[var(--gray-500)] mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={attachCV}
                onChange={(e) => setAttachCV(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--gray-300)] accent-[var(--primary)]"
              />
              Adjuntar mi CV de Puente
            </label>

            <div className="flex gap-3 justify-end">
              {applyState === "idle" && (
                <>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm text-[var(--gray-500)] hover:bg-[var(--gray-100)] rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    Enviar postulación
                  </button>
                </>
              )}
              {applyState === "loading" && (
                <button
                  disabled
                  className="px-5 py-2 bg-[var(--gray-300)] text-white rounded-lg font-medium text-sm cursor-not-allowed"
                >
                  Enviando...
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
