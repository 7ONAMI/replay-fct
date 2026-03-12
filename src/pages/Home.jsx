import { ListItems } from '../components/lists/ListItems'
import { Link, useSearchParams } from 'react-router-dom'
import { useDebounce } from '../hooks/useDebounce'
import { MoviesGrid } from '../components/MoviesGrid'
import { useEffect, useState } from 'react'
import { SearchBox } from '../components/SearchBox'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const Home = () => {
  const [query, setQuery] = useSearchParams();
  const search = query.get("search")
  const [top, setTop] = useState("popular");
  let { some } = useLocation();

  useEffect(() => {
    if (some) setTop(some)
  }, [some, top])

  const [stylePopular, setStylePopular] = useState("text-[#FE99A0]");
  const [styleRated, setStyleRated] = useState("text-white hover:text-[#98BCE5]")
  const [styleUpcoming, setStyleUpcoming] = useState("text-white hover:text-[#98BCE5]")

  function handlePopular() {
    setTop("popular")
    setStylePopular("text-[#FE99A0]")
    setStyleRated("text-white hover:text-[#98BCE5]")
    setStyleUpcoming("text-white hover:text-[#98BCE5]")
    query.delete("search")
    setQuery(query)
  }
  function handleRated() {
    setTop("top_rated")
    setStylePopular("text-white hover:text-[#98BCE5]")
    setStyleRated("text-[#FE99A0]")
    setStyleUpcoming("text-white hover:text-[#98BCE5]")
    query.delete("search")
    setQuery(query)
  }
  function handleUpcoming() {
    setTop("upcoming")
    setStylePopular("text-white hover:text-[#98BCE5]")
    setStyleRated("text-white hover:text-[#98BCE5]")
    setStyleUpcoming("text-[#FE99A0]")
    query.delete("search")
    setQuery(query)
  }

  useEffect(() => { }, [top])

  const debouncedSearch = useDebounce(search, 300);

  const navLinks = (
    <>
      <li><button className={stylePopular} onClick={handlePopular}>Populares</button></li>
      <li><button className={styleRated} onClick={handleRated}>Mejor Valoradas</button></li>
      <li><button className={styleUpcoming} onClick={handleUpcoming}>Estrenos</button></li>
    </>
  );

  return (
    <>
      <Navbar navLinks={navLinks} />
      <SearchBox />
      {search && search.length > 2 ? (
        <div>
          <MoviesGrid key={debouncedSearch} search={debouncedSearch} />
        </div>
      ) : (
        <ListItems top={top} />
      )}
    </>
  )
}
