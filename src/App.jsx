// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { Search } from './pages/Search';
import { Home } from './pages/home';
import { Movies } from './pages/Movies';
import { Tv } from './pages/Tv';
 function App() {
 

  return (
    
    <Routes>
        <Route path='/'  Component={Home}/>
        <Route path='/peliculas'  Component={Movies}/>
        <Route path='/series'  Component={Tv}/>  
        <Route path='/search:query'  Component={Search} />
    </Routes>
    
    
    
  )
}
export default App;