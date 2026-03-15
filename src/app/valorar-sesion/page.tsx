"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

const mentores: Record<string, string> = {
  "elena-garcia": "Elena García",
  "miguel-angel": "Miguel Ángel Torres",
  "isabel-fernandez": "Isabel Fernández",
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-8 h-8 ${filled ? "text-yellow-400" : "text-[var(--gray-300)]"}`}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}

function ValoracionForm() {
  const searchParams = useSearchParams();
  const sesionId = searchParams.get("sesion") || "1";
  const mentorKey = searchParams.get("mentor") || "elena-garcia";
  const mentorName = mentores[mentorKey] || "Elena García";

  const [rating, setRating] = useState(0);
  const [util, setUtil] = useState("");
  const [mejorar, setMejorar] = useState("");
  const [categorias, setCategorias] = useState({
    preparacion: 0,
    relevancia: 0,
    aplicabilidad: 0,
    comunicacion: 0,
  });
  const [recomendar, setRecomendar] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEnviado(true);
    }, 1000);
  };

  const catLabels: { key: keyof typeof categorias; label: string }[] = [
    { key: "preparacion", label: "Preparación del mentor" },
    { key: "relevancia", label: "Relevancia del contenido" },
    { key: "aplicabilidad", label: "Aplicabilidad práctica" },
    { key: "comunicacion", label: "Comunicación" },
  ];

  if (enviado) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-[var(--success)] rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
          ¡Gracias por tu valoración!
        </h2>
        <p className="text-[var(--gray-500)] max-w-md mb-6">
          Tu feedback nos ayuda a mejorar el programa.
        </p>
        <Link
          href="/perfil"
          className="text-[var(--primary)] font-medium hover:underline"
        >
          Volver a mi perfil &rarr;
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">
        Valorar Sesión de Mentoría
      </h1>

      {/* Session summary */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-8 border border-[var(--gray-200)]">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-[var(--gray-400)]">Mentor/a</p>
            <p className="font-medium text-[var(--foreground)]">{mentorName}</p>
          </div>
          <div>
            <p className="text-[var(--gray-400)]">Fecha</p>
            <p className="font-medium text-[var(--foreground)]">12 Mar 2026</p>
          </div>
          <div>
            <p className="text-[var(--gray-400)]">Tema</p>
            <p className="font-medium text-[var(--foreground)]">Revisión de CV</p>
          </div>
        </div>
      </div>

      {/* Star rating */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <p className="font-medium text-[var(--foreground)] mb-3">
          Valoración general
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <StarIcon filled={star <= rating} />
            </button>
          ))}
        </div>
      </div>

      {/* Text areas */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-5">
        <div>
          <label className="block font-medium text-[var(--foreground)] mb-2 text-sm">
            ¿Qué fue lo más útil?
          </label>
          <textarea
            value={util}
            onChange={(e) => setUtil(e.target.value)}
            rows={3}
            className="w-full border border-[var(--gray-300)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
            placeholder="Comparte lo que más te ayudó de esta sesión..."
          />
        </div>
        <div>
          <label className="block font-medium text-[var(--foreground)] mb-2 text-sm">
            ¿Qué podría mejorar?
          </label>
          <textarea
            value={mejorar}
            onChange={(e) => setMejorar(e.target.value)}
            rows={3}
            className="w-full border border-[var(--gray-300)] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
            placeholder="Sugerencias para mejorar futuras sesiones..."
          />
        </div>
      </div>

      {/* Categorical ratings */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <p className="font-medium text-[var(--foreground)] mb-4">
          Valoraciones por categoría
        </p>
        <div className="space-y-4">
          {catLabels.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-[var(--gray-600)]">{label}</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() =>
                      setCategorias((prev) => ({ ...prev, [key]: val }))
                    }
                    className={`w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                      val <= categorias[key]
                        ? "bg-[var(--primary)] text-white"
                        : "bg-[var(--gray-100)] text-[var(--gray-400)] hover:bg-[var(--gray-200)]"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommend */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <p className="font-medium text-[var(--foreground)] mb-3">
          ¿Recomendarías a este mentor?
        </p>
        <div className="flex gap-4">
          {[
            { value: true, label: "Sí" },
            { value: false, label: "No" },
          ].map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="recomendar"
                checked={recomendar === opt.value}
                onChange={() => setRecomendar(opt.value)}
                className="w-4 h-4 accent-[var(--primary)]"
              />
              <span className="text-sm text-[var(--foreground)]">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleEnviar}
        disabled={loading}
        className="w-full py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Enviar valoración"}
      </button>
    </>
  );
}

export default function ValorarSesionPage() {
  return (
    <div className="min-h-screen bg-[var(--gray-100)] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0 bg-white">
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

      <main className="flex-1 p-6 lg:p-10 max-w-3xl">
        <Suspense
          fallback={
            <div className="text-[var(--gray-400)] text-sm">Cargando...</div>
          }
        >
          <ValoracionForm />
        </Suspense>
      </main>
    </div>
  );
}
