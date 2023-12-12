

import { LiaImdb } from "react-icons/lia";
import { useParams } from "react-router";
import { get } from "../utils/httpGet";
import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
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
    
   // abrir y cerrar menu en pantalla pequeña
   const [menuClicked, setMenuClicked] = useState(true);

   const handleClickMenu = () =>{
     setMenuClicked(prevState=>!prevState);
   }

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
    
    <div className="bg-slate-800 ">
        <header className=' bg-slate-900 flex sm:flex-row flex-col h-full sm:items-center sm:place-content-between sm:max-h-22 text-white'>
                    {/* imagen de logo */}
            <div className='flex items-center place-content-between w-full'>
                <Link to={"/"}>
                    <div className='flex items-center pl-5  sm:pl-12 py-4  gap-3 text-[#FE99A0] '>
                    <img className='max-h-16 pr-3' src="/images/replay.png" alt="logo" />
                    <span className="border border-light-gray h-12 hidden md:flex"></span>
                    <h2 className='replay sm:pl-3 text-2xl'><span className='text-[#98BCE5]'>RE</span>PLAY</h2>
                    </div> 
                </Link>
                <IoMdMenu size={50} className={`${menuClicked ? '' : 'hidden'} cursor-pointer mr-5 sm:hidden`} onClick={handleClickMenu}/>
            </div>
                  
            <nav className={`${menuClicked ? 'hidden' : '' }  sm:flex  flex flex-col items-center sm:flex-row text-[18px] sm:w-full `}>
                <ul className="list-none sm:flex gap-3 flex flex-col items-center sm:flex-row text-[18px] sm:w-full sm:pr-4 sm:justify-end  sm:items-center" >
                    <li className={`${menuClicked ? 'hidden' : ''} cursor-pointer sm:hidden  flex place-content-end`}><IoMdMenu size={50} color='#98BCE5' onClick={handleClickMenu}/></li>
                    <li><Link to={"/"} state={{some: "popular"}}><span className="hover:text-[#98BCE5]">Populares</span></Link></li>
                    <li><Link to={"/"} state={{some: "top_rated"}}><span className="hover:text-[#98BCE5]">Mejor Valoradas</span></Link></li>
                    <li><Link to={{pathname:"/", state:{some:"upcoming"}}}><span className="hover:text-[#98BCE5]">Estrenos</span></Link></li>
                </ul>
            </nav>

        </header>
    <div className=" text-white flex flex-col sm:flex-row justify-center sm:h-screen pt-10 sm:px-16 pb-10">
        <div className="flex  justify-center  max-h-96"><img className="rounded-xl max-w-sm   h-auto " src={imagenUrl} alt={movie.title} /></div>
            <div className="flex justify-center text-center sm:text-left">
                <div className="max-w-md w-4/5" >
                    <div className="text-3xl">{movie.title}</div>
                    <div className="text-xs flex space-x-5 pt-2.5 justify-center items-center" >
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
        
    </div>
    </div>
  ) } else{ return (
    <>
    <div className="bg-slate-800">
        <header className=' bg-slate-900 flex sm:flex-row flex-col h-full sm:items-center sm:place-content-between sm:max-h-22 text-white'>
                    {/* imagen de logo */}
            <div className='flex items-center place-content-between w-full'>
                <Link to={"/"}>
                    <div className='flex items-center pl-5  sm:pl-12 py-4  gap-3 text-[#FE99A0] '>
                    <img className='max-h-16 pr-3' src="/images/replay.png" alt="logo" />
                    <span className="border border-light-gray h-12 hidden md:flex"></span>
                    <h2 className='replay sm:pl-3 text-2xl'><span className='text-[#98BCE5]'>RE</span>PLAY</h2>
                    </div> 
                </Link>
                <IoMdMenu size={50} className={`${menuClicked ? '' : 'hidden'} cursor-pointer mr-5 sm:hidden`} onClick={handleClickMenu}/>
            </div>
                  
            <nav className={`${menuClicked ? 'hidden' : '' }  sm:flex  flex flex-col items-center sm:flex-row text-[18px] sm:w-full `}>
                <ul className="list-none sm:flex gap-3 flex flex-col items-center sm:flex-row text-[18px] sm:w-full sm:pr-4 sm:justify-end  sm:items-center" >
                    <li className={`${menuClicked ? 'hidden' : ''} cursor-pointer sm:hidden  flex place-content-end`}><IoMdMenu size={50} color='#98BCE5' onClick={handleClickMenu}/></li>
                    <li><Link to={"/"} state={{some: "popular"}}><span className="hover:text-[#98BCE5]">Populares</span></Link></li>
                    <li><Link to={"/"} state={{some: "top_rated"}}><span className="hover:text-[#98BCE5]">Mejor Valoradas</span></Link></li>
                    <li><Link to={{pathname:"/", state:{some:"upcoming"}}}><span className="hover:text-[#98BCE5]">Estrenos</span></Link></li>
                </ul>
            </nav>

        </header>
        <div className=" text-white flex flex-col sm:flex-row justify-center sm:h-screen pt-10 sm:px-16 pb-10">
            <div className="flex  justify-center  max-h-96"><img className="rounded-xl max-w-sm   h-auto  " src={imagenUrl} alt={movie.title} /></div>
            <div className="flex justify-center text-center sm:text-left">
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
                

        </div>
         </div>
    </>
  )}
}
