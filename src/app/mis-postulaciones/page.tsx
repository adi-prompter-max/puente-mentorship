"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "en_revision" | "enviada" | "aceptada" | "rechazada";

interface Application {
  id: number;
  role: string;
  company: string;
  dateApplied: string;
  status: Status;
  statusLabel: string;
  message: string;
  currentStage: number;
}

const applications: Application[] = [
  {
    id: 1,
    role: "Desarrollador/a Junior Frontend",
    company: "Cabify",
    dateApplied: "12 Mar 2026",
    status: "en_revision",
    statusLabel: "En revisión",
    message: "Tu perfil está siendo evaluado",
    currentStage: 1,
  },
  {
    id: 2,
    role: "Becario/a Marketing Digital",
    company: "Accenture",
    dateApplied: "8 Mar 2026",
    status: "enviada",
    statusLabel: "Enviada a empresa",
    message: "La empresa ha recibido tu candidatura. Respuesta estimada: 2 semanas.",
    currentStage: 2,
  },
  {
    id: 3,
    role: "Community Manager",
    company: "Glovo",
    dateApplied: "1 Mar 2026",
    status: "rechazada",
    statusLabel: "No seleccionado",
    message: "No se ajusta al perfil buscado. Te recomendamos otras ofertas similares.",
    currentStage: 3,
  },
];

const stages = ["Enviada", "En revisión", "Enviada a empresa", "Decisión"];

const statusBadge: Record<Status, string> = {
  en_revision: "bg-yellow-100 text-yellow-700",
  enviada: "bg-blue-100 text-blue-700",
  aceptada: "bg-green-100 text-green-700",
  rechazada: "bg-[var(--gray-100)] text-[var(--gray-500)]",
};

type Filter = "todas" | Status;

export default function MisPostulacionesPage() {
  const [filter, setFilter] = useState<Filter>("todas");

  const filtered = filter === "todas" ? applications : applications.filter((a) => a.status === filter);

  const stats = {
    total: applications.length,
    enRevision: applications.filter((a) => a.status === "en_revision").length,
    enviada: applications.filter((a) => a.status === "enviada").length,
    rechazada: applications.filter((a) => a.status === "rechazada").length,
  };

  const filters: { key: Filter; label: string }[] = [
    { key: "todas", label: "Todas" },
    { key: "en_revision", label: "En revisión" },
    { key: "enviada", label: "Enviada" },
    { key: "aceptada", label: "Aceptada" },
    { key: "rechazada", label: "Rechazada" },
  ];

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
          {[{icon: "📜", label: "Scroll"}, {icon: "📅", label: "Calendario"}, {icon: "📥", label: "Bandeja"}, {icon: "💼", label: "Empleos"}, {icon: "🔍", label: "Buscar"}, {icon: "👥", label: "Mi Red"}].map(item => (
            <div key={item.label} className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--gray-500)] hover:bg-[var(--gray-100)] cursor-pointer transition-colors">
              <span>{item.icon}</span><span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">Mis Postulaciones</h1>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-4 text-center">
            <p className="text-2xl font-bold text-[var(--foreground)]">{stats.total}</p>
            <p className="text-xs text-[var(--gray-500)]">Total</p>
          </div>
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.enRevision}</p>
            <p className="text-xs text-[var(--gray-500)]">En revisión</p>
          </div>
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.enviada}</p>
            <p className="text-xs text-[var(--gray-500)]">Enviada a empresa</p>
          </div>
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-4 text-center">
            <p className="text-2xl font-bold text-[var(--gray-400)]">{stats.rechazada}</p>
            <p className="text-xs text-[var(--gray-500)]">Rechazada</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-1 mb-6 bg-white rounded-lg border border-[var(--gray-200)] p-1 w-fit flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f.key
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Application cards */}
        <div className="space-y-4">
          {filtered.map((app) => (
            <div key={app.id} className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-[var(--foreground)]">{app.role}</h3>
                  <p className="text-sm text-[var(--gray-500)]">{app.company}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusBadge[app.status]}`}>
                  {app.statusLabel}
                </span>
              </div>

              <p className="text-xs text-[var(--gray-400)] mb-2">Postulación enviada el {app.dateApplied}</p>
              <p className="text-sm text-[var(--gray-500)] mb-4">{app.message}</p>

              {/* Timeline */}
              <div className="flex items-center gap-0">
                {stages.map((stage, idx) => {
                  const isCompleted = idx <= app.currentStage;
                  const isCurrent = idx === app.currentStage;
                  const isRejected = app.status === "rechazada" && idx === app.currentStage;
                  return (
                    <div key={stage} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-3 h-3 rounded-full border-2 ${
                            isRejected
                              ? "border-[var(--gray-400)] bg-[var(--gray-400)]"
                              : isCompleted
                              ? "border-[var(--primary)] bg-[var(--primary)]"
                              : "border-[var(--gray-300)] bg-white"
                          }`}
                        />
                        <span className={`text-xs mt-1 ${isCurrent ? "font-semibold text-[var(--foreground)]" : "text-[var(--gray-400)]"}`}>
                          {stage}
                        </span>
                      </div>
                      {idx < stages.length - 1 && (
                        <div className={`h-0.5 flex-1 -mt-4 ${isCompleted && idx < app.currentStage ? "bg-[var(--primary)]" : "bg-[var(--gray-200)]"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/empleos" className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium">
            Ver más empleos →
          </Link>
        </div>
      </main>
    </div>
  );
}
