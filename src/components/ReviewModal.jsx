import { useState, useEffect } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { useLibrary } from "../context/LibraryContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ReviewModal = ({ movie, onClose }) => {
  const { user } = useAuth();
  const { getReview, saveReview } = useLibrary();
  const navigate = useNavigate();
  const existing = getReview(movie.id);

  const [rating, setRating] = useState(existing?.rating || 0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState(existing?.text || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Bloquear scroll mientras el modal está abierto
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!user) {
    return (
      <Overlay onClose={onClose}>
        <div className="text-center">
          <p className="text-white mb-4">Inicia sesión para escribir una reseña</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#FE99A0] text-slate-900 font-bold px-6 py-2 rounded-lg"
          >
            Iniciar sesión
          </button>
        </div>
      </Overlay>
    );
  }

  const handleSave = async () => {
    if (rating === 0) return;
    setSaving(true);
    await saveReview(movie, rating, text);
    setSaving(false);
    setSaved(true);
    setTimeout(onClose, 800);
  };

  return (
    <Overlay onClose={onClose}>
      <h2 className="text-white font-bold text-lg mb-1 replay">Escribir Reseña</h2>
      <p className="text-slate-400 text-sm mb-4">
        {movie.title || movie.name}
      </p>

      {/* Stars */}
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <FaStar
            key={s}
            size={28}
            className={`cursor-pointer transition ${
              s <= (hovered || rating) ? "text-yellow-400" : "text-slate-600"
            }`}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(s)}
          />
        ))}
        {rating > 0 && (
          <span className="text-slate-400 text-sm self-center ml-2">
            {["", "Pésima", "Regular", "Buena", "Muy buena", "Obra maestra"][rating]}
          </span>
        )}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu opinión (opcional)..."
        rows={4}
        className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#98BCE5] resize-none mb-4"
      />

      <div className="flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-slate-400 hover:text-white text-sm transition"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          disabled={rating === 0 || saving || saved}
          className={`px-5 py-2 rounded-lg font-bold text-sm transition ${
            saved
              ? "bg-green-500 text-white"
              : "bg-[#FE99A0] hover:bg-[#fe8089] disabled:opacity-50 text-slate-900"
          }`}
        >
          {saved ? "¡Guardada! ✓" : saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </Overlay>
  );
};

const Overlay = ({ onClose, children }) => (
  <div
    className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
    onClick={onClose}
  >
    <div
      className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-500 hover:text-white transition"
      >
        <FaTimes />
      </button>
      {children}
    </div>
  </div>
);
