"use client";

import { Suspense } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MOCK_MENTORS, MOCK_MENTOR_AVAILABILITY } from "@/lib/mock-data";

function BookingContent() {
  const searchParams = useSearchParams();
  const mentorParam = searchParams.get("mentor");

  const mentor =
    MOCK_MENTORS.find((m) => m.id === mentorParam) || MOCK_MENTORS[0];

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [topic, setTopic] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const selectedDateSlots =
    MOCK_MENTOR_AVAILABILITY.find((a) => a.date === selectedDate)?.slots || [];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setConfirmed(true);
    }
  };

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Sesión reservada</h2>
        <p className="text-sm text-[var(--gray-500)] mb-6">
          Recibirás un enlace de Google Meet por email.
        </p>

        <div className="border border-[var(--gray-200)] rounded-xl p-5 text-left mb-6">
          <h3 className="text-sm font-semibold mb-3 text-[var(--gray-500)]">Resumen de la sesión</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--gray-400)]">Mentor</span>
              <span className="font-medium">{mentor.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--gray-400)]">Fecha</span>
              <span className="font-medium">{selectedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--gray-400)]">Hora</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
            {topic && (
              <div className="flex justify-between">
                <span className="text-[var(--gray-400)]">Tema</span>
                <span className="font-medium text-right max-w-[60%]">{topic}</span>
              </div>
            )}
          </div>
        </div>

        <Link
          href="/perfil"
          className="inline-flex items-center gap-1 text-sm text-[var(--primary)] font-medium hover:underline"
        >
          Volver a mi perfil &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reservar Sesión de Mentoría</h1>

      {/* Step 1: Mentor card */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-[var(--gray-400)] mb-3">Paso 1 &middot; Mentor</h2>
        <div className="border border-[var(--gray-200)] rounded-xl p-4 flex items-center gap-4">
          <div
            className={`w-12 h-12 ${mentor.color} rounded-full flex items-center justify-center text-white font-bold`}
          >
            {mentor.avatar}
          </div>
          <div className="flex-1">
            <p className="font-semibold">{mentor.name}</p>
            <p className="text-sm text-[var(--gray-500)]">
              {mentor.role} &middot; {mentor.company}
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-yellow-500">&#9733;</span>
            <span className="font-medium">{mentor.rating}</span>
          </div>
        </div>
      </div>

      {/* Step 2: Date selection */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-[var(--gray-400)] mb-3">
          Paso 2 &middot; Selecciona una fecha
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MOCK_MENTOR_AVAILABILITY.map((avail) => (
            <button
              key={avail.date}
              onClick={() => {
                setSelectedDate(avail.date);
                setSelectedTime(null);
              }}
              className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                selectedDate === avail.date
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--gray-200)] text-[var(--gray-600)] hover:border-[var(--primary)]"
              }`}
            >
              {avail.date}
              <span className="block text-xs mt-1 opacity-70">
                {avail.slots.length} {avail.slots.length === 1 ? "horario" : "horarios"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 3: Time slot selection */}
      {selectedDate && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[var(--gray-400)] mb-3">
            Paso 3 &middot; Selecciona un horario
          </h2>
          <div className="flex flex-wrap gap-3">
            {selectedDateSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedTime(slot)}
                className={`px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  selectedTime === slot
                    ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                    : "border-[var(--gray-200)] text-[var(--gray-600)] hover:border-[var(--primary)]"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Topic */}
      {selectedTime && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[var(--gray-400)] mb-3">
            Paso 4 &middot; Tema de la sesión
          </h2>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="¿Qué temas quieres tratar en la sesión?"
            rows={3}
            className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
          />
        </div>
      )}

      {/* Confirm button */}
      <button
        onClick={handleConfirm}
        disabled={!selectedDate || !selectedTime}
        className="w-full py-3 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Confirmar reserva &rarr;
      </button>
    </div>
  );
}

export default function BookSessionPage() {
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
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin h-8 w-8 border-2 border-[var(--primary)] border-t-transparent rounded-full" />
            </div>
          }
        >
          <BookingContent />
        </Suspense>
      </main>
    </div>
  );
}
