// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { get } from '../utils/httpGet';
import MovieCard from './MovieCard';
import { Spinner } from './Spinner';
import { Empty } from './Empty';
import InfiniteScroll from 'react-infinite-scroll-component';

// eslint-disable-next-line react/prop-types
export const MoviesGrid = ({search}) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    useEffect(() => {
      setIsLoading(true)
      const searchUrl = "/search/multi?query="+search+"&page="+page;
      get(searchUrl).then((data)=>{
        setMovies((prevMovies) => prevMovies.concat(data.results))
        setHasMore(data.page < data.total_pages);
        setIsLoading(false);
      })
    
    }, [search,page])
    
  if (!isLoading && movies.length === 0) {
    return <Empty />
  }
  
  return (
    <div className='container'>
      <InfiniteScroll
      dataLength= {movies.length}
      hasMore={hasMore}
      next={()=>setPage((prevPage) =>prevPage+1)}
      loader={<Spinner/>}
      endMessage = {<p>Ya los has visto todos!!!</p>}>
      
      <ul>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        </ul>  
      </InfiniteScroll>
    </div>
  )
}
