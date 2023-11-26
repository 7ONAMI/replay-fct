import { Link } from "react-router-dom";
import  styles from "./MovieCard.module.css"
import { useEffect, useState } from "react";
// eslint-disable-next-line react/prop-types
const MovieCard = ({movie, isMovie}) => {
      
    // eslint-disable-next-line react/prop-types
    const imagenUrl = "http://image.tmdb.org/t/p/w300"+ movie.poster_path;
   const [type, setType] = useState("movie")
    useEffect(() => {
      isMovie ? setType("movie") : setType("tv");
    
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
    
    <li className={styles.movieCard}>
      {/* Link a detalles de cada pelicula pasando el ID de la pelicula o serie */}
      {/* eslint-disable-next-line react/prop-types */}
      <Link to={"/detalles/"+type+"/"+movie.id}>
        <img 
        className={styles.movieImagen}
        width={230}
        height={345}
        src={imagenUrl} 
        // eslint-disable-next-line react/prop-types
        alt={movie.title} />

        {/*  eslint-disable-next-line react/prop-types */}
        <div>{movie.title}</div>
        </Link>
    </li>
    
  )
}

export default MovieCard

