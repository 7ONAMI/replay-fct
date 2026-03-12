import './App.css';
import { Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import { Details } from './pages/Details';
import { NotFound } from './pages/NotFound';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';
import { LibraryProvider } from './context/LibraryContext';

function App() {
  return (
    <AuthProvider>
      <LibraryProvider>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/detalles/:type/:movieId' Component={Details} />
          <Route path='/login' Component={AuthPage} />
          <Route path='/perfil' Component={ProfilePage} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </LibraryProvider>
    </AuthProvider>
  );
}

export default App;
