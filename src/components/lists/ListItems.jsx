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
        <div className='bg-slate-600'>
            <div className='w-full '>
                {title && <h3 className='text-white bg-gradient-to-br from-purple-600 to-blue-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>{title}</h3>}
                { isMovie ?<button className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 ' disabled>Pelicula</button>:<button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleIsMovie}>Pelicula</button>}
                { !isMovie ?<button className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 ' disabled>Serie</button>:<button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleIsMovie}>Serie</button>}
            </div>
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
