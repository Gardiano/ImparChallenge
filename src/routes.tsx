
import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';

import { PokemonInfo } from './components/PokemonInfo';

export const AppRoutes = ( ) => {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/pokemon/:id' element={ <PokemonInfo /> } />
        <Route path='*' element={ <h1> pagina nao encontrada </h1> } />
      </Routes>
    </>
  );
};