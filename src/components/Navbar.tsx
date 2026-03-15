"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="border-b border-[var(--gray-200)] bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-semibold text-lg">Puente</span>
          </Link>
          <div className="hidden md:flex items-center gap-1 text-sm text-[var(--gray-500)]">
            <span className="mx-2 text-[var(--gray-300)]">\</span>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-md hover:text-[var(--foreground)] transition-colors"
            >
              Programa
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-md hover:text-[var(--foreground)] transition-colors"
            >
              Mentores
            </Link>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-md hover:text-[var(--foreground)] transition-colors"
            >
              Empresas
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isHome && (
            <>
              <Link
                href="/registro"
                className="text-sm text-[var(--gray-600)] hover:text-[var(--foreground)] transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                className="text-sm bg-[var(--primary)] text-white px-4 py-2 rounded-full hover:bg-[var(--primary-hover)] transition-colors"
              >
                Solicitar plaza
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
