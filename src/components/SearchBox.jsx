import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate} from "react-router-dom";
export function SearchBox()  {
    // componente para realizar busquedas
    const [searchText, setSearchText]= useState("");
    const navigate = useNavigate();
    const handleSubmit= (e) => {
        e.preventDefault();
        navigate("/?search="+ searchText);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchText} onChange={(e)=>setSearchText(e.target.value)} /> 
                <button type="submit"><FaSearch /></button>
                
            </form>

        </div>
    )
}
