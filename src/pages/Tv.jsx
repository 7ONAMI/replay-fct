import { NavBar } from '../components/NavBar'
import { ListType } from '../components/lists/ListType'

export const Tv = () => {
  return (
    <>
      <NavBar/>
      <ListType title="Populares" top="popular" type="tv"/>
      <ListType title="Mejor valoradas" top="top_rated" type="tv"/>
      <ListType title="Estrenos" top="upcoming" type="tv"/>
    </>
  )
}
