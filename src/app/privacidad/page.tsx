"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ color: "var(--foreground)" }}>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-2">Política de Privacidad</h1>
          <p className="text-sm mb-12" style={{ color: "var(--gray-500)" }}>
            Última actualización: 1 de marzo de 2026
          </p>

          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-3">
                1. Responsable del Tratamiento
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                El responsable del tratamiento de sus datos personales es la
                Fundación Universidad-Empresa (FUE), con domicilio social en
                C/ Serrano 231, 28016 Madrid, España, y CIF G-28507909. Puede
                contactar con el responsable del tratamiento a través del correo
                electrónico privacidad@puente.es.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                2. Datos que Recopilamos
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Recopilamos los siguientes tipos de datos: datos de perfil
                (nombre, correo electrónico, nacionalidad, formación académica,
                experiencia profesional y objetivos laborales), datos de uso
                (interacciones con la plataforma, sesiones de mentoría y
                progreso en el programa) y datos de comunicaciones (mensajes
                intercambiados con mentores y con el equipo de soporte). Solo
                recopilamos los datos estrictamente necesarios para la prestación
                del servicio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Base Legal</h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                El tratamiento de sus datos se fundamenta en las siguientes bases
                legales: el consentimiento expreso del usuario al registrarse en
                la plataforma, la ejecución del contrato de participación en el
                programa de mentoría y el interés legítimo de Puente en mejorar
                la calidad del servicio y realizar análisis estadísticos
                anonimizados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                4. Finalidad del Tratamiento
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Sus datos personales serán tratados con las siguientes
                finalidades: gestionar su participación en el programa de
                mentoría, facilitar el emparejamiento con mentores adecuados,
                realizar seguimiento del progreso y evaluar la eficacia del
                programa. Asimismo, podremos enviarle comunicaciones relacionadas
                con el servicio y oportunidades profesionales relevantes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                5. Destinatarios
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Sus datos podrán ser compartidos con los mentores asignados en el
                marco del programa, con empresas colaboradoras que participen en
                actividades de inserción laboral y con la Fundación
                Universidad-Empresa como entidad financiadora. No se cederán
                datos a terceros ajenos al programa sin su consentimiento previo,
                salvo obligación legal.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                6. Transferencias Internacionales
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                En principio, sus datos se tratan dentro del Espacio Económico
                Europeo. En caso de que fuera necesario realizar transferencias
                internacionales de datos, estas se llevarán a cabo con las
                garantías adecuadas previstas en el RGPD, como cláusulas
                contractuales tipo aprobadas por la Comisión Europea o decisiones
                de adecuación.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                7. Plazo de Conservación
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Sus datos personales serán conservados durante la duración de su
                participación en el programa y durante un período adicional de 2
                años para fines de seguimiento y evaluación. Transcurrido este
                plazo, los datos serán eliminados o anonimizados, salvo que
                exista una obligación legal que requiera su conservación durante
                un período superior.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                8. Derechos del Interesado
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Usted tiene derecho a acceder a sus datos personales, solicitar
                su rectificación o supresión, oponerse al tratamiento, solicitar
                la limitación del mismo y ejercer su derecho a la portabilidad de
                los datos. Para ejercer estos derechos, envíe una solicitud a
                privacidad@puente.es acompañada de una copia de su documento de
                identidad. También tiene derecho a presentar una reclamación ante
                la Agencia Española de Protección de Datos (AEPD).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Cookies</h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Nuestra plataforma utiliza cookies técnicas necesarias para el
                funcionamiento del servicio y cookies analíticas para comprender
                cómo se utiliza la plataforma. Puede gestionar sus preferencias
                de cookies en cualquier momento a través del panel de
                configuración de cookies. Para más información, consulte nuestra
                política de cookies detallada.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">
                10. Contacto del DPO
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                Puede contactar con nuestro Delegado de Protección de Datos en
                cualquier momento a través del correo electrónico dpo@puente.es
                o mediante correo postal dirigido a: Delegado de Protección de
                Datos, Fundación Universidad-Empresa, C/ Serrano 231, 28016
                Madrid, España. Atenderemos su consulta en un plazo máximo de 30
                días.
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
