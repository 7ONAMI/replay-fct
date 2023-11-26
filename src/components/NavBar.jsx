// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Link,useNavigate,useSearchParams } from 'react-router-dom';


export const NavBar = () => {

  const [query, setQuery] = useSearchParams();
  const search = query.get("search");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/listado",{state: {query}})
  }


  return (
    <header>
        {/* imagen de logo */}
        <img src="/images/replay.png" alt="replay.com" />
        {/* barra de busqueda */}
        <form onSubmit={handleSubmit}>
          <div>
            <input 
              type="text"
              value={search ?? ""} 
              placeholder='Titulo...'
              onChange={ (e) => {
                const value= e.target.value;
                setQuery({search: value});
              }}/>
            <FaSearch />
          </div>
        </form> 
        {/* barra de navegación */}
        <nav>
          <Link to="/peliculas">Peliculas</Link>
          <Link to="/series">Series</Link>
        </nav>
    </header>
  )
}
