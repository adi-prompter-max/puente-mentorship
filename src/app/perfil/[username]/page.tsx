"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MOCK_USER,
  MOCK_MENTORS,
  MOCK_UPCOMING_SESSIONS,
  MOCK_JOBS,
  MOCK_ACTIVITY,
  MOCK_MESSAGES,
  MOCK_NOTIFICATIONS,
  MOCK_WORKSHOPS,
  MOCK_STUDENTS,
} from "@/lib/mock-data";

const RESOURCES = [
  { name: "LinkedIn", color: "bg-blue-100 text-blue-700" },
  { name: "InfoJobs", color: "bg-orange-100 text-orange-700" },
  { name: "Indeed", color: "bg-purple-100 text-purple-700" },
  { name: "Fundación Universidad-Empresa", color: "bg-green-100 text-green-700" },
  { name: "SEPE", color: "bg-red-100 text-red-700" },
  { name: "Trabajo.gob.es", color: "bg-yellow-100 text-yellow-700" },
  { name: "Erasmus+", color: "bg-indigo-100 text-indigo-700" },
  { name: "Santander Becas", color: "bg-pink-100 text-pink-700" },
];

const COMPLETION_ITEMS = [
  { label: "Perfil básico (Nombre)", done: true },
  { label: "Foto de perfil", done: true },
  { label: "Intereses (mín. 3)", done: true },
  { label: "URL de LinkedIn", done: false },
  { label: "Subir CV", done: false },
  { label: "Preferencias laborales (5%)", done: false },
  { label: "Disponibilidad horaria", done: false },
  { label: "Añadir experiencia / proyectos (10%)", done: false },
];

type Tab = "plan" | "about" | "mentors" | "activity" | "messages";

