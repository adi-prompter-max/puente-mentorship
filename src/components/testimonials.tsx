import { MOCK_TESTIMONIALS, MOCK_PROGRAM_STATS } from "@/lib/mock-data";

export default function Testimonials() {
  return (
    <div className="mt-24">
      {/* Stats bar */}
      <div className="bg-[var(--gray-100)] rounded-2xl p-8 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-[var(--primary)]">
              {MOCK_PROGRAM_STATS.studentsActive}
            </div>
            <p className="text-sm text-[var(--gray-500)] mt-1">
              Estudiantes activos
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--primary)]">
              {MOCK_PROGRAM_STATS.mentorsActive}
            </div>
            <p className="text-sm text-[var(--gray-500)] mt-1">
              Mentores profesionales
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--primary)]">
              {MOCK_PROGRAM_STATS.placementRate}%
            </div>
            <p className="text-sm text-[var(--gray-500)] mt-1">
              Tasa de colocación
            </p>
          </div>
          <div>
            <div className="text-3xl font-bold text-[var(--primary)]">
              {MOCK_PROGRAM_STATS.countriesRepresented}
            </div>
            <p className="text-sm text-[var(--gray-500)] mt-1">
              Países representados
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <h2 className="text-2xl font-bold text-center mb-3">
        Lo que dicen nuestros participantes
      </h2>
      <p className="text-center text-[var(--gray-500)] mb-12 max-w-xl mx-auto">
        Estudiantes internacionales que han transformado su carrera profesional
        con Puente.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_TESTIMONIALS.map((testimonial) => (
          <div
            key={testimonial.name}
            className="border border-[var(--gray-200)] rounded-xl p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 ${testimonial.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}
              >
                {testimonial.avatar}
              </div>
              <div>
                <p className="font-medium text-sm">{testimonial.name}</p>
                <p className="text-xs text-[var(--gray-400)]">
                  {testimonial.region} · {testimonial.university}
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--gray-600)] leading-relaxed mb-4">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-[var(--success)]"
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
              <span className="text-xs font-medium text-[var(--primary)]">
                {testimonial.outcome}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
