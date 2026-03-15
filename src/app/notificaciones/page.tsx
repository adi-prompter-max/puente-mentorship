"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_NOTIFICATIONS } from "@/lib/mock-data";

const studentNav = [
  { label: "Inicio", href: "/", emoji: "🏠" },
  { label: "Mi Perfil", href: "/perfil", emoji: "👤" },
  { label: "Talleres", href: "/talleres", emoji: "📚" },
  { label: "Empresas", href: "/empresas", emoji: "🏢" },
  { label: "Sesiones", href: "/reservar-sesion", emoji: "📅" },
  { label: "Notificaciones", href: "/notificaciones", emoji: "🔔" },
];

type NotificationType = "session" | "workshop" | "job" | "community" | "profile";

interface Notification {
  type: NotificationType;
  message: string;
  time: string;
  read: boolean;
}

const allNotifications: Notification[] = [
  ...(MOCK_NOTIFICATIONS as Notification[]),
  {
    type: "session",
    message: "Tu sesión con Elena García Ruiz ha sido confirmada para el 20 de marzo",
    time: "Hace 4h",
    read: false,
  },
  {
    type: "workshop",
    message: "Recordatorio: Taller 'CV europeo: formato y estrategia' mañana a las 10:00",
    time: "Hace 6h",
    read: false,
  },
  {
    type: "job",
    message: "Accenture España ha publicado una nueva vacante de Becario/a Marketing Digital",
    time: "Hace 8h",
    read: false,
  },
  {
    type: "community",
    message: "Amina Diallo compartió un nuevo recurso en la comunidad",
    time: "Hace 12h",
    read: true,
  },
  {
    type: "session",
    message: "Elena García Ruiz ha añadido notas a tu última sesión de mentoría",
    time: "Hace 1 día",
    read: true,
  },
  {
    type: "workshop",
    message: "Quedan 3 plazas para el taller 'Networking estratégico en LinkedIn'",
    time: "Hace 1 día",
    read: true,
  },
  {
    type: "job",
    message: "Tu candidatura para Asistente de Investigación ha sido recibida",
    time: "Hace 2 días",
    read: true,
  },
  {
    type: "community",
    message: "Wei Zhang respondió a tu pregunta sobre permisos de trabajo",
    time: "Hace 2 días",
    read: true,
  },
  {
    type: "profile",
    message: "Tu perfil ha alcanzado el 30% de completado. Sube tu foto para avanzar",
    time: "Hace 3 días",
    read: true,
  },
  {
    type: "job",
    message: "Nuevas oportunidades en el sector tecnología que coinciden con tu perfil",
    time: "Hace 3 días",
    read: true,
  },
];

const filterTabs = [
  { key: "all", label: "Todas" },
  { key: "session", label: "Sesiones" },
  { key: "workshop", label: "Talleres" },
  { key: "job", label: "Empleos" },
  { key: "community", label: "Comunidad" },
];

function getIcon(type: NotificationType) {
  switch (type) {
    case "session":
      return "📅";
    case "workshop":
      return "📖";
    case "job":
      return "💼";
    case "community":
      return "👥";
    case "profile":
      return "👤";
  }
}

export default function NotificacionesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState(allNotifications);

  const filtered =
    activeFilter === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeFilter);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="flex min-h-screen bg-[var(--gray-100)]">
      {/* Student Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
        </Link>
        <nav className="space-y-1 text-sm">
          {studentNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                item.label === "Notificaciones"
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
      <main className="flex-1 p-6 lg:p-8 overflow-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            Notificaciones
          </h1>
          <button
            onClick={markAllRead}
            className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-colors"
          >
            Marcar todas como leídas
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === tab.key
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white border border-[var(--gray-200)] text-[var(--gray-600)] hover:bg-[var(--gray-100)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filtered.map((notification, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-4 rounded-xl border transition-colors ${
                notification.read
                  ? "bg-white border-[var(--gray-200)]"
                  : "bg-green-50 border-green-200"
              }`}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-[var(--gray-100)] flex items-center justify-center text-lg flex-shrink-0">
                {getIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm ${
                    notification.read
                      ? "text-[var(--gray-500)]"
                      : "text-[var(--foreground)] font-medium"
                  }`}
                >
                  {notification.message}
                </p>
                <p className="text-xs text-[var(--gray-400)] mt-1">
                  {notification.time}
                </p>
              </div>

              {/* Unread dot */}
              {!notification.read && (
                <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full flex-shrink-0 mt-1.5" />
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-[var(--gray-400)]">
              <p className="text-lg mb-1">No hay notificaciones</p>
              <p className="text-sm">
                No tienes notificaciones en esta categoría.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
