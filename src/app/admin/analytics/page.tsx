"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const enrollmentData = [
  { mes: "Oct", inscripciones: 15 },
  { mes: "Nov", inscripciones: 22 },
  { mes: "Dic", inscripciones: 18 },
  { mes: "Ene", inscripciones: 28 },
  { mes: "Feb", inscripciones: 24 },
  { mes: "Mar", inscripciones: 20 },
];

const sessionsData = [
  { semana: "Sem 1", sesiones: 12 },
  { semana: "Sem 2", sesiones: 15 },
  { semana: "Sem 3", sesiones: 18 },
  { semana: "Sem 4", sesiones: 14 },
  { semana: "Sem 5", sesiones: 22 },
  { semana: "Sem 6", sesiones: 19 },
  { semana: "Sem 7", sesiones: 25 },
  { semana: "Sem 8", sesiones: 20 },
];

const profileData = [
  { name: "Completo (>70%)", value: 45 },
  { name: "En progreso", value: 38 },
  { name: "Incompleto (<30%)", value: 15 },
];

const PIE_COLORS = ["#2B7A4B", "#F59E0B", "#EF4444"];

const workshopData = [
  { taller: "CV Profesional", asistencia: 22, capacidad: 25 },
  { taller: "Entrevistas", asistencia: 18, capacidad: 20 },
  { taller: "LinkedIn", asistencia: 15, capacidad: 25 },
  { taller: "Networking", asistencia: 20, capacidad: 20 },
  { taller: "Marca Personal", asistencia: 12, capacidad: 25 },
];

const funnelData = [
  { etapa: "Registrados", valor: 127 },
  { etapa: "Perfil completado", valor: 89 },
  { etapa: "Mentor asignado", valor: 72 },
  { etapa: "Entrevista conseguida", valor: 45 },
  { etapa: "Empleo/prácticas", valor: 28 },
];

const interestsData = [
  { interes: "Desarrollo Web", cantidad: 42 },
  { interes: "Ciencia de Datos", cantidad: 35 },
  { interes: "Diseño UX/UI", cantidad: 28 },
  { interes: "Marketing Digital", cantidad: 22 },
  { interes: "Gestión de Proyectos", cantidad: 18 },
];

const ranges = ["Últimos 7 días", "30 días", "90 días", "Todo"] as const;

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState<string>("30 días");

  const stats = [
    { label: "Estudiantes activos", value: "98", trend: "+12%" },
    { label: "Sesiones completadas", value: "384", trend: "+8%" },
    { label: "Tasa de colocación", value: "78%", trend: "+5%" },
    { label: "NPS", value: "92", trend: "+3%" },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--gray-100)]">
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0">
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
          {[
            { label: "Dashboard", href: "/admin" },
            { label: "Estudiantes", href: "/admin/estudiantes" },
            { label: "Mentores", href: "/admin/mentores" },
            { label: "Talleres", href: "/admin/talleres/crear" },
            { label: "Solicitudes", href: "/admin/solicitudes" },
            { label: "Analytics", href: "/admin/analytics" },
            { label: "Emails", href: "/admin/emails" },
            { label: "Configuración", href: "/admin/configuracion" },
            { label: "Informes", href: "/admin/informes" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                item.href === "/admin/analytics"
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Analytics del Programa
            </h1>
            <div className="flex bg-white rounded-lg border border-[var(--gray-200)] p-1">
              {ranges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    selectedRange === range
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--gray-500)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Row 1: Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-[var(--gray-200)] p-5"
              >
                <p className="text-sm text-[var(--gray-500)]">{stat.label}</p>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-2xl font-bold text-[var(--foreground)]">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-[var(--success)] mb-0.5">
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Area chart */}
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Inscripciones mensuales
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={enrollmentData}>
                <defs>
                  <linearGradient id="colorInsc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2B7A4B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2B7A4B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [`${value}`, "Inscripciones"]}
                />
                <Area
                  type="monotone"
                  dataKey="inscripciones"
                  stroke="#2B7A4B"
                  fill="url(#colorInsc)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Row 3: Line chart + Pie chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Sesiones por semana
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={sessionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="semana" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => [`${value}`, "Sesiones"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="sesiones"
                    stroke="#2B7A4B"
                    strokeWidth={2}
                    dot={{ fill: "#2B7A4B", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Estado de perfil
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={profileData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                  >
                    {profileData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}`, "Estudiantes"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 4: Workshop bar chart */}
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Talleres - Asistencia vs Capacidad
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={workshopData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="taller" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [`${value}`, ""]}
                />
                <Bar dataKey="asistencia" name="Asistencia" fill="#2B7A4B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="capacidad" name="Capacidad" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Row 5: Funnel */}
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Funnel de conversión
            </h2>
            <div className="space-y-3">
              {funnelData.map((item) => {
                const maxVal = funnelData[0].valor;
                const pct = (item.valor / maxVal) * 100;
                return (
                  <div key={item.etapa} className="flex items-center gap-4">
                    <span className="text-sm text-[var(--gray-600)] w-44 shrink-0">
                      {item.etapa}
                    </span>
                    <div className="flex-1 bg-[var(--gray-100)] rounded-full h-7 overflow-hidden">
                      <div
                        className="h-full bg-[var(--primary)] rounded-full flex items-center justify-end pr-3 transition-all"
                        style={{ width: `${pct}%` }}
                      >
                        <span className="text-xs font-semibold text-white">
                          {item.valor}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 6: Top interests */}
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Top 5 intereses
            </h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={interestsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey="interes"
                  type="category"
                  tick={{ fontSize: 12 }}
                  width={150}
                />
                <Tooltip
                  formatter={(value) => [`${value}`, "Estudiantes"]}
                />
                <Bar dataKey="cantidad" fill="#2B7A4B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
