"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_COMPANIES } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";

export default function EmpresasPage() {
  const sectors = Array.from(new Set(MOCK_COMPANIES.map((c) => c.sector)));
  const [activeSector, setActiveSector] = useState<string>("Todos");

  const filtered =
    activeSector === "Todos"
      ? MOCK_COMPANIES
      : MOCK_COMPANIES.filter((c) => c.sector === activeSector);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[var(--foreground)]">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Empresas Colaboradoras</h1>
        <p className="text-[var(--gray-500)] mb-8">
          Empresas abiertas a contratar talento no comunitario en Espa&ntilde;a.
        </p>

        {/* Sector filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["Todos", ...sectors].map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveSector(sector)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeSector === sector
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--gray-100)] text-[var(--gray-600)] hover:bg-[var(--gray-200)]"
              }`}
            >
              {sector}
            </button>
          ))}
        </div>

        {/* Company grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((company) => (
            <div
              key={company.slug}
              className="border border-[var(--gray-200)] rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ backgroundColor: company.color }}
                >
                  {company.logo}
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-lg leading-tight">
                    {company.name}
                  </h2>
                  <p className="text-sm text-[var(--gray-500)]">
                    {company.sector} &middot; {company.location}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[var(--gray-500)] mb-3 line-clamp-2">
                {company.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-[var(--primary)]">
                    {company.openRoles} ofertas abiertas
                  </span>
                  {company.hiresNonEU && (
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Contrata talento no-UE
                    </span>
                  )}
                </div>
                <Link
                  href={`/empresas/${company.slug}`}
                  className="text-sm font-medium text-[var(--primary)] hover:underline whitespace-nowrap"
                >
                  Ver empresa &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--gray-200)] py-8 text-center text-sm text-[var(--gray-400)]">
        &copy; 2026 Puente. Todos los derechos reservados.
      </footer>
    </div>
  );
}
