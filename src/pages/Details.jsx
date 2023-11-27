

import styles from "./Details.module.css";
import { useParams } from "react-router";
import { get } from "../utils/httpGet";
import { useEffect, useState } from "react";
import {NavBar} from "../components/NavBar"
export const Details = () => {
    const {movieId, type} = useParams();
    const [movie, setMovie] = useState(null);
    const [movieCredits, setMovieCredits] = useState(null);
    const [director, setDirector] = useState(null);
    // console.log("type: "+type)
    
   // efecto
    useEffect(() => {
        // fetch de pelicula o serie
        get(`${type}/${movieId}?language=es-ES`)
        .then((data)=> setMovie(data)) 
        // fetch de los creditos
        get(`${type}/${movieId}/credits?language=es-ES`)
        .then((data)=>setMovieCredits(data))
    //console.log(movie)
    }, [movieId, type])

    useEffect(() => {
      const dir = movieCredits ? movieCredits.crew.filter(i =>i.job ==="Director") : null
      let dir1 = movieCredits ? dir[0]: null
      let dirName = dir1 ? dir1.name: null;
      setDirector(dirName);     
    }, [movieCredits])
    
   

    if(!movie){
        return null;
    }
    const imagenUrl = "http://image.tmdb.org/t/p/w500"+ movie.poster_path;
    const imagenUrlOriginal= "http://image.tmdb.org/t/p/w300"
    
  if (type =="movie") { return (
    <>
    <NavBar/>
    <div className={styles.detailsContainer}>
        <img className={`${styles.col} ${styles.movieImage}`} src={imagenUrl} alt={movie.title} />
        <div className={`${styles.col} ${styles.movieDetails}`}>
            <div className="movie-title">{movie.title}</div>
            <div className="movie-info">
                <span className="movie-date">{movie.release_date} </span>
                <span className="movie-vote">{Math.round(movie.vote_average*10)/10} </span>
                <span className="movie-runtime">{Math.floor(movie.runtime/ 60)}h {movie.runtime % 60}min</span>
            </div>
            
            <div className="movie-genres">
                { movie 
                ? <span>{movie.genres.map(genre=>genre.name).join(", ")}</span> 
                : null}
            </div>
            <div className="movie-tagline">{movie ? movie.tagline : null}</div>
            <div className="movie-overview">{movie ? movie.overview : null}</div> 
            <div className="movie-director">
                <span className="director-job">Director </span>
                <span className="director-name">{director}</span>
            </div>
            <div className="movie-cast">
                <span className="main-cast">Main Cast </span>
               {movieCredits ? ( movieCredits.cast.map((cast, i) => (i < 11) ? 
                <span key={cast.cast_id}>
                {i !== 10 ? `${cast.name}, ` : 
                `${cast.name}`}
                </span> : null) ): null}  
            </div>
        </div>
    </div>
    </>
  ) } else{ return (
    <>
    <NavBar/>
    <div className={styles.detailsContainer}>
        <img className={`${styles.col} ${styles.movieImage}`} src={imagenUrl} alt={movie.title} />
        <div className={`${styles.col} ${styles.movieDetails}`}>
            <div className="movie-title">{movie.name}</div>
            <div className="movie-info">
                <span className="movie-seasons">{movie.number_of_seasons} {movie.number_of_seasons > 1 ? "Temporadas ": "Temporada "} </span>
                <span className="movie-episodes">{movie.number_of_episodes} {movie.number_of_episodes > 1 ? "Capitulos ": "Capitulo "}</span> 
                <span className="movie-vote">{Math.round(movie.vote_average*10)/10} </span>  
            </div>
            <div className="movie-genres">
                { movie 
                ? <span>{movie.genres.map(genre=>genre.name).join(", ")}</span> 
                : null}
            </div>
            <div className="networks"> <span>Canales </span>{movie.networks ? movie.networks.map(network => <a key={network.id}href={movie.homepage}><img key={network.id} src={imagenUrlOriginal+network.logo_path} alt={network.name} /></a> ): null}</div>
                        
                        {movie.overview=="" 
            ? <p> No hay Descripción</p>
            : <div className="overview">{movie.overview}</div>
            }      
            <div className="creator">Creador {movie.created_by.map(creator=> creator.name).join(", ")}</div>
        </div>

    </div>
    </>
  )}
}
