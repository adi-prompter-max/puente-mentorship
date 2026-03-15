"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function RecuperarContrasenaPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Por favor, introduce tu correo electrónico.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setStep(2);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError("El código debe tener 6 caracteres.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    setStep(3);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--gray-100)]">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {success ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--success)] bg-opacity-10 flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">
                ¡Contraseña actualizada!
              </h2>
              <p className="text-[var(--gray-500)]">
                Tu contraseña ha sido cambiada correctamente.
              </p>
              <Link
                href="/login"
                className="inline-block mt-4 px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors"
              >
                Ir a iniciar sesión
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                Recuperar contraseña
              </h1>
              <p className="text-[var(--gray-500)] mb-6 text-sm">
                {step === 1 && "Introduce tu correo electrónico para recibir un enlace de recuperación."}
                {step === 2 && "Introduce el código de verificación que hemos enviado."}
                {step === 3 && "Crea una nueva contraseña para tu cuenta."}
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 text-[var(--error)] text-sm">
                  {error}
                </div>
              )}

              {step === 1 && (
                <form onSubmit={handleSendLink} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder:text-[var(--gray-400)]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60"
                  >
                    {loading ? "Enviando..." : "Enviar enlace de recuperación"}
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="p-4 rounded-lg bg-[var(--gray-100)] text-sm text-[var(--gray-600)]">
                    Hemos enviado un enlace a <span className="font-semibold text-[var(--foreground)]">{email}</span>
                  </div>
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Código de verificación
                    </label>
                    <input
                      id="code"
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder:text-[var(--gray-400)] text-center tracking-widest text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60"
                  >
                    {loading ? "Verificando..." : "Verificar código"}
                  </button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Nueva contraseña
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder:text-[var(--gray-400)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--foreground)] mb-1">
                      Confirmar contraseña
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repite tu contraseña"
                      className="w-full px-4 py-3 rounded-lg border border-[var(--gray-300)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-[var(--foreground)] placeholder:text-[var(--gray-400)]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-60"
                  >
                    {loading ? "Actualizando..." : "Cambiar contraseña"}
                  </button>
                </form>
              )}

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-colors"
                >
                  ← Volver a iniciar sesión
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
