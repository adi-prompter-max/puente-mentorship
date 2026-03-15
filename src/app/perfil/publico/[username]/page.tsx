"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_STUDENTS } from "@/lib/mock-data";

const MOCK_RECENT_ACTIVITY = [
  { action: "compartió un recurso", content: "Guía completa de preparación para entrevistas técnicas", time: "hace 2 días" },
  { action: "respondió una pregunta", content: "Consejos para networking en la industria tech", time: "hace 5 días" },
  { action: "celebró un logro", content: "Completó su primera pasantía exitosamente", time: "hace 1 semana" },
];

function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [toastVisible, setToastVisible] = useState(false);

  const student = MOCK_STUDENTS.find((s) => nameToSlug(s.name) === username);

  if (!student) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--gray-100)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Perfil no encontrado</h1>
          <p className="text-[var(--gray-500)] mb-4">No se encontró un perfil con ese nombre de usuario.</p>
          <Link href="/scroll" className="text-[var(--primary)] hover:underline text-sm">
            ← Volver al scroll
          </Link>
        </div>
      </div>
    );
  }

  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const otherStudents = MOCK_STUDENTS.filter((s) => s.name !== student.name).slice(0, 3);

  const handleContact = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[var(--gray-100)]">
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
        </Link>
        <nav className="space-y-1 text-sm">
          {[
            { icon: "📜", label: "Scroll", href: "/scroll" },
            { icon: "📁", label: "Proyectos", href: "/perfil/priya-sharma" },
            { icon: "📥", label: "Bandeja", href: "/mensajes/conv-1" },
            { icon: "💼", label: "Empleos", href: "/empleos" },
            { icon: "🔍", label: "Buscar", href: "/buscar" },
            { icon: "👥", label: "Mi Red", href: "/perfil/priya-sharma" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--gray-500)] hover:bg-[var(--gray-100)] transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/scroll" className="text-sm text-[var(--primary)] hover:underline mb-6 inline-block">
            ← Volver
          </Link>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main content */}
            <div className="flex-1 space-y-6">
              {/* Profile header */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-5">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                    style={{ backgroundColor: student.color }}
                  >
                    {initials}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-xl font-bold text-[var(--foreground)]">{student.name}</h1>
                    <p className="text-sm text-[var(--gray-500)] mt-1">
                      {student.field} · {student.country}
                    </p>
                    <p className="text-sm text-[var(--gray-400)] mt-0.5">{student.university}</p>
                    <p className="text-xs text-[var(--gray-400)] mt-2">En el programa desde Ene 2026</p>
                    <button
                      onClick={handleContact}
                      className="mt-4 bg-[var(--primary)] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
                    >
                      Contactar
                    </button>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-semibold text-[var(--foreground)] mb-3">Intereses</h2>
                <div className="flex flex-wrap gap-2">
                  {student.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-[var(--gray-100)] text-[var(--gray-600)] rounded-full text-xs font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-semibold text-[var(--foreground)] mb-4">Actividad reciente</h2>
                <div className="space-y-4">
                  {MOCK_RECENT_ACTIVITY.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                        style={{ backgroundColor: student.color }}
                      >
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm text-[var(--foreground)]">
                          <span className="font-semibold">{student.name}</span>{" "}
                          <span className="text-[var(--gray-500)]">{activity.action}</span>
                        </p>
                        <p className="text-sm text-[var(--gray-600)] mt-0.5">{activity.content}</p>
                        <p className="text-xs text-[var(--gray-400)] mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="w-full lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold text-[var(--foreground)] mb-4">Otros participantes</h3>
                <div className="space-y-3">
                  {otherStudents.map((s) => {
                    const sInitials = s.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2);
                    return (
                      <Link
                        key={s.name}
                        href={`/perfil/publico/${nameToSlug(s.name)}`}
                        className="flex items-center gap-3 hover:bg-[var(--gray-100)] p-2 rounded-lg transition-colors"
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                          style={{ backgroundColor: s.color }}
                        >
                          {sInitials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--foreground)]">{s.name}</p>
                          <p className="text-xs text-[var(--gray-400)]">{s.field}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Toast */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 bg-[var(--success)] text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium animate-fade-in">
          Mensaje enviado
        </div>
      )}
    </div>
  );
}
