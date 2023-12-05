
import { ListItems } from '../components/lists/ListItems'
import { Link, useSearchParams } from 'react-router-dom'
import { useDebounce } from '../hooks/useDebounce'
import { MoviesGrid } from '../components/MoviesGrid'
import { useEffect, useState } from 'react'
import { SearchBox } from '../components/SearchBox'

export const Home= () => {
  const [query] = useSearchParams();
  const search = query.get("search")
  
  const [top, setTop] = useState("popular");
  // eslint-disable-next-line no-unused-vars
  const [modTop, setModTop] = useState(top);
  const [stylePopular, setStylePopular]= useState("text-[#98BCE5]");
  const [styleRated, setStyleRated] = useState("text-white hover:text-[#FE99A0]")
  const [styleUpcoming, setStyleUpcoming] = useState("text-white hover:text-[#FE99A0]")
  function handlePopular() {
    setTop("popular")
    setStylePopular( "text-[#98BCE5]")
    setStyleRated("text-white hover:text-[#FE99A0]")
    setStyleUpcoming("text-white hover:text-[#FE99A0]")
    
  }
  function handleRated() {
    setTop("top_rated")
    setStylePopular("text-white hover:text-[#FE99A0]")
    setStyleRated("text-[#98BCE5]")
    setStyleUpcoming("text-white hover:text-[#FE99A0]")
    
  }
    
  function handleUpcoming() {
    setTop("upcoming")
    setStylePopular("text-white hover:text-[#FE99A0]")
    setStyleRated("text-white hover:text-[#FE99A0]")
    setStyleUpcoming("text-[#98BCE5]")
  }

  useEffect(() => {
   
    setModTop(top)
    
    
  }, [top])
  
  
  const debouncedSearch = useDebounce(search, 300);
  return (
    <>
        <header className=' bg-slate-900 flex place-content-between max-h-22 text-white'>
                    {/* imagen de logo */}
            <Link className='' to={"/"}>
            <div className='flex items-center pl-14 py-4  gap-3 text-[#FE99A0] '>
                <img className='max-h-16 pr-3' src="/images/replay.png" alt="logo" />
                <span className="border border-light-gray h-12 hidden lg:flex"></span>
                <h2 className='replay pl-3 text-2xl'><span className='text-[#98BCE5]'>RE</span>PLAY</h2>
              </div> 
            </Link>
                  
            <nav className='list-none  hidden sm:flex text-[18px] sm:w-[438px] sm:place-content-around sm:items-center'>

              <li><button className= {styleRated} onClick={handleRated}>Mejor Valoradas</button></li> 
              <li><button className={stylePopular} onClick={handlePopular}>Populares</button></li>
              <li><button className={styleUpcoming} onClick={handleUpcoming}>Estrenos</button></li>

              
                
              
            </nav>
        </header>
        <SearchBox />
        {  search && search.length>0 ?
          <div>
          <MoviesGrid key={debouncedSearch} search={debouncedSearch} />
          </div>
        :
          <ListItems  top={top} />
        }
        
    
    </>
    
  )  
  
}
   

