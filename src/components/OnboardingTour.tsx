"use client";

import { useState } from "react";
import Link from "next/link";

interface OnboardingTourProps {
  onComplete: () => void;
}

export default function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [step, setStep] = useState(0);
  const totalSteps = 4;

  const next = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const Dots = () => (
    <div className="flex items-center justify-center gap-2 mt-6">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            i === step ? "bg-[var(--primary)]" : "bg-[var(--gray-300)]"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
        {step === 0 && (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
              <span className="text-4xl">🌉</span>
            </div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Bienvenido/a a Puente
            </h2>
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm">
                PS
              </div>
              <span className="text-[var(--foreground)] font-medium">¡Hola, Priya!</span>
            </div>
            <p className="text-[var(--gray-500)] text-sm leading-relaxed">
              Puente es un programa de mentoría que conecta a participantes con mentores,
              talleres, oportunidades laborales y una comunidad de apoyo. Te guiaremos
              para que aproveches al máximo tu experiencia.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-[var(--gray-100)] flex items-center justify-center">
              <svg className="w-10 h-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Tu perfil</h2>
            <p className="text-[var(--gray-500)] text-sm leading-relaxed">
              Completa tu perfil para que los mentores y la comunidad puedan conocerte mejor.
              Un perfil completado al menos al <span className="font-semibold text-[var(--primary)]">70%</span> te
              da más visibilidad y mejores recomendaciones de mentores y empleos.
            </p>
            <div className="w-full bg-[var(--gray-200)] rounded-full h-3 mt-2">
              <div className="bg-[var(--primary)] h-3 rounded-full" style={{ width: "35%" }} />
            </div>
            <p className="text-xs text-[var(--gray-400)]">Tu perfil actual: 35% completado</p>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">Explora el programa</h2>
            <p className="text-[var(--gray-500)] text-sm mb-4">
              Descubre todo lo que Puente tiene para ofrecerte.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[var(--gray-100)] text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--foreground)]">Mentores</p>
                <p className="text-xs text-[var(--gray-400)]">Recibe guía personalizada</p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--gray-100)] text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--foreground)]">Talleres</p>
                <p className="text-xs text-[var(--gray-400)]">Aprende nuevas habilidades</p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--gray-100)] text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--foreground)]">Empleos</p>
                <p className="text-xs text-[var(--gray-400)]">Encuentra oportunidades</p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--gray-100)] text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--foreground)]">Comunidad</p>
                <p className="text-xs text-[var(--gray-400)]">Conecta con otros</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-[var(--success)] bg-opacity-10 flex items-center justify-center">
              <svg className="w-10 h-10 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">¡Todo listo!</h2>
            <p className="text-[var(--gray-500)] text-sm leading-relaxed">
              Ya estás preparado/a para comenzar tu camino en Puente. Elige por dónde quieres empezar.
            </p>
            <div className="space-y-3 pt-2">
              <Link
                href="/solicitar-mentor"
                className="block w-full py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors text-center"
              >
                Solicitar mentor
              </Link>
              <Link
                href="/talleres"
                className="block w-full py-3 border border-[var(--primary)] text-[var(--primary)] rounded-lg font-medium hover:bg-[var(--gray-100)] transition-colors text-center"
              >
                Ver talleres
              </Link>
              <Link
                href="/empleos"
                className="block w-full py-3 border border-[var(--gray-300)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--gray-100)] transition-colors text-center"
              >
                Explorar empleos
              </Link>
            </div>
          </div>
        )}

        <Dots />

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={onComplete}
            className="text-sm text-[var(--gray-400)] hover:text-[var(--gray-600)] transition-colors"
          >
            Omitir
          </button>
          {step < totalSteps - 1 ? (
            <button
              onClick={next}
              className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:bg-[var(--primary-hover)] transition-colors"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={onComplete}
              className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-lg font-medium text-sm hover:bg-[var(--primary-hover)] transition-colors"
            >
              Empezar →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
