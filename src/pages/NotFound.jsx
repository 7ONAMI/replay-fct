import { Link } from "react-router-dom"
import { TbMovieOff } from "react-icons/tb";

export const NotFound = () => {
  return (
    <div className="replay h-screen bg-gray-800 text-white flex flex-col items-center">
        <h1 className="text-7xl pt-14 pb-4">404</h1>
        <TbMovieOff className="" size={50}/>

        <h3 className="text-3xl pt-5 pb-5">La página no existe</h3>
        <p>No hemos podido localizar la página que buscas. Intentalo otra vez o vuelve al Inicio.</p>
        <div className="flex p-8  justify-center "><Link className="bg-red-400 p-3 rounded text-white font-bold hover:text-red-400 hover:bg-white" to={"/"}>Inicio</Link></div>



    </div>
  )
}
