"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_MENTORS } from "@/lib/mock-data";

const MOCK_TESTIMONIALS = [
  {
    studentName: "María García",
    studentInitials: "MG",
    studentColor: "#6366f1",
    quote: "Mi experiencia con este mentor ha sido increíble. Me ayudó a definir mis metas profesionales y a prepararme para entrevistas técnicas. Estoy muy agradecida por su dedicación.",
    date: "Nov 2025",
  },
  {
    studentName: "Javier Hernández",
    studentInitials: "JH",
    studentColor: "#f59e0b",
    quote: "Un mentor excepcional. Sus consejos prácticos y su experiencia en la industria me dieron la confianza que necesitaba para postularme a puestos que antes me parecían inalcanzables.",
    date: "Dic 2025",
  },
];

export default function MentorProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const mentor = MOCK_MENTORS.find((m) => m.id === id);

  if (!mentor) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--gray-100)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Mentor no encontrado</h1>
          <p className="text-[var(--gray-500)] mb-4">No se encontró un mentor con ese identificador.</p>
          <Link href="/scroll" className="text-[var(--primary)] hover:underline text-sm">
            ← Volver
          </Link>
        </div>
      </div>
    );
  }

  const initials = mentor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const otherMentors = MOCK_MENTORS.filter((m) => m.id !== mentor.id).slice(0, 3);

  const fullStars = Math.floor(mentor.rating);
  const hasHalfStar = mentor.rating % 1 >= 0.5;

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
          {[
            { icon: "📜", label: "Scroll", href: "/scroll" },
            { icon: "📁", label: "Proyectos", href: "/perfil/priya-sharma" },
            { icon: "📥", label: "Bandeja", href: "/mensajes/conv-1" },
            { icon: "💼", label: "Empleos", href: "/empleos" },
            { icon: "🔍", label: "Buscar", href: "/buscar" },
            { icon: "👥", label: "Mi Red", href: "/perfil/priya-sharma" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--gray-500)] hover:bg-[var(--gray-100)] transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/scroll" className="text-sm text-[var(--primary)] hover:underline mb-6 inline-block">
            ← Volver
          </Link>

          {/* Profile header */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-start gap-5">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                style={{ backgroundColor: mentor.color }}
              >
                {initials}
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-[var(--foreground)]">{mentor.name}</h1>
                <p className="text-sm text-[var(--gray-500)] mt-1">{mentor.role}</p>
                <p className="text-sm text-[var(--gray-400)]">{mentor.company}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={i < fullStars ? "#f59e0b" : i === fullStars && hasHalfStar ? "#f59e0b" : "#e5e7eb"}
                        className="w-4 h-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-[var(--foreground)]">{mentor.rating}</span>
                  <span className="text-xs text-[var(--gray-400)]">
                    · {mentor.sessionsCompleted} sesiones completadas
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 mt-5">
                  <Link
                    href="/solicitar-mentor"
                    className="bg-[var(--primary)] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    Solicitar como mentor
                  </Link>
                  <Link
                    href={`/reservar-sesion?mentor=${mentor.id}`}
                    className="border border-[var(--primary)] text-[var(--primary)] px-5 py-2 rounded-lg text-sm font-medium hover:bg-[var(--gray-100)] transition-colors"
                  >
                    Reservar sesión
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="font-semibold text-[var(--foreground)] mb-3">Biografía</h2>
            <p className="text-sm text-[var(--gray-600)] leading-relaxed">{mentor.bio}</p>
          </div>

          {/* Specialties */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="font-semibold text-[var(--foreground)] mb-3">Especialidades</h2>
            <div className="flex flex-wrap gap-2">
              {mentor.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="px-3 py-1.5 bg-[var(--gray-100)] text-[var(--gray-600)] rounded-full text-xs font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="font-semibold text-[var(--foreground)] mb-4">Testimonios</h2>
            <div className="space-y-4">
              {MOCK_TESTIMONIALS.map((testimonial, idx) => (
                <div key={idx} className="border border-[var(--gray-200)] rounded-lg p-4">
                  <p className="text-sm text-[var(--gray-600)] italic leading-relaxed mb-3">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                      style={{ backgroundColor: testimonial.studentColor }}
                    >
                      {testimonial.studentInitials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[var(--foreground)]">{testimonial.studentName}</p>
                      <p className="text-xs text-[var(--gray-400)]">{testimonial.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other mentors */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-[var(--foreground)] mb-4">Otros mentores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherMentors.map((m) => {
                const mInitials = m.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2);
                return (
                  <Link
                    key={m.id}
                    href={`/mentores/${m.id}`}
                    className="border border-[var(--gray-200)] rounded-lg p-4 hover:shadow-md transition-shadow text-center"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2"
                      style={{ backgroundColor: m.color }}
                    >
                      {mInitials}
                    </div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{m.name}</p>
                    <p className="text-xs text-[var(--gray-400)] mt-0.5">{m.role}</p>
                    <p className="text-xs text-[var(--gray-400)]">{m.company}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
