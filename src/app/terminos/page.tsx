"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function TerminosPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ color: "var(--foreground)" }}>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-2">Términos de Servicio</h1>
          <p className="text-sm mb-12" style={{ color: "var(--gray-500)" }}>
            Última actualización: 1 de marzo de 2026
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                1. Aceptación de los Términos
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Al acceder y utilizar la plataforma Puente, el usuario acepta
                quedar vinculado por los presentes Términos de Servicio. Si no
                está de acuerdo con alguna de estas condiciones, deberá
                abstenerse de utilizar la plataforma. El uso continuado del
                servicio tras la publicación de modificaciones constituye la
                aceptación de dichos cambios.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. Descripción del Servicio
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Puente es una plataforma de mentoría que conecta a estudiantes
                internacionales no comunitarios con profesionales establecidos en
                España. El servicio incluye emparejamiento con mentores, sesiones
                de orientación, recursos formativos y acceso a una red de
                contactos profesionales. La disponibilidad de funcionalidades
                puede variar según la fase del programa.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                3. Registro y Cuenta
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Para acceder al servicio es necesario crear una cuenta
                proporcionando información veraz, completa y actualizada. El
                usuario es responsable de mantener la confidencialidad de sus
                credenciales de acceso y de todas las actividades realizadas bajo
                su cuenta. Cualquier uso no autorizado deberá comunicarse
                inmediatamente al equipo de Puente.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Uso Aceptable</h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                El usuario se compromete a utilizar la plataforma exclusivamente
                para los fines previstos en el programa de mentoría. Queda
                prohibido el uso de la plataforma para actividades ilegales,
                envío de contenido ofensivo, suplantación de identidad o
                cualquier acción que pueda dañar la reputación del programa o de
                sus participantes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                5. Propiedad Intelectual
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Todos los contenidos de la plataforma, incluidos textos, gráficos,
                logotipos, materiales formativos y software, son propiedad de
                Puente o de sus licenciantes y están protegidos por las leyes de
                propiedad intelectual vigentes. Queda prohibida su reproducción,
                distribución o modificación sin autorización expresa por escrito.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                6. Protección de Datos (RGPD)
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                El tratamiento de datos personales se realiza de conformidad con
                el Reglamento General de Protección de Datos (UE) 2016/679 y la
                Ley Orgánica 3/2018 de Protección de Datos Personales. Para más
                información sobre cómo recopilamos y tratamos sus datos,
                consulte nuestra{" "}
                <Link
                  href="/privacidad"
                  className="underline"
                  style={{ color: "var(--primary)" }}
                >
                  Política de Privacidad
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                7. Limitación de Responsabilidad
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Puente facilita la conexión entre mentores y estudiantes, pero no
                garantiza resultados específicos derivados de la mentoría. La
                plataforma no será responsable de daños indirectos, incidentales
                o consecuentes que pudieran derivarse del uso del servicio. La
                responsabilidad total se limitará al máximo permitido por la
                legislación aplicable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                8. Modificaciones
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Puente se reserva el derecho de modificar estos Términos de
                Servicio en cualquier momento. Las modificaciones entrarán en
                vigor desde su publicación en la plataforma. Se notificará a los
                usuarios registrados por correo electrónico sobre cambios
                sustanciales con al menos 30 días de antelación.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                9. Ley Aplicable
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Estos Términos de Servicio se rigen e interpretan de acuerdo con
                la legislación española. Para la resolución de cualquier
                controversia derivada del uso de la plataforma, las partes se
                someten a la jurisdicción de los juzgados y tribunales de Madrid,
                España, con renuncia expresa a cualquier otro fuero.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contacto</h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Para cualquier consulta relacionada con estos Términos de
                Servicio, puede ponerse en contacto con nosotros a través del
                correo electrónico legal@puente.es o mediante el formulario de{" "}
                <Link
                  href="/contacto"
                  className="underline"
                  style={{ color: "var(--primary)" }}
                >
                  contacto
                </Link>{" "}
                disponible en nuestra plataforma.
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
