"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_WORKSHOPS } from "@/lib/mock-data";

const TAG_FILTERS = ["Todos", "CV", "Legal", "Networking", "Tech", "Comunicación"];
const FORMAT_FILTERS = ["Todos", "Online", "Presencial"];

const NAV_ITEMS = [
  { label: "Inicio", href: "/", icon: "🏠" },
  { label: "Talleres", href: "/talleres", icon: "📚" },
  { label: "Empleos", href: "/empleos", icon: "💼" },
  { label: "Perfil", href: "/perfil", icon: "👤" },
];

export default function TalleresPage() {
  const [activeTag, setActiveTag] = useState("Todos");
  const [activeFormat, setActiveFormat] = useState("Todos");

  const filtered = MOCK_WORKSHOPS.filter((w) => {
    const tagMatch =
      activeTag === "Todos" ||
      w.tags.some((t) => t.toLowerCase().includes(activeTag.toLowerCase()));
    const formatMatch =
      activeFormat === "Todos" ||
      w.format.toLowerCase().includes(activeFormat.toLowerCase());
    return tagMatch && formatMatch;
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
      <main className="flex-1 p-6 md:p-10 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Talleres y Formación</h1>

        {/* Filter bar */}
        <div className="mb-4">
          <p className="text-xs font-medium text-[var(--gray-400)] mb-2 uppercase tracking-wide">
            Tema
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {TAG_FILTERS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--gray-100)] text-[var(--gray-500)] hover:bg-[var(--gray-200)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="text-xs font-medium text-[var(--gray-400)] mb-2 uppercase tracking-wide">
            Formato
          </p>
          <div className="flex flex-wrap gap-2">
            {FORMAT_FILTERS.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setActiveFormat(fmt)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeFormat === fmt
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--gray-100)] text-[var(--gray-500)] hover:bg-[var(--gray-200)]"
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {filtered.map((w) => {
            const spotsPercent = ((w.maxSpots - w.spots) / w.maxSpots) * 100;
            return (
              <div
                key={w.id}
                className="border border-[var(--gray-200)] rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-sm leading-snug">
                    {w.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                      w.format.includes("Online")
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {w.format.includes("Online") ? "Online" : "Presencial"}
                  </span>
                </div>

                <p className="text-xs text-[var(--gray-400)]">
                  {w.date} · {w.time}
                </p>

                <p className="text-xs text-[var(--gray-500)]">
                  {w.mentor}
                </p>

                <p className="text-sm text-[var(--gray-500)] line-clamp-2">
                  {w.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {w.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-[var(--gray-100)] text-[var(--gray-500)] px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Spots */}
                <div className="mt-auto">
                  <div className="flex justify-between text-xs text-[var(--gray-400)] mb-1">
                    <span>
                      {w.maxSpots - w.spots}/{w.maxSpots} plazas
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--gray-100)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--primary)] rounded-full transition-all"
                      style={{ width: `${spotsPercent}%` }}
                    />
                  </div>
                </div>

                <Link
                  href={`/talleres/${w.id}`}
                  className="text-sm font-medium text-[var(--primary)] hover:underline mt-1"
                >
                  Ver detalles →
                </Link>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-[var(--gray-400)] text-sm mt-8">
            No se encontraron talleres con estos filtros.
          </p>
        )}
      </main>
    </div>
  );
}
