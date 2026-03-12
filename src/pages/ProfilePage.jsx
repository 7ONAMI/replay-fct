import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLibrary } from "../context/LibraryContext";
import { IoMdMenu } from "react-icons/io";
import { FaHeart, FaBookmark, FaStar, FaTrash } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w300";

const TABS = [
  { id: "favorites", label: "Favoritos", icon: <FaHeart /> },
  { id: "watchlist", label: "Quiero Ver", icon: <FaBookmark /> },
  { id: "reviews", label: "Mis Reseñas", icon: <MdRateReview /> },
];

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { favorites, watchlist, reviews, toggleFavorite, toggleWatchlist, deleteReview } = useLibrary();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("favorites");
  const [menuClicked, setMenuClicked] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const reviewsList = Object.values(reviews);

  const renderMovieCard = (item, actions) => (
    <li key={item.id} className="relative group bg-slate-700 rounded-xl overflow-hidden">
      <Link to={`/detalles/${item.type}/${item.id}`}>
        {item.poster_path ? (
          <img
            src={IMAGE_BASE + item.poster_path}
            alt={item.title}
            className="w-full object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-slate-600 text-slate-400">
            Sin imagen
          </div>
        )}
        <div className="p-2 text-sm text-white font-medium truncate">{item.title}</div>
      </Link>
      <div className="absolute top-2 right-2 flex gap-1">
        {actions}
      </div>
    </li>
  );

  const renderContent = () => {
    if (activeTab === "favorites") {
      if (favorites.length === 0)
        return <EmptyState text="Aún no tienes favoritos. ¡Marca películas con ❤️!" />;
      return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((item) =>
            renderMovieCard(item, [
              <button
                key="del"
                onClick={(e) => { e.preventDefault(); toggleFavorite(item); }}
                className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full"
                title="Quitar de favoritos"
              >
                <FaTrash size={12} />
              </button>,
            ])
          )}
        </ul>
      );
    }

    if (activeTab === "watchlist") {
      if (watchlist.length === 0)
        return <EmptyState text="Tu lista está vacía. ¡Añade películas que quieras ver!" />;
      return (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {watchlist.map((item) =>
            renderMovieCard(item, [
              <button
                key="del"
                onClick={(e) => { e.preventDefault(); toggleWatchlist(item); }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 rounded-full"
                title="Quitar de la lista"
              >
                <FaTrash size={12} />
              </button>,
            ])
          )}
        </ul>
      );
    }

    if (activeTab === "reviews") {
      if (reviewsList.length === 0)
        return <EmptyState text="Aún no has escrito ninguna reseña." />;
      return (
        <ul className="flex flex-col gap-4">
          {reviewsList.map((item) => (
            <li key={item.id} className="bg-slate-700 rounded-xl p-4 flex gap-4">
              <Link to={`/detalles/${item.type}/${item.id}`} className="shrink-0">
                {item.poster_path ? (
                  <img
                    src={IMAGE_BASE + item.poster_path}
                    alt={item.title}
                    className="w-16 rounded-lg"
                  />
                ) : (
                  <div className="w-16 h-24 bg-slate-600 rounded-lg" />
                )}
              </Link>
              <div className="flex-1">
                <Link to={`/detalles/${item.type}/${item.id}`}>
                  <h3 className="text-white font-bold hover:text-[#98BCE5] transition">{item.title}</h3>
                </Link>
                <div className="flex gap-1 my-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar
                      key={s}
                      size={14}
                      className={s <= item.rating ? "text-yellow-400" : "text-slate-500"}
                    />
                  ))}
                </div>
                <p className="text-slate-300 text-sm">{item.text}</p>
              </div>
              <button
                onClick={() => deleteReview(item.id)}
                className="text-slate-500 hover:text-red-400 transition self-start"
                title="Eliminar reseña"
              >
                <FaTrash size={14} />
              </button>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-800">
      {/* Header */}
      <header className="bg-slate-900 flex sm:flex-row flex-col h-full sm:items-center sm:place-content-between sm:max-h-22 text-white">
        <div className="flex items-center place-content-between w-full">
          <Link to="/">
            <div className="flex items-center pl-5 sm:pl-12 py-4 gap-3 text-[#FE99A0]">
              <img className="max-h-16 pr-3" src="/images/replay.png" alt="logo" />
              <span className="border border-light-gray h-12 hidden md:flex"></span>
              <h2 className="replay sm:pl-3 text-2xl">
                <span className="text-[#98BCE5]">RE</span>PLAY
              </h2>
            </div>
          </Link>
          <IoMdMenu
            size={50}
            className={`${menuClicked ? "" : "hidden"} cursor-pointer mr-5 sm:hidden`}
            onClick={() => setMenuClicked((p) => !p)}
          />
        </div>
        <nav className={`${menuClicked ? "hidden" : ""} list-none gap-3 sm:flex flex flex-col items-center sm:flex-row text-[18px] sm:w-full sm:pr-5 sm:justify-end sm:items-center`}>
          <li className={`${menuClicked ? "hidden" : ""} cursor-pointer sm:hidden flex place-content-end`}>
            <IoMdMenu size={50} color="#98BCE5" onClick={() => setMenuClicked((p) => !p)} />
          </li>
          <li>
            <Link to="/" className="text-white hover:text-[#98BCE5]">Populares</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="text-[#FE99A0] hover:text-white transition">
              Cerrar sesión
            </button>
          </li>
        </nav>
      </header>

      {/* Profile header */}
      <div className="bg-slate-900 px-6 py-8 border-b border-slate-700">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#FE99A0] flex items-center justify-center text-slate-900 font-bold text-2xl">
            {user?.displayName?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-white text-xl font-bold replay">{user?.displayName}</h1>
            <p className="text-slate-400 text-sm">{user?.email}</p>
            <div className="flex gap-4 mt-1 text-xs text-slate-400">
              <span><span className="text-[#FE99A0] font-bold">{favorites.length}</span> favoritos</span>
              <span><span className="text-[#98BCE5] font-bold">{watchlist.length}</span> en lista</span>
              <span><span className="text-yellow-400 font-bold">{reviewsList.length}</span> reseñas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <div className="flex gap-2 mb-6 border-b border-slate-700">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px ${
                activeTab === tab.id
                  ? "border-[#FE99A0] text-[#FE99A0]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        {renderContent()}
      </div>
      <div className="pb-12" />
    </div>
  );
};

const EmptyState = ({ text }) => (
  <div className="text-center text-slate-400 py-16 text-lg">{text}</div>
);
