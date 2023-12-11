
import { FaSearch } from "react-icons/fa";
import {  useSearchParams} from "react-router-dom";
// eslint-disable-next-line react/prop-types
export function SearchBox()  {
    // componente para realizar busquedas
    const[query, setQuery] = useSearchParams();
    const search = query.get("search");
    const handleSubmit= (e) => {
        e.preventDefault();
        // navigate("/?search="+ searchText);
    };
    
      
   
    
    return (
        <div className="h-72 text-white  flex flex-col items-center items-center gap-28 pt-20" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(/images/hero_bg.jpg)`}} >
        {/* <img className="w-full max-h-" src="/images/hero_bg.jpg" alt="background image" /> */}
        <h3 className=" font-bold w-full text-center text-xl shadow-sm">ENCUENTRA LA ESPERIENCIA AUDIOVISUAL IDEAL</h3>
            <div className="flex justify-center w-full">
                <form className='flex justify-center w-full' onSubmit={handleSubmit}>
                  <input 
                    className=' text-gray-500 ps-10 rounded-lg bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-2/5'
                    type="text"
                    value={search ?? ""} 
                    placeholder='  Titulo...'
                    onChange={ (e) => {
                      const value= e.target.value;
                      setQuery({search: value});
                    }}/>
                  <button type="submit"><FaSearch  color="white"  className='pl-1'/></button>
              </form>
            </div> 

        </div>
        
            
        
    )
}
