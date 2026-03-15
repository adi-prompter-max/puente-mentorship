"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface ChatMessage {
  sender: string;
  text: string;
  time: string;
}

export default function SalaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenShare, setScreenShare] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "Elena García Ruiz", text: "¡Hola! ¿Cómo estás hoy?", time: "00:01" },
    { sender: "Tú", text: "¡Bien, gracias! Lista para la sesión.", time: "00:02" },
    { sender: "Elena García Ruiz", text: "Perfecto, empecemos revisando tu CV actualizado.", time: "00:05" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      { sender: "Tú", text: chatInput.trim(), time: formatTime(seconds) },
    ]);
    setChatInput("");
  };

  const handleFinalizar = () => {
    setShowModal(true);
  };

  const confirmFinalizar = () => {
    router.push("/valorar-sesion?mentor=elena-garcia");
  };

  return (
    <div className="flex h-screen bg-[var(--gray-100)]">
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--gray-200)] bg-white">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-[var(--foreground)]">
              Sesión de Mentoría
            </h1>
            <span className="text-sm font-mono text-[var(--gray-500)] bg-[var(--gray-100)] px-3 py-1 rounded-full">
              {formatTime(seconds)}
            </span>
          </div>
          <button
            onClick={handleFinalizar}
            className="px-4 py-2 bg-[var(--error)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Finalizar
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Video area */}
          <div className="flex-1 flex flex-col p-4 gap-4">
            {/* Main video */}
            <div className="flex-1 relative bg-[var(--gray-600)] rounded-2xl flex items-center justify-center aspect-video max-h-[calc(100vh-260px)]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-indigo-400 flex items-center justify-center text-white text-3xl font-bold">
                  EG
                </div>
                <span className="text-white text-lg font-medium">
                  Elena García Ruiz
                </span>
              </div>
              {/* Self camera */}
              <div className="absolute bottom-4 left-4 w-40 h-28 bg-[var(--gray-500)] rounded-xl flex items-center justify-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-sm font-bold">
                    PS
                  </div>
                  <span className="text-white text-xs">Tu cámara</span>
                </div>
              </div>
            </div>

            {/* Control bar */}
            <div className="flex items-center justify-center gap-4 pb-2">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg transition-colors ${
                  micOn ? "bg-[var(--gray-500)] hover:bg-[var(--gray-600)]" : "bg-[var(--error)]"
                }`}
                title={micOn ? "Silenciar micrófono" : "Activar micrófono"}
              >
                {micOn ? "🎤" : "🔇"}
              </button>
              <button
                onClick={() => setCamOn(!camOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg transition-colors ${
                  camOn ? "bg-[var(--gray-500)] hover:bg-[var(--gray-600)]" : "bg-[var(--error)]"
                }`}
                title={camOn ? "Apagar cámara" : "Encender cámara"}
              >
                {camOn ? "📹" : "📷"}
              </button>
              <button
                onClick={() => setScreenShare(!screenShare)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg transition-colors ${
                  screenShare ? "bg-[var(--primary)]" : "bg-[var(--gray-500)] hover:bg-[var(--gray-600)]"
                }`}
                title="Compartir pantalla"
              >
                🖥️
              </button>
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg transition-colors ${
                  chatOpen ? "bg-[var(--primary)]" : "bg-[var(--gray-500)] hover:bg-[var(--gray-600)]"
                }`}
                title="Chat"
              >
                💬
              </button>
            </div>
          </div>

          {/* Chat side panel */}
          {chatOpen && (
            <div className="w-80 border-l border-[var(--gray-200)] bg-white flex flex-col">
              <div className="px-4 py-3 border-b border-[var(--gray-200)]">
                <h2 className="font-semibold text-sm text-[var(--foreground)]">
                  Chat de la sesión
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.sender === "Tú" ? "items-end" : "items-start"}`}>
                    <span className="text-xs text-[var(--gray-400)] mb-1">
                      {msg.sender} · {msg.time}
                    </span>
                    <div
                      className={`px-3 py-2 rounded-xl text-sm max-w-[85%] ${
                        msg.sender === "Tú"
                          ? "bg-[var(--primary)] text-white"
                          : "bg-[var(--gray-100)] text-[var(--foreground)]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="p-3 border-t border-[var(--gray-200)] flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 text-sm border border-[var(--gray-200)] rounded-lg px-3 py-2 outline-none focus:border-[var(--primary)]"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-3 py-2 bg-[var(--primary)] text-white text-sm rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              ¿Finalizar sesión?
            </h2>
            <p className="text-sm text-[var(--gray-500)] mb-6">
              Estás a punto de finalizar la sesión de mentoría. Se te pedirá que
              valores la experiencia.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm border border-[var(--gray-200)] rounded-lg hover:bg-[var(--gray-100)] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmFinalizar}
                className="px-4 py-2 text-sm bg-[var(--error)] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Sí, finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
