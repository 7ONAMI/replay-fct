

import { LiaImdb } from "react-icons/lia";
import { useParams } from "react-router";
import { get } from "../utils/httpGet";
import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import { Link } from "react-router-dom";
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
        return (
            <div className="bg-slate-600 h-screen flex justify-center items-center">
                <Spinner/>
            </div>
        );
    }
    const imagenUrl = "http://image.tmdb.org/t/p/w500"+ movie.poster_path;
    const imagenUrlOriginal= "http://image.tmdb.org/t/p/w300"
    
  if (type =="movie") { return (
    <div className="bg-slate-800 h-screen">
    <div className=" text-white sm:flex  justify-center pt-10 px-16">
        <div><img className="rounded-xl max-w-sm w-4/5 h-auto " src={imagenUrl} alt={movie.title} /></div>
        <div className="max-w-md w-4/5">
            <div className="text-3xl">{movie.title}</div>
            <div className="text-xs flex space-x-5 pt-2.5 items-center" >
                <div className="movie-date"><span className="text-sky-400 font-bold ">Estreno </span>{movie.release_date} </div>
                <div className="flex items-center movie-vote "><LiaImdb className="m-1" title="icono imdb" size={25}  color="#38bdf8"/> {Math.round(movie.vote_average*10)/10} </div>
                <div className="movie-runtime"><span className="text-sky-400 font-bold ">Duración </span>{Math.floor(movie.runtime/ 60)}h {movie.runtime % 60}m</div>
            </div>
            
            <div className="text-sm pt-2.5 ">
                { movie 
                ? <span><span className="text-sky-400 font-bold">Generos </span>{movie.genres.map(genre=>genre.name).join(", ")}</span> 
                : null}
            </div>
            <div className="text-xl pt-3 text-sky-400">{movie ? movie.tagline : null}</div>
            <div className=" pt-2.5">{movie ? movie.overview : null}</div> 
            <div className="pt-6 text-sm">
                <span className="text-sky-400 font-bold">Director </span>
                <span className="director-name">{director}</span>
            </div>
            <div className="pt-2.5 text-sm">
                <span className="text-sky-400 font-bold">Main Cast </span>
               {movieCredits ? ( movieCredits.cast.map((cast, i) => (i < 11) ? 
                <span key={cast.cast_id}>
                {i !== 10 ? `${cast.name}, ` : 
                `${cast.name}`}
                </span> : null) ): null}  
            </div>
        </div>
    </div>
    <div className="flex p-8  justify-center "><Link className="bg-red-400 p-3 rounded text-white font-bold hover:text-red-400 hover:bg-white" to={"/"}>Volver</Link></div>
    </div>
  ) } else{ return (
    <>
    <div className="bg-slate-800 h-screen">
        <div className=" text-white sm:flex  justify-center pt-10 px-16">
            <div ><img className="rounded-xl max-w-sm w-4/5 h-auto " src={imagenUrl} alt={movie.title} /></div>
            <div className="max-w-md w-4/5">
                <div className="text-3xl">{movie.name}</div>
                <div className="text-xs flex space-x-5 pt-2.5 items-center">
                    <div className="movie-seasons"><span className="text-sky-400 font-bold">Temporadas </span> {movie.number_of_seasons}  </div>
                    <div ><span className="text-sky-400 font-bold">Capitulos </span>{movie.number_of_episodes}</div> 
                    <div className="flex items-center movie-vote "><LiaImdb className="m-1" title="icono imdb" size={25}  color="#38bdf8"/>{Math.round(movie.vote_average*10)/10} </div>  
                </div>
                <div className="movie-genres">
                    { movie 
                    ? <div><span className="text-sky-400 font-bold">Generos </span >{movie.genres.map(genre=>genre.name).join(", ")}</div> 
                    : null}
                </div>
                <div className="pt-2.5"> <span className="text-sky-400 font-bold">Donde Ver</span><div className="flex pt-2 item-center gap-3  h-8">{movie.networks ? movie.networks.map(network => <a key={network.id}href={movie.homepage}><img className="max-h-5" key={network.id} src={imagenUrlOriginal+network.logo_path} alt={network.name} /></a> ): null}</div></div>
                            
                            {movie.overview=="" 
                ? <p> No hay Descripción</p>
                : <div className="pt-2.5">{movie.overview}</div>
                }      
                <div className="pt-2.5"><span className="text-sky-400 font-bold">Creador</span> {movie.created_by=="" ? <span>Desconocido</span> :movie.created_by.map(creator=> creator.name).join(", ")  }</div>
            </div>

        </div>
        <div className="flex p-8  justify-center "><Link className=" p-3 rounded text-white font-bold bg-red-400 hover:text-red-400 hover:bg-white" to={"/"}>Volver</Link></div>
    </div>
    </>
  )}
}
