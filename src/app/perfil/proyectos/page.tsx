"use client";

import { useState } from "react";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  description: string;
  tags: string[];
  url?: string;
}

const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    name: "Portfolio Personal",
    description: "Mi sitio web personal con React y Tailwind",
    tags: ["React", "Tailwind", "TypeScript"],
    url: "https://miportfolio.dev",
  },
  {
    id: 2,
    name: "API de Gestión de Tareas",
    description: "REST API con Node.js y PostgreSQL para gestión de proyectos",
    tags: ["Node.js", "PostgreSQL", "Express"],
  },
  {
    id: 3,
    name: "App de Clima",
    description: "Aplicación móvil que muestra el clima usando OpenWeather API",
    tags: ["React Native", "API REST"],
  },
];

export default function ProyectosPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formTagInput, setFormTagInput] = useState("");
  const [formTags, setFormTags] = useState<string[]>([]);

  const resetForm = () => {
    setFormName("");
    setFormDesc("");
    setFormUrl("");
    setFormTagInput("");
    setFormTags([]);
    setEditingId(null);
  };

  const handleAddTag = () => {
    const tag = formTagInput.trim();
    if (tag && !formTags.includes(tag)) {
      setFormTags([...formTags, tag]);
    }
    setFormTagInput("");
  };

  const handleRemoveTag = (tag: string) => {
    setFormTags(formTags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (!formName.trim()) return;
    const project: Project = {
      id: editingId ?? Date.now(),
      name: formName.trim(),
      description: formDesc.trim(),
      tags: formTags,
      url: formUrl.trim() || undefined,
    };
    if (editingId) {
      setProjects((prev) => prev.map((p) => (p.id === editingId ? project : p)));
    } else {
      setProjects((prev) => [...prev, project]);
    }
    resetForm();
    setShowForm(false);
  };

  const handleEdit = (project: Project) => {
    setFormName(project.name);
    setFormDesc(project.description);
    setFormUrl(project.url || "");
    setFormTags([...project.tags]);
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
        </Link>
        <nav className="space-y-1 text-sm">
          {[
            { icon: "📜", label: "Scroll" },
            { icon: "📁", label: "Proyectos" },
            { icon: "📥", label: "Bandeja" },
            { icon: "💼", label: "Empleos" },
            { icon: "🔍", label: "Buscar" },
            { icon: "👥", label: "Mi Red" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--gray-500)] hover:bg-[var(--gray-100)] cursor-pointer transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Mis Proyectos
            </h1>
            <button
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
              className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
            >
              {showForm ? "Cancelar" : "Añadir proyecto"}
            </button>
          </div>

          {/* Inline form */}
          {showForm && (
            <div className="border border-[var(--gray-200)] rounded-xl p-5 mb-6 bg-[var(--gray-100)]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Nombre del proyecto
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ej. Mi App Increíble"
                    className="w-full border border-[var(--gray-200)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Descripción
                  </label>
                  <textarea
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Describe brevemente tu proyecto..."
                    rows={3}
                    className="w-full border border-[var(--gray-200)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] resize-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    Tecnologías
                  </label>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    {formTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--primary)] text-white text-xs rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:opacity-70"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formTagInput}
                      onChange={(e) => setFormTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      placeholder="Ej. React"
                      className="flex-1 border border-[var(--gray-200)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] bg-white"
                    />
                    <button
                      onClick={handleAddTag}
                      className="px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm hover:bg-white transition-colors"
                    >
                      Añadir
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-1">
                    URL (opcional)
                  </label>
                  <input
                    type="url"
                    value={formUrl}
                    onChange={(e) => setFormUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full border border-[var(--gray-200)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--primary)] bg-white"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                >
                  Guardar
                </button>
              </div>
            </div>
          )}

          {/* Projects grid */}
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[var(--gray-400)] text-sm">
                Añade tus proyectos para mostrar a mentores y empresas
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-[var(--gray-200)] rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-[var(--foreground)] text-sm">
                      {project.name}
                    </h3>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--gray-400)] hover:text-[var(--primary)] transition-colors flex-shrink-0 ml-2"
                        title="Ver proyecto"
                      >
                        🔗
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-[var(--gray-500)] mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-[var(--gray-100)] text-[var(--gray-500)] text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-xs text-[var(--primary)] hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-xs text-[var(--error)] hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
