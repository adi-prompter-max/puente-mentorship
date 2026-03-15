"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_JOBS } from "@/lib/mock-data";

const TYPE_FILTERS = ["Todos", "Prácticas", "Tiempo completo", "Media jornada"];

const NAV_ITEMS = [
  { label: "Inicio", href: "/", icon: "🏠" },
  { label: "Talleres", href: "/talleres", icon: "📚" },
  { label: "Empleos", href: "/empleos", icon: "💼" },
  { label: "Perfil", href: "/perfil", icon: "👤" },
];

export default function EmpleosPage() {
  const [activeType, setActiveType] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = MOCK_JOBS.filter((j) => {
    const typeMatch = activeType === "Todos" || j.type === activeType;
    const searchLower = search.toLowerCase();
    const searchMatch =
      !search ||
      j.role.toLowerCase().includes(searchLower) ||
      j.company.toLowerCase().includes(searchLower);
    return typeMatch && searchMatch;
  });

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
      <main className="flex-1 p-6 md:p-10 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Oportunidades Laborales</h1>

        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {TYPE_FILTERS.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeType === type
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--gray-100)] text-[var(--gray-500)] hover:bg-[var(--gray-200)]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por puesto o empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-[var(--gray-200)] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent placeholder:text-[var(--gray-400)]"
          />
        </div>

        {/* Job list */}
        <div className="space-y-4">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="border border-[var(--gray-200)] rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <h3 className="font-semibold">{job.role}</h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      job.type === "Prácticas"
                        ? "bg-purple-100 text-purple-700"
                        : job.type === "Tiempo completo"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {job.type}
                  </span>
                  <span className="text-sm font-medium text-[var(--gray-500)]">
                    {job.salary}
                  </span>
                </div>
              </div>

              <p className="text-sm text-[var(--gray-500)] mb-1">
                {job.company} · {job.location}
              </p>

              <p className="text-sm text-[var(--gray-400)] mb-3">
                {job.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--gray-400)]">
                <span>Publicado: {job.posted}</span>
                <span>Fecha límite: {job.deadline}</span>
              </div>

              <Link
                href={`/empleos/${job.id}`}
                className="text-sm font-medium text-[var(--primary)] hover:underline mt-3 inline-block"
              >
                Ver oferta →
              </Link>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-[var(--gray-400)] text-sm mt-8">
            No se encontraron ofertas con estos filtros.
          </p>
        )}
      </main>
    </div>
  );
}
