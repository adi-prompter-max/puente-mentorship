"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_CV_DATA } from "@/lib/mock-data";

type Education = { degree: string; institution: string; period: string; description: string };
type Experience = { title: string; company: string; period: string; description: string };
type Language = { name: string; level: string };

const LEVELS = ["Básico (A1-A2)", "Intermedio (B1-B2)", "Avanzado (C1)", "Nativo"];

export default function CVPage() {
  const [activeTab, setActiveTab] = useState<"crear" | "subir">("crear");

  // Upload state
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; date: string } | null>(null);
  const [dragging, setDragging] = useState(false);

  // CV builder state
  const [personalInfo, setPersonalInfo] = useState(MOCK_CV_DATA.personalInfo);
  const [education, setEducation] = useState<Education[]>(MOCK_CV_DATA.education);
  const [experience, setExperience] = useState<Experience[]>(MOCK_CV_DATA.experience);
  const [skills, setSkills] = useState<string[]>(MOCK_CV_DATA.skills);
  const [newSkill, setNewSkill] = useState("");
  const [languages, setLanguages] = useState<Language[]>(MOCK_CV_DATA.languages);

  // Toast
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleMockUpload = () => {
    setUploadedFile({
      name: "CV_Priya_Sharma_2026.pdf",
      size: "245 KB",
      date: "15 Mar 2026",
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "", period: "", description: "" }]);
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const addExperience = () => {
    setExperience([...experience, { title: "", company: "", period: "", description: "" }]);
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    setExperience(updated);
  };

  const addLanguage = () => {
    setLanguages([...languages, { name: "", level: "Intermedio (B1-B2)" }]);
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const updated = [...languages];
    updated[index] = { ...updated[index], [field]: value };
    setLanguages(updated);
  };

  return (
    <div className="flex min-h-screen bg-white text-[var(--foreground)]">
      {/* Left sidebar */}
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
      <main className="flex-1 max-w-3xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Mi CV</h1>

        {/* Tabs */}
        <div className="flex border-b border-[var(--gray-200)] mb-6">
          <button
            onClick={() => setActiveTab("subir")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "subir"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--gray-400)] hover:text-[var(--gray-600)]"
            }`}
          >
            Subir CV
          </button>
          <button
            onClick={() => setActiveTab("crear")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "crear"
                ? "border-[var(--primary)] text-[var(--primary)]"
                : "border-transparent text-[var(--gray-400)] hover:text-[var(--gray-600)]"
            }`}
          >
            Crear CV
          </button>
        </div>

        {/* Tab: Subir CV */}
        {activeTab === "subir" && (
          <div>
            {!uploadedFile ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  handleMockUpload();
                }}
                onClick={handleMockUpload}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                  dragging
                    ? "border-[var(--primary)] bg-green-50"
                    : "border-[var(--gray-300)] hover:border-[var(--primary)]"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-[var(--gray-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-[var(--gray-600)] mb-1">
                  Arrastra tu CV aquí o haz clic para seleccionar
                </p>
                <p className="text-xs text-[var(--gray-400)]">PDF, DOC, DOCX &middot; Máx. 5MB</p>
              </div>
            ) : (
              <div className="border border-[var(--gray-200)] rounded-xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 text-xs font-bold">PDF</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{uploadedFile.name}</p>
                    <p className="text-xs text-[var(--gray-400)]">
                      {uploadedFile.size} &middot; Subido el {uploadedFile.date}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-sm text-[var(--error)] hover:underline"
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab: Crear CV */}
        {activeTab === "crear" && (
          <div className="space-y-8">
            {/* Datos personales */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Datos personales</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--gray-600)] mb-1">Nombre completo</label>
                  <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--gray-600)] mb-1">Email</label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--gray-600)] mb-1">Teléfono</label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--gray-600)] mb-1">Ubicación</label>
                  <input
                    type="text"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                    className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--gray-600)] mb-1">LinkedIn</label>
                  <input
                    type="text"
                    value={personalInfo.linkedin}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                    className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--gray-600)] mb-1">Portfolio</label>
                  <input
                    type="text"
                    value={personalInfo.portfolio}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, portfolio: e.target.value })}
                    className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Formación */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Formación</h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="border border-[var(--gray-200)] rounded-xl p-4 space-y-3">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(i, "degree", e.target.value)}
                      placeholder="Título / Grado"
                      className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(i, "institution", e.target.value)}
                        placeholder="Institución"
                        className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => updateEducation(i, "period", e.target.value)}
                        placeholder="Periodo"
                        className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                    <textarea
                      value={edu.description}
                      onChange={(e) => updateEducation(i, "description", e.target.value)}
                      placeholder="Descripción"
                      rows={2}
                      className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={addEducation}
                className="mt-3 text-sm text-[var(--primary)] hover:underline font-medium"
              >
                + Añadir formación
              </button>
            </section>

            {/* Experiencia */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Experiencia</h2>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <div key={i} className="border border-[var(--gray-200)] rounded-xl p-4 space-y-3">
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateExperience(i, "title", e.target.value)}
                      placeholder="Cargo"
                      className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(i, "company", e.target.value)}
                        placeholder="Empresa"
                        className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => updateExperience(i, "period", e.target.value)}
                        placeholder="Periodo"
                        className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                      />
                    </div>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(i, "description", e.target.value)}
                      placeholder="Descripción"
                      rows={2}
                      className="w-full px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={addExperience}
                className="mt-3 text-sm text-[var(--primary)] hover:underline font-medium"
              >
                + Añadir experiencia
              </button>
            </section>

            {/* Habilidades */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Habilidades</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--gray-100)] text-sm rounded-full"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-[var(--gray-400)] hover:text-[var(--error)] ml-1"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Añadir habilidad"
                  className="flex-1 px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                <button
                  onClick={addSkill}
                  className="px-4 py-2 bg-[var(--primary)] text-white text-sm rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                >
                  Añadir
                </button>
              </div>
            </section>

            {/* Idiomas */}
            <section>
              <h2 className="text-lg font-semibold mb-4">Idiomas</h2>
              <div className="space-y-3">
                {languages.map((lang, i) => (
                  <div key={i} className="flex gap-3">
                    <input
                      type="text"
                      value={lang.name}
                      onChange={(e) => updateLanguage(i, "name", e.target.value)}
                      placeholder="Idioma"
                      className="flex-1 px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                    />
                    <select
                      value={lang.level}
                      onChange={(e) => updateLanguage(i, "level", e.target.value)}
                      className="flex-1 px-3 py-2 border border-[var(--gray-200)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white"
                    >
                      {LEVELS.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <button
                onClick={addLanguage}
                className="mt-3 text-sm text-[var(--primary)] hover:underline font-medium"
              >
                + Añadir idioma
              </button>
            </section>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => showToast("CV descargado")}
                className="flex-1 py-3 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
              >
                Descargar PDF
              </button>
              <button
                onClick={() => showToast("Borrador guardado")}
                className="flex-1 py-3 border border-[var(--gray-200)] text-[var(--gray-600)] font-medium rounded-lg hover:bg-[var(--gray-100)] transition-colors"
              >
                Guardar borrador
              </button>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-[var(--foreground)] text-white px-5 py-3 rounded-lg shadow-lg text-sm animate-fade-in">
            {toast}
          </div>
        )}
      </main>
    </div>
  );
}
