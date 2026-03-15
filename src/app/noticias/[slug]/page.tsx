"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useState } from "react";

interface ArticleData {
  title: string;
  category: string;
  categoryClass: string;
  author: string;
  date: string;
  readingTime: string;
  tags: string[];
  paragraphs: string[];
  related: { slug: string; title: string; date: string }[];
}

const articlesMap: Record<string, ArticleData> = {
  "puente-100-estudiantes": {
    title: "Puente alcanza 100 estudiantes activos en su primer trimestre",
    category: "Programa",
    categoryClass: "bg-emerald-100 text-emerald-700",
    author: "Equipo Puente",
    date: "10 Mar 2026",
    readingTime: "3 min de lectura",
    tags: ["Programa", "Hitos", "Estudiantes", "Mentoría"],
    paragraphs: [
      "En solo tres meses desde su lanzamiento oficial, Puente ha alcanzado un hito que marca el inicio de una nueva etapa: 100 estudiantes latinoamericanos activos participando en el programa de mentoría profesional. Este logro refleja no solo la necesidad de un servicio como el nuestro, sino también la confianza que la comunidad ha depositado en nuestra misión.",
      "Los estudiantes provienen de más de 12 países de América Latina, con una representación especialmente fuerte de Colombia, México, Argentina y Perú. La mayoría se encuentra cursando másteres en universidades españolas en áreas como ingeniería, administración de empresas, derecho internacional y ciencias de la salud.",
      "Cada estudiante ha sido emparejado con un mentor profesional que trabaja en España, creando conexiones que van más allá de lo académico. Los mentores, que suman ya más de 40, dedican entre dos y cuatro horas al mes para guiar a sus mentees en temas como la búsqueda de empleo, la adaptación cultural y el desarrollo de habilidades profesionales específicas para el mercado español.",
      "María López, directora del programa, señala que el éxito inicial se debe en gran parte al modelo de mentoría personalizada: «No se trata solo de dar consejos generales. Cada relación mentor-mentee es única y se adapta a las necesidades, objetivos y contexto particular de cada estudiante. Eso es lo que marca la diferencia.»",
      "De cara al próximo trimestre, Puente planea expandir su red de empresas colaboradoras e introducir talleres grupales mensuales sobre temas como networking efectivo, negociación salarial y marca personal en el contexto profesional español. El objetivo es alcanzar los 250 estudiantes activos antes de que termine el año.",
    ],
    related: [
      { slug: "acuerdo-accenture-practicas", title: "Nuevo acuerdo con Accenture para prácticas internacionales", date: "5 Mar 2026" },
      { slug: "entrevista-maria-lopez-mentoria", title: "Entrevista: María López sobre el futuro de la mentoría internacional", date: "20 Feb 2026" },
    ],
  },
  "acuerdo-accenture-practicas": {
    title: "Nuevo acuerdo con Accenture para prácticas internacionales",
    category: "Programa",
    categoryClass: "bg-blue-100 text-blue-700",
    author: "Equipo Puente",
    date: "5 Mar 2026",
    readingTime: "4 min de lectura",
    tags: ["Empresas", "Prácticas", "Accenture", "Tecnología"],
    paragraphs: [
      "Puente se complace en anunciar la firma de un acuerdo estratégico con Accenture España, una de las empresas de consultoría y tecnología más importantes del mundo. Este convenio permitirá a estudiantes latinoamericanos del programa acceder a prácticas profesionales en las oficinas de Accenture en Madrid y Barcelona.",
      "El acuerdo contempla la creación de un programa específico de prácticas de seis meses de duración, dirigido a estudiantes de máster en áreas de tecnología, consultoría de gestión y transformación digital. Las plazas iniciales serán 15, con posibilidad de ampliación según los resultados del primer ciclo.",
      "Para Accenture, esta colaboración representa una oportunidad de incorporar talento diverso con perspectivas internacionales. Según Ana Martín, directora de Talento de Accenture España: «La diversidad cultural no es solo un valor, es una ventaja competitiva. Los profesionales latinoamericanos aportan creatividad, resiliencia y una comprensión única de mercados en crecimiento.»",
      "Los estudiantes seleccionados recibirán una remuneración competitiva, acceso a los programas de formación interna de Accenture y un mentor corporativo adicional dentro de la empresa. Además, aquellos que demuestren un desempeño destacado tendrán la posibilidad de recibir una oferta de empleo al finalizar las prácticas.",
      "Las solicitudes para el primer ciclo de prácticas estarán abiertas a partir de abril de 2026. Los interesados deben estar inscritos en el programa Puente y cumplir con los requisitos académicos y de idioma establecidos por Accenture. Los detalles completos se publicarán próximamente en la plataforma.",
    ],
    related: [
      { slug: "puente-100-estudiantes", title: "Puente alcanza 100 estudiantes activos en su primer trimestre", date: "10 Mar 2026" },
      { slug: "consejos-primera-entrevista-espana", title: "5 consejos para tu primera entrevista en España", date: "15 Feb 2026" },
    ],
  },
  "guia-renovar-nie-2026": {
    title: "Guía completa: Cómo renovar tu NIE en 2026",
    category: "Guía",
    categoryClass: "bg-amber-100 text-amber-700",
    author: "Carmen Navarro",
    date: "28 Feb 2026",
    readingTime: "5 min de lectura",
    tags: ["Guía", "NIE", "Trámites", "Documentación"],
    paragraphs: [
      "Renovar el Número de Identidad de Extranjero (NIE) es uno de los trámites más importantes —y a veces más confusos— para cualquier estudiante internacional en España. En esta guía actualizada para 2026, te explicamos paso a paso cómo hacerlo sin complicaciones.",
      "Lo primero que debes saber es que la renovación debe solicitarse durante los 60 días previos a la fecha de expiración de tu tarjeta actual, o en los 90 días posteriores. Te recomendamos encarecidamente no esperar a que expire: iniciar el proceso con antelación te dará margen para resolver cualquier imprevisto documental.",
      "Los documentos necesarios incluyen el formulario EX-17 debidamente cumplimentado, tu pasaporte vigente con copia, la tarjeta de identidad de extranjero actual, justificante de medios económicos (puede ser un extracto bancario reciente), certificado de matrícula universitaria si continúas estudiando, y el justificante del pago de la tasa modelo 790 código 012.",
      "Una de las novedades de 2026 es la posibilidad de iniciar el trámite de forma telemática a través de la sede electrónica del gobierno. Sin embargo, la toma de huellas sigue siendo presencial y requiere cita previa en la Oficina de Extranjería correspondiente. Te aconsejamos solicitar la cita en cuanto tengas todos los documentos listos, ya que la disponibilidad puede ser limitada.",
      "Desde Puente, ofrecemos asesoramiento gratuito a nuestros estudiantes para la renovación del NIE. Si tienes dudas sobre tu caso particular, no dudes en contactar a tu mentor o escribirnos directamente. Recuerda que estar al día con tu documentación es fundamental para tu tranquilidad y tu desarrollo profesional en España.",
    ],
    related: [
      { slug: "consejos-primera-entrevista-espana", title: "5 consejos para tu primera entrevista en España", date: "15 Feb 2026" },
      { slug: "puente-100-estudiantes", title: "Puente alcanza 100 estudiantes activos en su primer trimestre", date: "10 Mar 2026" },
    ],
  },
  "entrevista-maria-lopez-mentoria": {
    title: "Entrevista: María López sobre el futuro de la mentoría internacional",
    category: "Entrevista",
    categoryClass: "bg-purple-100 text-purple-700",
    author: "Alejandro Ruiz",
    date: "20 Feb 2026",
    readingTime: "4 min de lectura",
    tags: ["Entrevista", "Mentoría", "Liderazgo", "Visión"],
    paragraphs: [
      "En esta entrevista exclusiva, conversamos con María López, directora y cofundadora de Puente, sobre su trayectoria en la educación internacional y su visión para el futuro del programa. Con más de una década de experiencia en el sector, María comparte reflexiones profundas sobre el papel de la mentoría en un mundo cada vez más globalizado.",
      "«La mentoría no es un lujo, es una necesidad», afirma María al inicio de nuestra conversación. «Cuando llegas a un país nuevo con un título bajo el brazo pero sin contactos ni conocimiento del mercado local, tener a alguien que te guíe puede significar la diferencia entre el éxito y la frustración. Eso lo vi de primera mano durante mis años trabajando en programas de intercambio.»",
      "María explica que uno de los mayores desafíos que enfrentan los profesionales latinoamericanos en España no es la falta de talento o preparación, sino la brecha cultural y de networking. «En muchos países de América Latina, el mérito académico tiene un peso enorme. Pero en España, como en gran parte de Europa, las relaciones profesionales y la forma en que te presentas son igualmente importantes. Eso no se enseña en la universidad.»",
      "Sobre el futuro de Puente, la directora se muestra ambiciosa pero realista: «Queremos ser la plataforma de referencia para la integración profesional de latinoamericanos en Europa. No solo en España. Pero el crecimiento debe ser sostenible y mantener la calidad. Preferimos tener 200 relaciones de mentoría excelentes que 2.000 mediocres.»",
      "La entrevista concluye con un mensaje para los estudiantes: «No tengas miedo de pedir ayuda. Buscar un mentor no es señal de debilidad, sino de inteligencia. Los profesionales más exitosos que conozco siempre tuvieron a alguien que les mostró el camino en algún momento de sus carreras.»",
    ],
    related: [
      { slug: "puente-100-estudiantes", title: "Puente alcanza 100 estudiantes activos en su primer trimestre", date: "10 Mar 2026" },
      { slug: "acuerdo-accenture-practicas", title: "Nuevo acuerdo con Accenture para prácticas internacionales", date: "5 Mar 2026" },
    ],
  },
  "consejos-primera-entrevista-espana": {
    title: "5 consejos para tu primera entrevista en España",
    category: "Consejos",
    categoryClass: "bg-green-100 text-green-700",
    author: "Alejandro Ruiz",
    date: "15 Feb 2026",
    readingTime: "3 min de lectura",
    tags: ["Consejos", "Entrevista", "Empleo", "Preparación"],
    paragraphs: [
      "Tu primera entrevista de trabajo en España puede generar nervios, sobre todo si vienes de otro país y no estás familiarizado con las costumbres laborales locales. Después de hablar con decenas de mentores y reclutadores, hemos recopilado cinco consejos esenciales que te ayudarán a causar la mejor impresión.",
      "Primero, la puntualidad es fundamental. En España, llegar cinco minutos antes a una entrevista se considera lo correcto. Llegar tarde, incluso por el tráfico o el transporte público, puede interpretarse como falta de interés. Planifica tu ruta con antelación y ten un plan B por si hay imprevistos. Segundo, investiga a fondo la empresa. No basta con leer la página principal de su web: revisa sus últimas noticias, proyectos recientes y valores corporativos. Los entrevistadores valoran muchísimo que demuestres un interés genuino.",
      "Tercero, prepárate para la pregunta sobre expectativas salariales. En España, este tema suele surgir de forma directa. Investiga los rangos salariales para tu puesto y nivel de experiencia en portales como Glassdoor o InfoJobs. Tener un rango claro y justificado demuestra profesionalismo. No tengas miedo de negociar, pero hazlo con datos.",
      "Cuarto, cuida tu comunicación no verbal. El contacto visual, un apretón de manos firme y una postura abierta transmiten confianza. En la cultura empresarial española, el trato tiende a ser algo más cercano que en otros países europeos, así que no te sorprendas si la conversación incluye un toque personal al inicio.",
      "Quinto, envía un correo de agradecimiento después de la entrevista. Esta práctica, aunque no es tan común en España como en otros países, te diferenciará positivamente. Un breve mensaje agradeciendo el tiempo del entrevistador y reiterando tu interés en el puesto puede marcar la diferencia cuando la decisión esté reñida.",
    ],
    related: [
      { slug: "guia-renovar-nie-2026", title: "Guía completa: Cómo renovar tu NIE en 2026", date: "28 Feb 2026" },
      { slug: "entrevista-maria-lopez-mentoria", title: "Entrevista: María López sobre el futuro de la mentoría internacional", date: "20 Feb 2026" },
    ],
  },
};

