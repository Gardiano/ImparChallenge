
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { getPokemonDataByIdOrName } from '../services/api';

import ProgressBar from 'react-bootstrap/ProgressBar';

import { PokemonsInfoType } from '../models/pokemonInfo';

import '../styles/components/pokemonInfo.css';
import '../styles/components/medias/pokemonInfo.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export const PokemonInfo = ( ) => {

let params = useParams().id;

const [ pokemon, setPokemon ] = useState < PokemonsInfoType > (  );

useEffect( ( ) => {
  getPokemonById( );
  window.scrollTo( 0, 0 );
}, [ ] );

const getPokemonById: ( ) => void = async ( ) => {
  let id = params;
    const data = await getPokemonDataByIdOrName( id );
      setPokemon( data );
}

return (
    <div className='pokemonInfoContainer'>
      <div className='pokemonInfoBox'>
        <span>
          <img src={ pokemon?.sprites.other.dream_world.front_default } alt='image' />
        </span>

        <h1> #{ pokemon?.id } { pokemon?.name } </h1>

        <div>
          { pokemon?.stats.map( ( stat: PokemonsInfoType ) => {
            return (
              <>
              <label> 
                  { stat.stat.name }
                    <ProgressBar 
                      striped variant='success' 
                      label={`${stat.base_stat}%`}
                      now={ stat.base_stat } 
                    />
               </label>
              </>
            )
          })}
        </div>
      </div>
    </div>
  );
}
  

  