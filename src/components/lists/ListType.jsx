import { useEffect, useState } from 'react';
import {get} from "../../utils/httpGet";
import MovieCard from '../MovieCard';

// eslint-disable-next-line react/prop-types
export const ListType = ({title, top, type}) => {
    
    
    // tipo de audiovisual ( pelicula o serie)
    let [movies, setMovies] = useState([])
    let [isMovie, setIsMovie] = useState (true);
    // cambiar tipo
     
    useEffect(() => {

        // según el tipo de top cambia la busqueda (en estrenos cambia para tv el "top")
        if(type=="movie") {
            get("movie/"+top+"?language=es-Es&page=1")
            .then((data)=> setMovies(data.results)) 
            // console.log(movies)  
            setIsMovie(true);
        }
        else if (type== "tv") {
            
            if (top =="upcoming") {
            get("tv/on_the_air?language=es-Es&page=1")
            .then((data)=> setMovies(data.results))   
            }else{
             get("tv/"+top+"?language=es-Es&page=1")
            .then((data)=> setMovies(data.results))   
            }
            setIsMovie(false);   
        }
      
    }, [type, top])
    
    return (
        <div className='bg-slate-600'>
            {title && <h3 className='text-white bg-gradient-to-br from-purple-600 to-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>{title}</h3>}
        <div className="px-2">
            
            <ul className="grid md:grid-cols-4 text-white p-50 gap-2.5">
                {movies.map((movie) =>(
                    <MovieCard key={movie.id} movie={movie} isMovie={isMovie}/>
                ) 
                )}
            </ul>
            </div>
        </div>
    )
}