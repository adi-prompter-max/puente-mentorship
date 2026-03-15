export default function Team() {
  const roles = [
    {
      title: "Coordinador/a Senior",
      subtitle: "Consultor/a",
      responsibilities: [
        "Diseño del programa",
        "Relación con FUE",
        "Coordinación general",
        "Mentoría de perfiles complejos",
        "Seguimiento e informes",
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Soporte de Operaciones",
      subtitle: "Comunicación",
      responsibilities: [
        "Captación de estudiantes",
        "Programación de sesiones",
        "Seguimiento individual",
        "Preparación de materiales",
        "Documentación del programa",
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: "Mentor/a Junior",
      subtitle: "Facilitador/a",
      responsibilities: [
        "Apoyo en sesiones de mentoría",
        "Coaching de empleabilidad junior",
        "Facilitación de talleres",
        "Apoyo en relaciones con empresas",
        "Seguimiento de participantes",
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold text-center mb-3">
        Equipo Operativo
      </h2>
      <p className="text-center text-[var(--gray-500)] mb-12 max-w-xl mx-auto">
        Un equipo especializado en integración profesional de talento
        internacional, con roles claros y complementarios.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.title}
            className="border border-[var(--gray-200)] rounded-xl p-6 hover:border-[var(--primary)] hover:shadow-sm transition-all"
          >
            <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center mb-4 text-[var(--primary)]">
              {role.icon}
            </div>
            <h3 className="font-semibold text-lg">{role.title}</h3>
            <p className="text-sm text-[var(--primary)] font-medium mb-4">
              {role.subtitle}
            </p>
            <ul className="space-y-2">
              {role.responsibilities.map((resp) => (
                <li
                  key={resp}
                  className="flex items-start gap-2 text-sm text-[var(--gray-500)]"
                >
                  <svg
                    className="w-4 h-4 text-[var(--primary)] flex-shrink-0 mt-0.5"
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
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
