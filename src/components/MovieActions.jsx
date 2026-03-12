import { useState } from "react";
import { FaHeart, FaBookmark, FaStar } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useLibrary } from "../context/LibraryContext";
import { useNavigate } from "react-router-dom";
import { ReviewModal } from "./ReviewModal";

export const MovieActions = ({ movie }) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite, isInWatchlist, toggleWatchlist, getReview } = useLibrary();
  const navigate = useNavigate();
  const [showReview, setShowReview] = useState(false);

  const fav = isFavorite(movie.id);
  const watch = isInWatchlist(movie.id);
  const review = getReview(movie.id);

  const requireLogin = (action) => {
    if (!user) {
      navigate("/login");
      return;
    }
    action();
  };

  return (
    <>
      <div className="flex gap-3 mt-5 flex-wrap">
        {/* Favorito */}
        <button
          onClick={() => requireLogin(() => toggleFavorite(movie))}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 transition ${
            fav
              ? "bg-[#FE99A0] border-[#FE99A0] text-slate-900"
              : "border-[#FE99A0] text-[#FE99A0] hover:bg-[#FE99A0] hover:text-slate-900"
          }`}
          title={fav ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <FaHeart />
          {fav ? "En favoritos" : "Favorito"}
        </button>

        {/* Watchlist */}
        <button
          onClick={() => requireLogin(() => toggleWatchlist(movie))}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 transition ${
            watch
              ? "bg-[#98BCE5] border-[#98BCE5] text-slate-900"
              : "border-[#98BCE5] text-[#98BCE5] hover:bg-[#98BCE5] hover:text-slate-900"
          }`}
          title={watch ? "Quitar de la lista" : "Añadir a Quiero Ver"}
        >
          <FaBookmark />
          {watch ? "En mi lista" : "Quiero ver"}
        </button>

        {/* Reseña */}
        <button
          onClick={() => requireLogin(() => setShowReview(true))}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-2 transition ${
            review
              ? "bg-yellow-400 border-yellow-400 text-slate-900"
              : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900"
          }`}
          title="Escribir reseña"
        >
          <FaStar />
          {review ? `Mi nota: ${review.rating}/5` : "Reseñar"}
        </button>
      </div>

      {!user && (
        <p className="text-slate-400 text-xs mt-2">
          <button onClick={() => navigate("/login")} className="text-[#98BCE5] hover:underline">
            Inicia sesión
          </button>{" "}
          para guardar y reseñar
        </p>
      )}

      {showReview && (
        <ReviewModal movie={movie} onClose={() => setShowReview(false)} />
      )}
    </>
  );
};
