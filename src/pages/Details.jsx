

import styles from "./Details.module.css";
import { useParams } from "react-router";
import { get } from "../utils/httpGet";
import { useEffect, useState } from "react";
export const Details = () => {
    const {movieId, type} = useParams();
    const [movie, setMovie] = useState(null);
    // console.log("id: "+movieId)
    // console.log("type: "+type)
    
   // efecto
    useEffect(() => {
        get(`${type}/${movieId}?language=es-ES`)
        .then((data)=> setMovie(data)) 
    //console.log(movie)
    }, [movieId, type])

    if(!movie){
        return null;
    }
    const imagenUrl = "http://image.tmdb.org/t/p/w500"+ movie.poster_path;
    const imagenUrlOriginal= "http://image.tmdb.org/t/p/w300"
    
  if (type =="movie") { return (
    <>
    
    <div className={styles.detailsContainer}>
        <img className={`${styles.col} ${styles.movieImage}`} src={imagenUrl} alt={movie.title} />
        <div className={`${styles.col} ${styles.movieDetails}`}>
            <p><strong>Titulo:</strong> {movie.title}</p>
            <p><strong>Generos:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
            
            <p><strong>Descripción:</strong> {movie.overview}</p>      
        </div>

    </div>
    </>
  ) } else{ return (
    <>
    
    <div className={styles.detailsContainer}>
        <img className={`${styles.col} ${styles.movieImage}`} src={imagenUrl} alt={movie.title} />
        <div className={`${styles.col} ${styles.movieDetails}`}>
            <p><strong>Titulo:</strong> {movie.name}</p>
            <p><strong>Score:</strong> {movie.vote_average} Votos Totales: {movie.vote_count}</p>
            <p><strong>Generos:</strong> {movie.genres.map(genre => genre.name).join(", ")}</p>
            <p><strong>Donde Ver:</strong> {movie.networks.map(network => <a key={network.id} href={movie.homepage}><img key={network.id} src={imagenUrlOriginal+network.logo_path} alt={network.name} /></a> )}</p>
            <p><strong>Numero de Temporadas:</strong> {movie.number_of_seasons}</p>
            <p><strong>Numero de Episodios:</strong> {movie.number_of_episodes}</p>
            {movie.overview=="" 
            ?<p><strong>Descripción:</strong> No hay Descripción</p>
            :<p><strong>Descripción:</strong> {movie.overview}</p>
            }      
        </div>

    </div>
    </>
  )}
}
