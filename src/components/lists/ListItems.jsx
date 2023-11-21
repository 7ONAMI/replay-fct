import { useEffect, useState } from 'react';
import {get} from "../../utils/httpGet";
import MovieCard from '../MovieCard';

// eslint-disable-next-line react/prop-types
export const ListItems = ({title, top}) => {
    
    
    // tipo de audiovisual ( pelicula o serie)
    let [movies, setMovies] = useState([])
    let [isMovie, setIsMovie] = useState (true);
    // cambiar tipo
    function handleIsMovie() {
        setIsMovie(!isMovie);
    }    
    useEffect(() => {

        // según el tipo de top cambia la busqueda (en estrenos cambia para tv el "top")
        if(isMovie) {
            get("movie/"+top+"?language=es-Es&page=1")
            .then((data)=> setMovies(data.results)) 
            // console.log(movies)  
        }
        else{
            if (top =="upcoming") {
            get("tv/on_the_air?language=es-Es&page=1")
            .then((data)=> setMovies(data.results))   
            }else{
             get("tv/"+top+"?language=es-Es&page=1")
            .then((data)=> setMovies(data.results))   
            }
                
        }
      
      
      
    }, [isMovie, top])
    
    return (
        <div className='ListSection'>
            <div>
                {title && <h3>{title}</h3>}
                { isMovie ?<button disabled>Pelicula</button>:<button onClick={handleIsMovie}>Pelicula</button>}
                { !isMovie ?<button disabled>Serie</button>:<button onClick={handleIsMovie}>Serie</button>}
            </div>
            <div className="list">
            <ul>
                {movies.map((movie) =>(
                    <MovieCard key={movie.id} movie={movie}/>
                ) 
                )}
            </ul>
            </div>
        </div>
    )
}
