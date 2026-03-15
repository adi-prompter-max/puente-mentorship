"use client";

import { useState } from "react";
import Link from "next/link";

interface CalendarEvent {
  day: number;
  month: number;
  title: string;
  time: string;
  type: "mentoria" | "taller" | "evento";
  location: string;
  link: string;
  linkLabel: string;
}

const events: CalendarEvent[] = [
  { day: 20, month: 2, title: "Mentoría 1:1 con Elena", time: "10:00 - 11:00", type: "mentoria", location: "Videollamada (Google Meet)", link: "/mentores/elena-garcia", linkLabel: "Ver mentor" },
  { day: 22, month: 2, title: "Taller: CV europeo", time: "16:00 - 18:00", type: "taller", location: "Online (Zoom)", link: "/talleres", linkLabel: "Ver taller" },
  { day: 29, month: 2, title: "Taller: Regulaciones migratorias", time: "17:00 - 19:00", type: "taller", location: "Online (Zoom)", link: "/talleres", linkLabel: "Ver taller" },
  { day: 5, month: 3, title: "Taller: Networking LinkedIn", time: "16:00 - 18:00", type: "taller", location: "Online (Zoom)", link: "/talleres", linkLabel: "Ver taller" },
  { day: 8, month: 3, title: "Speed Networking", time: "18:00 - 20:00", type: "evento", location: "Presencial - Madrid Hub", link: "/eventos", linkLabel: "Ver evento" },
  { day: 12, month: 3, title: "Taller: Entrevistas técnicas", time: "16:00 - 18:00", type: "taller", location: "Online (Zoom)", link: "/talleres", linkLabel: "Ver taller" },
];

const dotColor: Record<string, string> = {
  mentoria: "bg-green-500",
  taller: "bg-blue-500",
  evento: "bg-orange-500",
};

const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Monday=0
}

const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export default function CalendarioPage() {
  const [currentMonth, setCurrentMonth] = useState(2); // March 2026
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);

  const eventsForMonth = events.filter((e) => e.month === currentMonth);
  const eventsForDay = selectedDay !== null ? eventsForMonth.filter((e) => e.day === selectedDay) : [];

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
  };

  const goToToday = () => {
    setCurrentMonth(2);
    setCurrentYear(2026);
    setSelectedDay(15);
  };

  const today = { day: 15, month: 2, year: 2026 };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="flex min-h-screen bg-[var(--gray-100)]">
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
        </Link>
        <nav className="space-y-1 text-sm">
          {[{icon: "📜", label: "Scroll"}, {icon: "📅", label: "Calendario"}, {icon: "📥", label: "Bandeja"}, {icon: "💼", label: "Empleos"}, {icon: "🔍", label: "Buscar"}, {icon: "👥", label: "Mi Red"}].map(item => (
            <div key={item.label} className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--gray-500)] hover:bg-[var(--gray-100)] cursor-pointer transition-colors">
              <span>{item.icon}</span><span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">Mi Calendario</h1>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="px-3 py-1.5 rounded-lg border border-[var(--gray-300)] text-sm hover:bg-[var(--gray-100)] transition-colors">
              ← {monthNames[currentMonth === 0 ? 11 : currentMonth - 1]} {currentMonth === 0 ? currentYear - 1 : currentYear}
            </button>
            <span className="px-4 py-1.5 font-semibold text-[var(--foreground)]">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button onClick={nextMonth} className="px-3 py-1.5 rounded-lg border border-[var(--gray-300)] text-sm hover:bg-[var(--gray-100)] transition-colors">
              {monthNames[currentMonth === 11 ? 0 : currentMonth + 1]} {currentMonth === 11 ? currentYear + 1 : currentYear} →
            </button>
          </div>
          <button onClick={goToToday} className="px-4 py-1.5 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors">
            Hoy
          </button>
        </div>

        <div className="bg-white rounded-xl border border-[var(--gray-200)] overflow-hidden mb-6">
          <div className="grid grid-cols-7">
            {dayNames.map((name) => (
              <div key={name} className="text-center text-xs font-semibold text-[var(--gray-500)] py-3 border-b border-[var(--gray-200)]">
                {name}
              </div>
            ))}
            {cells.map((day, i) => {
              const dayEvents = day ? eventsForMonth.filter((e) => e.day === day) : [];
              const isToday = day === today.day && currentMonth === today.month && currentYear === today.year;
              const isSelected = day === selectedDay;
              return (
                <div
                  key={i}
                  onClick={() => day && dayEvents.length > 0 && setSelectedDay(day)}
                  className={`min-h-[72px] p-2 border-b border-r border-[var(--gray-200)] transition-colors ${
                    day && dayEvents.length > 0 ? "cursor-pointer hover:bg-[var(--gray-100)]" : ""
                  } ${isSelected ? "bg-[var(--gray-100)]" : ""}`}
                >
                  {day && (
                    <>
                      <span className={`text-sm ${isToday ? "bg-[var(--primary)] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold" : "text-[var(--foreground)]"}`}>
                        {day}
                      </span>
                      <div className="flex gap-1 mt-1">
                        {dayEvents.map((e, idx) => (
                          <span key={idx} className={`w-2 h-2 rounded-full ${dotColor[e.type]}`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-6 text-sm text-[var(--gray-500)]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span>Mentoría</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Taller</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span>Evento</span>
          </div>
        </div>

        {/* Selected day detail */}
        {selectedDay !== null && eventsForDay.length > 0 && (
          <div className="bg-white rounded-xl border border-[var(--gray-200)] p-5 space-y-4">
            <h2 className="font-semibold text-[var(--foreground)]">
              {selectedDay} de {monthNames[currentMonth]} {currentYear}
            </h2>
            {eventsForDay.map((event, idx) => (
              <div key={idx} className="flex items-start justify-between p-4 rounded-lg border border-[var(--gray-200)]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${dotColor[event.type]}`} />
                    <span className="font-medium text-[var(--foreground)]">{event.title}</span>
                  </div>
                  <p className="text-sm text-[var(--gray-500)]">{event.time}</p>
                  <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                    event.type === "mentoria" ? "bg-green-100 text-green-700" :
                    event.type === "taller" ? "bg-blue-100 text-blue-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>
                    {event.type === "mentoria" ? "Mentoría" : event.type === "taller" ? "Taller" : "Evento"}
                  </span>
                  <p className="text-sm text-[var(--gray-400)]">{event.location}</p>
                </div>
                <Link href={event.link} className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium">
                  {event.linkLabel} →
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
