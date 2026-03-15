import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--gray-200)] mt-16 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[var(--primary)] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">P</span>
              </div>
              <span className="text-sm font-medium">Puente</span>
            </div>
            <p className="text-xs text-[var(--gray-400)] max-w-xs">
              Un programa de mentoría para la integración profesional de
              estudiantes internacionales en España. En colaboración con FUE.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="text-xs font-semibold text-[var(--gray-600)] uppercase tracking-wide mb-3">
                Programa
              </h4>
              <ul className="space-y-2">
                {["Objetivos", "Mentoría", "Talleres", "Empresas"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="/"
                        className="text-sm text-[var(--gray-500)] hover:text-[var(--foreground)] transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[var(--gray-600)] uppercase tracking-wide mb-3">
                Recursos
              </h4>
              <ul className="space-y-2">
                {["Fases", "Equipo", "KPIs", "Casos de referencia"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="/"
                        className="text-sm text-[var(--gray-500)] hover:text-[var(--foreground)] transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--gray-200)] pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[var(--gray-400)]">
            © 2026 Puente. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {["Términos", "Privacidad", "Contacto"].map((item) => (
              <Link
                key={item}
                href="/"
                className="text-xs text-[var(--gray-400)] hover:text-[var(--foreground)] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
