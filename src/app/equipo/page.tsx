"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

const teamMembers = [
  {
    initials: "ML",
    name: "María López",
    role: "Directora del Programa",
    bio: "Con más de 10 años de experiencia en educación internacional, María ha liderado programas de intercambio y mentoría en universidades de España y Latinoamérica. Su pasión por conectar culturas y facilitar oportunidades impulsa la visión de Puente.",
    avatarBg: "bg-indigo-400",
    linkedin: "#",
  },
  {
    initials: "AR",
    name: "Alejandro Ruiz",
    role: "Coordinador de Mentores",
    bio: "Alejandro proviene del mundo de los recursos humanos, donde dedicó años a conectar talento con oportunidades. En Puente, se encarga de reclutar, formar y acompañar a los mentores que guían a nuestros estudiantes.",
    avatarBg: "bg-teal-400",
    linkedin: "#",
  },
  {
    initials: "CN",
    name: "Carmen Navarro",
    role: "Responsable de Operaciones",
    bio: "Especialista en operaciones y logística, Carmen garantiza que cada proceso en Puente funcione de manera eficiente. Su experiencia en gestión de proyectos internacionales asegura que estudiantes y mentores tengan la mejor experiencia posible.",
    avatarBg: "bg-rose-400",
    linkedin: "#",
  },
];

const featuredMentors = [
  { id: "carlos-mendez", name: "Carlos Méndez", role: "Senior Developer", company: "Google", initials: "CM", bg: "bg-blue-400" },
  { id: "ana-garcia", name: "Ana García", role: "Product Manager", company: "Spotify", initials: "AG", bg: "bg-purple-400" },
  { id: "diego-torres", name: "Diego Torres", role: "Data Scientist", company: "Amazon", initials: "DT", bg: "bg-amber-400" },
  { id: "lucia-fernandez", name: "Lucía Fernández", role: "UX Designer", company: "Figma", initials: "LF", bg: "bg-pink-400" },
];

export default function EquipoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          {/* Header */}
          <h1 className="text-4xl font-bold" style={{ color: "var(--foreground)" }}>
            Nuestro Equipo
          </h1>
          <p className="mt-4 text-lg" style={{ color: "var(--gray-500)" }}>
            Conoce a las personas que hacen posible Puente: un equipo comprometido con conectar talento latinoamericano con oportunidades profesionales en España.
          </p>

          {/* Equipo Fundador */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Equipo Fundador
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="rounded-xl border p-6 text-center"
                  style={{ borderColor: "var(--gray-200)" }}
                >
                  <div
                    className={`${member.avatarBg} mx-auto flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white`}
                  >
                    {member.initials}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold" style={{ color: "var(--foreground)" }}>
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: "var(--primary)" }}>
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--gray-500)" }}>
                    {member.bio}
                  </p>
                  <a
                    href={member.linkedin}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium"
                    style={{ color: "var(--primary)" }}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Mentores Destacados */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Mentores Destacados
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredMentors.map((mentor) => (
                <Link
                  key={mentor.id}
                  href={`/mentores/${mentor.id}`}
                  className="rounded-xl border p-5 text-center transition-shadow hover:shadow-md"
                  style={{ borderColor: "var(--gray-200)" }}
                >
                  <div
                    className={`${mentor.bg} mx-auto flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white`}
                  >
                    {mentor.initials}
                  </div>
                  <h3 className="mt-3 text-base font-semibold" style={{ color: "var(--foreground)" }}>
                    {mentor.name}
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: "var(--primary)" }}>
                    {mentor.role}
                  </p>
                  <p className="text-sm" style={{ color: "var(--gray-400)" }}>
                    {mentor.company}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Colaboradores */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Colaboradores
            </h2>
            <div
              className="mt-8 flex flex-col items-center gap-6 rounded-xl border p-8 sm:flex-row sm:items-start"
              style={{ borderColor: "var(--gray-200)" }}
            >
              <div
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg text-sm font-semibold"
                style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-400)" }}
              >
                FUE Logo
              </div>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                  Fundación Universidad-Empresa (FUE)
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--gray-500)" }}>
                  La FUE es nuestro socio institucional principal. Juntos trabajamos para facilitar la integración profesional de estudiantes latinoamericanos en el mercado laboral español, ofreciendo recursos, formación y una red de contactos de primer nivel.
                </p>
                <Link
                  href="#"
                  className="mt-3 inline-block text-sm font-medium"
                  style={{ color: "var(--primary)" }}
                >
                  Conocer más sobre FUE →
                </Link>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16">
            <div
              className="rounded-xl p-8 text-center"
              style={{ backgroundColor: "var(--gray-100)" }}
            >
              <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
                ¿Quieres ser mentor?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "var(--gray-500)" }}>
                Si eres profesional en España y quieres compartir tu experiencia con estudiantes latinoamericanos, únete a nuestro equipo de mentores. Tu conocimiento puede transformar carreras.
              </p>
              <Link
                href="/registro"
                className="mt-6 inline-block rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: "var(--primary)" }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.backgroundColor = "var(--primary-hover)")}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.backgroundColor = "var(--primary)")}
              >
                Postularme como mentor →
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
