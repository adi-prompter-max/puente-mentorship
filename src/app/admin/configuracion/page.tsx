"use client";

import { useState } from "react";
import Link from "next/link";

interface Phase {
  nombre: string;
  inicio: string;
  fin: string;
  estado: "Planificada" | "Activa" | "Completada";
}

interface RequiredField {
  label: string;
  checked: boolean;
}

export default function ConfiguracionPage() {
  const [programName, setProgramName] = useState(
    "Puente - Programa de Mentoría"
  );
  const [description, setDescription] = useState(
    "Programa de mentoría para conectar estudiantes con profesionales del sector tecnológico, facilitando su inserción laboral."
  );
  const [startDate, setStartDate] = useState("2025-09-01");
  const [endDate, setEndDate] = useState("2026-06-30");

  const [phases, setPhases] = useState<Phase[]>([
    { nombre: "Inscripción y selección", inicio: "2025-09-01", fin: "2025-09-30", estado: "Completada" },
    { nombre: "Formación inicial", inicio: "2025-10-01", fin: "2025-12-31", estado: "Activa" },
    { nombre: "Mentoría intensiva", inicio: "2026-01-01", fin: "2026-04-30", estado: "Planificada" },
    { nombre: "Inserción laboral", inicio: "2026-05-01", fin: "2026-06-30", estado: "Planificada" },
  ]);

  const [maxStudents, setMaxStudents] = useState(150);
  const [maxMentors, setMaxMentors] = useState(30);
  const [studentsPerMentor, setStudentsPerMentor] = useState(5);
  const [maxWorkshopSize, setMaxWorkshopSize] = useState(25);

  const [minCompletion, setMinCompletion] = useState(70);
  const [requiredFields, setRequiredFields] = useState<RequiredField[]>([
    { label: "Nombre", checked: true },
    { label: "Foto", checked: true },
    { label: "Intereses", checked: true },
    { label: "CV", checked: false },
    { label: "LinkedIn", checked: false },
    { label: "Disponibilidad", checked: false },
  ]);

  const [googleMeet, setGoogleMeet] = useState(true);
  const [slack, setSlack] = useState(false);
  const [linkedIn, setLinkedIn] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  const handleSave = () => {
    setToast("Configuración guardada correctamente");
    setTimeout(() => setToast(null), 3000);
  };

  const updatePhase = (index: number, field: keyof Phase, value: string) => {
    setPhases((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const toggleField = (index: number) => {
    setRequiredFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, checked: !f.checked } : f))
    );
  };

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
                item.href === "/admin/configuracion"
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Configuración del Programa
          </h1>

          {/* Section 1: Program Info */}
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Información del Programa
            </h2>
            <div>
              <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
                Nombre del programa
              </label>
              <input
                type="text"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
                Descripción
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] resize-y"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
                  Fecha de fin
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Phases */}
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Fases del Programa
            </h2>
            <div className="space-y-4">
              {phases.map((phase, index) => (
                <div
                  key={index}
                  className="border border-[var(--gray-200)] rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-[var(--foreground)]">
                      Fase {index + 1}: {phase.nombre}
                    </h3>
                    <select
                      value={phase.estado}
                      onChange={(e) =>
                        updatePhase(index, "estado", e.target.value)
                      }
                      className={`text-xs font-medium px-3 py-1 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${
                        phase.estado === "Activa"
                          ? "bg-green-100 text-green-700"
                          : phase.estado === "Completada"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <option value="Planificada">Planificada</option>
                      <option value="Activa">Activa</option>
                      <option value="Completada">Completada</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[var(--gray-500)] mb-1">
                        Inicio
                      </label>
                      <input
                        type="date"
                        value={phase.inicio}
                        onChange={(e) =>
                          updatePhase(index, "inicio", e.target.value)
                        }
                        className="w-full px-3 py-1.5 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--gray-500)] mb-1">
                        Fin
                      </label>
                      <input
                        type="date"
                        value={phase.fin}
                        onChange={(e) =>
                          updatePhase(index, "fin", e.target.value)
                        }
                        className="w-full px-3 py-1.5 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Capacity */}
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Capacidad
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
                  Máximo de estudiantes
                </label>
                <input
                  type="number"
                  value={maxStudents}
                  onChange={(e) => setMaxStudents(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
                  Máximo de mentores
                </label>
                <input
                  type="number"
                  value={maxMentors}
                  onChange={(e) => setMaxMentors(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
                  Estudiantes por mentor
                </label>
                <input
                  type="number"
                  value={studentsPerMentor}
                  onChange={(e) => setStudentsPerMentor(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
                  Tamaño máximo de taller
                </label>
                <input
                  type="number"
                  value={maxWorkshopSize}
                  onChange={(e) => setMaxWorkshopSize(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Profile Requirements */}
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Requisitos de perfil
            </h2>
            <div>
              <label className="block text-sm font-medium text-[var(--gray-600)] mb-2">
                Porcentaje mínimo de completitud: {minCompletion}%
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={minCompletion}
                onChange={(e) => setMinCompletion(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--gray-600)] mb-2">
                Campos obligatorios
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {requiredFields.map((field, index) => (
                  <label
                    key={field.label}
                    className="flex items-center gap-2 text-sm text-[var(--foreground)] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={field.checked}
                      onChange={() => toggleField(index)}
                      className="rounded accent-[var(--primary)]"
                    />
                    {field.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 5: Integrations */}
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Integraciones
            </h2>
            <div className="space-y-3">
              {[
                {
                  label: "Google Meet",
                  enabled: googleMeet,
                  toggle: () => setGoogleMeet(!googleMeet),
                },
                {
                  label: "Slack",
                  enabled: slack,
                  toggle: () => setSlack(!slack),
                },
                {
                  label: "LinkedIn",
                  enabled: linkedIn,
                  toggle: () => setLinkedIn(!linkedIn),
                },
              ].map((integration) => (
                <div
                  key={integration.label}
                  className="flex items-center justify-between py-2 border-b border-[var(--gray-100)] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {integration.label}
                    </span>
                    <button
                      onClick={integration.toggle}
                      className={`relative w-10 h-5 rounded-full transition-colors ${
                        integration.enabled
                          ? "bg-[var(--primary)]"
                          : "bg-[var(--gray-300)]"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                          integration.enabled ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <Link
                    href="#"
                    className="text-sm text-[var(--primary)] hover:underline"
                  >
                    Configurar
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Maintenance */}
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Mantenimiento
            </h2>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--gray-200)] text-[var(--foreground)] hover:bg-[var(--gray-100)] transition-colors">
                Exportar datos
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--gray-200)] text-[var(--foreground)] hover:bg-[var(--gray-100)] transition-colors">
                Limpiar sesiones expiradas
              </button>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-sm font-medium text-[var(--foreground)]">
                Modo mantenimiento
              </span>
              <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  maintenanceMode
                    ? "bg-[var(--error)]"
                    : "bg-[var(--gray-300)]"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                    maintenanceMode ? "translate-x-5" : ""
                  }`}
                />
              </button>
              {maintenanceMode && (
                <span className="text-xs text-[var(--error)]">
                  El sitio no será accesible para los usuarios
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Sticky save button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--gray-200)] p-4 flex justify-end z-40">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 text-sm font-medium rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors"
        >
          Guardar cambios
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-16 right-6 bg-[var(--foreground)] text-white px-5 py-3 rounded-lg shadow-lg text-sm z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
