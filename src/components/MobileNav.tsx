"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Inicio", href: "/", emoji: "🏠" },
  { label: "Scroll", href: "/scroll", emoji: "📜" },
  { label: "Bandeja", href: "/bandeja", emoji: "📥" },
  { label: "Empleos", href: "/empleos", emoji: "💼" },
  { label: "Buscar", href: "/buscar", emoji: "🔍" },
  { label: "Mi Red", href: "/red", emoji: "🤝" },
  { label: "Talleres", href: "/talleres", emoji: "📚" },
  { label: "Empresas", href: "/empresas", emoji: "🏢" },
  { label: "Perfil", href: "/perfil", emoji: "👤" },
  { label: "Configuración", href: "/configuracion", emoji: "⚙️" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 right-4 z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-white rounded-lg border border-[var(--gray-200)] shadow-sm"
        aria-label="Abrir menú"
      >
        <span className="w-5 h-0.5 bg-[var(--foreground)] rounded-full" />
        <span className="w-5 h-0.5 bg-[var(--foreground)] rounded-full" />
        <span className="w-5 h-0.5 bg-[var(--foreground)] rounded-full" />
      </button>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-72 max-w-[80vw] bg-white h-full flex flex-col shadow-xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between p-4 border-b border-[var(--gray-200)]">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">P</span>
                </div>
                <span className="font-semibold text-[var(--foreground)]">Puente</span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--gray-100)] transition-colors"
                aria-label="Cerrar menú"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 4.5L13.5 13.5M4.5 13.5L13.5 4.5" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-3">
              <div className="space-y-0.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--gray-600)] hover:bg-[var(--gray-100)] transition-colors w-full"
                  >
                    <span className="text-base">{link.emoji}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </nav>

            <div className="border-t border-[var(--gray-200)] p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  MP
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--foreground)] truncate">María Pérez</p>
                  <p className="text-xs text-[var(--gray-400)] truncate">maria.perez@mail.com</p>
                </div>
              </div>
              <Link
                href="/logout"
                onClick={() => setIsOpen(false)}
                className="text-sm text-[var(--error)] hover:underline"
              >
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
