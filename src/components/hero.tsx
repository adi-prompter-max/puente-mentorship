"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState<
    "idle" | "checking" | "available" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!username) {
      setStatus("idle");
      return;
    }

    const timer = setTimeout(() => {
      const valid = /^[a-zA-Z0-9_]+$/.test(username);
      if (!valid) {
        setStatus("error");
        setErrorMsg(
          "Ya eres especial. ¿Por qué un carácter especial? 😄"
        );
        return;
      }
      if (username.length < 3) {
        setStatus("error");
        setErrorMsg("El nombre de usuario debe tener al menos 3 caracteres.");
        return;
      }
      setStatus("checking");
      setTimeout(() => {
        setStatus("available");
      }, 500);
    }, 300);

    return () => clearTimeout(timer);
  }, [username]);

  const handleClaim = () => {
    if (status === "available") {
      router.push(`/registro?username=${encodeURIComponent(username)}`);
    }
  };

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-[var(--primary)] mb-3 tracking-wide uppercase">
        Programa de Mentoría para Estudiantes Internacionales
      </p>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
        Tu puente hacia el
        <br />
        <span className="text-[var(--primary)]">
          mercado laboral español
        </span>
      </h1>
      <p className="mt-5 text-lg text-[var(--gray-500)] max-w-2xl mx-auto">
        Facilitamos la integración profesional de estudiantes no-UE (Asia,
        África, LATAM) en España y Europa mediante mentoría personalizada,
        talleres prácticos y acceso a empresas colaboradoras.
      </p>

      {/* Username input */}
      <div className="mt-10 flex justify-center">
        <div className="flex items-center gap-0 border border-[var(--gray-300)] rounded-full px-5 py-3 bg-white shadow-sm max-w-md w-full">
          <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span className="ml-2 text-[var(--gray-500)] text-sm whitespace-nowrap">
            puente.io/
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="tu-usuario"
            className="flex-1 outline-none text-sm bg-transparent min-w-0"
            onKeyDown={(e) => e.key === "Enter" && handleClaim()}
          />
          <button
            onClick={handleClaim}
            disabled={status !== "available"}
            className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
              status === "available"
                ? "bg-[var(--primary)] text-white cursor-pointer hover:bg-[var(--primary-hover)]"
                : "bg-[var(--gray-200)] text-[var(--gray-400)] cursor-not-allowed"
            }`}
          >
            →
          </button>
        </div>
      </div>

      {/* Status message */}
      <div className="mt-3 h-6 text-sm">
        {status === "idle" && username === "" && (
          <span className="text-[var(--gray-400)]">
            Reserva tu perfil y accede al programa de mentoría.
          </span>
        )}
        {status === "error" && (
          <span className="text-[var(--error)]">{errorMsg}</span>
        )}
        {status === "checking" && (
          <span className="text-[var(--gray-400)]">Verificando...</span>
        )}
        {status === "available" && (
          <span className="text-[var(--success)]">
            ¡Está disponible! Este nombre de usuario es tuyo 🎉
          </span>
        )}
      </div>
    </div>
  );
}
