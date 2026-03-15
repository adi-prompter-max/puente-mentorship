"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";

function RegistroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reservedUsername = searchParams.get("username") || "";

  const [role, setRole] = useState<"estudiante" | "mentor" | "admin">("estudiante");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "El correo es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Introduce un correo válido.";
    if (!password) newErrors.password = "La contraseña es obligatoria.";
    else if (password.length < 8)
      newErrors.password = "Mínimo 8 caracteres.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      router.push(
        `/verificar?email=${encodeURIComponent(email)}&username=${encodeURIComponent(reservedUsername)}&role=${role}`
      );
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left side - Program benefits */}
          <div className="hidden md:block">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-semibold text-lg">Puente</span>
            </div>
            <h2 className="text-3xl font-bold leading-snug">
              Tu programa de mentoría{" "}
              <span className="text-[var(--primary)]">
                para triunfar en España.
              </span>
            </h2>
            <p className="mt-4 text-[var(--gray-500)] leading-relaxed">
              Accede a mentoría personalizada, talleres prácticos y conexiones
              directas con empresas que contratan talento internacional.
            </p>

            {/* Program highlights */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">6 sesiones de mentoría individual</p>
                  <p className="text-xs text-[var(--gray-400)]">
                    CV europeo, LinkedIn, plan de acción personalizado
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Talleres de empleo y regulaciones</p>
                  <p className="text-xs text-[var(--gray-400)]">
                    Permisos de trabajo, búsqueda de prácticas, entrevistas
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Acceso directo a empresas colaboradoras</p>
                  <p className="text-xs text-[var(--gray-400)]">
                    Speed-networking, presentación de candidatos, eventos
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Guía en regulaciones migratorias</p>
                  <p className="text-xs text-[var(--gray-400)]">
                    Residencia estudiantil, permisos, vías laborales en la UE
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2">
              <div className="flex -space-x-2">
                {[
                  "bg-blue-400",
                  "bg-pink-400",
                  "bg-yellow-400",
                  "bg-purple-400",
                  "bg-green-400",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 ${color} rounded-full border-2 border-white`}
                  />
                ))}
              </div>
              <span className="text-sm text-[var(--gray-500)]">
                Únete a estudiantes de Asia, África y LATAM.
              </span>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white border border-[var(--gray-200)] rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-1">Solicitar plaza</h2>
            {reservedUsername && (
              <p className="text-sm text-[var(--gray-500)] mb-6">
                🎉 Estamos reservando{" "}
                <span className="font-medium text-[var(--primary)]">
                  puente.io/{reservedUsername}
                </span>{" "}
                para ti.
              </p>
            )}
            {!reservedUsername && (
              <p className="text-sm text-[var(--gray-500)] mb-6">
                Crea tu perfil para acceder al programa de mentoría.
              </p>
            )}

            {/* Role selector */}
            <div className="mb-6">
              <label className="block text-sm text-[var(--gray-600)] mb-2">
                ¿Cómo quieres participar?
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("estudiante")}
                  className={`border rounded-xl p-4 text-left transition-all ${
                    role === "estudiante"
                      ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]"
                      : "border-[var(--gray-200)] hover:border-[var(--gray-400)]"
                  }`}
                >
                  <span className="text-lg block mb-1">🎓</span>
                  <p className="text-sm font-semibold">Estudiante</p>
                  <p className="text-xs text-[var(--gray-400)]">
                    Busco mentoría
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("mentor")}
                  className={`border rounded-xl p-4 text-left transition-all ${
                    role === "mentor"
                      ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]"
                      : "border-[var(--gray-200)] hover:border-[var(--gray-400)]"
                  }`}
                >
                  <span className="text-lg block mb-1">🤝</span>
                  <p className="text-sm font-semibold">Mentor/a</p>
                  <p className="text-xs text-[var(--gray-400)]">
                    Guiar estudiantes
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`border rounded-xl p-4 text-left transition-all ${
                    role === "admin"
                      ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]"
                      : "border-[var(--gray-200)] hover:border-[var(--gray-400)]"
                  }`}
                >
                  <span className="text-lg block mb-1">⚙️</span>
                  <p className="text-sm font-semibold">Coordinador</p>
                  <p className="text-xs text-[var(--gray-400)]">
                    Gestionar programa
                  </p>
                </button>
              </div>
            </div>

            {/* Google OAuth */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-[var(--gray-300)] rounded-lg py-2.5 text-sm font-medium hover:bg-[var(--gray-100)] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continuar con Google
            </button>

            <div className="flex items-center my-5">
              <div className="flex-1 border-t border-[var(--gray-200)]" />
              <span className="px-3 text-xs text-[var(--gray-400)]">
                o continuar con email
              </span>
              <div className="flex-1 border-t border-[var(--gray-200)]" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--gray-600)] mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@universidad.com"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors ${
                    errors.email
                      ? "border-[var(--error)]"
                      : "border-[var(--gray-300)] focus:border-[var(--primary)]"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-[var(--error)] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-[var(--gray-600)] mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm outline-none transition-colors pr-10 ${
                      errors.password
                        ? "border-[var(--error)]"
                        : "border-[var(--gray-300)] focus:border-[var(--primary)]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-400)] hover:text-[var(--gray-600)]"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-[var(--error)] mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--foreground)] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#333] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>
                    Solicitar plaza →
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-[var(--gray-400)] text-center mt-4">
              Al registrarte aceptas nuestro{" "}
              <a href="/" className="underline">
                Código de Conducta
              </a>
              ,{" "}
              <a href="/" className="underline">
                Términos de Servicio
              </a>{" "}
              y{" "}
              <a href="/" className="underline">
                Política de Privacidad
              </a>
              .
            </p>

            <p className="text-sm text-center mt-5 text-[var(--gray-500)]">
              ¿Ya tienes cuenta?{" "}
              <a href="/" className="text-[var(--foreground)] font-medium">
                Iniciar sesión
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function RegistroPage() {
  return (
    <Suspense>
      <RegistroForm />
    </Suspense>
  );
}
