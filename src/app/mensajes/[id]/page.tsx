"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";

interface Message {
  from: string;
  text: string;
  time: string;
}

export default function ConversationPage() {
  const params = useParams();
  const id = params.id as string;
  const conversation = MOCK_CONVERSATIONS.find((c) => c.id === id);

  const [messages, setMessages] = useState<Message[]>(
    conversation?.messages ?? []
  );
  const [input, setInput] = useState("");

  if (!conversation) {
    return (
      <div className="flex h-screen bg-white text-[var(--foreground)]">
        <aside className="hidden lg:flex flex-col w-56 border-r border-[var(--gray-200)] p-4 pt-5 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <span className="font-semibold">Puente</span>
          </Link>
        </aside>
        <main className="flex-1 flex items-center justify-center">
          <p className="text-[var(--gray-500)]">Conversaci&oacute;n no encontrada.</p>
        </main>
      </div>
    );
  }

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setMessages((prev) => [
      ...prev,
      { from: "Priya Sharma", text: trimmed, time: timeStr },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-white text-[var(--foreground)]">
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
            { icon: "\uD83D\uDCDC", label: "Scroll" },
            { icon: "\uD83D\uDCC1", label: "Proyectos" },
            { icon: "\uD83D\uDCE5", label: "Bandeja" },
            { icon: "\uD83D\uDCBC", label: "Empleos" },
            { icon: "\uD83D\uDD0D", label: "Buscar" },
            { icon: "\uD83D\uDC65", label: "Mi Red" },
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

      {/* Conversation area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center gap-3 border-b border-[var(--gray-200)] px-6 py-4">
          <Link
            href="/perfil/priya-sharma"
            className="text-[var(--gray-500)] hover:text-[var(--foreground)] mr-1"
          >
            &larr;
          </Link>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: conversation.participant.color }}
          >
            {conversation.participant.avatar}
          </div>
          <span className="font-semibold">
            {conversation.participant.name}
          </span>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {messages.map((msg, i) => {
            const isMe = msg.from === "Priya Sharma";
            return (
              <div
                key={i}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                    isMe
                      ? "bg-[var(--primary)] text-white rounded-br-md"
                      : "bg-[var(--gray-100)] text-[var(--foreground)] rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-[var(--gray-400)] mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Input bar */}
        <div className="border-t border-[var(--gray-200)] px-6 py-4 flex items-end gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje..."
            rows={1}
            className="flex-1 resize-none border border-[var(--gray-200)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <button
            onClick={handleSend}
            className="bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
