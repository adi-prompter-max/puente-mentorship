"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_ACTIVITY } from "@/lib/mock-data";

interface Comment {
  name: string;
  initials: string;
  color: string;
  text: string;
  time: string;
  likes: number;
}

const MOCK_COMMENTS: Comment[] = [
  { name: "Sofía Martínez", initials: "SM", color: "#6366f1", text: "¡Muchas gracias por compartir esto! Me será de gran ayuda para mi proyecto actual.", time: "hace 1h", likes: 4 },
  { name: "Luis Fernández", initials: "LF", color: "#ef4444", text: "Excelente recurso. ¿Tienes más información sobre este tema?", time: "hace 2h", likes: 2 },
  { name: "Ana Castillo", initials: "AC", color: "#f59e0b", text: "Totalmente de acuerdo. Esto es justo lo que necesitaba leer hoy. Gracias por la inspiración.", time: "hace 3h", likes: 7 },
  { name: "Diego Morales", initials: "DM", color: "#10b981", text: "Interesante perspectiva. Me gustaría discutir más sobre esto en la próxima sesión grupal.", time: "hace 4h", likes: 1 },
  { name: "Valentina Ríos", initials: "VR", color: "#8b5cf6", text: "Me encanta esta comunidad. Siempre aprendiendo algo nuevo aquí.", time: "hace 5h", likes: 5 },
  { name: "Carlos Mendoza", initials: "CM", color: "#ec4899", text: "Gran aporte para todos los que estamos empezando en este camino profesional.", time: "hace 6h", likes: 3 },
];

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.postId as string;
  const postIndex = parseInt(postId, 10);

  const post = MOCK_ACTIVITY[postIndex];

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [commentText, setCommentText] = useState("");
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--gray-100)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Publicación no encontrada</h1>
          <p className="text-[var(--gray-500)] mb-4">No se encontró la publicación que buscas.</p>
          <Link href="/scroll" className="text-[var(--primary)] hover:underline text-sm">
            ← Volver al scroll
          </Link>
        </div>
      </div>
    );
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      name: "Tú",
      initials: "T",
      color: "#2B7A4B",
      text: commentText.trim(),
      time: "ahora",
      likes: 0,
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  const toggleCommentLike = (idx: number) => {
    setLikedComments((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const likeCount = (post.likes || 0) + (liked ? 1 : 0);

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
        <Link href="/scroll" className="text-sm text-[var(--primary)] hover:underline mb-6 inline-block">
          ← Volver al scroll
        </Link>

        {/* Full post */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0"
              style={{ backgroundColor: post.color }}
            >
              {post.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold text-[var(--foreground)]">{post.user}</span>{" "}
                <span className="text-[var(--gray-500)]">{post.action}</span>
              </p>
              <p className="text-xs text-[var(--gray-400)]">{post.time}</p>
            </div>
          </div>

          <p className="text-[var(--foreground)] leading-relaxed mb-5">{post.content}</p>

          <div className="flex items-center gap-4 border-t border-[var(--gray-100)] pt-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                liked ? "text-red-500" : "text-[var(--gray-400)] hover:text-red-500"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <span>{likeCount}</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm text-[var(--gray-400)] hover:text-[var(--primary)] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              <span>Compartir</span>
            </button>
          </div>
        </div>

        {/* Comments section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-semibold text-[var(--foreground)] mb-5">
            Comentarios ({comments.length})
          </h2>

          <div className="space-y-4 mb-6">
            {comments.map((comment, idx) => {
              const commentLiked = likedComments.has(idx);
              const commentLikeCount = comment.likes + (commentLiked ? 1 : 0);

              return (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                    style={{ backgroundColor: comment.color }}
                  >
                    {comment.initials}
                  </div>
                  <div className="flex-1">
                    <div className="bg-[var(--gray-100)] rounded-lg px-4 py-3">
                      <p className="text-sm font-semibold text-[var(--foreground)]">{comment.name}</p>
                      <p className="text-sm text-[var(--gray-600)] mt-1">{comment.text}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 px-1">
                      <span className="text-xs text-[var(--gray-400)]">{comment.time}</span>
                      <button
                        onClick={() => toggleCommentLike(idx)}
                        className={`flex items-center gap-1 text-xs transition-colors ${
                          commentLiked ? "text-red-500" : "text-[var(--gray-400)] hover:text-red-500"
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={commentLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <span>{commentLikeCount}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add comment */}
          <div className="border-t border-[var(--gray-100)] pt-5">
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">Añadir comentario</h3>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                T
              </div>
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Escribe tu comentario..."
                  className="w-full border border-[var(--gray-200)] rounded-lg p-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] mb-2"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Comentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
