export default function Phases() {
  const phases = [
    {
      number: "01",
      duration: "2-3 semanas",
      title: "Configuración",
      items: [
        "Selección de estudiantes",
        "Diagnóstico de empleabilidad",
        "Plan personalizado",
        "Formación CV y LinkedIn",
      ],
    },
    {
      number: "02",
      duration: "3 meses",
      title: "Mentoría y Talleres",
      items: [
        "6 sesiones individuales",
        "3 talleres grupales",
        "Recursos y plantillas",
        "Seguimiento quincenal",
      ],
    },
    {
      number: "03",
      duration: "2 meses",
      title: "Conexión Empresarial",
      items: [
        "Presentación a empresas",
        "Eventos de networking",
        "Prácticas y entrevistas",
        "Evaluación de resultados",
      ],
    },
    {
      number: "04",
      duration: "2 semanas",
      title: "Cierre e Impacto",
      items: [
        "Informe de impacto",
        "Testimonios",
        "Propuestas de mejora",
        "Plan de escalabilidad",
      ],
    },
  ];

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold text-center mb-3">
        Fases del Programa
      </h2>
      <p className="text-center text-[var(--gray-500)] mb-12 max-w-xl mx-auto">
        Un programa estructurado de 6 meses diseñado para maximizar tu
        empleabilidad en el mercado español y europeo.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {phases.map((phase) => (
          <div
            key={phase.number}
            className="relative border border-[var(--gray-200)] rounded-xl p-5"
          >
            <div className="text-xs font-semibold text-[var(--primary)] mb-2 uppercase tracking-wide">
              Fase {phase.number} · {phase.duration}
            </div>
            <h4 className="font-semibold mb-2">{phase.title}</h4>
            <ul className="text-sm text-[var(--gray-500)] space-y-1">
              {phase.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
