
import { NavBar } from '../components/NavBar'
import { Banner } from '../components/Banner'
import { ListItems } from '../components/lists/ListItems'

export const Home= () => {
  return (
    <>
        <NavBar/>
        <Banner/>
        <ListItems title="Popular" top="popular"/>
        <ListItems title="Estrenos" top="upcoming"/>
    </>
  )
}
