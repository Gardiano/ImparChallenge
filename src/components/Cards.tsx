
import { SetStateAction, useLayoutEffect, useState, useEffect } from 'react';

import axios from 'axios';

import { getPokemon, getPokemonDataByIdOrName, getWeatherData } from '../services/api';

import { Pokemons } from '../components/Pokemon';

import { SearchPokemons } from './SearchPokemons';

import { Search } from './Search';

import { DeleteModal } from './modals/deleteModal';

import { NewCardModal } from './modals/newCardModal';

import { WeatherModal } from './modals/weatherModal';

import { Loader } from '../loaders/loader';



import { ToastContainer } from 'react-toastify';

import { warningToast, successToast, editToast } from '../helpers/toast';

import weatherIcon from '../assets/weather.png';

import PokemonsType from '../models/pokemons';

import 'react-toastify/dist/ReactToastify.css';

import '../styles/components/cards.css';
import '../styles/components/medias/cards.css';

export const Cards = ( ) => {
  const [ input, setInput ] = useState< string > ( '' );

  const [ pokemons, setPokemons ] = useState < [ ] | PokemonsType | SetStateAction<any> > ( [ ] );
  const [ searchResult, setSearchResult ] = useState < any > (  );

  const [ loading , setLoading ]  = useState < boolean > ( true );
  const [ loadingSearchResults, setLoadingSearchResults ] = useState <boolean> ( false );

  const [ openDeleteModal, setOpenDeleteModal ] = useState < boolean > ( false );
  const [ openNewCardModal, setOpenNewCardModal ] = useState < boolean > ( false );
  const [ weatherOpenModal, setWeatherOpenModal ] = useState < boolean > ( false );

  const [ limit, setLimit ] = useState < number > ( 12 );

  useEffect( ( ) => {
    fetchPokemon( );
    if ( input.length === 0 ) {
      setLoadingSearchResults( false );
    }
  }, [ input ] );

  const handleChange: any = ( e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    setInput( e.target.value );
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
      warningToast( );
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
      warningToast( );
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
        }
      }
      
    } catch( e: any ) {
       warningToast( );
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
    <main>
      { openDeleteModal === true ? ( 
        <DeleteModal deleteFn={ openDelModal } /> )
      : ( null ) }

      { openNewCardModal === true ? ( 
        <NewCardModal deleteFn={ openNCardModal } /> ) 
      : ( null ) }

      { weatherOpenModal === true ? (
        <WeatherModal fn={ openWeatherModal }
      /> ) : ( null ) }

      <Search 
        value={ input } 
        fn={ handleChange } 
        searchFn={ fetchPokemonByName } 
      />
      
      <div className='resultBox'>
        <label> Resultado de busca </label>
        <button className='newCard' onClick={ openNCardModal }> Novo Card </button>
      </div>
        
      { loading === true ? ( <Loader /> ) : (
        <>
          { loadingSearchResults === true ? ( 
            <SearchPokemons
              index= { searchResult.id }
              obj={ searchResult }
              deleteFn={ openDelModal }
              editFn={ openEditModal }
            /> ) : (
            <Pokemons
              index={ pokemons.id }
              arr={ pokemons }
              fn={ fetchMorePokemons }
              deleteFn={ openDelModal }
              editFn={ openEditModal }
            />
          )}
        </>
      )}

      <button
        className='weatherOpenModal'
        onClick={ openWeatherModal } >
        <img src={ weatherIcon } />
      </button>

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
    </main>
  );
}