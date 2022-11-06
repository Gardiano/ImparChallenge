
import { useParams, Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { getPokemonDataByIdOrName } from '../services/api';

import ProgressBar from 'react-bootstrap/ProgressBar';

import { PokemonsInfoType } from '../models/pokemonInfo';

import { BsArrowLeftCircle } from 'react-icons/bs';

import { warningToast } from '../helpers/toast';
import { ToastContainer } from 'react-toastify';

import errorIcon from '../assets/404.png';

import '../styles/components/pokemonInfo.css';
import '../styles/components/medias/pokemonInfo.css';

import 'bootstrap/dist/css/bootstrap.min.css';

export const PokemonInfo = ( ) => {

let params = useParams().id;

const [ pokemon, setPokemon ] = useState < PokemonsInfoType > (  );
const [ loading, setLoading ] = useState < boolean > ( false );

useEffect( ( ) => {
  getPokemonById( );
  window.scrollTo( 0, 0 );
}, [ ] );

const getPokemonById: ( ) => void = async ( ) => {
  try {
    let id = params;
    const data = await getPokemonDataByIdOrName( id );
      setPokemon( data );
        setLoading( true );
  } catch( e: any ) {
      warningToast( );
  }
}

return (
  <>
    { loading === true ? (
      <div className='pokemonInfoContainer'>
        <Link to='/'> <BsArrowLeftCircle /> </Link>
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

        <ToastContainer
          position="bottom-right"
          autoClose={ 2000 }
          hideProgressBar
          newestOnTop={ false }
          closeOnClick
          rtl={ false }
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={ 1 }
        />

      </div>
    ) : ( 
      <> 
        
        <span className='errorBox'> 
          <img src={ errorIcon } className='errorIcon' /> 
          <Link to='/'> VOLTAR </Link>
        </span>
      </>
    )}
  </>
  );
}
  

  