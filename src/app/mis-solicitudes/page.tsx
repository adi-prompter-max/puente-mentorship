"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "mentor" | "talleres";

const mentorStages = ["Enviada", "En revisión", "Asignado"];

interface WorkshopEnrollment {
  id: number;
  title: string;
  date: string;
  status: "confirmada" | "lista_espera";
  statusLabel: string;
  extra?: string;
}

const workshopEnrollments: WorkshopEnrollment[] = [
  { id: 1, title: "CV europeo", date: "22 Mar 2026", status: "confirmada", statusLabel: "Confirmada" },
  { id: 2, title: "Regulaciones migratorias", date: "29 Mar 2026", status: "confirmada", statusLabel: "Confirmada" },
  { id: 3, title: "Networking LinkedIn", date: "5 Abr 2026", status: "lista_espera", statusLabel: "Lista de espera", extra: "Posición: 3 de 5" },
];

export default function MisSolicitudesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("mentor");

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "mentor", label: "Mentor", count: 1 },
    { key: "talleres", label: "Talleres", count: 3 },
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
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">Mis Solicitudes</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-lg border border-[var(--gray-200)] p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Mentor Tab */}
        {activeTab === "mentor" && (
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Solicitud de mentor</h2>
              <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-green-100 text-green-700">
                Asignado
              </span>
            </div>

            {/* Request details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-[var(--gray-400)] mb-1">Áreas preferidas</p>
                <p className="text-[var(--foreground)] font-medium">Tecnología, Desarrollo Web</p>
              </div>
              <div>
                <p className="text-[var(--gray-400)] mb-1">Formato</p>
                <p className="text-[var(--foreground)] font-medium">Online</p>
              </div>
              <div>
                <p className="text-[var(--gray-400)] mb-1">Disponibilidad</p>
                <p className="text-[var(--foreground)] font-medium">Tardes (L-V)</p>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <p className="text-sm font-medium text-[var(--gray-500)] mb-3">Estado de la solicitud</p>
              <div className="flex items-center">
                {mentorStages.map((stage, idx) => {
                  const isCompleted = idx <= 2;
                  const isCurrent = idx === 2;
                  return (
                    <div key={stage} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-3.5 h-3.5 rounded-full border-2 ${
                            isCompleted
                              ? "border-[var(--primary)] bg-[var(--primary)]"
                              : "border-[var(--gray-300)] bg-white"
                          }`}
                        />
                        <span className={`text-xs mt-1.5 ${isCurrent ? "font-semibold text-[var(--foreground)]" : "text-[var(--gray-400)]"}`}>
                          {stage}
                        </span>
                      </div>
                      {idx < mentorStages.length - 1 && (
                        <div className={`h-0.5 flex-1 -mt-5 ${isCompleted ? "bg-[var(--primary)]" : "bg-[var(--gray-200)]"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assigned mentor */}
            <div className="border-t border-[var(--gray-200)] pt-5">
              <p className="text-sm font-medium text-[var(--gray-500)] mb-3">Mentor asignado</p>
              <div className="flex items-center gap-4 p-4 rounded-lg border border-[var(--gray-200)]">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  EG
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--foreground)]">Elena García Ruiz</h3>
                  <p className="text-sm text-[var(--gray-500)]">Senior Frontend Developer en Spotify</p>
                </div>
                <Link href="/mentores/elena-garcia" className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium">
                  Ver mentor →
                </Link>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700 font-medium">
                Primera sesión programada: 20 Mar 2026
              </p>
            </div>
          </div>
        )}

        {/* Talleres Tab */}
        {activeTab === "talleres" && (
          <div className="space-y-3">
            {workshopEnrollments.map((ws) => (
              <div key={ws.id} className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">{ws.title}</h3>
                    <p className="text-sm text-[var(--gray-500)] mt-1">{ws.date}</p>
                    {ws.extra && (
                      <p className="text-xs text-yellow-600 mt-1 font-medium">{ws.extra}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        ws.status === "confirmada"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {ws.statusLabel}
                    </span>
                    <Link href="/talleres" className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium">
                      Ver taller →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
