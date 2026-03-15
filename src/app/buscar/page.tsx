"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MOCK_STUDENTS,
  MOCK_MENTORS,
  MOCK_WORKSHOPS,
  MOCK_JOBS,
  MOCK_COMPANIES,
} from "@/lib/mock-data";

type Category = "Todo" | "Personas" | "Talleres" | "Empleos" | "Empresas";

export default function BuscarPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Category>("Todo");

  const q = query.toLowerCase().trim();

  const matchedStudents = q
    ? MOCK_STUDENTS.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.field.toLowerCase().includes(q) ||
          s.university.toLowerCase().includes(q)
      )
    : [];

  const matchedMentors = q
    ? MOCK_MENTORS.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.role.toLowerCase().includes(q)
      )
    : [];

  const personas = [...matchedStudents, ...matchedMentors];

  const matchedWorkshops = q
    ? MOCK_WORKSHOPS.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          (w.tags && w.tags.some((t: string) => t.toLowerCase().includes(q)))
      )
    : [];

  const matchedJobs = q
    ? MOCK_JOBS.filter(
        (j) =>
          j.role.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q)
      )
    : [];

  const matchedCompanies = q
    ? MOCK_COMPANIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.sector.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q)
      )
    : [];

  const counts = {
    Todo:
      personas.length +
      matchedWorkshops.length +
      matchedJobs.length +
      matchedCompanies.length,
    Personas: personas.length,
    Talleres: matchedWorkshops.length,
    Empleos: matchedJobs.length,
    Empresas: matchedCompanies.length,
  };

  const tabs: Category[] = ["Todo", "Personas", "Talleres", "Empleos", "Empresas"];

  const showPersonas = activeTab === "Todo" || activeTab === "Personas";
  const showTalleres = activeTab === "Todo" || activeTab === "Talleres";
  const showEmpleos = activeTab === "Todo" || activeTab === "Empleos";
  const showEmpresas = activeTab === "Todo" || activeTab === "Empresas";

  return (
    <div className="flex h-screen bg-white text-[var(--foreground)]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
        </Link>
        <nav className="space-y-1 text-sm">
          {[
            { icon: "\uD83D\uDCDC", label: "Scroll" },
            { icon: "\uD83D\uDCC1", label: "Proyectos" },
            { icon: "\uD83D\uDCE5", label: "Bandeja" },
            { icon: "\uD83D\uDCBC", label: "Empleos" },
            { icon: "\uD83D\uDD0D", label: "Buscar" },
            { icon: "\uD83D\uDC65", label: "Mi Red" },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                item.label === "Buscar"
                  ? "bg-[var(--gray-100)] text-[var(--foreground)] font-medium"
                  : "text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Buscar</h1>

        {/* Search input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca estudiantes, mentores, talleres, empleos y empresas..."
          className="w-full border border-[var(--gray-200)] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] mb-6"
        />

        {/* Category tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--gray-100)] text-[var(--gray-600)] hover:bg-[var(--gray-200)]"
              }`}
            >
              {tab}
              {q && (
                <span className="ml-1.5 text-xs opacity-80">
                  {counts[tab]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {!q && (
          <div className="text-center py-20 text-[var(--gray-400)]">
            <p className="text-lg">
              Busca estudiantes, mentores, talleres, empleos y empresas
            </p>
          </div>
        )}

        {/* No results */}
        {q && counts.Todo === 0 && (
          <div className="text-center py-20 text-[var(--gray-400)]">
            <p className="text-lg">
              No se encontraron resultados para &lsquo;{query}&rsquo;
            </p>
          </div>
        )}

        {/* Results */}
        {q && counts.Todo > 0 && (
          <div className="space-y-10">
            {/* Personas */}
            {showPersonas && personas.length > 0 && (
              <section>
                <h2 className="font-semibold text-sm text-[var(--gray-500)] uppercase tracking-wide mb-3">
                  Personas
                  <span className="ml-2 text-xs bg-[var(--gray-100)] text-[var(--gray-600)] px-2 py-0.5 rounded-full">
                    {personas.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {matchedStudents.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center gap-3 border border-[var(--gray-200)] rounded-xl p-4"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: s.avatar || "#6B7280" }}
                      >
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{s.name}</p>
                        <p className="text-xs text-[var(--gray-500)]">
                          {s.field} &middot; {s.university}
                        </p>
                      </div>
                    </div>
                  ))}
                  {matchedMentors.map((m) => (
                    <div
                      key={m.name}
                      className="flex items-center gap-3 border border-[var(--gray-200)] rounded-xl p-4"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: m.avatar || "#6B7280" }}
                      >
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{m.name}</p>
                        <p className="text-xs text-[var(--gray-500)]">
                          {m.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Talleres */}
            {showTalleres && matchedWorkshops.length > 0 && (
              <section>
                <h2 className="font-semibold text-sm text-[var(--gray-500)] uppercase tracking-wide mb-3">
                  Talleres
                  <span className="ml-2 text-xs bg-[var(--gray-100)] text-[var(--gray-600)] px-2 py-0.5 rounded-full">
                    {matchedWorkshops.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {matchedWorkshops.map((w) => (
                    <div
                      key={w.title}
                      className="border border-[var(--gray-200)] rounded-xl p-4"
                    >
                      <p className="font-medium text-sm mb-1">{w.title}</p>
                      <div className="flex items-center gap-2 text-xs text-[var(--gray-500)]">
                        <span>{w.date}</span>
                        {w.tags &&
                          w.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="bg-[var(--gray-100)] text-[var(--gray-600)] px-2 py-0.5 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Empleos */}
            {showEmpleos && matchedJobs.length > 0 && (
              <section>
                <h2 className="font-semibold text-sm text-[var(--gray-500)] uppercase tracking-wide mb-3">
                  Empleos
                  <span className="ml-2 text-xs bg-[var(--gray-100)] text-[var(--gray-600)] px-2 py-0.5 rounded-full">
                    {matchedJobs.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {matchedJobs.map((j) => (
                    <div
                      key={j.id}
                      className="border border-[var(--gray-200)] rounded-xl p-4"
                    >
                      <p className="font-medium text-sm">{j.role}</p>
                      <p className="text-xs text-[var(--gray-500)]">
                        {j.company} &middot; {j.type}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Empresas */}
            {showEmpresas && matchedCompanies.length > 0 && (
              <section>
                <h2 className="font-semibold text-sm text-[var(--gray-500)] uppercase tracking-wide mb-3">
                  Empresas
                  <span className="ml-2 text-xs bg-[var(--gray-100)] text-[var(--gray-600)] px-2 py-0.5 rounded-full">
                    {matchedCompanies.length}
                  </span>
                </h2>
                <div className="space-y-3">
                  {matchedCompanies.map((c) => (
                    <div
                      key={c.slug}
                      className="flex items-center gap-3 border border-[var(--gray-200)] rounded-xl p-4"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.logo}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{c.name}</p>
                        <p className="text-xs text-[var(--gray-500)]">
                          {c.sector} &middot; {c.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