export default function NoticiaPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [copied, setCopied] = useState(false);

  const article = articlesMap[slug] || articlesMap["puente-100-estudiantes"];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-2xl px-6 py-16">
          {/* Back link */}
          <Link
            href="/noticias"
            className="text-sm font-medium"
            style={{ color: "var(--primary)" }}
          >
            ← Volver a noticias
          </Link>

          {/* Category */}
          <div className="mt-6">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${article.categoryClass}`}
            >
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1
            className="mt-4 text-3xl font-bold leading-tight sm:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            {article.title}
          </h1>

          {/* Meta */}
          <div
            className="mt-4 flex flex-wrap items-center gap-3 text-sm"
            style={{ color: "var(--gray-400)" }}
          >
            <span>{article.author}</span>
            <span>·</span>
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readingTime}</span>
          </div>

          {/* Image placeholder */}
          <div
            className="mt-8 flex h-64 items-center justify-center rounded-xl"
            style={{ backgroundColor: "var(--gray-100)" }}
          >
            <span className="text-6xl">📰</span>
          </div>

          {/* Article body */}
          <div className="mt-10 space-y-6">
            {article.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed"
                style={{ color: "var(--gray-600)" }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: "var(--gray-100)",
                  color: "var(--gray-500)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div
            className="mt-10 border-t pt-6"
            style={{ borderColor: "var(--gray-200)" }}
          >
            <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              Compartir
            </h3>
            <div className="mt-3 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-500)" }}
                title="Compartir en LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: "var(--gray-100)", color: "var(--gray-500)" }}
                title="Compartir en X"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <button
                onClick={handleCopyLink}
                className="flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: "var(--gray-100)",
                  color: copied ? "var(--success)" : "var(--gray-500)",
                }}
              >
                {copied ? "¡Enlace copiado!" : "Copiar enlace"}
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div
            className="mt-10 border-t pt-8"
            style={{ borderColor: "var(--gray-200)" }}
          >
            <h3 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
              Artículos relacionados
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {article.related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/noticias/${rel.slug}`}
                  className="rounded-xl border p-5 transition-shadow hover:shadow-md"
                  style={{ borderColor: "var(--gray-200)" }}
                >
                  <h4
                    className="text-sm font-semibold leading-snug"
                    style={{ color: "var(--foreground)" }}
                  >
                    {rel.title}
                  </h4>
                  <p className="mt-2 text-xs" style={{ color: "var(--gray-400)" }}>
                    {rel.date}
                  </p>
                  <span
                    className="mt-2 inline-block text-sm font-medium"
                    style={{ color: "var(--primary)" }}
                  >
                    Leer más →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
