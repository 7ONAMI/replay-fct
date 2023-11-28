// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import { Movies } from './pages/Movies';
import { Tv } from './pages/Tv';
import { Details } from './pages/Details';
import { NavBar } from './components/NavBar';
 function App() {
 

  return (
    <><NavBar />
    <Routes>
        <Route path='/'  Component={Home}/>
        <Route path='/peliculas'  Component={Movies}/>
        <Route path='/series'  Component={Tv}/>  
        <Route path='/detalles/:type/:movieId'  Component={Details} />
        <Route path='*' Component={<Navigate replace to="/" />} />
    </Routes>
    </>
    
    
    
    
  )
}
export default App;