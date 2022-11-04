
import { SetStateAction, useEffect, useState } from 'react';

import axios from 'axios';

import { getPokemon, getPokemonDataByIdOrName, getWeatherData } from '../services/api';

import { Pokemons } from '../components/Pokemon';

import { SearchPokemons } from './SearchPokemons';

import { Search } from './Search';

import { DeleteModal } from './modals/deleteModal';

import { NewCardModal } from './modals/newCardModal';

import { WeatherModal } from './modals/weatherModal';

import { Loader } from '../loaders/loader';

import { TiWeatherPartlySunny, TiWeatherCloudy } from 'react-icons/ti';
import { WeatherTypes } from '../models/weather';

import weatherIcon from '../assets/weather.png';

import { ToastContainer } from 'react-toastify';
import { warningToast, notFoundToast, successToast, editToast } from '../helpers/toast';

import PokemonsType from '../models/pokemons';

import 'react-toastify/dist/ReactToastify.css';

import '../styles/components/cards.css';
import '../styles/components/medias/cards.css';

export const Cards = ( ) => {
  const [ input, setInput ] = useState< string > ( '' );

  const [ pokemons, setPokemons ] = useState < [ ] | PokemonsType | SetStateAction<any> > ( [ ] );
  const [ searchResult, setSearchResult ] = useState < any > (  );
  const [ weather, setWeather ] = useState < WeatherTypes | SetStateAction<any> > (  );

  const [ loading , setLoading ]  = useState < boolean > ( true );
  const [ loadingSearchResults, setLoadingSearchResults ] = useState <boolean> ( false );

  const [ openDeleteModal, setOpenDeleteModal ] = useState < boolean > ( false );
  const [ openNewCardModal, setOpenNewCardModal ] = useState < boolean > ( false );
  const [ weatherOpenModal, setWeatherOpenModal ] = useState < boolean > ( false );

  const [ limit, setLimit ] = useState < number > ( 12 );

  useEffect( ( ) => {
    fetchPokemon( );
    getClima( );
    if ( input.length === 0 ) {
      setLoadingSearchResults( false );
    }
    window.scrollTo( 0, 0 );
  }, [ input ] );

  const handleChange: any = ( e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    setInput( e.target.value );
  }

  const getClima: ( ) => void  = async ( ) => {
   try {
    const data = await getWeatherData( 5959 );
      setWeather( data );
   } catch ( e: any ) {
      console.log( e )
   }
  }

  const fetchPokemon = async ( ) => {
    try {
      const data = await getPokemon( limit );

      const urls = await data.results.map( ( data: any ) => {
        return data.url
      });

      const result = await axios.all( urls.map( ( url: string ) => 
        axios.get( url )
        .then( ( res ) => {
          return res.data;
        })));
      
        setPokemons( result );
        setLoading( false );
     
    } catch ( e: any ) {
      console.log( e );
    }
  }

  const fetchMorePokemons = async ( ) => {
    try {
      let newLimit = limit + 10;

      const data = await getPokemon( newLimit );

      const urls = await data.results.map( ( data: any ) => {
        return data.url
      });

      const result = await axios.all( urls.map( ( url: string ) => 
        axios.get( url )
        .then( ( res ) => {
          return res.data;
      })));

      setLimit( newLimit );
      setPokemons( [...result] );
      
      return result;

    } catch ( e: any ) {
      console.log( e );
    }

  }
 
  const fetchPokemonByName: ( ) => void = async ( ) => {
    try {
      let name = input.toLowerCase( );
      const data = await getPokemonDataByIdOrName( name );
      
      if( name.length >= 2 ) {
        if( name === data.name ) {
          setSearchResult( data );
          setLoadingSearchResults( true );
          successToast( );
        } else {
          notFoundToast( );
        }
      }
      
    } catch( e: any ) {
         warningToast( )
    }
  }

  // modal functions
  const openDelModal = ( ) => {
    openDeleteModal === false ? 
      ( setOpenDeleteModal( true ) ) 
    : ( setOpenDeleteModal( false ) );
  }

  const openEditModal = ( ) => {
    editToast( );
  }

  const openNCardModal = ( ) => {
    openNewCardModal === false ? 
      ( setOpenNewCardModal( true ) ) 
    : ( setOpenNewCardModal( false ) );
  }

  const openWeatherModal = ( ) => {
    weatherOpenModal === false ? 
      ( setWeatherOpenModal( true ) ) 
    : ( setWeatherOpenModal( false ) );
  }

  return (
    <>
    { openDeleteModal === true ? ( 
      <DeleteModal deleteFn={ openDelModal } /> )
     : ( null ) }

    { openNewCardModal === true ? ( 
      <NewCardModal deleteFn={ openNCardModal } /> ) 
    : ( null ) }

    { weatherOpenModal === true ? (
      <WeatherModal
        id={ 0 }
        name={ weather?.name }
        state={ weather?.state }
        temperature={ weather?.data.temperature }
        humidity={ weather?.data.humidity }
        condition={ weather?.data.condition }
        sensation={ weather?.data.sensation }
        wind_velocity={ weather?.data.wind_velocity }
        fn={ openWeatherModal }
    /> ) : ( null ) }

      <main>
        <Search value={ input } fn={ handleChange } searchFn={ fetchPokemonByName } />
        <div className='resultBox'>
          <label> Resultado de busca </label>
          <button className='newCard' onClick={ openNCardModal }> Novo Card </button>
        </div>
         
        { loading === true ? ( <Loader /> ) : (
            <>
              { loadingSearchResults === true ? ( 
                  <SearchPokemons
                    deleteFn={ openDelModal }
                    editFn={ openEditModal }
                    index={ searchResult?.id }
                    obj={ searchResult }
                    id={ 0 }
                  /> )
                : ( <Pokemons
                    deleteFn={ openDelModal }
                    editFn={ openEditModal }
                    index={ pokemons.id }
                    arr={ pokemons }
                    fn={ fetchMorePokemons }
                    id={ 0 } 
                  />
                )}
            </>
        )}

        <button
          className='weatherOpenModal'
          onClick={ openWeatherModal }
          >
          <img src={ weatherIcon } />
        </button>
      </main>

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
    </>
    );
}
  

  