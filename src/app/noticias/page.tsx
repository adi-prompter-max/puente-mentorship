"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

const articles = [
  {
    slug: "acuerdo-accenture-practicas",
    category: "Programa",
    title: "Nuevo acuerdo con Accenture para prácticas internacionales",
    date: "5 Mar 2026",
    preview:
      "Puente firma un acuerdo estratégico con Accenture España para ofrecer prácticas profesionales a estudiantes latinoamericanos en áreas de tecnología y consultoría.",
  },
  {
    slug: "guia-renovar-nie-2026",
    category: "Guía",
    title: "Guía completa: Cómo renovar tu NIE en 2026",
    date: "28 Feb 2026",
    preview:
      "Todo lo que necesitas saber sobre el proceso de renovación del NIE en España: documentos, plazos, y consejos prácticos para evitar complicaciones.",
  },
  {
    slug: "entrevista-maria-lopez-mentoria",
    category: "Entrevista",
    title: "Entrevista: María López sobre el futuro de la mentoría internacional",
    date: "20 Feb 2026",
    preview:
      "Nuestra directora comparte su visión sobre cómo la mentoría puede transformar la experiencia de los profesionales internacionales en España.",
  },
  {
    slug: "consejos-primera-entrevista-espana",
    category: "Consejos",
    title: "5 consejos para tu primera entrevista en España",
    date: "15 Feb 2026",
    preview:
      "Desde la puntualidad hasta las preguntas clave, descubre cómo prepararte para causar la mejor impresión en tu primera entrevista laboral en España.",
  },
];

const categoryColors: Record<string, string> = {
  Programa: "bg-blue-100 text-blue-700",
  Guía: "bg-amber-100 text-amber-700",
  Entrevista: "bg-purple-100 text-purple-700",
  Consejos: "bg-green-100 text-green-700",
};

export default function NoticiasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-4xl font-bold" style={{ color: "var(--foreground)" }}>
            Noticias y Actualizaciones
          </h1>
          <p className="mt-4 text-lg" style={{ color: "var(--gray-500)" }}>
            Últimas novedades del programa Puente
          </p>

          {/* Featured Article */}
          <Link
            href="/noticias/puente-100-estudiantes"
            className="mt-12 block overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
            style={{ borderColor: "var(--gray-200)" }}
          >
            <div className="grid md:grid-cols-2">
              <div
                className="flex h-64 items-center justify-center md:h-auto"
                style={{ backgroundColor: "var(--gray-100)" }}
              >
                <span className="text-6xl">📰</span>
              </div>
              <div className="p-8">
                <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Programa
                </span>
                <h2 className="mt-3 text-2xl font-bold leading-tight" style={{ color: "var(--foreground)" }}>
                  Puente alcanza 100 estudiantes activos en su primer trimestre
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs" style={{ color: "var(--gray-400)" }}>
                  <span>10 Mar 2026</span>
                  <span>·</span>
                  <span>Equipo Puente</span>
                  <span>·</span>
                  <span>3 min de lectura</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--gray-500)" }}>
                  En solo tres meses desde su lanzamiento, Puente ha alcanzado un hito significativo: 100 estudiantes latinoamericanos activos en el programa de mentoría, conectados con profesionales en España que les guían en su desarrollo profesional.
                </p>
                <span className="mt-4 inline-block text-sm font-medium" style={{ color: "var(--primary)" }}>
                  Leer más →
                </span>
              </div>
            </div>
          </Link>

          {/* Article Grid */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/noticias/${article.slug}`}
                className="group overflow-hidden rounded-xl border transition-shadow hover:shadow-md"
                style={{ borderColor: "var(--gray-200)" }}
              >
                <div
                  className="flex h-40 items-center justify-center"
                  style={{ backgroundColor: "var(--gray-100)" }}
                >
                  <span className="text-4xl">📄</span>
                </div>
                <div className="p-6">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[article.category] || ""}`}
                  >
                    {article.category}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug" style={{ color: "var(--foreground)" }}>
                    {article.title}
                  </h3>
                  <p className="mt-1 text-xs" style={{ color: "var(--gray-400)" }}>
                    {article.date}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--gray-500)" }}>
                    {article.preview}
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium" style={{ color: "var(--primary)" }}>
                    Leer más →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div
            className="mt-16 rounded-xl p-8 text-center"
            style={{ backgroundColor: "var(--gray-100)" }}
          >
            <h2 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
              Suscríbete al boletín
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: "var(--gray-500)" }}>
              Recibe las últimas noticias, guías y oportunidades de Puente directamente en tu correo.
            </p>
            <div className="mx-auto mt-6 flex max-w-md gap-3">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 rounded-lg border px-4 py-2.5 text-sm outline-none"
                style={{ borderColor: "var(--gray-300)", color: "var(--foreground)" }}
              />
              <button
                className="shrink-0 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: "var(--primary)" }}
              >
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
