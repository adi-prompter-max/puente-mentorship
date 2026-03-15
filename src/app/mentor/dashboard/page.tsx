"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_STUDENTS, MOCK_UPCOMING_SESSIONS } from "@/lib/mock-data";

const mentorNav = [
  { label: "Dashboard", href: "/mentor/dashboard", emoji: "📊" },
  { label: "Mis Mentees", href: "/mentor/mentees", emoji: "👥" },
  { label: "Sesiones", href: "/mentor/sesiones", emoji: "📅" },
  { label: "Mensajes", href: "/mentor/mensajes", emoji: "💬" },
  { label: "Recursos", href: "/mentor/recursos", emoji: "📁" },
];

const menteeProgress = [72, 45, 88, 60];
const lastSessionDates = [
  "12 Mar 2026",
  "8 Mar 2026",
  "14 Mar 2026",
  "10 Mar 2026",
];

const recentNotes = [
  {
    student: "Priya Sharma",
    date: "14 Mar 2026",
    content:
      "Priya ha mejorado mucho su CV. Necesita practicar elevator pitch. Revisamos estructura del CV europeo y añadimos sección de habilidades técnicas.",
  },
  {
    student: "Carlos Mendoza",
    date: "12 Mar 2026",
    content:
      "Carlos está listo para entrevistas. Programar simulacro. Tiene buen dominio del pitch pero debe trabajar en preguntas de comportamiento.",
  },
  {
    student: "Wei Zhang",
    date: "10 Mar 2026",
    content:
      "Wei necesita apoyo con la documentación de permisos de trabajo. Derivar a Isabel Fernández para consulta legal específica.",
  },
];

export default function MentorDashboardPage() {
  const [currentNav] = useState("Dashboard");
  const mentees = MOCK_STUDENTS.slice(0, 4);

  return (
    <div className="flex min-h-screen bg-[var(--gray-100)]">
      {/* Mentor Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] bg-white p-4 pt-5 flex-shrink-0">
        <Link href="/mentor/dashboard" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
          <span className="text-xs bg-[var(--gray-200)] text-[var(--gray-600)] px-1.5 py-0.5 rounded">
            Mentor
          </span>
        </Link>
        <nav className="space-y-1 text-sm">
          {mentorNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentNav === item.label
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--gray-600)] hover:bg-[var(--gray-100)]"
              }`}
            >
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Welcome */}
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
          Bienvenida, Elena
        </h1>
        <p className="text-[var(--gray-500)] mb-6">
          Aquí tienes un resumen de tu actividad como mentora.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-[var(--gray-200)]">
            <p className="text-sm text-[var(--gray-500)] mb-1">Mentees asignados</p>
            <p className="text-2xl font-bold text-[var(--foreground)]">4</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-[var(--gray-200)]">
            <p className="text-sm text-[var(--gray-500)] mb-1">Sesiones completadas</p>
            <p className="text-2xl font-bold text-[var(--foreground)]">24</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-[var(--gray-200)]">
            <p className="text-sm text-[var(--gray-500)] mb-1">Valoración</p>
            <p className="text-2xl font-bold text-[var(--foreground)]">4.9 ⭐</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-[var(--gray-200)]">
            <p className="text-sm text-[var(--gray-500)] mb-1">Próximas sesiones</p>
            <p className="text-2xl font-bold text-[var(--foreground)]">3</p>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Próximas sesiones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_UPCOMING_SESSIONS.map((session, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[var(--gray-200)] p-5"
              >
                <h3 className="font-medium text-[var(--foreground)] mb-2">
                  {session.topic}
                </h3>
                <div className="space-y-1.5 text-sm text-[var(--gray-500)] mb-4">
                  <p>📅 {session.date}</p>
                  <p>🕐 {session.time}</p>
                  <p>👤 {session.type === "Mentoría 1:1" ? "Priya Sharma" : "Grupo"}</p>
                  <p>
                    {session.format.includes("Online") ? "💻" : "📍"}{" "}
                    {session.format}
                  </p>
                </div>
                <button className="w-full bg-[var(--primary)] text-white py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors">
                  Preparar sesión
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* My Mentees */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Mis Mentees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentees.map((student, i) => (
              <div
                key={student.name}
                className="bg-white rounded-xl border border-[var(--gray-200)] p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-10 h-10 ${student.color} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                  >
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--foreground)]">
                      {student.name}
                    </h3>
                    <p className="text-sm text-[var(--gray-500)]">
                      {student.field}
                    </p>
                    <p className="text-xs text-[var(--gray-400)]">
                      {student.university}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-[var(--gray-500)] mb-1">
                    <span>Progreso</span>
                    <span>{menteeProgress[i]}%</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--gray-200)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full transition-all"
                      style={{ width: `${menteeProgress[i]}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-[var(--gray-400)] mb-3">
                  Última sesión: {lastSessionDates[i]}
                </p>

                <div className="flex gap-2">
                  <button className="flex-1 bg-[var(--primary)] text-white py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors">
                    Ver perfil
                  </button>
                  <button className="flex-1 border border-[var(--gray-300)] text-[var(--foreground)] py-2 rounded-lg text-sm font-medium hover:bg-[var(--gray-100)] transition-colors">
                    Enviar mensaje
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notes */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Notas recientes
          </h2>
          <div className="space-y-4">
            {recentNotes.map((note, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[var(--gray-200)] p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[var(--foreground)]">
                    {note.student}
                  </h3>
                  <span className="text-xs text-[var(--gray-400)]">
                    {note.date}
                  </span>
                </div>
                <p className="text-sm text-[var(--gray-500)]">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
