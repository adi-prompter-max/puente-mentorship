"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Scroll", href: "/scroll", icon: "📜" },
  { label: "Proyectos", href: "/proyectos", icon: "📁" },
  { label: "Bandeja", href: "/bandeja", icon: "📥" },
  { label: "Empleos", href: "/empleos", icon: "💼" },
  { label: "Buscar", href: "/buscar", icon: "🔍" },
  { label: "Mi Red", href: "/mi-red", icon: "🤝" },
];

export default function ConfiguracionPage() {
  const [notifications, setNotifications] = useState({
    emailSesiones: true,
    emailTalleres: true,
    emailEmpleos: false,
    comunidad: true,
    resumenSemanal: true,
  });

  const [language, setLanguage] = useState("es");

  const [privacy, setPrivacy] = useState({
    perfilPublico: true,
    mostrarBusquedas: true,
    permitirMensajes: true,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const Toggle = ({ enabled, onClick }: { enabled: boolean; onClick: () => void }) => (
    <div
      onClick={onClick}
      className={`w-12 h-7 rounded-full cursor-pointer transition-colors flex items-center px-1 ${
        enabled ? "bg-[var(--primary)]" : "bg-[var(--gray-300)]"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[var(--gray-100)]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[var(--gray-200)] flex flex-col min-h-screen">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
            Puente
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--gray-600)] hover:bg-[var(--gray-100)] hover:text-[var(--foreground)] transition-colors text-sm font-medium"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-8">Configuración</h1>

        <div className="space-y-6">
          {/* Cuenta */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Cuenta</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--gray-500)]">Correo electrónico</p>
                  <p className="text-[var(--foreground)]">priya.sharma@upm.es</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--gray-500)]">Contraseña</p>
                  <p className="text-[var(--foreground)]">••••••••</p>
                </div>
                <Link
                  href="/recuperar-contrasena"
                  className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-colors"
                >
                  Cambiar contraseña
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--gray-500)]">Nombre de usuario</p>
                  <p className="text-[var(--foreground)]">@priya.sharma</p>
                </div>
              </div>
            </div>
          </section>

          {/* Notificaciones */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Notificaciones</h2>
            <div className="space-y-4">
              {[
                { key: "emailSesiones" as const, label: "Email de sesiones" },
                { key: "emailTalleres" as const, label: "Email de talleres" },
                { key: "emailEmpleos" as const, label: "Email de empleos" },
                { key: "comunidad" as const, label: "Notificaciones de comunidad" },
                { key: "resumenSemanal" as const, label: "Resumen semanal" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-[var(--foreground)] text-sm">{item.label}</span>
                  <Toggle
                    enabled={notifications[item.key]}
                    onClick={() => toggleNotification(item.key)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Idioma */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Idioma</h2>
            <div className="space-y-3">
              {[
                { value: "es", label: "Español" },
                { value: "en", label: "English" },
                { value: "pt", label: "Português" },
              ].map((item) => (
                <label
                  key={item.value}
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setLanguage(item.value)}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      language === item.value
                        ? "border-[var(--primary)]"
                        : "border-[var(--gray-300)]"
                    }`}
                  >
                    {language === item.value && (
                      <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
                    )}
                  </div>
                  <span className="text-sm text-[var(--foreground)]">{item.label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Privacidad */}
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Privacidad</h2>
            <div className="space-y-4">
              {[
                { key: "perfilPublico" as const, label: "Perfil visible públicamente" },
                { key: "mostrarBusquedas" as const, label: "Mostrar en búsquedas" },
                { key: "permitirMensajes" as const, label: "Permitir mensajes de otros participantes" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <span className="text-[var(--foreground)] text-sm">{item.label}</span>
                  <Toggle
                    enabled={privacy[item.key]}
                    onClick={() => togglePrivacy(item.key)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Zona peligrosa */}
          <section className="bg-white rounded-2xl shadow-sm p-6 border-2 border-[var(--error)]">
            <h2 className="text-lg font-semibold text-[var(--error)] mb-4">Zona peligrosa</h2>
            {!showDeleteConfirm ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--foreground)]">Eliminar tu cuenta permanentemente</p>
                </div>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-[var(--error)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Eliminar cuenta
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-[var(--foreground)] font-medium">
                  ¿Estás seguro? Esta acción no se puede deshacer.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 border border-[var(--gray-300)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:bg-[var(--gray-100)] transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 bg-[var(--error)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Confirmar
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
