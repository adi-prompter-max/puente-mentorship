export default function Objectives() {
  const objectives = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Aumentar la Empleabilidad",
      description:
        "Mejorar la preparación profesional mediante el desarrollo de habilidades específicas y el conocimiento del mercado laboral europeo.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Conectar con Profesionales",
      description:
        "Cerrar la brecha entre estudiantes y profesionales de la industria a través de relaciones de mentoría estructuradas.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Reducir Barreras",
      description:
        "Navegar las barreras culturales, administrativas y del mercado laboral con orientación experta en regulaciones migratorias.",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Modelo de Impacto Escalable",
      description:
        "Proporcionar a FUE un modelo medible y escalable para rastrear y reportar el impacto del programa con KPIs claros.",
    },
  ];

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold text-center mb-3">
        Objetivos del Programa
      </h2>
      <p className="text-center text-[var(--gray-500)] mb-12 max-w-xl mx-auto">
        Cuatro pilares estratégicos que guían nuestro modelo de mentoría para
        estudiantes internacionales.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {objectives.map((obj) => (
          <div
            key={obj.title}
            className="border border-[var(--gray-200)] rounded-xl p-6 hover:border-[var(--primary)] hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center mb-4 text-[var(--primary)]">
              {obj.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{obj.title}</h3>
            <p className="text-sm text-[var(--gray-500)] leading-relaxed">
              {obj.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