export default function ProfilePage() {
  const params = useParams();
  const username = (params.username as string) || MOCK_USER.username;
  const [showReadyModal, setShowReadyModal] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [showNotifications, setShowNotifications] = useState(false);

  const completionPercent = MOCK_USER.completionPercent;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://puente.io/${username}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { label: string; key: Tab }[] = [
    { label: "MI PLAN", key: "plan" },
    { label: "SOBRE MÍ", key: "about" },
    { label: "MENTORES", key: "mentors" },
    { label: "ACTIVIDAD", key: "activity" },
    { label: "BANDEJA", key: "messages" },
  ];

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
        </div>
        <nav className="space-y-1 text-sm">
          {[
            { icon: "📜", label: "Scroll", tab: "activity" as Tab },
            { icon: "📁", label: "Proyectos", tab: "plan" as Tab },
            { icon: "📥", label: "Bandeja", tab: "messages" as Tab, badge: unreadCount },
            { icon: "💼", label: "Empleos", tab: "plan" as Tab },
            { icon: "🔍", label: "Buscar", tab: "plan" as Tab },
            { icon: "👥", label: "Mi Red", tab: "mentors" as Tab },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                activeTab === item.tab
                  ? "bg-[var(--gray-100)] text-[var(--foreground)] font-medium"
                  : "text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
              }`}
            >
              <span>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="bg-[var(--primary)] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-8 space-y-1 text-sm">
          <button
            onClick={() => setActiveTab("about")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--gray-100)] font-medium cursor-pointer text-left"
          >
            <span className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
              {MOCK_USER.firstName.charAt(0)}{MOCK_USER.lastName.charAt(0)}
            </span>
            <span>{MOCK_USER.firstName}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 max-w-3xl mx-auto px-8 pt-8 pb-16">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-medium">{MOCK_USER.firstName} {MOCK_USER.lastName}</span>
            <Link
              href="#"
              className="text-[var(--gray-400)] hover:text-[var(--foreground)] transition-colors"
            >
              Editar perfil
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {/* Notifications bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-[var(--gray-100)] rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-[var(--gray-500)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[var(--error)] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-[var(--gray-200)] rounded-xl shadow-lg z-50">
                  <div className="p-3 border-b border-[var(--gray-200)]">
                    <h4 className="text-sm font-semibold">Notificaciones</h4>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {MOCK_NOTIFICATIONS.map((notif, i) => (
                      <div
                        key={i}
                        className={`px-3 py-2.5 border-b border-[var(--gray-100)] last:border-0 ${
                          !notif.read ? "bg-[var(--primary)]/5" : ""
                        }`}
                      >
                        <p className="text-sm text-[var(--gray-600)]">{notif.message}</p>
                        <p className="text-xs text-[var(--gray-400)] mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Buscar en Puente"
              className="border border-[var(--gray-200)] rounded-lg px-3 py-1.5 text-sm w-48 outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>
        </div>

        {/* Profile header */}
        <div className="flex items-start gap-5 mb-6">
          <div className="w-24 h-24 bg-[var(--primary)]/10 rounded-full flex items-center justify-center border-2 border-[var(--gray-200)] flex-shrink-0">
            <span className="text-3xl font-bold text-[var(--primary)]">
              {MOCK_USER.firstName.charAt(0)}{MOCK_USER.lastName.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{MOCK_USER.firstName} {MOCK_USER.lastName}</h1>
            <p className="text-[var(--gray-500)] text-sm mt-0.5">
              {MOCK_USER.bio}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-xs text-[var(--gray-400)]">
                <div className="w-3 h-3 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <span className="text-white text-[6px] font-bold">P</span>
                </div>
                Miembro desde {MOCK_USER.memberSince}
              </div>
              <span className="text-xs text-[var(--gray-400)]">
                {MOCK_USER.university}
              </span>
            </div>
          </div>
        </div>

        {/* Interests tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {MOCK_USER.interests.map((interest) => (
            <span
              key={interest}
              className="text-xs px-3 py-1.5 bg-[var(--gray-100)] rounded-full text-[var(--gray-600)]"
            >
              {interest}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-[var(--gray-200)] mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-xs font-semibold tracking-wide transition-colors ${
                activeTab === tab.key
                  ? "text-[var(--foreground)] border-b-2 border-[var(--foreground)]"
                  : "text-[var(--gray-400)] hover:text-[var(--gray-600)]"
              }`}
            >
              {tab.label}
              {tab.key === "messages" && unreadCount > 0 && (
                <span className="ml-1.5 bg-[var(--primary)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Tab: MI PLAN ─────────────────────────────────────── */}
        {activeTab === "plan" && (
          <>
            {/* Upcoming sessions */}
            <h3 className="text-sm font-semibold mb-4">Próximas sesiones:</h3>
            <div className="space-y-3 mb-8">
              {MOCK_UPCOMING_SESSIONS.map((session, i) => (
                <div
                  key={i}
                  className="border border-[var(--gray-200)] rounded-xl p-4 hover:border-[var(--primary)] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          session.type === "Mentoría 1:1"
                            ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                            : session.type === "Taller Grupal"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-orange-50 text-orange-600"
                        }`}>
                          {session.type}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          session.status === "confirmed"
                            ? "bg-green-50 text-green-600"
                            : session.status === "registered"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-[var(--gray-100)] text-[var(--gray-500)]"
                        }`}>
                          {session.status === "confirmed" ? "Confirmada" : session.status === "registered" ? "Inscrito/a" : "Abierta"}
                        </span>
                      </div>
                      <p className="font-medium text-sm">{session.topic}</p>
                      {session.mentor && (
                        <p className="text-xs text-[var(--gray-500)] mt-0.5">con {session.mentor}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">{session.date}</p>
                      <p className="text-xs text-[var(--gray-400)]">{session.time}</p>
                      <p className="text-[10px] text-[var(--gray-400)] mt-0.5">{session.format}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resources */}
            <h3 className="text-sm font-semibold mb-4">
              Recursos para tu búsqueda:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {RESOURCES.map((resource) => (
                <div
                  key={resource.name}
                  className="flex items-center gap-2 rounded-lg border border-[var(--gray-200)] px-3 py-2.5 text-xs font-medium cursor-pointer hover:shadow-sm transition-shadow"
                >
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${resource.color}`}
                  >
                    {resource.name.charAt(0)}
                  </span>
                  <span className="truncate">{resource.name}</span>
                  <span className="ml-auto text-[var(--gray-400)]">+</span>
                </div>
              ))}
            </div>

            {/* Upcoming workshops */}
            <h3 className="text-sm font-semibold mb-4">Próximos talleres:</h3>
            <div className="space-y-3 mb-8">
              {MOCK_WORKSHOPS.slice(0, 3).map((workshop, i) => (
                <div
                  key={i}
                  className="border border-[var(--gray-200)] rounded-xl p-4 hover:border-[var(--primary)] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{workshop.title}</p>
                      <p className="text-xs text-[var(--gray-500)] mt-0.5">{workshop.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {workshop.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 bg-[var(--gray-100)] rounded-full text-[var(--gray-600)]">
                            {tag}
                          </span>
                        ))}
                        <span className="text-[10px] text-[var(--gray-400)]">
                          {workshop.spots}/{workshop.maxSpots} plazas
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-xs font-medium">{workshop.date}</p>
                      <p className="text-xs text-[var(--gray-400)]">{workshop.time}</p>
                      <p className="text-[10px] text-[var(--gray-400)] mt-0.5">{workshop.format}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 text-sm text-[var(--gray-500)] hover:text-[var(--foreground)] transition-colors">
              <span className="w-5 h-5 rounded-full border border-dashed border-[var(--gray-300)] flex items-center justify-center text-xs">
                +
              </span>
              Añadir experiencia o proyecto
            </button>
          </>
        )}

        {/* ── Tab: SOBRE MÍ ────────────────────────────────────── */}
        {activeTab === "about" && (
          <>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">Biografía</h3>
                <p className="text-sm text-[var(--gray-600)] leading-relaxed">
                  {MOCK_USER.bio}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-[var(--gray-200)] rounded-xl p-4">
                  <p className="text-xs text-[var(--gray-400)] mb-1">Universidad</p>
                  <p className="text-sm font-medium">{MOCK_USER.university}</p>
                </div>
                <div className="border border-[var(--gray-200)] rounded-xl p-4">
                  <p className="text-xs text-[var(--gray-400)] mb-1">Región de origen</p>
                  <p className="text-sm font-medium">{MOCK_USER.region}</p>
                </div>
                <div className="border border-[var(--gray-200)] rounded-xl p-4">
                  <p className="text-xs text-[var(--gray-400)] mb-1">Miembro desde</p>
                  <p className="text-sm font-medium">{MOCK_USER.memberSince}</p>
                </div>
                <div className="border border-[var(--gray-200)] rounded-xl p-4">
                  <p className="text-xs text-[var(--gray-400)] mb-1">Perfil completado</p>
                  <p className="text-sm font-medium">{MOCK_USER.completionPercent}%</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3">Intereses y objetivos</h3>
                <div className="flex flex-wrap gap-2">
                  {MOCK_USER.interests.map((interest) => (
                    <span
                      key={interest}
                      className="text-xs px-3 py-1.5 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Compañeros del programa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MOCK_STUDENTS.slice(0, 4).map((student) => (
                    <div
                      key={student.name}
                      className="flex items-center gap-3 border border-[var(--gray-200)] rounded-xl p-3 hover:border-[var(--primary)] transition-colors cursor-pointer"
                    >
                      <div className={`w-10 h-10 ${student.color} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {student.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{student.name}</p>
                        <p className="text-xs text-[var(--gray-400)] truncate">{student.field} · {student.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── Tab: MENTORES ────────────────────────────────────── */}
        {activeTab === "mentors" && (
          <>
            <h3 className="text-sm font-semibold mb-4">Tu mentor asignado</h3>
            <div className="border-2 border-[var(--primary)]/30 bg-[var(--primary)]/5 rounded-xl p-5 mb-8">
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 ${MOCK_MENTORS[0].color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {MOCK_MENTORS[0].avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{MOCK_MENTORS[0].name}</h4>
                  <p className="text-sm text-[var(--gray-500)]">
                    {MOCK_MENTORS[0].role} · {MOCK_MENTORS[0].company}
                  </p>
                  <p className="text-xs text-[var(--gray-500)] mt-2">{MOCK_MENTORS[0].bio}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-[var(--gray-400)]">
                      {MOCK_MENTORS[0].sessionsCompleted} sesiones
                    </span>
                    <span className="text-xs text-[var(--gray-400)]">
                      ★ {MOCK_MENTORS[0].rating}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {MOCK_MENTORS[0].specialties.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 bg-white rounded-full text-[var(--gray-600)] border border-[var(--gray-200)]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-semibold mb-4">Otros mentores del programa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_MENTORS.slice(1).map((mentor) => (
                <div
                  key={mentor.name}
                  className="border border-[var(--gray-200)] rounded-xl p-4 hover:border-[var(--primary)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${mentor.color} rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                      {mentor.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{mentor.name}</p>
                      <p className="text-xs text-[var(--gray-400)]">{mentor.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--gray-500)] mb-2">{mentor.bio}</p>
                  <div className="flex items-center gap-3 text-xs text-[var(--gray-400)]">
                    <span>{mentor.sessionsCompleted} sesiones</span>
                    <span>★ {mentor.rating}</span>
                    <span>{mentor.company}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {mentor.specialties.map((s) => (
                      <span key={s} className="text-[10px] px-2 py-0.5 bg-[var(--gray-100)] rounded-full text-[var(--gray-600)]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Tab: ACTIVIDAD (Scroll) ──────────────────────────── */}
        {activeTab === "activity" && (
          <>
            <div className="space-y-4">
              {MOCK_ACTIVITY.map((item, i) => (
                <div
                  key={i}
                  className="border border-[var(--gray-200)] rounded-xl p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                      {item.avatar}
                    </div>
                    <div>
                      <span className="text-sm font-medium">{item.user}</span>
                      <span className="text-sm text-[var(--gray-400)]"> {item.action}</span>
                    </div>
                    <span className="text-xs text-[var(--gray-400)] ml-auto">{item.time}</span>
                  </div>
                  <p className="text-sm text-[var(--gray-600)] leading-relaxed ml-11">
                    {item.content}
                  </p>
                  <div className="flex items-center gap-4 ml-11 mt-3">
                    <button className="flex items-center gap-1 text-xs text-[var(--gray-400)] hover:text-[var(--primary)] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {item.likes}
                    </button>
                    <button className="flex items-center gap-1 text-xs text-[var(--gray-400)] hover:text-[var(--primary)] transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {item.comments}
                    </button>
                    <button className="text-xs text-[var(--gray-400)] hover:text-[var(--primary)] transition-colors">
                      Compartir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Tab: BANDEJA (Messages) ──────────────────────────── */}
        {activeTab === "messages" && (
          <>
            <div className="space-y-2">
              {MOCK_MESSAGES.map((msg, i) => (
                <div
                  key={i}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                    msg.unread
                      ? "border-[var(--primary)]/30 bg-[var(--primary)]/5"
                      : "border-[var(--gray-200)] hover:border-[var(--gray-400)]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 ${msg.color} rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm ${msg.unread ? "font-semibold" : "font-medium"}`}>
                          {msg.from}
                        </p>
                        <span className="text-xs text-[var(--gray-400)] flex-shrink-0 ml-2">{msg.time}</span>
                      </div>
                      <p className={`text-sm ${msg.unread ? "font-medium" : "text-[var(--gray-600)]"}`}>
                        {msg.subject}
                      </p>
                      <p className="text-xs text-[var(--gray-400)] mt-0.5 truncate">
                        {msg.preview}
                      </p>
                    </div>
                    {msg.unread && (
                      <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Right sidebar - Completion + Jobs */}
      <aside className="hidden xl:block w-72 border-l border-[var(--gray-200)] p-5 pt-8 flex-shrink-0">
        <div className="bg-[var(--primary)]/5 border border-[var(--primary)]/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-2xl font-bold text-[var(--primary)]">
              {completionPercent}%
            </span>
          </div>
          <p className="text-xs font-medium text-[var(--gray-600)] mb-1">
            PERFIL COMPLETADO
          </p>
          <div className="w-full h-2 bg-white rounded-full mb-4">
            <div
              className="h-2 bg-[var(--primary)] rounded-full transition-all"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <p className="text-xs text-[var(--gray-500)] mb-4">
            Tu perfil necesita estar al menos al 70% para ser visible y acceder
            al matching con empresas.
          </p>
          <div className="space-y-2.5">
            {COMPLETION_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-2 text-xs"
              >
                {item.done ? (
                  <svg
                    className="w-4 h-4 text-[var(--success)] flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-[var(--gray-300)] flex-shrink-0 mt-0.5" />
                )}
                <span
                  className={
                    item.done
                      ? "text-[var(--gray-400)] line-through"
                      : "text-[var(--foreground)]"
                  }
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Open roles section */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-[var(--gray-500)] mb-3">
            Oportunidades abiertas
          </h4>
          <div className="space-y-3">
            {MOCK_JOBS.slice(0, 4).map((job) => (
              <div
                key={job.role}
                className="border border-[var(--gray-200)] rounded-lg p-3 hover:border-[var(--gray-400)] cursor-pointer transition-colors"
              >
                <p className="text-sm font-medium">{job.role}</p>
                <p className="text-xs text-[var(--gray-500)] mt-0.5">
                  {job.company} · {job.location}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="inline-block text-[10px] px-2 py-0.5 bg-[var(--gray-100)] rounded-full text-[var(--gray-600)]">
                    {job.type}
                  </span>
                  <span className="text-[10px] text-[var(--gray-400)]">
                    {job.salary}
                  </span>
                </div>
                <p className="text-[10px] text-[var(--gray-400)] mt-1">
                  {job.posted} · Cierre: {job.deadline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Profile ready modal */}
      {showReadyModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
             <div className="max-h-[90vh] overflow-y-auto">
              {/* Gradient header */}
              <div className="relative h-24 bg-gradient-to-r from-[var(--primary)] via-emerald-400 to-teal-300">
                <button
                  type="button"
                  onClick={() => setShowReadyModal(false)}
                  className="absolute top-3 right-3 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center text-[var(--gray-600)] hover:bg-white transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="px-8 pb-8 -mt-6">
                {/* Share URL */}
                <div className="bg-white border border-[var(--gray-200)] rounded-xl p-4 shadow-sm mb-2">
                  <p className="text-xs text-[var(--gray-500)] mb-2 text-center">
                    Añade y comparte tu URL de Puente en tus redes sociales.
                  </p>
                  <div className="flex items-center gap-2 bg-[var(--gray-100)] rounded-lg px-3 py-2">
                    <span className="text-sm text-[var(--gray-600)] truncate flex-1">
                      https://puente.io/{username}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-xs text-[var(--primary)] font-medium hover:underline flex-shrink-0"
                    >
                      {copied ? "¡Copiado!" : "Copiar"}
                    </button>
                  </div>
                  <div className="flex justify-center gap-3 mt-3">
                    {["LinkedIn", "WhatsApp", "X"].map((platform) => (
                      <button
                        key={platform}
                        className="w-8 h-8 rounded-full bg-[var(--gray-100)] flex items-center justify-center text-xs text-[var(--gray-600)] hover:bg-[var(--gray-200)] transition-colors"
                      >
                        {platform.charAt(0)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* What's next */}
                <h3 className="text-center font-bold text-lg mt-5 mb-4">
                  ¡Tu perfil está listo! ¿Qué sigue?
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "🎓", title: "Solicitar mentor", desc: "Te asignamos un profesional que guiará tu camino laboral.", tab: "mentors" as Tab },
                    { icon: "👥", title: "Compañeros del programa", desc: "Conecta con otros estudiantes internacionales como tú.", tab: "about" as Tab },
                    { icon: "📅", title: "Próximos talleres", desc: "CV europeo, entrevistas, regulaciones migratorias y más.", tab: "plan" as Tab },
                    { icon: "💼", title: "Empresas colaboradoras", desc: "Explora empresas abiertas a contratar talento no-UE.", tab: "plan" as Tab },
                    { icon: "📥", title: "Bandeja", desc: "Comunícate con tu mentor y otros participantes.", tab: "messages" as Tab },
                    { icon: "📜", title: "Scroll", desc: "Comparte tu progreso, recursos o haz preguntas.", tab: "activity" as Tab },
                  ].map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => {
                        setShowReadyModal(false);
                        setActiveTab(item.tab);
                      }}
                      className="border border-[var(--gray-200)] rounded-xl p-4 text-left hover:border-[var(--primary)] hover:shadow-sm transition-all group"
                    >
                      <span className="text-lg mb-1 block">{item.icon}</span>
                      <p className="text-sm font-semibold mb-1">{item.title}</p>
                      <p className="text-xs text-[var(--gray-400)]">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
             </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
