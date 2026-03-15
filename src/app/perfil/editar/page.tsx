"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_USER } from "@/lib/mock-data";

const REGIONS = ["Asia", "África", "Latinoamérica", "Oriente Medio", "Europa no UE", "Otro"];
const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export default function EditProfilePage() {
  const [firstName, setFirstName] = useState(MOCK_USER.firstName);
  const [lastName, setLastName] = useState(MOCK_USER.lastName);
  const [bio, setBio] = useState(MOCK_USER.bio);
  const [region, setRegion] = useState(MOCK_USER.region);
  const [university, setUniversity] = useState(MOCK_USER.university);
  const [linkedin, setLinkedin] = useState("");
  const [availability, setAvailability] = useState<{ times: string[]; days: string[] }>({
    times: [],
    days: [],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  const toggleTime = (time: string) => {
    setAvailability((prev) => ({
      ...prev,
      times: prev.times.includes(time)
        ? prev.times.filter((t) => t !== time)
        : [...prev.times, time],
    }));
  };

  const toggleDay = (day: string) => {
    setAvailability((prev) => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter((d) => d !== day)
        : [...prev.days, day],
    }));
  };

  const completionItems = [
    { label: "Nombre completo", done: !!firstName && !!lastName },
    { label: "Biografía", done: !!bio },
    { label: "Región", done: !!region },
    { label: "Universidad", done: !!university },
    { label: "URL de LinkedIn", done: !!linkedin },
    { label: "Disponibilidad", done: availability.times.length > 0 && availability.days.length > 0 },
  ];
  const completedCount = completionItems.filter((i) => i.done).length;
  const completionPercent = Math.round((completedCount / completionItems.length) * 100);

  const handleSave = () => {
    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-white text-[var(--foreground)]">
      {/* Left sidebar */}
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
      <main className="flex-1 max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>

        {/* Photo upload */}
        <div className="flex justify-center mb-8">
          <button
            className="w-24 h-24 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-2xl font-bold cursor-pointer hover:bg-[var(--primary-hover)] transition-colors relative group"
            title="Haz clic para cambiar tu foto"
          >
            {initials}
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs">Cambiar</span>
            </div>
          </button>
        </div>

        {/* Name fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
              Apellido
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
            />
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
            Biografía
          </label>
          <textarea
            value={bio}
            onChange={(e) => {
              if (e.target.value.length <= 120) setBio(e.target.value);
            }}
            rows={3}
            className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
          />
          <p className="text-xs text-[var(--gray-400)] text-right">
            {bio.length}/120 caracteres
          </p>
        </div>

        {/* Region */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
            Región de origen
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* University */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
            Universidad
          </label>
          <input
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          />
        </div>

        {/* LinkedIn */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
            URL de LinkedIn
          </label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/tu-perfil"
            className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
          />
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[var(--gray-600)] mb-3">Disponibilidad</h3>
          <div className="mb-3">
            <p className="text-xs text-[var(--gray-400)] mb-2">Horario preferido</p>
            <div className="flex gap-2">
              {["Mañanas", "Tardes", "Noches"].map((time) => (
                <button
                  key={time}
                  onClick={() => toggleTime(time)}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                    availability.times.includes(time)
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "border-[var(--gray-200)] text-[var(--gray-500)] hover:border-[var(--primary)]"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-[var(--gray-400)] mb-2">Días de la semana</p>
            <div className="flex gap-2 flex-wrap">
              {DAYS.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    availability.days.includes(day)
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "border-[var(--gray-200)] text-[var(--gray-500)] hover:border-[var(--primary)]"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </button>

        {saved && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-[var(--success)] text-center font-medium">
            Perfil actualizado correctamente
          </div>
        )}
      </main>

      {/* Right sidebar - Completion */}
      <aside className="hidden xl:block w-72 border-l border-[var(--gray-200)] p-6 pt-8 flex-shrink-0">
        <h3 className="text-sm font-semibold mb-4">Perfil completado</h3>

        {/* Progress circle */}
        <div className="flex justify-center mb-6">
          <div className="relative w-28 h-28">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--gray-200)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - completionPercent / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">{completionPercent}%</span>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          {completionItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  item.done
                    ? "bg-[var(--primary)] text-white"
                    : "border-2 border-[var(--gray-300)]"
                }`}
              >
                {item.done && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={item.done ? "text-[var(--gray-600)]" : "text-[var(--gray-400)]"}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
