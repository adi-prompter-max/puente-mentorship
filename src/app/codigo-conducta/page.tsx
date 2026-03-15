"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CodigoDeConductaPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ color: "var(--foreground)" }}>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-2">Código de Conducta</h1>
          <p className="text-sm mb-12" style={{ color: "var(--gray-500)" }}>
            Última actualización: 1 de marzo de 2026
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                1. Nuestro Compromiso
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                En Puente nos comprometemos a crear y mantener un entorno
                inclusivo, acogedor y respetuoso para todas las personas,
                independientemente de su origen, nacionalidad, género, orientación
                sexual, discapacidad, religión o cualquier otra característica
                personal. Creemos que la diversidad enriquece nuestro programa y
                fortalece la experiencia de todos los participantes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. Comportamiento Esperado
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Todos los participantes del programa deben actuar con respeto,
                profesionalismo y espíritu de colaboración. Se espera que los
                mentores y estudiantes mantengan una comunicación constructiva,
                cumplan con los compromisos adquiridos, respeten la
                confidencialidad de las conversaciones de mentoría y contribuyan
                a generar un ambiente positivo de aprendizaje mutuo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. Comportamiento Inaceptable
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                No se tolerará ninguna forma de acoso, discriminación,
                intimidación o comportamiento ofensivo dentro del programa. Esto
                incluye, entre otros: comentarios despectivos o humillantes,
                contacto físico o virtual no deseado, difusión de información
                privada sin consentimiento, envío de spam o contenido comercial
                no solicitado y cualquier conducta que genere un ambiente hostil
                para otros participantes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                4. Consecuencias
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Las infracciones a este Código de Conducta serán evaluadas por el
                equipo de Puente y podrán dar lugar a las siguientes medidas, en
                función de la gravedad: amonestación verbal o escrita, suspensión
                temporal de la participación en el programa o expulsión
                definitiva del mismo. En casos graves, Puente se reserva el
                derecho de comunicar los hechos a las autoridades competentes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                5. Proceso de Denuncia
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Si eres testigo o víctima de un comportamiento que infrinja este
                Código de Conducta, te animamos a comunicarlo lo antes posible.
                Puedes enviar tu denuncia de forma confidencial a
                conducta@puente.es o utilizar el formulario de{" "}
                <Link
                  href="/contacto"
                  className="underline"
                  style={{ color: "var(--primary)" }}
                >
                  contacto
                </Link>
                . Todas las denuncias serán tratadas con la máxima
                confidencialidad y diligencia.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Alcance</h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Este Código de Conducta se aplica a todas las actividades
                relacionadas con el programa Puente, incluyendo sesiones de
                mentoría, eventos presenciales y virtuales, comunicaciones a
                través de la plataforma y cualquier interacción entre
                participantes en el contexto del programa. Su cumplimiento es
                obligatorio para mentores, estudiantes y cualquier persona
                involucrada en las actividades de Puente.
              </p>
            </section>
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
