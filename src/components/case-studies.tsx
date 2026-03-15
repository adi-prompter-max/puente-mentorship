export default function CaseStudies() {
  const cases = [
    {
      name: "Mentoring for Migrants",
      location: "Austria",
      status: "Desde 2008",
      takeaway:
        "Excelente referencia internacional para el público objetivo. Modelo consolidado con más de 15 años de experiencia.",
    },
    {
      name: "International Mentoring Program",
      location: "Universidad de Granada",
      status: "Piloto",
      takeaway:
        "Demuestra que las universidades españolas están explorando la mentoría internacional como herramienta de integración.",
    },
    {
      name: "Euroacció Mentoring",
      location: "UAB Barcelona",
      status: "Activo",
      takeaway:
        "Modelo modular de referencia con enfoque en la red de antiguos alumnos y conexión empresarial.",
    },
    {
      name: "ENGAGE.EU Mentoring Programme",
      location: "Red Europea",
      status: "Activo",
      takeaway:
        "Demuestra la viabilidad de modelos de mentoría a nivel internacional con múltiples universidades.",
    },
  ];

  const keyElements = [
    "Mentoría estructurada (1:1 y grupal)",
    "Enfoque en integración laboral",
    "Oportunidades de networking profesional",
    "Habilidades de comunicación multicultural",
    "Colaboración con empresas e instituciones",
    "Seguimiento del progreso y medición de impacto",
  ];

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold text-center mb-3">
        Casos de Referencia
      </h2>
      <p className="text-center text-[var(--gray-500)] mb-12 max-w-xl mx-auto">
        Programas similares que validan nuestro modelo y demuestran la
        viabilidad de la mentoría internacional.
      </p>

      {/* Case study cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {cases.map((c) => (
          <div
            key={c.name}
            className="border border-[var(--gray-200)] rounded-xl p-6 hover:border-[var(--primary)] hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold">{c.name}</h3>
              <span className="text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-2.5 py-1 rounded-full font-medium flex-shrink-0 ml-2">
                {c.status}
              </span>
            </div>
            <p className="text-xs text-[var(--gray-400)] mb-3 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {c.location}
            </p>
            <p className="text-sm text-[var(--gray-500)] leading-relaxed">
              {c.takeaway}
            </p>
          </div>
        ))}
      </div>

      {/* Key elements */}
      <div className="bg-[var(--gray-100)] rounded-2xl p-8">
        <h3 className="font-semibold text-lg mb-2 text-center">
          Elementos Clave de Estos Modelos
        </h3>
        <p className="text-sm text-[var(--gray-500)] text-center mb-6">
          Patrones comunes que hemos incorporado en nuestro diseño del programa.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {keyElements.map((element, i) => (
            <div
              key={element}
              className="flex items-center gap-3 bg-white rounded-lg px-4 py-3"
            >
              <span className="text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-[var(--gray-600)]">{element}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { title: "Credibilidad", desc: "Iniciativas similares ya funcionan, aumentando la confianza institucional." },
            { title: "Eficiencia", desc: "Modelos exitosos pueden adaptarse en lugar de reinventarse." },
            { title: "Escalabilidad", desc: "Referencias internacionales demuestran potencial de expansión." },
          ].map((item) => (
            <div key={item.title} className="text-center">
              <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
              <p className="text-xs text-[var(--gray-500)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
