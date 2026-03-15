export default function Resources() {
  const resources = [
    {
      category: "Acceso",
      items: [
        "Estudiantes internacionales de la fundación",
        "Empresas colaboradoras de la fundación",
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
    {
      category: "Comunicación",
      items: [
        "Canales de promoción institucionales",
        "Soporte para eventos y talleres",
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
    },
    {
      category: "Infraestructura",
      items: [
        "Aulas / salas de reuniones online",
        "Materiales de comunicación",
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      category: "Financiación Potencial",
      items: [
        "Becas para prácticas profesionales",
        "Apoyo a la movilidad internacional",
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold text-center mb-3">
        Recursos Solicitados a la Fundación
      </h2>
      <p className="text-center text-[var(--gray-500)] mb-12 max-w-xl mx-auto">
        Para garantizar el éxito del programa, solicitamos a FUE los siguientes
        recursos y apoyos.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <div
            key={resource.category}
            className="border border-[var(--gray-200)] rounded-xl p-6 hover:border-[var(--primary)] hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center text-[var(--primary)]">
                {resource.icon}
              </div>
              <h3 className="font-semibold text-lg">{resource.category}</h3>
            </div>
            <ul className="space-y-2">
              {resource.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[var(--gray-500)]"
                >
                  <span className="text-[var(--primary)] mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
