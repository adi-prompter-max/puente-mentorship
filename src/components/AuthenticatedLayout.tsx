"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface AuthenticatedLayoutProps {
  children: ReactNode;
  rightSidebar?: ReactNode;
  activeNav: string;
}

const NAV_ITEMS = [
  { label: "Scroll", icon: "scroll", href: "/perfil/priya-sharma?tab=actividad" },
  { label: "Proyectos", icon: "proyectos", href: "/perfil/priya-sharma" },
  { label: "Bandeja", icon: "bandeja", href: "/mensajes", badge: 2 },
  { label: "Empleos", icon: "empleos", href: "/empleos" },
  { label: "Buscar", icon: "buscar", href: "/buscar" },
  { label: "Mi Red", icon: "red", href: "/perfil/priya-sharma?tab=mentores" },
];

function NavIcon({ icon, className }: { icon: string; className?: string }) {
  const cls = className || "w-5 h-5";
  switch (icon) {
    case "scroll":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5" />
        </svg>
      );
    case "proyectos":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      );
    case "bandeja":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      );
    case "empleos":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      );
    case "buscar":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      );
    case "red":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AuthenticatedLayout({
  children,
  rightSidebar,
  activeNav,
}: AuthenticatedLayoutProps) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--gray-50)" }}>
      {/* ── Left Sidebar ── */}
      <aside
        className="sticky top-0 flex h-screen w-[68px] flex-col items-center justify-between py-6"
        style={{ background: "var(--gray-900)" }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center gap-8">
          <Link href="/" className="mb-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ background: "var(--primary)" }}
            >
              P
            </div>
          </Link>

          {/* Nav Items */}
          <nav className="flex flex-col items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative flex flex-col items-center gap-1 rounded-xl px-3 py-2.5 transition-colors"
                  style={{
                    color: isActive ? "var(--primary)" : "var(--gray-400)",
                    background: isActive ? "var(--gray-800)" : "transparent",
                  }}
                >
                  <div className="relative">
                    <NavIcon icon={item.icon} />
                    {item.badge && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: "var(--primary)" }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium">{item.label}</span>

                  {/* Hover tooltip */}
                  <span
                    className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ background: "var(--gray-700)" }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Avatar */}
        <Link
          href="/perfil/priya-sharma"
          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ background: "var(--primary)" }}
        >
          PS
        </Link>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* ── Right Sidebar (optional) ── */}
      {rightSidebar && (
        <aside
          className="sticky top-0 hidden h-screen w-80 overflow-y-auto border-l xl:block"
          style={{ borderColor: "var(--gray-200)", background: "white" }}
        >
          {rightSidebar}
        </aside>
      )}
    </div>
  );
}
