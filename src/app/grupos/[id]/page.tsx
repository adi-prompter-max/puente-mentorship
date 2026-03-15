"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface GroupMessage {
  id: number;
  sender: string;
  initials: string;
  color: string;
  text: string;
  time: string;
  isLink?: boolean;
  reaction?: string;
}

interface Member {
  name: string;
  initials: string;
  color: string;
  online: boolean;
  isYou?: boolean;
}

const GROUP_NAMES: Record<string, string> = {
  "grupo-estudio": "Grupo de Estudio - Entrevistas",
  "frontend-club": "Club de Frontend",
  "react-avanzado": "React Avanzado",
};

const MEMBERS: Member[] = [
  { name: "Carlos Mendoza", initials: "CM", color: "bg-blue-400", online: true },
  { name: "Amina Diallo", initials: "AD", color: "bg-purple-400", online: true },
  { name: "Wei Zhang", initials: "WZ", color: "bg-amber-400", online: false },
  { name: "Priya Sharma", initials: "PS", color: "bg-emerald-400", online: true, isYou: true },
];

const INITIAL_MESSAGES: GroupMessage[] = [
  { id: 1, sender: "Carlos Mendoza", initials: "CM", color: "bg-blue-400", text: "¡Buenos días a todos! ¿Listos para practicar hoy?", time: "9:00" },
  { id: 2, sender: "Amina Diallo", initials: "AD", color: "bg-purple-400", text: "¡Sí! Estuve repasando arrays y strings anoche.", time: "9:02" },
  { id: 3, sender: "Wei Zhang", initials: "WZ", color: "bg-amber-400", text: "Yo encontré un recurso muy bueno para practicar:", time: "9:05" },
  { id: 4, sender: "Wei Zhang", initials: "WZ", color: "bg-amber-400", text: "https://leetcode.com/problems/two-sum", time: "9:05", isLink: true },
  { id: 5, sender: "Carlos Mendoza", initials: "CM", color: "bg-blue-400", text: "¡Genial! Ese es un clásico de entrevistas.", time: "9:08", reaction: "👍" },
  { id: 6, sender: "Priya Sharma", initials: "PS", color: "bg-emerald-400", text: "Lo resolví con un hashmap en O(n). ¿Alguien quiere discutir la solución?", time: "9:15" },
  { id: 7, sender: "Amina Diallo", initials: "AD", color: "bg-purple-400", text: "¡Sí por favor! Yo usé fuerza bruta con O(n²) y quiero mejorar.", time: "9:18" },
  { id: 8, sender: "Carlos Mendoza", initials: "CM", color: "bg-blue-400", text: "Podemos hacer una sesión de pair programming esta tarde.", time: "9:22" },
  { id: 9, sender: "Wei Zhang", initials: "WZ", color: "bg-amber-400", text: "Me apunto. ¿A las 16:00?", time: "9:25" },
  { id: 10, sender: "Priya Sharma", initials: "PS", color: "bg-emerald-400", text: "Perfecto, nos vemos a las 16:00 entonces. 🚀", time: "9:30" },
];

export default function GrupoPage() {
  const params = useParams();
  const id = params.id as string;
  const groupName = GROUP_NAMES[id] || `Grupo: ${id}`;

  const [messages, setMessages] = useState<GroupMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [infoOpen, setInfoOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, "0")}`;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "Priya Sharma",
        initials: "PS",
        color: "bg-emerald-400",
        text: input.trim(),
        time,
      },
    ]);
    setInput("");
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

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[var(--gray-200)]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-[var(--foreground)]">
                {groupName}
              </h1>
              <p className="text-sm text-[var(--gray-400)]">4 miembros</p>
            </div>
            <div className="flex items-center -space-x-2">
              {MEMBERS.map((m) => (
                <div
                  key={m.name}
                  className={`w-8 h-8 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold border-2 border-white`}
                  title={m.name}
                >
                  {m.initials}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3">
              <div
                className={`w-8 h-8 rounded-full ${msg.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5`}
              >
                {msg.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    {msg.sender}
                  </span>
                  <span className="text-xs text-[var(--gray-400)]">{msg.time}</span>
                </div>
                {msg.isLink ? (
                  <a
                    href={msg.text}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--primary)] underline break-all"
                  >
                    {msg.text}
                  </a>
                ) : (
                  <p className="text-sm text-[var(--foreground)] mt-0.5">{msg.text}</p>
                )}
                {msg.reaction && (
                  <span className="inline-block mt-1 text-xs bg-[var(--gray-100)] px-2 py-0.5 rounded-full">
                    {msg.reaction} 1
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Collapsible group info */}
        {infoOpen && (
          <div className="px-6 py-4 border-t border-[var(--gray-200)] bg-[var(--gray-100)]">
            <h3 className="font-semibold text-sm text-[var(--foreground)] mb-2">
              Información del grupo
            </h3>
            <p className="text-xs text-[var(--gray-500)] mb-1">
              Creado el 10 de enero de 2026
            </p>
            <p className="text-sm text-[var(--gray-500)] mb-3">
              Grupo para preparar entrevistas técnicas juntos
            </p>
            <h4 className="text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wide mb-2">
              Archivos compartidos
            </h4>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2 text-[var(--foreground)]">
                <span>📄</span> guia-entrevistas-tecnicas.pdf
              </li>
              <li className="flex items-center gap-2 text-[var(--foreground)]">
                <span>📄</span> resumen-patrones-diseño.pdf
              </li>
            </ul>
          </div>
        )}

        {/* Input bar */}
        <div className="px-6 py-3 border-t border-[var(--gray-200)] flex items-end gap-3">
          <button
            onClick={() => setInfoOpen(!infoOpen)}
            className="text-sm text-[var(--gray-400)] hover:text-[var(--foreground)] transition-colors flex-shrink-0 pb-1"
            title="Información del grupo"
          >
            ℹ️
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Escribe un mensaje..."
            rows={1}
            className="flex-1 text-sm border border-[var(--gray-200)] rounded-lg px-3 py-2 outline-none focus:border-[var(--primary)] resize-none"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors flex-shrink-0"
          >
            Enviar
          </button>
        </div>
      </div>

      {/* Members sidebar */}
      <div className="hidden xl:flex flex-col w-60 border-l border-[var(--gray-200)] p-4">
        <h2 className="font-semibold text-sm text-[var(--foreground)] mb-4">
          Miembros
        </h2>
        <div className="space-y-3">
          {MEMBERS.map((m) => (
            <div key={m.name} className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={`w-9 h-9 rounded-full ${m.color} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {m.initials}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                    m.online ? "bg-[var(--success)]" : "bg-[var(--gray-300)]"
                  }`}
                />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">
                  {m.name}
                  {m.isYou && (
                    <span className="text-xs text-[var(--gray-400)] ml-1">(Tú)</span>
                  )}
                </p>
                <p className="text-xs text-[var(--gray-400)]">
                  {m.online ? "En línea" : "Desconectado"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
