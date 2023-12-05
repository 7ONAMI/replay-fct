import { useEffect, useState } from 'react';
import {get} from "../../utils/httpGet";
import MovieCard from '../MovieCard';

// eslint-disable-next-line react/prop-types
export const ListItems = ({top}) => {
    
    
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
        <div className='bg-slate-800 pt-10'>
            <div className='w-full px-5'>
               
                { isMovie ?<button className='py-2.5 px-5 me-2 mb-2 text-sm  text-gray-200  bg-gray-700 rounded-full border border-color-white font-bold  ' disabled>Peliculas</button>:<button className='text-white bg-red-400 hover:bg-white hover:text-red-400 font-bold  rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 border-2 border-white  hover:border-red-400' onClick={handleIsMovie}>Peliculas</button>}
                { !isMovie ?<button className='py-2.5 px-5 me-2 mb-2 text-sm  text-gray-200  bg-gray-700 rounded-full border border-color-white font-bold  ' disabled>Series</button>:<button className='text-white bg-red-400 hover:bg-white hover:text-red-400 font-bold  rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 border-2 border-white  hover:border-red-400' onClick={handleIsMovie}>Series</button>}
            </div>
            <div className="px-2 pt-6">
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
