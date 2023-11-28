
import { Banner } from '../components/Banner'
import { ListItems } from '../components/lists/ListItems'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../hooks/useDebounce'
import { MoviesGrid } from '../components/MoviesGrid'

export const Home= () => {
  const [query] = useSearchParams();
  const search = query.get("search")
  
  const debouncedSearch = useDebounce(search, 300);
  if (search) {
    
    return(
    <div>
      <MoviesGrid key={debouncedSearch} search={debouncedSearch} />
    </div>)
  } else  { return (
    <>
    <Banner/>
    <ListItems title="Popular" top="popular"/>
    <ListItems title="Estrenos" top="upcoming"/>
</>)  
  
  }
   
}
