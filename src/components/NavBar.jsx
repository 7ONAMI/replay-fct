// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Link,useSearchParams } from 'react-router-dom';


export const NavBar = () => {

  const [query, setQuery] = useSearchParams();
  const search = query.get("search");
    const handleSubmit = (e) => {
    e.preventDefault();
    // navigate("/listado",{state: {query}})
    console.log(query)
  }


  return (
    <header className=' bg-slate-800 flex place-content-between max-h-20 text-white'>
                 {/* imagen de logo */}
        <Link className='p-3 flex items-center text-white ' to={"/"}><img className='max-h-12 pr-3' src="/images/replay.png" alt="logo" /><h2>Replay</h2>
        </Link>
               
        <nav className='list-none  hidden sm:flex text-[18px] sm:w-[438px] sm:place-content-around sm:items-center'>

          <li><Link to="/peliculas">Peliculas</Link></li> 
          <li><Link to="/series">Series</Link></li>
          

          <form className='flex sm:items-center ' onSubmit={handleSubmit}>
              <input 
                className='w-full rounded-lg bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                type="text"
                value={search ?? ""} 
                placeholder='  Titulo...'
                onChange={ (e) => {
                  const value= e.target.value;
                  setQuery({search: value});
                }}/>
              <FaSearch  color="secondary"  className='pl-1'/>
          </form> 
             
          
        </nav>
    </header>
  )
}
