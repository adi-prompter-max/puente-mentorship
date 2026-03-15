"use client";

import Link from "next/link";
import { useState } from "react";
import { MOCK_ADMIN_STATS } from "@/lib/mock-data";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Estudiantes", href: "/admin/estudiantes", icon: "🎓" },
  { label: "Mentores", href: "/admin/mentores", icon: "👤" },
  { label: "Talleres", href: "/admin/talleres", icon: "📚" },
  { label: "Empresas", href: "/admin/empresas", icon: "🏢" },
  { label: "Informes", href: "/admin/informes", icon: "📈" },
];

const previousReports = [
  { id: 1, name: "Informe Mensual - Febrero 2026", date: "2026-03-01", type: "Completo", size: "2.4 MB" },
  { id: 2, name: "Informe de Actividad - Enero 2026", date: "2026-02-01", type: "Actividad", size: "1.8 MB" },
  { id: 3, name: "Informe de Impacto Q4 2025", date: "2026-01-15", type: "Impacto", size: "3.1 MB" },
  { id: 4, name: "Informe Financiero 2025", date: "2026-01-05", type: "Financiero", size: "4.2 MB" },
];

export default function InformesPage() {
  const [dateFrom, setDateFrom] = useState("2026-01-01");
  const [dateTo, setDateTo] = useState("2026-03-15");
  const [reportType, setReportType] = useState("Completo");
  const [format, setFormat] = useState("PDF");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      setTimeout(() => setGenerated(false), 3000);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-[var(--gray-100)]">
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0 bg-white">
        <Link href="/admin" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <div>
            <span className="font-semibold">Puente</span>
            <span className="text-xs text-[var(--gray-400)] ml-1">Admin</span>
          </div>
        </Link>
        <nav className="space-y-1 text-sm">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                link.label === "Informes"
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {generated && (
          <div className="mb-4 p-3 bg-green-50 border border-[var(--success)] text-[var(--success)] rounded-lg text-sm font-medium">
            Informe generado exitosamente
          </div>
        )}

        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">Informes de Impacto</h1>

        <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 mb-6">
          <h2 className="font-semibold text-[var(--foreground)] mb-4">Generar informe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xs text-[var(--gray-400)] mb-1">Desde</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--gray-400)] mb-1">Hasta</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--gray-400)] mb-1">Tipo de informe</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option>Completo</option>
                <option>Actividad</option>
                <option>Impacto</option>
                <option>Financiero</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--gray-400)] mb-1">Formato</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFormat("PDF")}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${
                    format === "PDF"
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "border-[var(--gray-200)] text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
                  }`}
                >
                  PDF
                </button>
                <button
                  onClick={() => setFormat("Excel")}
                  className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${
                    format === "Excel"
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "border-[var(--gray-200)] text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
                  }`}
                >
                  Excel
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-6 py-2 bg-[var(--primary)] text-white text-sm rounded-lg hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generando...
              </span>
            ) : (
              "Generar →"
            )}
          </button>
        </div>

        <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 mb-6">
          <h2 className="font-semibold text-[var(--foreground)] mb-4">Informes anteriores</h2>
          <div className="space-y-3">
            {previousReports.map((report) => (
              <div key={report.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-[var(--gray-100)] rounded-lg hover:bg-[var(--gray-100)] transition-colors gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">
                    PDF
                  </div>
                  <div>
                    <p className="font-medium text-sm text-[var(--foreground)]">{report.name}</p>
                    <p className="text-xs text-[var(--gray-400)]">Generado: {report.date} · {report.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    report.type === "Completo" ? "bg-blue-50 text-blue-600" :
                    report.type === "Actividad" ? "bg-purple-50 text-purple-600" :
                    report.type === "Impacto" ? "bg-green-50 text-[var(--success)]" :
                    "bg-orange-50 text-orange-500"
                  }`}>
                    {report.type}
                  </span>
                  <button className="px-3 py-1.5 text-xs text-[var(--primary)] border border-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors">
                    Descargar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6">
          <h2 className="font-semibold text-[var(--foreground)] mb-4">Resumen ejecutivo</h2>
          <div className="border border-[var(--gray-200)] rounded-lg p-6 bg-[var(--gray-100)]">
            <div className="bg-white p-6 rounded shadow-sm max-w-2xl mx-auto">
              <div className="text-center mb-6 pb-4 border-b border-[var(--gray-200)]">
                <h3 className="text-lg font-bold text-[var(--foreground)]">Informe de Impacto - Programa Puente</h3>
                <p className="text-xs text-[var(--gray-400)] mt-1">Generado: 15 de marzo de 2026</p>
              </div>

              <div className="space-y-5 text-sm">
                <div>
                  <h4 className="font-semibold text-[var(--foreground)] mb-2">Participación</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-500)]">Estudiantes activos:</span>
                      <span className="font-medium text-[var(--foreground)]">{MOCK_ADMIN_STATS.totalStudents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-500)]">Mentores activos:</span>
                      <span className="font-medium text-[var(--foreground)]">{MOCK_ADMIN_STATS.totalMentors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-500)]">Empresas aliadas:</span>
                      <span className="font-medium text-[var(--foreground)]">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-500)]">Talleres realizados:</span>
                      <span className="font-medium text-[var(--foreground)]">{MOCK_ADMIN_STATS.workshopsThisMonth}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[var(--foreground)] mb-2">Resultados clave</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-500)]">Sesiones de mentoría:</span>
                      <span className="font-medium text-[var(--foreground)]">{MOCK_ADMIN_STATS.completedSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-500)]">Empleos conseguidos:</span>
                      <span className="font-medium text-[var(--foreground)]">42</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-500)]">Tasa de satisfacción:</span>
                      <span className="font-medium text-[var(--success)]">{MOCK_ADMIN_STATS.nps}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-500)]">Tasa de retención:</span>
                      <span className="font-medium text-[var(--success)]">89%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--gray-200)] text-xs text-[var(--gray-400)] text-center">
                  Programa Puente · Informe confidencial · {dateFrom} a {dateTo}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
