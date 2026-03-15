"use client";

import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const INTEREST_SUGGESTIONS: Record<string, string[]> = {
  default: [
    "Prácticas en empresa",
    "Empleo a tiempo completo",
    "Networking profesional",
    "Regulaciones migratorias",
    "CV y LinkedIn",
    "Preparación de entrevistas",
    "Emprendimiento",
    "Habilidades interculturales",
  ],
  "Prácticas en empresa": [
    "Empleo a tiempo completo",
    "CV y LinkedIn",
    "Preparación de entrevistas",
    "Networking profesional",
    "Búsqueda de empleo en la UE",
    "Carta de presentación",
  ],
  "Regulaciones migratorias": [
    "Permiso de trabajo",
    "Residencia estudiantil",
    "Visado de prácticas",
    "Prórroga de estancia",
    "Homologación de títulos",
    "Número de identidad de extranjero (NIE)",
  ],
  "CV y LinkedIn": [
    "CV formato europeo",
    "Carta de presentación",
    "Portfolio profesional",
    "Marca personal",
    "Networking profesional",
    "Elevator pitch",
  ],
};

const ALL_INTERESTS = [
  "Prácticas en empresa",
  "Empleo a tiempo completo",
  "Networking profesional",
  "Regulaciones migratorias",
  "CV y LinkedIn",
  "Preparación de entrevistas",
  "Emprendimiento",
  "Habilidades interculturales",
  "Permiso de trabajo",
  "Residencia estudiantil",
  "Visado de prácticas",
  "Prórroga de estancia",
  "Homologación de títulos",
  "Número de identidad de extranjero (NIE)",
  "CV formato europeo",
  "Carta de presentación",
  "Portfolio profesional",
  "Marca personal",
  "Elevator pitch",
  "Búsqueda de empleo en la UE",
  "Mercado laboral español",
  "Soft skills",
  "Comunicación profesional",
  "Trabajo en equipo multicultural",
  "Sector tecnología",
  "Sector salud",
  "Sector finanzas",
  "Sector ingeniería",
  "Sector educación",
  "Sector turismo y hostelería",
  "Administración y negocios",
  "Investigación académica",
  "Voluntariado profesional",
];

const REGIONS = [
  "Asia",
  "África",
  "Latinoamérica",
  "Oriente Medio",
  "Europa (no UE)",
  "Otro",
];

function CompletarPerfilForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "";
  const role = searchParams.get("role") || "estudiante";
  const isMentor = role === "mentor";

  const [step, setStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 1: Personal info
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [region, setRegion] = useState("");
  const [university, setUniversity] = useState("");

  // Mentor-specific fields
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");

  // Step 2: Interests
  const [interests, setInterests] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredInterests = searchQuery
    ? ALL_INTERESTS.filter(
        (i) =>
          i.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !interests.includes(i)
      )
    : [];

  const getSuggestions = () => {
    const lastSelected = interests[interests.length - 1];
    const contextual =
      INTEREST_SUGGESTIONS[lastSelected] || INTEREST_SUGGESTIONS["default"];
    return contextual.filter((s) => !interests.includes(s));
  };

  const addInterest = (interest: string) => {
    if (interests.length < 10 && !interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
    setSearchQuery("");
    setShowDropdown(false);
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleStep1Submit = () => {
    if (firstName && lastName) {
      setStep(2);
    }
  };

  const handleStep2Submit = () => {
    if (interests.length >= 3) {
      if (isMentor) {
        router.push("/mentor/dashboard");
      } else {
        router.push(`/perfil/${username || "usuario"}`);
      }
    }
  };

  // Completion percentage for right sidebar
  const completionItems = [
    { label: "Perfil básico (Nombre)", done: !!firstName && !!lastName },
    { label: "Foto de perfil", done: !!photoPreview },
    { label: "Biografía", done: bio.length > 0 },
    { label: "Región de origen", done: !!region },
    { label: "Universidad", done: !!university },
    { label: "Intereses (mín. 3)", done: interests.length >= 3 },
  ];
  const completionPercent = Math.round(
    (completionItems.filter((i) => i.done).length / completionItems.length) *
      100
  );

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left sidebar */}
      <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">P</span>
          </div>
          <span className="font-semibold">Puente</span>
        </div>
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
        <div className="mt-auto pt-8 space-y-1 text-sm">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--gray-500)] hover:bg-[var(--gray-100)] cursor-pointer transition-colors">
            <span>👤</span>
            <span>{username || "Perfil"}</span>
          </div>
        </div>
      </aside>

      {/* Main content area with backdrop */}
      <div className="flex-1 relative">
        {/* Faded background profile preview */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="max-w-2xl mx-auto pt-16 px-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-[var(--gray-200)] rounded-full" />
              <div>
                <div className="h-5 w-40 bg-[var(--gray-200)] rounded mb-2" />
                <div className="h-3 w-24 bg-[var(--gray-200)] rounded" />
              </div>
            </div>
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-6 w-20 bg-[var(--gray-200)] rounded-full"
                />
              ))}
            </div>
            <div className="flex gap-8 border-b border-[var(--gray-200)] pb-3 mb-6">
              {["WORK", "ABOUT", "RESUME", "VOUCH"].map((tab) => (
                <div key={tab} className="h-3 w-12 bg-[var(--gray-200)] rounded" />
              ))}
            </div>
          </div>
        </div>

        {/* Modal overlay */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Modal */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 max-h-[85vh] overflow-y-auto">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold mb-1">
                    {isMentor ? "Bienvenido/a como Mentor/a" : "Bienvenido/a a Puente"}
                  </h2>
                  <p className="text-sm text-[var(--gray-500)]">
                    {isMentor
                      ? "Cuéntanos sobre tu experiencia profesional para conectarte con estudiantes."
                      : "Primero lo primero, cuéntanos un poco sobre ti."}
                  </p>
                  {isMentor && (
                    <span className="inline-block mt-2 text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full font-medium">
                      Registro como Mentor/a
                    </span>
                  )}
                </div>

                {/* Photo upload */}
                <div className="flex justify-center mb-6">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="relative group"
                  >
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Foto de perfil"
                        className="w-20 h-20 rounded-full object-cover border-2 border-[var(--gray-200)]"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-[var(--primary)]/10 flex items-center justify-center border-2 border-dashed border-[var(--gray-300)]">
                        <svg
                          className="w-8 h-8 text-[var(--gray-400)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    )}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-[var(--primary)] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      Subir foto
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-[var(--gray-600)] mb-1">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border border-[var(--gray-300)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[var(--gray-600)] mb-1">
                        Apellido *
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border border-[var(--gray-300)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="flex items-center justify-between text-sm text-[var(--gray-600)] mb-1">
                      <span>Breve descripción *</span>
                      <span className="text-xs text-[var(--gray-400)]">
                        {bio.length}/120
                      </span>
                    </label>
                    <input
                      type="text"
                      value={bio}
                      onChange={(e) =>
                        setBio(e.target.value.slice(0, 120))
                      }
                      placeholder="Ej: Estudiante de Ingeniería en la UCM, de Colombia"
                      className="w-full border border-[var(--gray-300)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                    />
                    <p className="text-xs text-[var(--gray-400)] mt-1">
                      Así es como otros participantes te verán en el programa.
                    </p>
                  </div>

                  {isMentor ? (
                    <>
                      {/* Company */}
                      <div>
                        <label className="block text-sm text-[var(--gray-600)] mb-1">
                          Empresa *
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Ej: Accenture España"
                          className="w-full border border-[var(--gray-300)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                        />
                      </div>

                      {/* Job title */}
                      <div>
                        <label className="block text-sm text-[var(--gray-600)] mb-1">
                          Cargo actual *
                        </label>
                        <input
                          type="text"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          placeholder="Ej: Directora de RRHH"
                          className="w-full border border-[var(--gray-300)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                        />
                      </div>

                      {/* Years of experience */}
                      <div>
                        <label className="block text-sm text-[var(--gray-600)] mb-1">
                          Años de experiencia
                        </label>
                        <select
                          value={yearsExperience}
                          onChange={(e) => setYearsExperience(e.target.value)}
                          className="w-full border border-[var(--gray-300)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors bg-white"
                        >
                          <option value="">Selecciona</option>
                          <option value="1-3">1-3 años</option>
                          <option value="3-5">3-5 años</option>
                          <option value="5-10">5-10 años</option>
                          <option value="10+">10+ años</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Region */}
                      <div>
                        <label className="block text-sm text-[var(--gray-600)] mb-1">
                          Región de origen *
                        </label>
                        <select
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                          className="w-full border border-[var(--gray-300)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors bg-white"
                        >
                          <option value="">Selecciona tu región</option>
                          {REGIONS.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* University */}
                      <div>
                        <label className="block text-sm text-[var(--gray-600)] mb-1">
                          Universidad en España
                        </label>
                        <input
                          type="text"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                          placeholder="Ej: Universidad Complutense de Madrid"
                          className="w-full border border-[var(--gray-300)] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)] transition-colors"
                        />
                      </div>
                    </>
                  )}

                  {/* Username */}
                  <div>
                    <label className="block text-sm text-[var(--gray-600)] mb-1">
                      Nombre de usuario *
                    </label>
                    <div className="flex items-center border border-[var(--gray-300)] rounded-lg px-3 py-2.5">
                      <input
                        type="text"
                        value={username}
                        readOnly
                        className="flex-1 text-sm outline-none bg-transparent"
                      />
                      <svg
                        className="w-4 h-4 text-[var(--success)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-[var(--gray-400)] mt-1">
                      puente.io/{username}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    className="flex-1 border border-[var(--gray-300)] rounded-lg py-2.5 text-sm font-medium hover:bg-[var(--gray-100)] transition-colors"
                  >
                    Importar de LinkedIn
                  </button>
                  <button
                    type="button"
                    onClick={handleStep1Submit}
                    disabled={!firstName || !lastName}
                    className="flex-1 bg-[var(--primary)] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50"
                  >
                    Continuar →
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Interests & Goals */}
            {step === 2 && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold mb-1">
                    {isMentor ? "Áreas de Especialización" : "Bienvenido/a a Puente"}
                  </h2>
                  <p className="text-sm text-[var(--gray-500)]">
                    {isMentor
                      ? "Selecciona las áreas en las que puedes guiar a estudiantes internacionales."
                      : "Añade tus intereses y objetivos profesionales para personalizar tu experiencia en el programa."}
                  </p>
                  {isMentor && (
                    <span className="inline-block mt-2 text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full font-medium">
                      Registro como Mentor/a
                    </span>
                  )}
                </div>

                {/* Search input */}
                <div className="relative mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm text-[var(--gray-600)]">
                      Buscar intereses, objetivos, sectores...
                    </label>
                    <span className="text-xs text-[var(--gray-400)]">
                      mín. 3, máx. 10
                    </span>
                  </div>
                  <div
                    className={`border rounded-lg px-3 py-2 flex flex-wrap gap-1.5 items-center cursor-text transition-colors ${
                      showDropdown
                        ? "border-[var(--primary)]"
                        : "border-[var(--gray-300)]"
                    }`}
                    onClick={() => setShowDropdown(true)}
                  >
                    {interests.map((interest) => (
                      <span
                        key={interest}
                        className="inline-flex items-center gap-1 bg-[var(--foreground)] text-white text-xs px-2.5 py-1 rounded-full"
                      >
                        {interest}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeInterest(interest);
                          }}
                          className="hover:text-[var(--gray-300)] ml-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      placeholder={
                        interests.length === 0
                          ? "Ej: Prácticas, Networking, Regulaciones..."
                          : ""
                      }
                      className="flex-1 min-w-[120px] outline-none text-sm bg-transparent py-0.5"
                    />
                  </div>

                  {/* Dropdown */}
                  {showDropdown && searchQuery && filteredInterests.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--gray-200)] rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
                      {filteredInterests.slice(0, 6).map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => addInterest(interest)}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-[var(--gray-100)] transition-colors"
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  )}

                  {showDropdown && searchQuery && filteredInterests.length === 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[var(--gray-200)] rounded-lg shadow-lg z-10 p-3 text-sm text-[var(--gray-400)]">
                      Escribe para buscar intereses relevantes.
                    </div>
                  )}
                </div>

                {interests.length > 0 && (
                  <p className="text-xs text-[var(--gray-400)] mb-4">
                    Tip: Selecciona y busca más intereses relevantes.
                  </p>
                )}

                {/* Suggested interests */}
                <div className="mb-6">
                  <p className="text-xs font-medium text-[var(--gray-500)] uppercase tracking-wide mb-2">
                    Sugerencias
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getSuggestions()
                      .slice(0, 8)
                      .map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => addInterest(suggestion)}
                          disabled={interests.length >= 10}
                          className="inline-flex items-center gap-1 border border-[var(--gray-200)] text-sm px-3 py-1.5 rounded-full hover:border-[var(--gray-400)] transition-colors disabled:opacity-40"
                        >
                          {suggestion}
                          <span className="text-[var(--gray-400)]">+</span>
                        </button>
                      ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleStep2Submit}
                  disabled={interests.length < 3}
                  className="w-full bg-[var(--primary)] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50"
                >
                  {isMentor ? "Completar registro de mentor →" : "Añadir intereses →"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right sidebar - Profile completion */}
        <aside className="hidden xl:block absolute top-4 right-4 z-30 w-64">
          <div className="bg-white border border-[var(--gray-200)] rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[var(--gray-500)] uppercase tracking-wide">
                {completionPercent}%
              </span>
              <span className="text-xs font-medium text-[var(--gray-500)]">
                Perfil completado
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--gray-100)] rounded-full mb-4">
              <div
                className="h-2 bg-[var(--primary)] rounded-full transition-all duration-500"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
            <p className="text-xs text-[var(--gray-400)] mb-4">
              Tu perfil necesita estar al menos al 70% para ser visible
              públicamente.
            </p>
            <div className="space-y-2">
              {completionItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-xs"
                >
                  {item.done ? (
                    <svg
                      className="w-4 h-4 text-[var(--success)] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-[var(--gray-300)] flex-shrink-0" />
                  )}
                  <span
                    className={
                      item.done
                        ? "text-[var(--gray-500)] line-through"
                        : "text-[var(--foreground)]"
                    }
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function CompletarPerfilPage() {
  return (
    <Suspense>
      <CompletarPerfilForm />
    </Suspense>
  );
}
