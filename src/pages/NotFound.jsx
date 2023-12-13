import { Link } from "react-router-dom"
import { TbMovieOff } from "react-icons/tb";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";

export const NotFound = () => {
  // función para ocultar el menu en pantallas pequeñas
  const [menuClicked, setMenuClicked] = useState(true);

   const handleClickMenu = () =>{
     setMenuClicked(prevState=>!prevState);
   }

  return (
    <div >
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
        
        <div className="replay h-screen text-center px-5 bg-gray-800 text-white flex flex-col items-center">
          <h1 className="text-7xl pt-14 pb-4">404</h1>
        <TbMovieOff className="" size={50}/>

        <h3 className="text-3xl  pt-5 pb-5">La página no existe</h3>
        <p >No hemos podido localizar la página que buscas. Intentalo otra vez o vuelve al Inicio.</p>
        <div className="flex p-8  justify-center "><Link className="bg-red-400 p-3 rounded text-white font-bold hover:text-red-400 hover:bg-white" to={"/"}>Inicio</Link></div>


        </div>
        

    </div>
  )
}
