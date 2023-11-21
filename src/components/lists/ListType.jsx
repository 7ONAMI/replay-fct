import { useEffect, useState } from 'react';
import {get} from "../../utils/httpGet";
import MovieCard from '../MovieCard';

// eslint-disable-next-line react/prop-types
export const ListType = ({title, top, type}) => {
    
    
    // tipo de audiovisual ( pelicula o serie)
    let [movies, setMovies] = useState([])
    // cambiar tipo
     
    useEffect(() => {

        // según el tipo de top cambia la busqueda (en estrenos cambia para tv el "top")
        if(type=="movie") {
            get("movie/"+top+"?language=es-Es&page=1")
            .then((data)=> setMovies(data.results)) 
            // console.log(movies)  
        }
        else if (type== "tv") {
            
            if (top =="upcoming") {
            get("tv/on_the_air?language=es-Es&page=1")
            .then((data)=> setMovies(data.results))   
            }else{
             get("tv/"+top+"?language=es-Es&page=1")
            .then((data)=> setMovies(data.results))   
            }
                
        }
      
    }, [type, top])
    
    return (
        <div className='ListSection'>
            {title && <h3>{title}</h3>}
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