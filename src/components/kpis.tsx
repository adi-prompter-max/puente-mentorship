"use client";

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

const activityData = [
  { name: "Estudiantes", value: 30, label: "Apoyados" },
  { name: "Sesiones", value: 180, label: "De mentoría" },
  { name: "Talleres", value: 18, label: "Impartidos" },
  { name: "Empresas", value: 12, label: "Involucradas" },
];

const impactData = [
  { name: "CV y LinkedIn\nOptimizado", value: 95 },
  { name: "Prácticas\nObtenidas", value: 72 },
  { name: "Oportunidades\nLaborales", value: 45 },
  { name: "Satisfacción\n(NPS)", value: 88 },
];

const pieData = [
  { name: "Asia", value: 35 },
  { name: "África", value: 25 },
  { name: "LATAM", value: 30 },
  { name: "Otros", value: 10 },
];

const COLORS = ["#2B7A4B", "#4ade80", "#16a34a", "#86efac"];

export default function KPIs() {
  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold text-center mb-3">
        Impacto que Medimos
      </h2>
      <p className="text-center text-[var(--gray-500)] mb-12 max-w-xl mx-auto">
        KPIs de actividad e impacto para garantizar la efectividad del programa
        y reportar resultados a FUE.
      </p>

      {/* Activity KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {activityData.map((item) => (
          <div
            key={item.name}
            className="border border-[var(--gray-200)] rounded-xl p-5 text-center"
          >
            <div className="text-3xl font-bold text-[var(--primary)]">
              {item.value}
            </div>
            <p className="text-sm font-medium mt-1">{item.name}</p>
            <p className="text-xs text-[var(--gray-400)]">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Impact bar chart */}
        <div className="border border-[var(--gray-200)] rounded-xl p-6">
          <h3 className="font-semibold mb-1">KPIs de Impacto</h3>
          <p className="text-xs text-[var(--gray-400)] mb-4">
            Porcentaje de logro por métrica objetivo
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={impactData} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#737373" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#737373" }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, "Logro"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e5e5",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="value" fill="#2B7A4B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution pie chart */}
        <div className="border border-[var(--gray-200)] rounded-xl p-6">
          <h3 className="font-semibold mb-1">Distribución por Región</h3>
          <p className="text-xs text-[var(--gray-400)] mb-4">
            Origen de los estudiantes del programa
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, "Porcentaje"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e5e5",
                  fontSize: "13px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
