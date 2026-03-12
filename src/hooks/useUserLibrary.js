import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";

export const useUserLibrary = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [reviews, setReviews] = useState({});
  const [loadingLibrary, setLoadingLibrary] = useState(false);

  // Cargar biblioteca del usuario al iniciar sesión
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setWatchlist([]);
      setReviews({});
      return;
    }
    fetchLibrary();
  }, [user]);

  const fetchLibrary = async () => {
    if (!user) return;
    setLoadingLibrary(true);
    try {
      const [favsSnap, watchSnap, reviewsSnap] = await Promise.all([
        getDocs(collection(db, "users", user.uid, "favorites")),
        getDocs(collection(db, "users", user.uid, "watchlist")),
        getDocs(collection(db, "users", user.uid, "reviews")),
      ]);
      setFavorites(favsSnap.docs.map((d) => d.data()));
      setWatchlist(watchSnap.docs.map((d) => d.data()));
      const reviewsMap = {};
      reviewsSnap.docs.forEach((d) => {
        reviewsMap[d.id] = d.data();
      });
      setReviews(reviewsMap);
    } catch (e) {
      console.error("Error cargando biblioteca:", e);
    } finally {
      setLoadingLibrary(false);
    }
  };

  // ── FAVORITOS ──────────────────────────────────────────────
  const isFavorite = (id) => favorites.some((f) => f.id === id);

  const toggleFavorite = async (movie) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "favorites", String(movie.id));
    if (isFavorite(movie.id)) {
      await deleteDoc(ref);
      setFavorites((prev) => prev.filter((f) => f.id !== movie.id));
    } else {
      const data = buildMovieData(movie);
      await setDoc(ref, data);
      setFavorites((prev) => [...prev, data]);
    }
  };

  // ── WATCHLIST ──────────────────────────────────────────────
  const isInWatchlist = (id) => watchlist.some((w) => w.id === id);

  const toggleWatchlist = async (movie) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "watchlist", String(movie.id));
    if (isInWatchlist(movie.id)) {
      await deleteDoc(ref);
      setWatchlist((prev) => prev.filter((w) => w.id !== movie.id));
    } else {
      const data = buildMovieData(movie);
      await setDoc(ref, data);
      setWatchlist((prev) => [...prev, data]);
    }
  };

  // ── RESEÑAS ────────────────────────────────────────────────
  const getReview = (id) => reviews[String(id)] || null;

  const saveReview = async (movie, rating, text) => {
    if (!user) return;
    const key = String(movie.id);
    const ref = doc(db, "users", user.uid, "reviews", key);
    const data = {
      ...buildMovieData(movie),
      rating,
      text,
      updatedAt: serverTimestamp(),
    };
    await setDoc(ref, data);
    setReviews((prev) => ({ ...prev, [key]: data }));
  };

  const deleteReview = async (movieId) => {
    if (!user) return;
    const key = String(movieId);
    await deleteDoc(doc(db, "users", user.uid, "reviews", key));
    setReviews((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // ── HELPERS ────────────────────────────────────────────────
  const buildMovieData = (movie) => ({
    id: movie.id,
    title: movie.title || movie.name,
    poster_path: movie.poster_path,
    type: movie.title ? "movie" : "tv",
    vote_average: movie.vote_average,
    addedAt: serverTimestamp(),
  });

  return {
    favorites,
    watchlist,
    reviews,
    loadingLibrary,
    isFavorite,
    toggleFavorite,
    isInWatchlist,
    toggleWatchlist,
    getReview,
    saveReview,
    deleteReview,
  };
};
