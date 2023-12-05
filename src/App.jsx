import './App.css';
import {  Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import { Details } from './pages/Details';
import { NotFound } from './pages/NotFound';
 function App() {
 

  return (
    <>
    <Routes>
        <Route path='/'  Component={Home}/>
        <Route path='/detalles/:type/:movieId'  Component={Details} />
        <Route path='*' element={<NotFound/>} />
    </Routes>
    </>
    
    
    
    
  )
}
export default App;