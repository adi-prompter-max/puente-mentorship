"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

const faqData: FAQSection[] = [
  {
    title: "Sobre el Programa",
    items: [
      {
        question: "¿Qué es Puente?",
        answer:
          "Puente es un programa de mentoría diseñado para conectar a estudiantes internacionales no comunitarios en España con profesionales experimentados. Nuestro objetivo es facilitar la integración laboral y social mediante acompañamiento personalizado, orientación profesional y acceso a una red de contactos en el mercado español.",
      },
      {
        question: "¿Quién puede participar?",
        answer:
          "El programa está dirigido a estudiantes internacionales de países no pertenecientes a la Unión Europea que se encuentren cursando estudios en universidades o centros de formación en España. Es necesario contar con un permiso de residencia vigente por estudios y estar matriculado en una institución educativa reconocida.",
      },
      {
        question: "¿Cuánto dura el programa?",
        answer:
          "El programa tiene una duración de 6 meses y se estructura en 4 fases: diagnóstico inicial, desarrollo de competencias, conexión con el mercado laboral y seguimiento. Cada fase incluye actividades específicas, sesiones de mentoría y recursos adaptados a las necesidades del participante.",
      },
      {
        question: "¿Tiene algún coste?",
        answer:
          "No, el programa es completamente gratuito para los estudiantes. Puente está financiado por la Fundación Universidad-Empresa (FUE) y cuenta con el apoyo de empresas colaboradoras que hacen posible ofrecer este servicio sin coste alguno para los participantes.",
      },
    ],
  },
  {
    title: "Mentoría",
    items: [
      {
        question: "¿Cómo se asigna un mentor?",
        answer:
          "Una vez completado tu perfil y enviada tu solicitud, nuestro equipo revisa tus intereses profesionales, sector de estudio y objetivos laborales. A partir de esta información, te emparejamos con un mentor cuya experiencia y trayectoria se alineen con tus metas. Recibirás una notificación cuando tu mentor haya sido asignado.",
      },
      {
        question: "¿Con qué frecuencia son las sesiones?",
        answer:
          "Las sesiones de mentoría se realizan de forma quincenal, con una duración aproximada de 45 a 60 minutos. Pueden llevarse a cabo de manera online mediante videollamada o presencialmente, según la disponibilidad y preferencia de ambas partes. El calendario se acuerda entre mentor y mentee.",
      },
      {
        question: "¿Puedo cambiar de mentor?",
        answer:
          "Sí, si consideras que la relación de mentoría no está funcionando como esperabas, puedes solicitar un cambio de mentor. Para ello, contacta con nuestro equipo a través del formulario de soporte o envíanos un correo electrónico explicando tu situación. Gestionaremos la reasignación lo antes posible.",
      },
    ],
  },
  {
    title: "Regulaciones",
    items: [
      {
        question: "¿Puedo trabajar con visado de estudiante?",
        answer:
          "Sí, los estudiantes internacionales con permiso de residencia por estudios pueden trabajar hasta 20 horas semanales en España, siempre que obtengan una autorización de trabajo compatible con sus estudios. Esta autorización debe ser solicitada por el empleador ante la Oficina de Extranjería correspondiente.",
      },
      {
        question: "¿Qué es el NIE?",
        answer:
          "El NIE (Número de Identidad de Extranjero) es un número de identificación único asignado a todos los extranjeros que realizan trámites en España. Es imprescindible para trabajar, abrir una cuenta bancaria, firmar contratos y realizar gestiones administrativas. Se obtiene en la Oficina de Extranjería o en la comisaría de policía correspondiente.",
      },
      {
        question: "¿Cómo cambio de permiso de estudios a trabajo?",
        answer:
          "Para modificar tu situación de estancia por estudios a residencia y trabajo, debes haber permanecido al menos tres años en España como estudiante, contar con una oferta de empleo y cumplir los requisitos establecidos en la normativa de extranjería. El trámite se realiza ante la Oficina de Extranjería y requiere documentación específica según cada caso.",
      },
    ],
  },
  {
    title: "Técnica",
    items: [
      {
        question: "¿Cómo completo mi perfil?",
        answer:
          "Para alcanzar al menos el 70% de completitud en tu perfil, accede a la sección 'Mi Perfil' desde el panel principal. Asegúrate de rellenar todos los campos obligatorios: datos personales, formación académica, experiencia laboral, idiomas y objetivos profesionales. Sube también una foto de perfil y tu CV actualizado para mejorar tu visibilidad ante los mentores.",
      },
      {
        question: "¿Cómo contacto con soporte?",
        answer:
          "Puedes contactar con nuestro equipo de soporte técnico enviando un correo electrónico a soporte@puente.es o completando el formulario de contacto disponible en la sección de Contacto de nuestra plataforma. Nuestro horario de atención es de lunes a viernes, de 9:00 a 18:00 horas.",
      },
    ],
  },
];

export default function AyudaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const filteredSections = faqData
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ color: "var(--foreground)" }}>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-2">Centro de Ayuda</h1>
          <p className="text-sm mb-8" style={{ color: "var(--gray-500)" }}>
            Encuentra respuestas a las preguntas más frecuentes sobre Puente.
          </p>

          <div className="mb-10">
            <input
              type="text"
              placeholder="Buscar en preguntas frecuentes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: "var(--gray-200)",
                backgroundColor: "var(--gray-100)",
                color: "var(--foreground)",
              }}
            />
          </div>

          {filteredSections.length === 0 && (
            <p className="text-sm text-center py-8" style={{ color: "var(--gray-500)" }}>
              No se encontraron resultados para &quot;{searchQuery}&quot;.
            </p>
          )}

          {filteredSections.map((section) => (
            <div key={section.title} className="mb-10">
              <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
              <div
                className="rounded-lg border border-[var(--gray-200)] divide-y divide-[var(--gray-200)]"
              >
                {section.items.map((item, idx) => {
                  const key = `${section.title}-${idx}`;
                  const isOpen = openItems.has(key);
                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-opacity-50 transition-colors"
                        style={{ color: "var(--foreground)" }}
                      >
                        <span>{item.question}</span>
                        <svg
                          className={`w-4 h-4 shrink-0 ml-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div
                          className="px-5 pb-4 text-sm leading-relaxed"
                          style={{ color: "var(--gray-600)" }}
                        >
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div
            className="rounded-lg border p-6 text-center mt-12"
            style={{
              borderColor: "var(--gray-200)",
              backgroundColor: "var(--gray-100)",
            }}
          >
            <h3 className="text-lg font-semibold mb-2">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--gray-500)" }}>
              Nuestro equipo está disponible para resolver cualquier duda que
              tengas.
            </p>
            <Link
              href="/contacto"
              className="inline-block rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: "var(--primary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--primary-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--primary)")
              }
            >
              Contáctanos
            </Link>
          </div>
        </div>

        <footer
          className="border-t py-8 text-center text-xs"
          style={{
            borderColor: "var(--gray-200)",
            color: "var(--gray-400)",
          }}
        >
          © 2026 Puente. Todos los derechos reservados.
        </footer>
      </main>
    </>
  );
}
