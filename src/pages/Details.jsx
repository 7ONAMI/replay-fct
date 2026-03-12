import { LiaImdb } from "react-icons/lia";
import { useParams } from "react-router";
import { get } from "../utils/httpGet";
import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { MovieActions } from "../components/MovieActions";

export const Details = () => {
  const { movieId, type } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [director, setDirector] = useState(null);

  useEffect(() => {
    get(`${type}/${movieId}?language=es-ES`)
      .then((data) => setMovie(data))
    get(`${type}/${movieId}/credits?language=es-ES`)
      .then((data) => setMovieCredits(data))
  }, [movieId, type])

  useEffect(() => {
    const dir = movieCredits ? movieCredits.crew.filter(i => i.job === "Director") : null
    let dir1 = movieCredits ? dir[0] : null
    let dirName = dir1 ? dir1.name : null;
    setDirector(dirName);
  }, [movieCredits])

  const navLinks = (
    <>
      <li><Link to="/" state={{ some: "popular" }}><span className="hover:text-[#98BCE5]">Populares</span></Link></li>
      <li><Link to="/" state={{ some: "top_rated" }}><span className="hover:text-[#98BCE5]">Mejor Valoradas</span></Link></li>
      <li><Link to="/" state={{ some: "upcoming" }}><span className="hover:text-[#98BCE5]">Estrenos</span></Link></li>
    </>
  );

  if (!movie) {
    return (
      <div className="bg-slate-600 h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const imagenUrl = "http://image.tmdb.org/t/p/w500" + movie.poster_path;
  const imagenUrlOriginal = "http://image.tmdb.org/t/p/w300"

  if (type === "movie") {
    return (
      <div className="bg-slate-800">
        <Navbar navLinks={navLinks} />
        <div className="text-white flex flex-col sm:flex-row justify-center sm:min-h-screen pt-10 sm:px-16 pb-10">
          <div className="flex justify-center max-h-96">
            <img className="rounded-xl max-w-sm h-auto" src={imagenUrl} alt={movie.title} />
          </div>
          <div className="flex justify-center text-center sm:text-left">
            <div className="max-w-md w-4/5">
              <div className="text-3xl">{movie.title}</div>
              <div className="text-xs flex space-x-5 pt-2.5 justify-center sm:justify-start items-center">
                <div><span className="text-sky-400 font-bold">Estreno </span>{movie.release_date}</div>
                <div className="flex items-center">
                  <LiaImdb className="m-1" title="icono imdb" size={25} color="#38bdf8" />
                  {Math.round(movie.vote_average * 10) / 10}
                </div>
                <div><span className="text-sky-400 font-bold">Duración </span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</div>
              </div>

              <div className="text-sm pt-2.5">
                {movie && (
                  <span>
                    <span className="text-sky-400 font-bold">Géneros </span>
                    {movie.genres.map(genre => genre.name).join(", ")}
                  </span>
                )}
              </div>
              <div className="text-xl pt-3 text-sky-400">{movie?.tagline}</div>
              <div className="pt-2.5">{movie?.overview}</div>
              <div className="pt-6 text-sm">
                <span className="text-sky-400 font-bold">Director </span>
                <span>{director}</span>
              </div>
              <div className="pt-2.5 text-sm">
                <span className="text-sky-400 font-bold">Reparto </span>
                {movieCredits?.cast.map((cast, i) => i < 11 ? (
                  <span key={cast.cast_id}>
                    {i !== 10 ? `${cast.name}, ` : cast.name}
                  </span>
                ) : null)}
              </div>

              {/* ✨ Acciones de usuario */}
              <MovieActions movie={movie} />
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="bg-slate-800">
        <Navbar navLinks={navLinks} />
        <div className="text-white flex flex-col sm:flex-row justify-center sm:min-h-screen pt-10 sm:px-16 pb-10">
          <div className="flex justify-center max-h-96">
            <img className="rounded-xl max-w-sm h-auto" src={imagenUrl} alt={movie.name} />
          </div>
          <div className="flex justify-center text-center sm:text-left">
            <div className="max-w-md w-4/5">
              <div className="text-3xl">{movie.name}</div>
              <div className="text-xs flex space-x-5 pt-2.5 items-center justify-center sm:justify-start">
                <div><span className="text-sky-400 font-bold">Temporadas </span>{movie.number_of_seasons}</div>
                <div><span className="text-sky-400 font-bold">Capítulos </span>{movie.number_of_episodes}</div>
                <div className="flex items-center">
                  <LiaImdb className="m-1" title="icono imdb" size={25} color="#38bdf8" />
                  {Math.round(movie.vote_average * 10) / 10}
                </div>
              </div>
              <div className="movie-genres">
                {movie && (
                  <div>
                    <span className="text-sky-400 font-bold">Géneros </span>
                    {movie.genres.map(genre => genre.name).join(", ")}
                  </div>
                )}
              </div>
              <div className="pt-2.5">
                <span className="text-sky-400 font-bold">Dónde Ver</span>
                <div className="flex pt-2 items-center gap-3 h-8">
                  {movie.networks?.map(network => (
                    <a key={network.id} href={movie.homepage}>
                      <img className="max-h-5" src={imagenUrlOriginal + network.logo_path} alt={network.name} />
                    </a>
                  ))}
                </div>
              </div>
              {movie.overview === "" ? (
                <p>No hay descripción</p>
              ) : (
                <div className="pt-2.5">{movie.overview}</div>
              )}
              <div className="pt-2.5">
                <span className="text-sky-400 font-bold">Creador </span>
                {movie.created_by?.length === 0
                  ? <span>Desconocido</span>
                  : movie.created_by?.map(c => c.name).join(", ")}
              </div>

              {/* ✨ Acciones de usuario */}
              <MovieActions movie={movie} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
