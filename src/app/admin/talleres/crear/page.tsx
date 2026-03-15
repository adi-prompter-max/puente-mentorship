"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_MENTORS } from "@/lib/mock-data";

const adminNav = [
  { label: "Dashboard", href: "/admin", emoji: "📊" },
  { label: "Estudiantes", href: "/admin/estudiantes", emoji: "🎓" },
  { label: "Mentores", href: "/admin/mentores", emoji: "🤝" },
  { label: "Talleres", href: "/admin/talleres", emoji: "📚" },
  { label: "Empresas", href: "/admin/empresas", emoji: "🏢" },
  { label: "Informes", href: "/admin/informes", emoji: "📈" },
];

export default function CrearTallerPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [format, setFormat] = useState<"online" | "presencial">("online");
  const [location, setLocation] = useState("");
  const [maxSpots, setMaxSpots] = useState(20);
  const [mentor, setMentor] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const selectedMentor = MOCK_MENTORS.find((m) => m.id === mentor);

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
                item.label === "Talleres"
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
          Crear Nuevo Taller
        </h1>

        {success ? (
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-8 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              Taller creado exitosamente
            </h2>
            <p className="text-[var(--gray-500)] mb-6">
              El taller ha sido registrado y los mentores han sido notificados.
            </p>
            <Link
              href="/admin"
              className="inline-block bg-[var(--primary)] text-white px-6 py-2.5 rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
            >
              Volver al panel
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 bg-white rounded-xl border border-[var(--gray-200)] p-6 space-y-5"
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Título del taller
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: CV europeo: formato y estrategia"
                  className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Descripción
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe el contenido y los objetivos del taller..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Fecha
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  required
                />
              </div>

              {/* Times */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Hora de inicio
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Hora de fin
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Formato
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="online"
                      checked={format === "online"}
                      onChange={() => setFormat("online")}
                      className="accent-[var(--primary)]"
                    />
                    <span className="text-sm">Online</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="presencial"
                      checked={format === "presencial"}
                      onChange={() => setFormat("presencial")}
                      className="accent-[var(--primary)]"
                    />
                    <span className="text-sm">Presencial</span>
                  </label>
                </div>
              </div>

              {/* Location (conditional) */}
              {format === "presencial" && (
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                    Ubicación
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej: Aula 201, Universidad Complutense de Madrid"
                    className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    required
                  />
                </div>
              )}

              {/* Max Spots */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Plazas máximas
                </label>
                <input
                  type="number"
                  value={maxSpots}
                  onChange={(e) => setMaxSpots(Number(e.target.value))}
                  min={1}
                  className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  required
                />
              </div>

              {/* Mentor */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Asignar mentor
                </label>
                <select
                  value={mentor}
                  onChange={(e) => setMentor(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white"
                  required
                >
                  <option value="">Seleccionar mentor...</option>
                  {MOCK_MENTORS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} - {m.role}, {m.company}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Etiquetas
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    placeholder="Ej: CV, Empleabilidad..."
                    className="flex-1 px-4 py-2.5 border border-[var(--gray-300)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2.5 bg-[var(--gray-200)] text-[var(--foreground)] rounded-lg text-sm hover:bg-[var(--gray-300)] transition-colors"
                  >
                    Añadir
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-green-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary)] text-white py-2.5 rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Creando taller...
                  </>
                ) : (
                  "Crear taller"
                )}
              </button>
            </form>

            {/* Preview Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 sticky top-8">
                <h2 className="text-sm font-medium text-[var(--gray-500)] mb-4 uppercase tracking-wide">
                  Vista previa
                </h2>
                <div className="border border-[var(--gray-200)] rounded-xl p-5">
                  <h3 className="font-semibold text-[var(--foreground)] mb-1">
                    {title || "Título del taller"}
                  </h3>
                  <p className="text-sm text-[var(--gray-500)] mb-3">
                    {description || "Descripción del taller..."}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[var(--gray-500)]">
                      <span>📅</span>
                      <span>
                        {date || "Fecha"} &middot;{" "}
                        {startTime || "HH:MM"} - {endTime || "HH:MM"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--gray-500)]">
                      <span>{format === "online" ? "💻" : "📍"}</span>
                      <span>
                        {format === "online"
                          ? "Online"
                          : location || "Presencial"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--gray-500)]">
                      <span>👥</span>
                      <span>0/{maxSpots} plazas</span>
                    </div>
                    {selectedMentor && (
                      <div className="flex items-center gap-2 text-[var(--gray-500)]">
                        <span>🎓</span>
                        <span>{selectedMentor.name}</span>
                      </div>
                    )}
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
