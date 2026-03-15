"use client";

import Link from "next/link";
import { useState } from "react";

interface NotaSesion {
  id: number;
  fecha: string;
  mentor: string;
  tipo: string;
  tema: string;
  notas: string;
  temas: string[];
  tareas: { texto: string; hecho: boolean }[];
  proximaSesion: string;
}

const sesionesData: NotaSesion[] = [
  {
    id: 1,
    fecha: "5 Mar 2026",
    mentor: "Elena García",
    tipo: "Mentoría individual",
    tema: "Diagnóstico inicial y plan de acción",
    notas:
      "Se realizó una evaluación completa de los objetivos profesionales de Priya. Se identificaron áreas clave de mejora: adaptación del CV al mercado español, mejora del perfil digital y ampliación de la red de contactos en el sector tecnológico.",
    temas: ["CV", "Objetivos", "Plan de acción"],
    tareas: [
      { texto: "Completar cuestionario de autodiagnóstico", hecho: true },
      { texto: "Listar 5 empresas objetivo", hecho: true },
      { texto: "Redactar resumen profesional", hecho: false },
    ],
    proximaSesion: "12 Mar 2026",
  },
  {
    id: 2,
    fecha: "12 Mar 2026",
    mentor: "Elena García",
    tipo: "Mentoría individual",
    tema: "Revisión de CV",
    notas:
      "Se reestructuró el CV al formato Europass, priorizando las competencias transferibles. Se ajustó la terminología para el mercado laboral español y se añadieron las certificaciones de idiomas. Se recomienda incluir proyectos personales relevantes.",
    temas: ["CV", "Europass", "Competencias"],
    tareas: [
      { texto: "Adaptar CV al formato Europass", hecho: true },
      { texto: "Traducir certificaciones al español", hecho: false },
      { texto: "Añadir sección de proyectos", hecho: false },
    ],
    proximaSesion: "19 Mar 2026",
  },
  {
    id: 3,
    fecha: "19 Mar 2026",
    mentor: "Elena García",
    tipo: "Mentoría individual",
    tema: "Estrategia de LinkedIn",
    notas:
      "Se optimizó el perfil de LinkedIn con palabras clave relevantes del sector tecnológico. Se estableció una estrategia de publicación semanal y se identificaron 15 profesionales clave para conectar. Se practicó la redacción de mensajes de conexión.",
    temas: ["LinkedIn", "Networking", "Marca personal"],
    tareas: [
      { texto: "Actualizar foto y banner de LinkedIn", hecho: true },
      { texto: "Enviar 5 solicitudes de conexión", hecho: true },
      { texto: "Publicar primer artículo", hecho: false },
    ],
    proximaSesion: "26 Mar 2026",
  },
  {
    id: 4,
    fecha: "8 Mar 2026",
    mentor: "Isabel Fernández",
    tipo: "Consulta especializada",
    tema: "Consulta de extranjería",
    notas:
      "Se revisó el estado actual del NIE y los requisitos para la renovación. Se explicó el proceso de modificación de la situación de residencia para permitir trabajo por cuenta ajena. Se proporcionó lista de documentación necesaria.",
    temas: ["NIE", "Extranjería", "Documentación"],
    tareas: [
      { texto: "Reunir documentación para renovación de NIE", hecho: true },
      { texto: "Solicitar cita en extranjería", hecho: false },
      { texto: "Preparar carta del empleador", hecho: false },
    ],
    proximaSesion: "22 Mar 2026",
  },
  {
    id: 5,
    fecha: "10 Mar 2026",
    mentor: "Miguel Ángel Torres",
    tipo: "Taller técnico",
    tema: "Preparación técnica",
    notas:
      "Se realizaron ejercicios prácticos de entrevistas técnicas centrados en algoritmos y estructuras de datos. Se revisaron preguntas frecuentes de empresas españolas del sector tech. Se identificaron áreas donde reforzar conocimientos de sistema.",
    temas: ["Entrevistas", "Algoritmos", "Código"],
    tareas: [
      { texto: "Resolver 3 problemas en LeetCode", hecho: false },
      { texto: "Repasar patrones de diseño", hecho: false },
      { texto: "Preparar proyecto de portfolio", hecho: false },
    ],
    proximaSesion: "17 Mar 2026",
  },
  {
    id: 6,
    fecha: "15 Mar 2026",
    mentor: "Elena García",
    tipo: "Mentoría individual",
    tema: "Revisión de progreso",
    notas:
      "Se evaluó el progreso general del programa. Se destacaron los avances significativos en la preparación del CV y la presencia digital. Se ajustó el plan de acción para priorizar la preparación de entrevistas y la ampliación de la red profesional.",
    temas: ["Progreso", "Plan de acción", "Objetivos"],
    tareas: [
      { texto: "Inscribirse en taller de entrevistas", hecho: false },
      { texto: "Asistir a evento de networking", hecho: false },
      { texto: "Actualizar perfil de progreso", hecho: true },
    ],
    proximaSesion: "22 Mar 2026",
  },
];

const mentoresOptions = [
  "Todos",
  "Elena García",
  "Miguel Ángel Torres",
  "Isabel Fernández",
];

export default function NotasSesionesPage() {
  const [filtroMentor, setFiltroMentor] = useState("Todos");

  const sesionesFiltradas =
    filtroMentor === "Todos"
      ? sesionesData
      : sesionesData.filter((s) => s.mentor === filtroMentor);

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
      <main className="flex-1 p-6 lg:p-10 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Notas de Sesiones
          </h1>
          <select
            value={filtroMentor}
            onChange={(e) => setFiltroMentor(e.target.value)}
            className="border border-[var(--gray-300)] rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            {mentoresOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {sesionesFiltradas.map((sesion) => (
            <div
              key={sesion.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-[var(--gray-200)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[var(--gray-400)]">
                    {sesion.fecha}
                  </span>
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {sesion.mentor}
                  </span>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[var(--gray-100)] text-[var(--gray-500)] font-medium">
                  {sesion.tipo}
                </span>
              </div>

              {/* Topic */}
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                {sesion.tema}
              </h3>

              {/* Notes */}
              <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-4">
                {sesion.notas}
              </p>

              {/* Tags */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide mb-2">
                  Temas tratados
                </p>
                <div className="flex flex-wrap gap-2">
                  {sesion.temas.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-[var(--primary)] bg-opacity-10 text-[var(--primary)] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tareas pendientes */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide mb-2">
                  Tareas pendientes
                </p>
                <ul className="space-y-1.5">
                  {sesion.tareas.map((tarea) => (
                    <li
                      key={tarea.texto}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                          tarea.hecho
                            ? "bg-[var(--success)] text-white"
                            : "border border-[var(--gray-300)] text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span
                        className={
                          tarea.hecho
                            ? "text-[var(--gray-400)] line-through"
                            : "text-[var(--foreground)]"
                        }
                      >
                        {tarea.texto}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Próxima sesión */}
              <div className="pt-3 border-t border-[var(--gray-100)]">
                <p className="text-xs text-[var(--gray-400)]">
                  Próxima sesión:{" "}
                  <span className="font-medium text-[var(--foreground)]">
                    {sesion.proximaSesion}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {sesionesFiltradas.length === 0 && (
          <div className="text-center py-16 text-[var(--gray-400)]">
            No hay notas de sesiones para el mentor seleccionado.
          </div>
        )}
      </main>
    </div>
  );
}
