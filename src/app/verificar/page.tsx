"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";

function VerificarForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "tu@correo.com";
  const username = searchParams.get("username") || "";

  const [code, setCode] = useState("");
  const [status, setStatus] = useState<
    "idle" | "verifying" | "success" | "error"
  >("idle");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleVerify = () => {
    if (code.length < 5) return;
    setStatus("verifying");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        router.push(
          `/perfil/completar?username=${encodeURIComponent(username)}`
        );
      }, 500);
    }, 1500);
  };

  const handleResend = () => {
    setCode("");
    setStatus("idle");
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-md mx-auto px-6 pt-32 pb-16">
        <div className="border border-[var(--gray-200)] rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Verifica tu correo</h2>
          <p className="text-sm text-[var(--gray-500)] mb-6">
            Hemos enviado un correo a{" "}
            <span className="font-medium text-[var(--foreground)]">
              {email}
            </span>{" "}
            con un código de verificación. Si no lo ves, revisa tu carpeta de
            spam.
          </p>

          <div className="mb-2">
            <label className="block text-sm text-left text-[var(--gray-600)] mb-1">
              Código de verificación
            </label>
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={5}
              placeholder=""
              className="w-full border border-[var(--gray-300)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors tracking-widest text-center text-lg"
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            />
          </div>

          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={handleResend}
              className="text-xs text-[var(--gray-500)] hover:text-[var(--foreground)] transition-colors"
            >
              Reenviar código
            </button>
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={code.length < 5 || status === "verifying"}
            className="w-full bg-[var(--foreground)] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#333] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {status === "verifying" ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              <>Verificar y continuar →</>
            )}
          </button>

          {status === "error" && (
            <p className="text-xs text-[var(--error)] mt-3">
              Código incorrecto. Inténtalo de nuevo.
            </p>
          )}
        </div>

        <p className="text-sm text-center mt-6 text-[var(--gray-400)]">
          ¿Necesitas ayuda?{" "}
          <a href="/" className="font-medium text-[var(--foreground)]">
            Contáctanos
          </a>
        </p>
      </main>
    </div>
  );
}

export default function VerificarPage() {
  return (
    <Suspense>
      <VerificarForm />
    </Suspense>
  );
}
