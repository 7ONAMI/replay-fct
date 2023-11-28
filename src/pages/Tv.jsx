
import { ListType } from '../components/lists/ListType'

export const Tv = () => {
  return (
    <div className='inline'>
      <ListType title="Populares" top="popular" type="tv"/>
      <ListType title="Mejor valoradas" top="top_rated" type="tv"/>
      <ListType title="Estrenos" top="upcoming" type="tv"/>
    </div>
  )
}
