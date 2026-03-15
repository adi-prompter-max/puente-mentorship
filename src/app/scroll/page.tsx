"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_ACTIVITY } from "@/lib/mock-data";

type PostType = "Recurso" | "Pregunta" | "Logro" | "Consejo" | null;

interface Comment {
  name: string;
  initials: string;
  color: string;
  text: string;
  time: string;
}

interface LocalPost {
  user: string;
  avatar: string;
  color: string;
  action: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
}

const MOCK_COMMENTS: Comment[] = [
  { name: "Ana López", initials: "AL", color: "#6366f1", text: "¡Excelente aporte! Muy útil para todos.", time: "hace 1h" },
  { name: "Diego Ruiz", initials: "DR", color: "#f59e0b", text: "Gracias por compartir esto con la comunidad.", time: "hace 2h" },
];

export default function ScrollPage() {
  const [content, setContent] = useState("");
  const [selectedType, setSelectedType] = useState<PostType>(null);
  const [localPosts, setLocalPosts] = useState<LocalPost[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [newComments, setNewComments] = useState<Record<number, Comment[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

  const postTypes: PostType[] = ["Recurso", "Pregunta", "Logro", "Consejo"];

  const handlePublish = () => {
    if (!content.trim()) return;
    const newPost: LocalPost = {
      user: "Tú",
      avatar: "T",
      color: "#2B7A4B",
      action: selectedType ? `compartió un ${selectedType.toLowerCase()}` : "publicó",
      content: content.trim(),
      time: "ahora",
      likes: 0,
      comments: 0,
    };
    setLocalPosts([newPost, ...localPosts]);
    setContent("");
    setSelectedType(null);
  };

  const allPosts = [...localPosts, ...MOCK_ACTIVITY];

  const toggleLike = (idx: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleComments = (idx: number) => {
    setExpandedComments((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const addComment = (idx: number) => {
    const text = commentInputs[idx]?.trim();
    if (!text) return;
    const comment: Comment = { name: "Tú", initials: "T", color: "#2B7A4B", text, time: "ahora" };
    setNewComments((prev) => ({ ...prev, [idx]: [...(prev[idx] || []), comment] }));
    setCommentInputs((prev) => ({ ...prev, [idx]: "" }));
  };

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
          {[
            { icon: "📜", label: "Scroll", href: "/scroll" },
            { icon: "📁", label: "Proyectos", href: "/perfil/priya-sharma" },
            { icon: "📥", label: "Bandeja", href: "/mensajes/conv-1" },
            { icon: "💼", label: "Empleos", href: "/empleos" },
            { icon: "🔍", label: "Buscar", href: "/buscar" },
            { icon: "👥", label: "Mi Red", href: "/perfil/priya-sharma" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--gray-500)] hover:bg-[var(--gray-100)] transition-colors"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 max-w-2xl mx-auto p-6">
        {/* Crear publicación */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <h2 className="font-semibold text-[var(--foreground)] mb-3">Crear publicación</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="¿Qué quieres compartir?"
            className="w-full border border-[var(--gray-200)] rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] mb-3"
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {postTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedType === type
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--gray-100)] text-[var(--gray-500)] hover:bg-[var(--gray-200)]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <button
            onClick={handlePublish}
            disabled={!content.trim()}
            className="bg-[var(--primary)] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Publicar
          </button>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {allPosts.map((post, idx) => {
            const liked = likedPosts.has(idx);
            const expanded = expandedComments.has(idx);
            const postComments = [...MOCK_COMMENTS, ...(newComments[idx] || [])];
            const likeCount = (post.likes || 0) + (liked ? 1 : 0);

            return (
              <div key={idx} className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                    style={{ backgroundColor: post.color }}
                  >
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold text-[var(--foreground)]">{post.user}</span>{" "}
                      <span className="text-[var(--gray-500)]">{post.action}</span>
                    </p>
                    <p className="text-xs text-[var(--gray-400)]">{post.time}</p>
                  </div>
                </div>

                <p className="text-sm text-[var(--foreground)] mb-4 leading-relaxed">{post.content}</p>

                <div className="flex items-center gap-4 border-t border-[var(--gray-100)] pt-3">
                  <button
                    onClick={() => toggleLike(idx)}
                    className={`flex items-center gap-1.5 text-sm transition-colors ${
                      liked ? "text-red-500" : "text-[var(--gray-400)] hover:text-red-500"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <span>{likeCount}</span>
                  </button>
                  <button
                    onClick={() => toggleComments(idx)}
                    className="flex items-center gap-1.5 text-sm text-[var(--gray-400)] hover:text-[var(--primary)] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                    <span>{post.comments || 0}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-[var(--gray-400)] hover:text-[var(--primary)] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                    <span>Compartir</span>
                  </button>
                </div>

                {expanded && (
                  <div className="mt-4 border-t border-[var(--gray-100)] pt-4 space-y-3">
                    <h4 className="text-sm font-semibold text-[var(--foreground)]">Comentarios</h4>
                    {postComments.map((c, ci) => (
                      <div key={ci} className="flex items-start gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                          style={{ backgroundColor: c.color }}
                        >
                          {c.initials}
                        </div>
                        <div className="bg-[var(--gray-100)] rounded-lg px-3 py-2 flex-1">
                          <p className="text-xs font-semibold text-[var(--foreground)]">{c.name}</p>
                          <p className="text-xs text-[var(--gray-600)]">{c.text}</p>
                          <p className="text-xs text-[var(--gray-400)] mt-1">{c.time}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-start gap-2 mt-2">
                      <div className="w-7 h-7 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        T
                      </div>
                      <input
                        type="text"
                        value={commentInputs[idx] || ""}
                        onChange={(e) => setCommentInputs((prev) => ({ ...prev, [idx]: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && addComment(idx)}
                        placeholder="Escribe un comentario..."
                        className="flex-1 border border-[var(--gray-200)] rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      />
                      <button
                        onClick={() => addComment(idx)}
                        className="bg-[var(--primary)] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[var(--primary-hover)] transition-colors"
                      >
                        Comentar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
