"use client";

import { useState } from "react";
import Link from "next/link";

interface EmailTemplate {
  id: number;
  nombre: string;
  trigger: string;
  estado: "Activa" | "Pausada";
  enviados: number;
  asunto: string;
  cuerpo: string;
}

const templates: EmailTemplate[] = [
  {
    id: 1,
    nombre: "Bienvenida al programa",
    trigger: "Al registrarse",
    estado: "Activa",
    enviados: 127,
    asunto: "¡Bienvenido/a a Puente, {{nombre}}!",
    cuerpo:
      "Hola {{nombre}},\n\nNos alegra mucho que te hayas unido a Puente. Tu registro se ha completado con éxito.\n\nTu próximo paso es completar tu perfil para que podamos asignarte un mentor adecuado.\n\nFecha de registro: {{fecha}}\n\nSi tienes preguntas, no dudes en contactarnos.\n\n¡Bienvenido/a al programa!",
  },
  {
    id: 2,
    nombre: "Recordatorio de sesión",
    trigger: "24h antes de sesión",
    estado: "Activa",
    enviados: 384,
    asunto: "Recordatorio: Sesión de mentoría mañana - {{fecha}}",
    cuerpo:
      "Hola {{nombre}},\n\nTe recordamos que tienes una sesión de mentoría programada con {{mentor}} para mañana {{fecha}}.\n\nPrepara tus preguntas y revisa los objetivos de la sesión anterior.\n\n¡Nos vemos!",
  },
  {
    id: 3,
    nombre: "Nuevo taller disponible",
    trigger: "Al crear taller",
    estado: "Activa",
    enviados: 98,
    asunto: "Nuevo taller: {{taller}} - ¡Inscríbete!",
    cuerpo:
      "Hola {{nombre}},\n\nTenemos un nuevo taller disponible que puede interesarte:\n\nTaller: {{taller}}\nFecha: {{fecha}}\n\nLas plazas son limitadas, ¡inscríbete cuanto antes!\n\nSaludos,\nEquipo Puente",
  },
  {
    id: 4,
    nombre: "Perfil incompleto",
    trigger: "7 días sin completar",
    estado: "Activa",
    enviados: 45,
    asunto: "{{nombre}}, completa tu perfil en Puente",
    cuerpo:
      "Hola {{nombre}},\n\nHemos notado que tu perfil aún no está completo. Un perfil completo nos ayuda a encontrar el mentor perfecto para ti.\n\nTe faltan algunos campos importantes. Accede a tu perfil y complétalo para avanzar en el programa.\n\nContacto: {{email}}\n\n¡Te esperamos!",
  },
  {
    id: 5,
    nombre: "Resumen semanal",
    trigger: "Cada lunes",
    estado: "Pausada",
    enviados: 210,
    asunto: "Tu resumen semanal de Puente - {{fecha}}",
    cuerpo:
      "Hola {{nombre}},\n\nAquí tienes tu resumen semanal del programa Puente.\n\nRevisa tu progreso, próximas sesiones con {{mentor}} y talleres disponibles.\n\nFecha del informe: {{fecha}}\n\n¡Sigue así!",
  },
  {
    id: 6,
    nombre: "Certificado de taller",
    trigger: "Al completar taller",
    estado: "Activa",
    enviados: 156,
    asunto: "¡Felicidades {{nombre}}! Certificado de {{taller}}",
    cuerpo:
      "Hola {{nombre}},\n\n¡Enhorabuena por completar el taller {{taller}}!\n\nTu certificado está disponible para descargar desde tu perfil.\n\nFecha de finalización: {{fecha}}\n\n¡Sigue aprendiendo con Puente!",
  },
];

const variableChips = [
  "{{nombre}}",
  "{{email}}",
  "{{fecha}}",
  "{{mentor}}",
  "{{taller}}",
];

export default function EmailsPage() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editSubject, setEditSubject] = useState("");
  const [editBody, setEditBody] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const handleEdit = (template: EmailTemplate) => {
    if (editingId === template.id) {
      setEditingId(null);
      return;
    }
    setEditingId(template.id);
    setEditSubject(template.asunto);
    setEditBody(template.cuerpo);
  };

  const handleSave = () => {
    setToast("Cambios guardados correctamente");
    setTimeout(() => setToast(null), 3000);
    setEditingId(null);
  };

  const handleTestSend = () => {
    setToast("Email de prueba enviado a admin@puente.io");
    setTimeout(() => setToast(null), 3000);
  };

  const insertVariable = (variable: string) => {
    setEditBody((prev) => prev + variable);
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
                item.href === "/admin/emails"
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
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Plantillas de Email
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl border border-[var(--gray-200)] p-5 flex flex-col"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-[var(--foreground)]">
                    {template.nombre}
                  </h3>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      template.estado === "Activa"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {template.estado}
                  </span>
                </div>
                <p className="text-sm text-[var(--gray-500)] mb-1">
                  Trigger: {template.trigger}
                </p>
                <p className="text-xs text-[var(--gray-400)] mb-4">
                  {template.enviados} enviados
                </p>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleEdit(template)}
                    className="flex-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-[var(--gray-200)] text-[var(--foreground)] hover:bg-[var(--gray-100)] transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(template.id);
                      setEditSubject(template.asunto);
                      setEditBody(template.cuerpo);
                    }}
                    className="flex-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-[var(--gray-200)] text-[var(--gray-500)] hover:bg-[var(--gray-100)] transition-colors"
                  >
                    Vista previa
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Inline editor */}
          {editingId !== null && (
            <div className="bg-white rounded-xl border border-[var(--gray-200)] p-6 space-y-4">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Editar plantilla:{" "}
                {templates.find((t) => t.id === editingId)?.nombre}
              </h2>

              <div>
                <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
                  Asunto
                </label>
                <input
                  type="text"
                  value={editSubject}
                  onChange={(e) => setEditSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--gray-600)] mb-1">
                  Cuerpo del email
                </label>
                <textarea
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--gray-600)] mb-2">
                  Variables disponibles
                </label>
                <div className="flex flex-wrap gap-2">
                  {variableChips.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => insertVariable(chip)}
                      className="px-3 py-1 text-xs font-mono bg-[var(--gray-100)] border border-[var(--gray-200)] rounded-full text-[var(--gray-600)] hover:bg-[var(--gray-200)] transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="px-5 py-2 text-sm font-medium rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors"
                >
                  Guardar cambios
                </button>
                <button
                  onClick={handleTestSend}
                  className="px-5 py-2 text-sm font-medium rounded-lg border border-[var(--gray-200)] text-[var(--foreground)] hover:bg-[var(--gray-100)] transition-colors"
                >
                  Enviar prueba
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[var(--foreground)] text-white px-5 py-3 rounded-lg shadow-lg text-sm animate-fade-in z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
