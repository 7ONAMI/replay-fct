
import { ListItems } from '../components/lists/ListItems'
import { Link, useSearchParams } from 'react-router-dom'
import { useDebounce } from '../hooks/useDebounce'
import { MoviesGrid } from '../components/MoviesGrid'
import { useEffect, useState } from 'react'
import { SearchBox } from '../components/SearchBox'
import { useLocation } from 'react-router-dom'
import { IoMdMenu } from "react-icons/io";

export const Home= () => {
  const [query, setQuery] = useSearchParams();
  const search = query.get("search")
  const [top, setTop] = useState("popular");
  let {some} = useLocation();
// efecto para pasar el tipo de top desde detalles
  useEffect(() => {
    
    if (some) {

    setTop(some)
  }
  
  
  }, [some, top])
  
  
  // eslint-disable-next-line no-unused-vars
  const [modTop, setModTop] = useState(top);
  // estados del estilo de cada boton del navBar
  const [stylePopular, setStylePopular]= useState("text-[#FE99A0]");
  const [styleRated, setStyleRated] = useState("text-white hover:text-[ #98BCE5]")
  const [styleUpcoming, setStyleUpcoming] = useState("text-white hover:text-[ #98BCE5]")
  //funcion para cargar la lista de mas populares
  function handlePopular() {
    setTop("popular")
    setStylePopular( "text-[#FE99A0]")
    setStyleRated("text-white hover:text-[#98BCE5]")
    setStyleUpcoming("text-white hover:text-[#98BCE5]")
    query.delete("search");
    setQuery(query)
    
  }
  //funcion para cargar la lista de los mejor valorados
  function handleRated() {
    setTop("top_rated")
    setStylePopular("text-white hover:text-[#98BCE5]")
    setStyleRated("text-[#FE99A0]")
    setStyleUpcoming("text-white hover:text-[#98BCE5]")
    query.delete("search");
    setQuery(query)
  }
  //funcion para cargar la lista de los últimos estrenos  
  function handleUpcoming() {
    setTop("upcoming")
    setStylePopular("text-white hover:text-[#98BCE5]")
    setStyleRated("text-white hover:text-[#98BCE5]")
    setStyleUpcoming("text-[#FE99A0]")
    query.delete("search");
    setQuery(query)
  }
  
 
  // efecto que renderiza el componente cada vez que cambia el top
  useEffect(() => {
   
    setModTop(top)
    
    
  }, [top])
  
   // funcion para que la busqueda sea automatica cada 300 ms
    const debouncedSearch = useDebounce(search, 300);

    // abrir y cerrar menu en pantalla pequeña
    const [menuClicked, setMenuClicked] = useState(true);

    const handleClickMenu = () =>{
      setMenuClicked(prevState=>!prevState);
    }
    
  
  return (
    <>
        <header className=' bg-slate-900 flex sm:flex-row flex-col h-full sm:items-center sm:place-content-between sm:max-h-22 text-white'>
                    {/* imagen de logo */}
            <div className='flex items-center place-content-between w-full'>

              <Link className='' to={"/"}>
                <div className='flex items-center pl-5  sm:pl-12 py-4  gap-3 text-[#FE99A0] '>
                  <img className='max-h-16 pr-3' src="/images/replay.png" alt="logo" />
                  <span className="border border-light-gray h-12 hidden md:flex"></span>
                  <h2 className='replay sm:pl-3 text-2xl'><span className='text-[#98BCE5]'>RE</span>PLAY</h2>
                </div> 
              </Link>
              <IoMdMenu size={50} className={`${menuClicked ? '' : 'hidden'} cursor-pointer mr-5 sm:hidden`} onClick={handleClickMenu}/>   
            </div>
                 
            <nav className={`${menuClicked ? 'hidden' : '' } list-none  gap-3 sm:flex flex flex-col items-center sm:flex-row text-[18px] sm:w-full sm:pr-5 sm:justify-end  sm:items-center`}>
              <li className={`${menuClicked ? 'hidden' : ''} cursor-pointer sm:hidden  flex place-content-end`}><IoMdMenu size={50} color='#98BCE5' onClick={handleClickMenu}/></li>
              <li><button className={stylePopular} onClick={handlePopular}>Populares</button></li>
              <li><button className= {styleRated} onClick={handleRated}>Mejor Valoradas</button></li> 
              <li><button className={styleUpcoming} onClick={handleUpcoming}>Estrenos</button></li>
            </nav>
            
        </header>
        <SearchBox />
        {/* si se realiza una busqueda de mas de dos caracteres se carga el componente MovieGrid con el resultado */}
        {  search && search.length>2 ?
          <div>
          <MoviesGrid key={debouncedSearch} search={debouncedSearch} />
          </div>
        :
          <ListItems  top={top} />
        }
        
    
    </>
    
  )  
  
}
   

