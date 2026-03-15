"use client";

import Link from "next/link";
import { useState } from "react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Estudiantes", href: "/admin/estudiantes", icon: "🎓" },
  { label: "Mentores", href: "/admin/mentores", icon: "👤" },
  { label: "Talleres", href: "/admin/talleres", icon: "📚" },
  { label: "Empresas", href: "/admin/empresas", icon: "🏢" },
  { label: "Informes", href: "/admin/informes", icon: "📈" },
];

interface MentorRequest {
  id: number;
  studentName: string;
  preferences: string[];
  requestedMentor: string;
  date: string;
}

interface JobApplication {
  id: number;
  studentName: string;
  role: string;
  company: string;
  coverLetterPreview: string;
  cvUploaded: boolean;
  date: string;
}

interface WorkshopEnrollment {
  id: number;
  studentName: string;
  workshopTitle: string;
  dateRegistered: string;
  status: string;
}

export default function SolicitudesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [toast, setToast] = useState("");

  const [mentorRequests, setMentorRequests] = useState<MentorRequest[]>([
    { id: 1, studentName: "Lucía Fernández", preferences: ["Tecnología", "Liderazgo"], requestedMentor: "Carlos Mendoza", date: "2026-03-10" },
    { id: 2, studentName: "Andrés Morales", preferences: ["Finanzas", "Emprendimiento"], requestedMentor: "Ana García", date: "2026-03-12" },
    { id: 3, studentName: "Valentina Ríos", preferences: ["Diseño", "UX"], requestedMentor: "Roberto Silva", date: "2026-03-14" },
  ]);

  const [jobApplications, setJobApplications] = useState<JobApplication[]>([
    { id: 1, studentName: "Diego López", role: "Desarrollador Frontend", company: "TechCorp", coverLetterPreview: "Estimados, me dirijo a ustedes para expresar mi interés en la posición...", cvUploaded: true, date: "2026-03-08" },
    { id: 2, studentName: "Camila Herrera", role: "Analista de Datos", company: "DataFlow", coverLetterPreview: "Con gran entusiasmo presento mi candidatura para el puesto de...", cvUploaded: true, date: "2026-03-09" },
    { id: 3, studentName: "Sebastián Ruiz", role: "Diseñador UX/UI", company: "CreativeHub", coverLetterPreview: "Como diseñador con experiencia en proyectos académicos, considero que...", cvUploaded: false, date: "2026-03-11" },
    { id: 4, studentName: "María José Paredes", role: "Ingeniera de Software", company: "InnovaTech", coverLetterPreview: "Me presento como candidata al puesto publicado en la plataforma...", cvUploaded: true, date: "2026-03-12" },
    { id: 5, studentName: "Fernando Castro", role: "Product Manager Jr.", company: "StartupLab", coverLetterPreview: "Agradezco la oportunidad de postularme a esta vacante que combina...", cvUploaded: true, date: "2026-03-13" },
  ]);

  const [workshopEnrollments, setWorkshopEnrollments] = useState<WorkshopEnrollment[]>([
    { id: 1, studentName: "Ana María Gutiérrez", workshopTitle: "Introducción a Python", dateRegistered: "2026-03-05", status: "Pendiente" },
    { id: 2, studentName: "Carlos Jiménez", workshopTitle: "Liderazgo y Comunicación", dateRegistered: "2026-03-07", status: "Pendiente" },
    { id: 3, studentName: "Laura Méndez", workshopTitle: "Diseño de Portafolios", dateRegistered: "2026-03-10", status: "Pendiente" },
    { id: 4, studentName: "Ricardo Vargas", workshopTitle: "Introducción a Python", dateRegistered: "2026-03-13", status: "Pendiente" },
  ]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  const handleMentorAction = (id: number, action: "approve" | "reject", name: string) => {
    setMentorRequests((prev) => prev.filter((r) => r.id !== id));
    showToast(action === "approve" ? `Solicitud de ${name} aprobada y mentor asignado` : `Solicitud de ${name} rechazada`);
  };

  const handleJobAction = (id: number, action: "send" | "reject", name: string) => {
    setJobApplications((prev) => prev.filter((a) => a.id !== id));
    showToast(action === "send" ? `Postulación de ${name} enviada a la empresa` : `Postulación de ${name} marcada como no apta`);
  };

  const handleWorkshopAction = (id: number, action: "confirm" | "waitlist", name: string) => {
    setWorkshopEnrollments((prev) => prev.filter((e) => e.id !== id));
    showToast(action === "confirm" ? `Inscripción de ${name} confirmada` : `${name} añadido/a a lista de espera`);
  };

  const tabs = [
    { label: "Solicitudes de mentor", count: mentorRequests.length },
    { label: "Postulaciones a empleos", count: jobApplications.length },
    { label: "Inscripciones a talleres", count: workshopEnrollments.length },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--gray-100)]">
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0 bg-white">
        <Link href="/admin" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <div>
            <span className="font-semibold">Puente</span>
            <span className="text-xs text-[var(--gray-400)] ml-1">Admin</span>
          </div>
        </Link>
        <nav className="space-y-1 text-sm">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-[var(--gray-500)] hover:bg-[var(--gray-100)]`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {toast && (
          <div className="mb-4 p-3 bg-green-50 border border-[var(--success)] text-[var(--success)] rounded-lg text-sm font-medium">
            {toast}
          </div>
        )}

        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">Revisión de Solicitudes</h1>

        <div className="flex gap-1 mb-6 border-b border-[var(--gray-200)]">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === i
                  ? "text-[var(--primary)] border-b-2 border-[var(--primary)]"
                  : "text-[var(--gray-400)] hover:text-[var(--gray-600)]"
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                activeTab === i ? "bg-[var(--primary)] text-white" : "bg-[var(--gray-200)] text-[var(--gray-500)]"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {activeTab === 0 && (
          <div className="space-y-4">
            {mentorRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{req.studentName}</p>
                    <p className="text-sm text-[var(--gray-400)] mt-1">Mentor solicitado: <span className="text-[var(--foreground)] font-medium">{req.requestedMentor}</span></p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {req.preferences.map((p) => (
                        <span key={p} className="px-2 py-0.5 bg-[var(--gray-100)] text-[var(--gray-500)] rounded-full text-xs">{p}</span>
                      ))}
                    </div>
                    <p className="text-xs text-[var(--gray-400)] mt-2">Fecha: {req.date}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleMentorAction(req.id, "approve", req.studentName)}
                      className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                    >
                      Aprobar y asignar
                    </button>
                    <button
                      onClick={() => handleMentorAction(req.id, "reject", req.studentName)}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {mentorRequests.length === 0 && (
              <p className="text-sm text-[var(--gray-400)] text-center py-12">No hay solicitudes de mentor pendientes</p>
            )}
          </div>
        )}

        {activeTab === 1 && (
          <div className="space-y-4">
            {jobApplications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-[var(--foreground)]">{app.studentName}</p>
                    <p className="text-sm text-[var(--gray-500)] mt-1">
                      Postulación: <span className="font-medium text-[var(--foreground)]">{app.role}</span> en <span className="font-medium text-[var(--foreground)]">{app.company}</span>
                    </p>
                    <p className="text-sm text-[var(--gray-400)] mt-2 italic line-clamp-2">&ldquo;{app.coverLetterPreview}&rdquo;</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs font-medium ${app.cvUploaded ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
                        CV: {app.cvUploaded ? "Adjunto" : "No adjunto"}
                      </span>
                      <span className="text-xs text-[var(--gray-400)]">Fecha: {app.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleJobAction(app.id, "send", app.studentName)}
                      className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                    >
                      Enviar a empresa
                    </button>
                    <button
                      onClick={() => handleJobAction(app.id, "reject", app.studentName)}
                      className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                    >
                      No apto
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {jobApplications.length === 0 && (
              <p className="text-sm text-[var(--gray-400)] text-center py-12">No hay postulaciones pendientes</p>
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="space-y-4">
            {workshopEnrollments.map((enrollment) => (
              <div key={enrollment.id} className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">{enrollment.studentName}</p>
                    <p className="text-sm text-[var(--gray-500)] mt-1">
                      Taller: <span className="font-medium text-[var(--foreground)]">{enrollment.workshopTitle}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-[var(--gray-400)]">Registrado: {enrollment.dateRegistered}</span>
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-500 rounded-full text-xs font-medium">{enrollment.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleWorkshopAction(enrollment.id, "confirm", enrollment.studentName)}
                      className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                    >
                      Confirmar
                    </button>
                    <button
                      onClick={() => handleWorkshopAction(enrollment.id, "waitlist", enrollment.studentName)}
                      className="px-4 py-2 border border-[var(--gray-300)] text-[var(--gray-500)] text-sm rounded-lg hover:bg-[var(--gray-100)] transition-colors"
                    >
                      Lista de espera
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {workshopEnrollments.length === 0 && (
              <p className="text-sm text-[var(--gray-400)] text-center py-12">No hay inscripciones pendientes</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
