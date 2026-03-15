"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_MENTORS, MOCK_USER } from "@/lib/mock-data";

const STEPS = [
  { label: "Preferencias", number: 1 },
  { label: "Mentores compatibles", number: 2 },
  { label: "Confirmación", number: 3 },
];

const FORMATS = ["Online", "Presencial", "Sin preferencia"];
const AVAILABILITY = ["Mañanas", "Tardes", "Noches"];

const NAV_ITEMS = [
  { label: "Inicio", icon: "home" },
  { label: "Mi perfil", icon: "user" },
  { label: "Mentores", icon: "users" },
  { label: "Mensajes", icon: "chat" },
  { label: "Recursos", icon: "book" },
];

function NavIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "home":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
        </svg>
      );
    case "user":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case "users":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "chat":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case "book":
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SolicitarMentorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 state
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [format, setFormat] = useState("");
  const [availability, setAvailability] = useState<string[]>([]);

  // Step 2 state
  const [selectedMentorIndex, setSelectedMentorIndex] = useState<number | null>(null);

  const topMentors = MOCK_MENTORS.slice(0, 2);
  const compatibilities = [95, 87];
  const mentorColors = ["#2B7A4B", "#6B46C1"];

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  function toggleInterest(interest: string) {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  }

  function toggleAvailability(slot: string) {
    setAvailability((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--gray-100)" }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-64 border-r px-4 py-6"
        style={{ backgroundColor: "#fff", borderColor: "var(--gray-200)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: "var(--primary)" }}
          >
            P
          </div>
          <span
            className="text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Puente
          </span>
        </div>

        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm font-medium"
              style={{
                color:
                  item.label === "Mentores"
                    ? "var(--primary)"
                    : "var(--gray-500)",
                backgroundColor:
                  item.label === "Mentores" ? "var(--gray-100)" : "transparent",
              }}
            >
              <NavIcon icon={item.icon} />
              {item.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-12 py-8 max-w-4xl mx-auto w-full">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                  style={{
                    backgroundColor:
                      currentStep >= step.number
                        ? "var(--primary)"
                        : "var(--gray-200)",
                    color:
                      currentStep >= step.number ? "#fff" : "var(--gray-400)",
                  }}
                >
                  {currentStep > step.number ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className="text-xs mt-1.5 font-medium"
                  style={{
                    color:
                      currentStep >= step.number
                        ? "var(--primary)"
                        : "var(--gray-400)",
                  }}
                >
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className="w-16 md:w-24 h-0.5 mx-2 mb-5"
                  style={{
                    backgroundColor:
                      currentStep > step.number
                        ? "var(--primary)"
                        : "var(--gray-200)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Preferencias */}
        {currentStep === 1 && (
          <div
            className="rounded-2xl p-8 shadow-sm"
            style={{ backgroundColor: "#fff" }}
          >
            <h1
              className="text-2xl font-bold mb-1"
              style={{ color: "var(--foreground)" }}
            >
              Tus preferencias de mentoría
            </h1>
            <p className="mb-8" style={{ color: "var(--gray-500)" }}>
              Ayúdanos a encontrar el mentor ideal para ti
            </p>

            {/* Interests */}
            <div className="mb-8">
              <h3
                className="text-sm font-semibold mb-3"
                style={{ color: "var(--foreground)" }}
              >
                Áreas de interés
              </h3>
              <div className="flex flex-wrap gap-3">
                {(MOCK_USER.interests ?? [
                  "Desarrollo Frontend",
                  "React",
                  "TypeScript",
                  "UX/UI",
                  "Liderazgo técnico",
                ]).map((interest: string) => (
                  <label
                    key={interest}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm"
                    style={{
                      borderColor: selectedInterests.includes(interest)
                        ? "var(--primary)"
                        : "var(--gray-200)",
                      backgroundColor: selectedInterests.includes(interest)
                        ? "rgba(43, 122, 75, 0.05)"
                        : "#fff",
                      color: selectedInterests.includes(interest)
                        ? "var(--primary)"
                        : "var(--foreground)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedInterests.includes(interest)}
                      onChange={() => toggleInterest(interest)}
                      className="sr-only"
                    />
                    <div
                      className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: selectedInterests.includes(interest)
                          ? "var(--primary)"
                          : "var(--gray-300)",
                        backgroundColor: selectedInterests.includes(interest)
                          ? "var(--primary)"
                          : "transparent",
                      }}
                    >
                      {selectedInterests.includes(interest) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {interest}
                  </label>
                ))}
              </div>
            </div>

            {/* Format */}
            <div className="mb-8">
              <h3
                className="text-sm font-semibold mb-3"
                style={{ color: "var(--foreground)" }}
              >
                Formato preferido
              </h3>
              <div className="flex flex-wrap gap-3">
                {FORMATS.map((f) => (
                  <label
                    key={f}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm"
                    style={{
                      borderColor:
                        format === f ? "var(--primary)" : "var(--gray-200)",
                      backgroundColor:
                        format === f ? "rgba(43, 122, 75, 0.05)" : "#fff",
                      color:
                        format === f ? "var(--primary)" : "var(--foreground)",
                    }}
                  >
                    <input
                      type="radio"
                      name="format"
                      checked={format === f}
                      onChange={() => setFormat(f)}
                      className="sr-only"
                    />
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor:
                          format === f ? "var(--primary)" : "var(--gray-300)",
                      }}
                    >
                      {format === f && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "var(--primary)" }}
                        />
                      )}
                    </div>
                    {f}
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <h3
                className="text-sm font-semibold mb-3"
                style={{ color: "var(--foreground)" }}
              >
                Disponibilidad
              </h3>
              <div className="flex flex-wrap gap-3">
                {AVAILABILITY.map((slot) => (
                  <label
                    key={slot}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm"
                    style={{
                      borderColor: availability.includes(slot)
                        ? "var(--primary)"
                        : "var(--gray-200)",
                      backgroundColor: availability.includes(slot)
                        ? "rgba(43, 122, 75, 0.05)"
                        : "#fff",
                      color: availability.includes(slot)
                        ? "var(--primary)"
                        : "var(--foreground)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={availability.includes(slot)}
                      onChange={() => toggleAvailability(slot)}
                      className="sr-only"
                    />
                    <div
                      className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: availability.includes(slot)
                          ? "var(--primary)"
                          : "var(--gray-300)",
                        backgroundColor: availability.includes(slot)
                          ? "var(--primary)"
                          : "transparent",
                      }}
                    >
                      {availability.includes(slot) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    {slot}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              className="rounded-lg px-6 py-3 text-white font-medium transition-colors"
              style={{ backgroundColor: "var(--primary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary)")
              }
            >
              Continuar →
            </button>
          </div>
        )}

        {/* Step 2: Mentores compatibles */}
        {currentStep === 2 && (
          <div
            className="rounded-2xl p-8 shadow-sm"
            style={{ backgroundColor: "#fff" }}
          >
            <h1
              className="text-2xl font-bold mb-1"
              style={{ color: "var(--foreground)" }}
            >
              Mentores compatibles
            </h1>
            <p className="mb-8" style={{ color: "var(--gray-500)" }}>
              Basándonos en tus preferencias, estos mentores son los más
              compatibles contigo
            </p>

            <div className="space-y-4 mb-8">
              {topMentors.map((mentor, idx) => (
                <label
                  key={mentor.name}
                  className="block rounded-xl border-2 p-6 cursor-pointer transition-all"
                  style={{
                    borderColor:
                      selectedMentorIndex === idx
                        ? "var(--primary)"
                        : "var(--gray-200)",
                    backgroundColor:
                      selectedMentorIndex === idx
                        ? "rgba(43, 122, 75, 0.02)"
                        : "#fff",
                  }}
                >
                  <input
                    type="radio"
                    name="mentor"
                    checked={selectedMentorIndex === idx}
                    onChange={() => setSelectedMentorIndex(idx)}
                    className="sr-only"
                  />

                  <div className="flex items-start gap-4">
                    {/* Radio indicator */}
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        borderColor:
                          selectedMentorIndex === idx
                            ? "var(--primary)"
                            : "var(--gray-300)",
                      }}
                    >
                      {selectedMentorIndex === idx && (
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: "var(--primary)" }}
                        />
                      )}
                    </div>

                    {/* Avatar */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{ backgroundColor: mentorColors[idx] }}
                    >
                      {getInitials(mentor.name)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: "var(--foreground)" }}
                        >
                          {mentor.name}
                        </h3>
                        <span
                          className="text-sm font-bold px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: "rgba(43, 122, 75, 0.1)",
                            color: "var(--primary)",
                          }}
                        >
                          {compatibilities[idx]}% compatible
                        </span>
                      </div>

                      <p
                        className="text-sm mb-2"
                        style={{ color: "var(--gray-500)" }}
                      >
                        {mentor.role} en {mentor.company}
                      </p>

                      <p
                        className="text-sm mb-3"
                        style={{ color: "var(--gray-600)" }}
                      >
                        {mentor.bio}
                      </p>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(mentor.specialties ?? []).map((spec: string) => (
                          <span
                            key={spec}
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: "var(--gray-100)",
                              color: "var(--gray-600)",
                            }}
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm">
                        <span
                          className="flex items-center gap-1"
                          style={{ color: "var(--gray-500)" }}
                        >
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {mentor.rating ?? "4.9"}
                        </span>
                        <span style={{ color: "var(--gray-500)" }}>
                          {mentor.sessionsCompleted ?? 45} sesiones completadas
                        </span>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="rounded-lg px-6 py-3 font-medium border transition-colors"
                style={{
                  borderColor: "var(--gray-300)",
                  color: "var(--foreground)",
                }}
              >
                ← Atrás
              </button>
              <button
                onClick={() => {
                  if (selectedMentorIndex !== null) setCurrentStep(3);
                }}
                disabled={selectedMentorIndex === null}
                className="rounded-lg px-6 py-3 text-white font-medium transition-colors disabled:opacity-50"
                style={{ backgroundColor: "var(--primary)" }}
                onMouseEnter={(e) => {
                  if (selectedMentorIndex !== null)
                    e.currentTarget.style.backgroundColor =
                      "var(--primary-hover)";
                }}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--primary)")
                }
              >
                Solicitar mentor →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmación */}
        {currentStep === 3 && selectedMentorIndex !== null && (
          <div
            className="rounded-2xl p-8 shadow-sm text-center"
            style={{ backgroundColor: "#fff" }}
          >
            {/* Success icon */}
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: "rgba(43, 122, 75, 0.1)" }}
            >
              <svg
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="var(--primary)"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--foreground)" }}
            >
              ¡Solicitud enviada!
            </h1>
            <p className="mb-8" style={{ color: "var(--gray-500)" }}>
              Tu mentora se pondrá en contacto contigo en las próximas 48 horas.
            </p>

            {/* Selected mentor summary */}
            <div
              className="rounded-xl p-6 mb-8 inline-block text-left w-full max-w-md mx-auto"
              style={{ backgroundColor: "var(--gray-100)" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{
                    backgroundColor: mentorColors[selectedMentorIndex],
                  }}
                >
                  {getInitials(topMentors[selectedMentorIndex].name)}
                </div>
                <div>
                  <h3
                    className="font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {topMentors[selectedMentorIndex].name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--gray-500)" }}>
                    {topMentors[selectedMentorIndex].role} en{" "}
                    {topMentors[selectedMentorIndex].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Next steps */}
            <div className="text-left max-w-md mx-auto mb-8">
              <h3
                className="font-semibold mb-3"
                style={{ color: "var(--foreground)" }}
              >
                Próximos pasos:
              </h3>
              <ul className="space-y-2">
                {[
                  "Recibirás un correo de confirmación con los detalles",
                  "Tu mentora revisará tu perfil y disponibilidad",
                  "Se programará una sesión introductoria",
                  "Prepara tus objetivos y preguntas para la primera sesión",
                ].map((step) => (
                  <li
                    key={step}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--gray-600)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: "var(--primary)" }}
                    />
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => router.push("/perfil/priya-sharma")}
              className="rounded-lg px-6 py-3 text-white font-medium transition-colors"
              style={{ backgroundColor: "var(--primary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary)")
              }
            >
              Ir a mi perfil →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
