
import { TbMovieOff } from "react-icons/tb";

export const Empty = () => {
  return (
    <div className="bg-gray-800 h-screen text-white flex flex-col items-center" >
      <h3 className="text-2xl pt-10 pb-5">Sin Resultados</h3>
      <TbMovieOff className="" size={50}/>
    </div>
  )
}
