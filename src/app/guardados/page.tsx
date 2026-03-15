"use client";

import { useState } from "react";
import Link from "next/link";

interface SavedJob {
  id: number;
  role: string;
  company: string;
  salary: string;
  savedDate: string;
}

interface SavedWorkshop {
  id: number;
  title: string;
  date: string;
  mentor: string;
}

interface SavedPost {
  id: number;
  user: string;
  content: string;
}

const initialJobs: SavedJob[] = [
  { id: 1, role: "Desarrollador/a Junior Frontend", company: "Cabify", salary: "22.000 - 28.000 €/año", savedDate: "10 Mar 2026" },
  { id: 2, role: "Becario/a Marketing Digital", company: "Accenture", salary: "12.000 €/año", savedDate: "7 Mar 2026" },
  { id: 3, role: "Analista de Datos Junior", company: "Telefónica", salary: "24.000 - 30.000 €/año", savedDate: "3 Mar 2026" },
];

const initialWorkshops: SavedWorkshop[] = [
  { id: 1, title: "Taller: CV europeo", date: "22 Mar 2026", mentor: "Elena García Ruiz" },
  { id: 2, title: "Taller: Regulaciones migratorias", date: "29 Mar 2026", mentor: "Carlos Mendoza" },
];

const initialPosts: SavedPost[] = [
  { id: 1, user: "María López", content: "Después de 6 meses buscando empleo en España, por fin recibí mi primera oferta. Quiero compartir lo que aprendí..." },
  { id: 2, user: "Jorge Ramírez", content: "Consejo para los que están homologando su título universitario: el proceso tarda entre 8 y 12 meses, así que..." },
];

type Tab = "empleos" | "talleres" | "publicaciones";

export default function GuardadosPage() {
  const [activeTab, setActiveTab] = useState<Tab>("empleos");
  const [jobs, setJobs] = useState(initialJobs);
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [posts, setPosts] = useState(initialPosts);

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "empleos", label: "Empleos", count: jobs.length },
    { key: "talleres", label: "Talleres", count: workshops.length },
    { key: "publicaciones", label: "Publicaciones", count: posts.length },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--gray-100)]">
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
        </Link>
        <nav className="space-y-1 text-sm">
          {[{icon: "📜", label: "Scroll"}, {icon: "📅", label: "Calendario"}, {icon: "📥", label: "Bandeja"}, {icon: "💼", label: "Empleos"}, {icon: "🔍", label: "Buscar"}, {icon: "👥", label: "Mi Red"}].map(item => (
            <div key={item.label} className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--gray-500)] hover:bg-[var(--gray-100)] cursor-pointer transition-colors">
              <span>{item.icon}</span><span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">Guardados</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-lg border border-[var(--gray-200)] p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--gray-500)] hover:bg-[var(--gray-100)]"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Empleos Tab */}
        {activeTab === "empleos" && (
          <div className="space-y-3">
            {jobs.length === 0 ? (
              <div className="bg-white rounded-xl border border-[var(--gray-200)] p-10 text-center text-[var(--gray-400)]">
                No tienes empleos guardados
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)]">{job.role}</h3>
                      <p className="text-sm text-[var(--gray-500)] mt-0.5">{job.company}</p>
                      <p className="text-sm text-[var(--gray-400)] mt-1">{job.salary}</p>
                      <p className="text-xs text-[var(--gray-400)] mt-2">Guardado el {job.savedDate}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => setJobs(jobs.filter((j) => j.id !== job.id))}
                        className="text-xs text-[var(--error)] hover:underline"
                      >
                        Quitar de guardados
                      </button>
                      <Link href="/empleos" className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium">
                        Ver oferta →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Talleres Tab */}
        {activeTab === "talleres" && (
          <div className="space-y-3">
            {workshops.length === 0 ? (
              <div className="bg-white rounded-xl border border-[var(--gray-200)] p-10 text-center text-[var(--gray-400)]">
                No tienes talleres guardados
              </div>
            ) : (
              workshops.map((ws) => (
                <div key={ws.id} className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)]">{ws.title}</h3>
                      <p className="text-sm text-[var(--gray-500)] mt-0.5">{ws.date}</p>
                      <p className="text-sm text-[var(--gray-400)] mt-1">Mentor: {ws.mentor}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => setWorkshops(workshops.filter((w) => w.id !== ws.id))}
                        className="text-xs text-[var(--error)] hover:underline"
                      >
                        Quitar
                      </button>
                      <Link href="/talleres" className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium">
                        Ver taller →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Publicaciones Tab */}
        {activeTab === "publicaciones" && (
          <div className="space-y-3">
            {posts.length === 0 ? (
              <div className="bg-white rounded-xl border border-[var(--gray-200)] p-10 text-center text-[var(--gray-400)]">
                No tienes publicaciones guardadas
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl border border-[var(--gray-200)] p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 mr-4">
                      <h3 className="font-semibold text-[var(--foreground)]">{post.user}</h3>
                      <p className="text-sm text-[var(--gray-500)] mt-1 line-clamp-2">{post.content}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => setPosts(posts.filter((p) => p.id !== post.id))}
                        className="text-xs text-[var(--error)] hover:underline"
                      >
                        Quitar
                      </button>
                      <Link href="/scroll" className="text-sm text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium">
                        Ver publicación →
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
