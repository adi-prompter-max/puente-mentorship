export default function MentorshipModel() {
  return (
    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
      <a
        href="/registro"
        className="group border border-[var(--gray-200)] rounded-xl p-6 hover:border-[var(--primary)] hover:shadow-sm transition-all"
      >
        <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center mb-4 text-[var(--primary)]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-2">Mentoría 1:1</h3>
        <p className="text-sm text-[var(--gray-500)] leading-relaxed">
          Sesiones quincenales con un mentor profesional. CV europeo,
          perfil LinkedIn optimizado, estrategia de networking y plan de
          empleabilidad personalizado.
        </p>
        <div className="mt-4 space-y-1.5">
          {["CV formato europeo", "LinkedIn optimizado", "Estrategia de networking", "Plan de acción personalizado"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-[var(--gray-400)]">
              <svg className="w-3 h-3 text-[var(--primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-[var(--primary)] font-medium mt-4 group-hover:gap-2 transition-all">
          Solicitar plaza →
        </span>
      </a>

      <a
        href="/registro"
        className="group border border-[var(--gray-200)] rounded-xl p-6 hover:border-[var(--primary)] hover:shadow-sm transition-all"
      >
        <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center mb-4 text-[var(--primary)]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-2">Talleres Grupales</h3>
        <p className="text-sm text-[var(--gray-500)] leading-relaxed">
          Talleres mensuales: búsqueda de empleo en España/UE, regulaciones
          migratorias, preparación de entrevistas, networking estratégico y
          habilidades multiculturales.
        </p>
        <div className="mt-4 space-y-1.5">
          {["Búsqueda de empleo en España/UE", "Regulaciones migratorias", "Networking estratégico", "Entrevistas y elevator pitch", "Soft skills multiculturales"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-[var(--gray-400)]">
              <svg className="w-3 h-3 text-[var(--primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-[var(--primary)] font-medium mt-4 group-hover:gap-2 transition-all">
          Ver talleres →
        </span>
      </a>

      <a
        href="/registro"
        className="group border border-[var(--gray-200)] rounded-xl p-6 hover:border-[var(--primary)] hover:shadow-sm transition-all"
      >
        <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center mb-4 text-[var(--primary)]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-2">Conexión con Empresas</h3>
        <p className="text-sm text-[var(--gray-500)] leading-relaxed">
          Acceso a empresas que contratan talento no-UE. Speed-networking,
          charlas con RRHH, presentación de candidatos preseleccionados y
          eventos de carrera.
        </p>
        <div className="mt-4 space-y-1.5">
          {["Charlas con RRHH", "Speed-networking", "Candidatos preseleccionados", "Eventos de carrera", "Empresas abiertas a no-UE"].map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-[var(--gray-400)]">
              <svg className="w-3 h-3 text-[var(--primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </div>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-[var(--primary)] font-medium mt-4 group-hover:gap-2 transition-all">
          Conocer empresas →
        </span>
      </a>
    </div>
  );
}
