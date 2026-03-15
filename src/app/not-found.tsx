import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-[var(--gray-100)]">
      <div className="text-center space-y-6">
        <p className="text-8xl font-bold text-[var(--primary)]">404</p>
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          Página no encontrada
        </h1>
        <p className="text-[var(--gray-500)] max-w-md mx-auto">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors"
          >
            Volver al inicio →
          </Link>
          <Link
            href="/buscar"
            className="px-6 py-3 border border-[var(--gray-300)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--gray-200)] transition-colors"
          >
            Buscar en Puente
          </Link>
        </div>
      </div>
    </main>
  );
}
