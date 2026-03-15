"use client";

import Link from "next/link";
import { useState } from "react";
import { MOCK_MENTORS } from "@/lib/mock-data";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Estudiantes", href: "/admin/estudiantes", icon: "🎓" },
  { label: "Mentores", href: "/admin/mentores", icon: "👤" },
  { label: "Talleres", href: "/admin/talleres", icon: "📚" },
  { label: "Empresas", href: "/admin/empresas", icon: "🏢" },
  { label: "Informes", href: "/admin/informes", icon: "📈" },
];

const mockAssignments = [
  { mentor: "Carlos Mendoza", student: "Lucía Fernández", startDate: "2026-01-15", sessions: 8, status: "Activo" },
  { mentor: "Ana García", student: "Andrés Morales", startDate: "2026-02-01", sessions: 5, status: "Activo" },
  { mentor: "Roberto Silva", student: "Valentina Ríos", startDate: "2025-11-20", sessions: 12, status: "Completado" },
  { mentor: "Carlos Mendoza", student: "Diego López", startDate: "2026-01-20", sessions: 7, status: "Activo" },
  { mentor: "María Torres", student: "Camila Herrera", startDate: "2026-02-10", sessions: 3, status: "Activo" },
  { mentor: "Ana García", student: "Sebastián Ruiz", startDate: "2025-12-05", sessions: 10, status: "Pausado" },
];

export default function MentoresPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", company: "", specialties: "" });
  const [toast, setToast] = useState("");

  const handleInvite = () => {
    if (!formData.name || !formData.email) return;
    setToast(`Invitación enviada a ${formData.name} exitosamente`);
    setFormData({ name: "", email: "", role: "", company: "", specialties: "" });
    setShowForm(false);
    setTimeout(() => setToast(""), 3000);
  };

  const totalSessions = MOCK_MENTORS.reduce((sum, m) => sum + m.sessionsCompleted, 0);
  const avgRating = (MOCK_MENTORS.reduce((sum, m) => sum + m.rating, 0) / MOCK_MENTORS.length).toFixed(1);

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
                link.label === "Mentores"
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
        {toast && (
          <div className="mb-4 p-3 bg-green-50 border border-[var(--success)] text-[var(--success)] rounded-lg text-sm font-medium">
            {toast}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Gestión de Mentores</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
          >
            Añadir mentor
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 border border-[var(--gray-200)]">
            <p className="text-sm text-[var(--gray-400)]">Total de mentores</p>
            <p className="text-2xl font-bold text-[var(--foreground)]">{MOCK_MENTORS.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[var(--gray-200)]">
            <p className="text-sm text-[var(--gray-400)]">Sesiones este mes</p>
            <p className="text-2xl font-bold text-[var(--primary)]">{totalSessions}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-[var(--gray-200)]">
            <p className="text-sm text-[var(--gray-400)]">Calificación promedio</p>
            <p className="text-2xl font-bold text-yellow-500">{avgRating} ★</p>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 mb-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Invitar nuevo mentor</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <input
                type="text"
                placeholder="Cargo"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="px-4 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <input
                type="text"
                placeholder="Empresa"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="px-4 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            <input
              type="text"
              placeholder="Especialidades (separadas por coma)"
              value={formData.specialties}
              onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
              className="w-full px-4 py-2 border border-[var(--gray-200)] rounded-lg text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <button
              onClick={handleInvite}
              className="px-6 py-2 bg-[var(--primary)] text-white text-sm rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
            >
              Invitar
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {MOCK_MENTORS.map((mentor) => {
            const menteeCount = 3 + (mentor.id.length % 4);
            return (
              <div key={mentor.id} className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ backgroundColor: mentor.color }}
                  >
                    {mentor.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[var(--foreground)] truncate">{mentor.name}</p>
                    <p className="text-xs text-[var(--gray-400)] truncate">{mentor.role} · {mentor.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`text-sm ${star <= Math.round(mentor.rating) ? "text-yellow-400" : "text-[var(--gray-200)]"}`}>★</span>
                  ))}
                  <span className="text-xs text-[var(--gray-400)] ml-1">{mentor.rating}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--gray-400)] mb-3">
                  <span>{mentor.sessionsCompleted} sesiones</span>
                  <span>{menteeCount} mentees</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {mentor.specialties.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-[var(--gray-100)] text-[var(--gray-500)] rounded-full text-xs">{s}</span>
                  ))}
                </div>
                <span className="px-2 py-1 bg-green-50 text-[var(--success)] rounded-full text-xs font-medium">Activo</span>
              </div>
            );
          })}
        </div>

        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Asignaciones</h2>
        <div className="bg-white rounded-xl border border-[var(--gray-200)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--gray-200)] bg-[var(--gray-100)]">
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Mentor</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Estudiante</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Fecha de inicio</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Sesiones</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-500)]">Estado</th>
                </tr>
              </thead>
              <tbody>
                {mockAssignments.map((a, i) => (
                  <tr key={i} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-100)] transition-colors">
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{a.mentor}</td>
                    <td className="px-4 py-3 text-[var(--gray-500)]">{a.student}</td>
                    <td className="px-4 py-3 text-[var(--gray-500)]">{a.startDate}</td>
                    <td className="px-4 py-3 text-[var(--gray-500)]">{a.sessions}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        a.status === "Activo" ? "bg-green-50 text-[var(--success)]" :
                        a.status === "Completado" ? "bg-blue-50 text-blue-600" :
                        "bg-orange-50 text-orange-500"
                      }`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
