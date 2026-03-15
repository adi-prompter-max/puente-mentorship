"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ContactoPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-4xl font-bold" style={{ color: "var(--foreground)" }}>
            Contacto
          </h1>
          <p className="mt-4 text-lg" style={{ color: "var(--gray-500)" }}>
            ¿Tienes preguntas o sugerencias? Estamos aquí para ayudarte.
          </p>

          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            {/* Left - Form */}
            <div>
              {sent ? (
                <div
                  className="rounded-xl border p-8 text-center"
                  style={{ borderColor: "var(--success)", backgroundColor: "#f0fdf4" }}
                >
                  <div className="text-4xl">✅</div>
                  <h3 className="mt-4 text-xl font-semibold" style={{ color: "var(--foreground)" }}>
                    ¡Mensaje enviado!
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "var(--gray-500)" }}>
                    Te responderemos en 24-48 horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2"
                      style={{
                        borderColor: "var(--gray-300)",
                        color: "var(--foreground)",
                      }}
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2"
                      style={{
                        borderColor: "var(--gray-300)",
                        color: "var(--foreground)",
                      }}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      Asunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2"
                      style={{
                        borderColor: "var(--gray-300)",
                        color: form.subject ? "var(--foreground)" : "var(--gray-400)",
                      }}
                    >
                      <option value="" disabled>
                        Selecciona un asunto
                      </option>
                      <option value="general">Información general</option>
                      <option value="soporte">Soporte técnico</option>
                      <option value="mentor">Quiero ser mentor</option>
                      <option value="empresa">Empresa colaboradora</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="mt-1 w-full resize-none rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:ring-2"
                      style={{
                        borderColor: "var(--gray-300)",
                        color: "var(--foreground)",
                      }}
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60"
                    style={{ backgroundColor: sending ? "var(--gray-400)" : "var(--primary)" }}
                    onMouseEnter={(e) => {
                      if (!sending) e.currentTarget.style.backgroundColor = "var(--primary-hover)";
                    }}
                    onMouseLeave={(e) => {
                      if (!sending) e.currentTarget.style.backgroundColor = "var(--primary)";
                    }}
                  >
                    {sending ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              )}
            </div>

            {/* Right - Contact Info */}
            <div className="space-y-6">
              {/* Email */}
              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--gray-200)" }}
              >
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  Correo electrónico
                </h3>
                <a
                  href="mailto:contacto@puente.io"
                  className="mt-1 block text-sm"
                  style={{ color: "var(--primary)" }}
                >
                  contacto@puente.io
                </a>
              </div>

              {/* Location */}
              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--gray-200)" }}
              >
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  Ubicación
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--gray-500)" }}>
                  Madrid, España - Fundación Universidad-Empresa
                </p>
              </div>

              {/* Hours */}
              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--gray-200)" }}
              >
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  Horario
                </h3>
                <p className="mt-1 text-sm" style={{ color: "var(--gray-500)" }}>
                  Lunes a Viernes, 9:00 - 18:00 CET
                </p>
              </div>

              {/* Social */}
              <div
                className="rounded-xl border p-5"
                style={{ borderColor: "var(--gray-200)" }}
              >
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  Redes sociales
                </h3>
                <div className="mt-3 flex gap-4">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                    style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-500)" }}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                    style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-500)" }}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                    style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-500)" }}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div
                className="flex h-48 items-center justify-center rounded-xl"
                style={{ backgroundColor: "var(--gray-100)" }}
              >
                <span className="text-lg" style={{ color: "var(--gray-400)" }}>
                  📍 Madrid, España
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
