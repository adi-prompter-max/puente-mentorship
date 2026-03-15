"use client";

import Link from "next/link";
import { useState } from "react";
import { MOCK_STUDENTS } from "@/lib/mock-data";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Estudiantes", href: "/admin/estudiantes", icon: "🎓" },
  { label: "Mentores", href: "/admin/mentores", icon: "👤" },
  { label: "Talleres", href: "/admin/talleres", icon: "📚" },
  { label: "Empresas", href: "/admin/empresas", icon: "🏢" },
  { label: "Informes", href: "/admin/informes", icon: "📈" },
];

interface PendingApplication {
  id: number;
  name: string;
  email: string;
  university: string;
  date: string;
}

export default function EstudiantesPage() {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("Todas");
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingApplications, setPendingApplications] = useState<PendingApplication[]>([
    { id: 1, name: "Lucía Fernández", email: "lucia.fernandez@mail.com", university: "Universidad de Buenos Aires", date: "2026-03-10" },
    { id: 2, name: "Andrés Morales", email: "andres.morales@mail.com", university: "UNAM", date: "2026-03-12" },
    { id: 3, name: "Valentina Ríos", email: "valentina.rios@mail.com", university: "Universidad de Chile", date: "2026-03-14" },
  ]);

  const regions = ["Todas", ...Array.from(new Set(MOCK_STUDENTS.map((s) => s.region)))];

  const filtered = MOCK_STUDENTS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = regionFilter === "Todas" || s.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  const handleApprove = (id: number, name: string) => {
    setPendingApplications((prev) => prev.filter((a) => a.id !== id));
    setSuccessMessage(`Solicitud de ${name} aprobada exitosamente`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleReject = (id: number, name: string) => {
    setPendingApplications((prev) => prev.filter((a) => a.id !== id));
    setSuccessMessage(`Solicitud de ${name} rechazada`);
    setTimeout(() => setSuccessMessage(""), 3000);
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
                link.label === "Estudiantes"
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
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-[var(--success)] text-[var(--success)] rounded-lg text-sm font-medium">
            {successMessage}
          </div>
        )}

        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">Gestión de Estudiantes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-[var(--gray-200)]">
            <p className="text-sm text-[var(--gray-400)]">Total de estudiantes</p>
            <p className="text-2xl font-bold text-[var(--foreground)]">{MOCK_STUDENTS.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[var(--gray-200)]">
            <p className="text-sm text-[var(--gray-400)]">Solicitudes pendientes</p>
            <p className="text-2xl font-bold text-orange-500">{pendingApplications.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[var(--gray-200)]">
            <p className="text-sm text-[var(--gray-400)]">Activos este mes</p>
            <p className="text-2xl font-bold text-[var(--primary)]">{Math.floor(MOCK_STUDENTS.length * 0.8)}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Buscar estudiante..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-4 py-2 border border-[var(--gray-200)] rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            {regions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl border border-[var(--gray-200)] overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--gray-200)] bg-[var(--gray-100)]">
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Nombre</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Universidad</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Campo</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Región</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Completado</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Estado</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((student, i) => {
                  const completion = [65, 80, 45, 92, 73, 88, 55, 70][i % 8];
                  const isActive = i % 3 !== 2;
                  return (
                    <tr key={i} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-100)] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ backgroundColor: student.color }}
                          >
                            {student.avatar}
                          </div>
                          <span className="font-medium text-[var(--foreground)]">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[var(--gray-500)]">{student.university}</td>
                      <td className="px-4 py-3 text-[var(--gray-500)]">{student.field}</td>
                      <td className="px-4 py-3 text-[var(--gray-500)]">{student.region}, {student.country}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-[var(--gray-200)] rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--primary)] rounded-full" style={{ width: `${completion}%` }} />
                          </div>
                          <span className="text-xs text-[var(--gray-400)]">{completion}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          isActive
                            ? "bg-green-50 text-[var(--success)]"
                            : "bg-orange-50 text-orange-500"
                        }`}>
                          {isActive ? "Activo" : "Pendiente"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="px-2 py-1 text-xs text-[var(--primary)] hover:bg-[var(--gray-100)] rounded transition-colors">Ver</button>
                          <button className="px-2 py-1 text-xs text-[var(--gray-500)] hover:bg-[var(--gray-100)] rounded transition-colors">Editar</button>
                          <button className="px-2 py-1 text-xs text-[var(--gray-500)] hover:bg-[var(--gray-100)] rounded transition-colors">Mensaje</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Solicitudes pendientes</h2>
        <div className="space-y-3">
          {pendingApplications.map((app) => (
            <div key={app.id} className="bg-white rounded-xl border border-[var(--gray-200)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-medium text-[var(--foreground)]">{app.name}</p>
                <p className="text-sm text-[var(--gray-400)]">{app.email}</p>
                <p className="text-sm text-[var(--gray-400)]">{app.university} · {app.date}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(app.id, app.name)}
                  className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => handleReject(app.id, app.name)}
                  className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
          {pendingApplications.length === 0 && (
            <p className="text-sm text-[var(--gray-400)] text-center py-8">No hay solicitudes pendientes</p>
          )}
        </div>
      </main>
    </div>
  );
}
