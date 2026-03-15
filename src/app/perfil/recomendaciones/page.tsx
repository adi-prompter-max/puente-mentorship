"use client";

import { useState } from "react";
import Link from "next/link";

interface Recommendation {
  id: number;
  from: string;
  initials: string;
  color: string;
  role: string;
  date: string;
  text: string;
  skills: string[];
}

const RECEIVED: Recommendation[] = [
  {
    id: 1,
    from: "Elena García",
    initials: "EG",
    color: "bg-indigo-400",
    role: "Mentora",
    date: "28 de febrero de 2026",
    text: "Priya es una estudiante excepcional con gran capacidad analítica. Su CV y perfil de LinkedIn han mejorado enormemente durante el programa.",
    skills: ["Comunicación", "Resolución de problemas"],
  },
  {
    id: 2,
    from: "Carlos Mendoza",
    initials: "CM",
    color: "bg-blue-400",
    role: "Compañero",
    date: "15 de febrero de 2026",
    text: "Excelente compañera de estudio. Siempre dispuesta a ayudar y compartir recursos.",
    skills: ["Trabajo en equipo", "React"],
  },
  {
    id: 3,
    from: "Miguel Ángel Torres",
    initials: "MT",
    color: "bg-teal-400",
    role: "Mentor",
    date: "5 de febrero de 2026",
    text: "Gran potencial técnico. Recomiendo para posiciones de desarrollo frontend junior.",
    skills: ["React", "TypeScript", "Resolución de problemas"],
  },
];

const GIVEN: Recommendation[] = [
  {
    id: 1,
    from: "Carlos Mendoza",
    initials: "CM",
    color: "bg-blue-400",
    role: "Compañero",
    date: "20 de febrero de 2026",
    text: "Carlos es un compañero muy dedicado. Su conocimiento de algoritmos y estructuras de datos es impresionante.",
    skills: ["Resolución de problemas", "Trabajo en equipo"],
  },
];

const CONTACTS = [
  { value: "elena-garcia", label: "Elena García (Mentora)" },
  { value: "miguel-torres", label: "Miguel Ángel Torres (Mentor)" },
  { value: "carlos-mendoza", label: "Carlos Mendoza (Compañero)" },
  { value: "amina-diallo", label: "Amina Diallo (Compañera)" },
  { value: "wei-zhang", label: "Wei Zhang (Compañero)" },
];

const SKILLS_OPTIONS = [
  "React",
  "TypeScript",
  "Comunicación",
  "Trabajo en equipo",
  "Resolución de problemas",
];

export default function RecomendacionesPage() {
  const [selectedPerson, setSelectedPerson] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [toast, setToast] = useState("");

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSendRequest = () => {
    if (!selectedPerson) return;
    setToast("Solicitud enviada");
    setSelectedPerson("");
    setRequestMessage("");
    setSelectedSkills([]);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="flex h-screen bg-white">
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
            { icon: "📜", label: "Scroll" },
            { icon: "📁", label: "Proyectos" },
            { icon: "📥", label: "Bandeja" },
            { icon: "💼", label: "Empleos" },
            { icon: "🔍", label: "Buscar" },
            { icon: "👥", label: "Mi Red" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--gray-500)] hover:bg-[var(--gray-100)] cursor-pointer transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-8">
            Recomendaciones
          </h1>

          {/* Section 1: Received */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Recomendaciones recibidas
            </h2>
            <div className="space-y-4">
              {RECEIVED.map((rec) => (
                <div
                  key={rec.id}
                  className="border border-[var(--gray-200)] rounded-xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full ${rec.color} flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {rec.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--foreground)]">
                        {rec.from}
                      </p>
                      <p className="text-xs text-[var(--gray-400)]">
                        {rec.role} · {rec.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--gray-500)] mb-3 italic">
                    &ldquo;{rec.text}&rdquo;
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 bg-[var(--gray-100)] text-[var(--gray-500)] text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Request */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Solicitar recomendación
            </h2>
            <div className="border border-[var(--gray-200)] rounded-xl p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Persona
                </label>
                <select
                  value={selectedPerson}
                  onChange={(e) => setSelectedPerson(e.target.value)}
                  className="w-full border border-[var(--gray-200)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] bg-white"
                >
                  <option value="">Selecciona una persona...</option>
                  {CONTACTS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                  Mensaje personalizado (opcional)
                </label>
                <textarea
                  value={requestMessage}
                  onChange={(e) => setRequestMessage(e.target.value)}
                  placeholder="Escribe un mensaje para acompañar tu solicitud..."
                  rows={3}
                  className="w-full border border-[var(--gray-200)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Habilidades a destacar
                </label>
                <div className="flex flex-wrap gap-2">
                  {SKILLS_OPTIONS.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                        className="rounded border-[var(--gray-300)] text-[var(--primary)] focus:ring-[var(--primary)]"
                      />
                      <span className="text-sm text-[var(--foreground)]">
                        {skill}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <button
                onClick={handleSendRequest}
                className="px-5 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
              >
                Enviar solicitud
              </button>
            </div>
          </section>

          {/* Section 3: Given */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
              Recomendaciones dadas
            </h2>
            <div className="space-y-4">
              {GIVEN.map((rec) => (
                <div
                  key={rec.id}
                  className="border border-[var(--gray-200)] rounded-xl p-5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full ${rec.color} flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {rec.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--foreground)]">
                        Para {rec.from}
                      </p>
                      <p className="text-xs text-[var(--gray-400)]">
                        {rec.role} · {rec.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--gray-500)] italic">
                    &ldquo;{rec.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[var(--success)] text-white px-5 py-3 rounded-xl shadow-lg text-sm font-medium z-50 animate-pulse">
          {toast}
        </div>
      )}
    </div>
  );
}
