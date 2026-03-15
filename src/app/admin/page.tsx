"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MOCK_ADMIN_STATS,
  MOCK_STUDENTS,
  MOCK_WORKSHOPS,
  MOCK_MENTORS,
} from "@/lib/mock-data";

const adminNav = [
  { label: "Dashboard", href: "/admin", emoji: "📊" },
  { label: "Estudiantes", href: "/admin/estudiantes", emoji: "🎓" },
  { label: "Mentores", href: "/admin/mentores", emoji: "🤝" },
  { label: "Talleres", href: "/admin/talleres", emoji: "📚" },
  { label: "Empresas", href: "/admin/empresas", emoji: "🏢" },
  { label: "Informes", href: "/admin/informes", emoji: "📈" },
];

const PIE_COLORS = ["#2B7A4B", "#4ade80", "#16a34a", "#86efac", "#bbf7d0"];

const studentCompletions = [72, 45, 88, 60, 35, 55];

export default function AdminDashboardPage() {
  const [currentNav] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-[var(--gray-100)]">
      {/* Admin Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] bg-white p-4 pt-5 flex-shrink-0">
        <Link href="/admin" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
          <span className="text-xs bg-[var(--gray-200)] text-[var(--gray-600)] px-1.5 py-0.5 rounded">
            Admin
          </span>
        </Link>
        <nav className="space-y-1 text-sm">
          {adminNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                currentNav === item.label
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--gray-600)] hover:bg-[var(--gray-100)]"
              }`}
            >
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">
          Panel de Coordinación
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-[var(--gray-200)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-lg">
                🎓
              </div>
              <span className="text-sm text-[var(--gray-500)]">
                Total Estudiantes
              </span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">
              {MOCK_ADMIN_STATS.totalStudents}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[var(--gray-200)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-lg">
                📅
              </div>
              <span className="text-sm text-[var(--gray-500)]">
                Sesiones Activas
              </span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">
              {MOCK_ADMIN_STATS.activeSessions}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[var(--gray-200)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-lg">
                📋
              </div>
              <span className="text-sm text-[var(--gray-500)]">
                Solicitudes Pendientes
              </span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">
              {MOCK_ADMIN_STATS.pendingApplications}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[var(--gray-200)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-lg">
                💼
              </div>
              <span className="text-sm text-[var(--gray-500)]">
                Tasa de Colocación
              </span>
            </div>
            <p className="text-2xl font-bold text-[var(--foreground)]">
              {MOCK_ADMIN_STATS.placementRate}%
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl p-5 border border-[var(--gray-200)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Inscripciones Mensuales
            </h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={MOCK_ADMIN_STATS.monthlyEnrollment}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}`, "Estudiantes"]} />
                <Bar dataKey="students" fill="#2B7A4B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl p-5 border border-[var(--gray-200)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Distribución por Región
            </h2>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={MOCK_ADMIN_STATS.regionDistribution}
                  dataKey="count"
                  nameKey="region"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {MOCK_ADMIN_STATS.regionDistribution.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}`, "Estudiantes"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl border border-[var(--gray-200)] mb-8 overflow-hidden">
          <div className="p-5 border-b border-[var(--gray-200)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Estudiantes
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--gray-200)] bg-[var(--gray-100)]">
                  <th className="text-left px-5 py-3 text-[var(--gray-500)] font-medium">
                    Nombre
                  </th>
                  <th className="text-left px-5 py-3 text-[var(--gray-500)] font-medium">
                    Región
                  </th>
                  <th className="text-left px-5 py-3 text-[var(--gray-500)] font-medium">
                    Universidad
                  </th>
                  <th className="text-left px-5 py-3 text-[var(--gray-500)] font-medium">
                    Especialidad
                  </th>
                  <th className="text-left px-5 py-3 text-[var(--gray-500)] font-medium">
                    Completado
                  </th>
                </tr>
              </thead>
              <tbody>
                {MOCK_STUDENTS.map((student, i) => (
                  <tr
                    key={student.name}
                    className="border-b border-[var(--gray-200)] last:border-b-0 hover:bg-[var(--gray-100)] transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-[var(--foreground)]">
                      {student.name}
                    </td>
                    <td className="px-5 py-3 text-[var(--gray-500)]">
                      {student.region}
                    </td>
                    <td className="px-5 py-3 text-[var(--gray-500)]">
                      {student.university}
                    </td>
                    <td className="px-5 py-3 text-[var(--gray-500)]">
                      {student.field}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-[var(--gray-200)] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[var(--primary)] rounded-full"
                            style={{
                              width: `${studentCompletions[i]}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-[var(--gray-500)]">
                          {studentCompletions[i]}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Workshops */}
        <div className="bg-white rounded-xl border border-[var(--gray-200)]">
          <div className="p-5 border-b border-[var(--gray-200)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Próximos Talleres
            </h2>
          </div>
          <div className="divide-y divide-[var(--gray-200)]">
            {MOCK_WORKSHOPS.map((ws) => (
              <div
                key={ws.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <h3 className="font-medium text-[var(--foreground)]">
                    {ws.title}
                  </h3>
                  <p className="text-sm text-[var(--gray-500)]">
                    {ws.date} &middot; {ws.time}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-[var(--gray-500)]">
                    {ws.spots}/{ws.maxSpots} plazas
                  </span>
                  <span className="text-[var(--gray-500)]">
                    Mentor: {ws.mentor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
