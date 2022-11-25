
import { useEffect, SetStateAction, useState } from 'react';

import { getWeatherData } from '../services/api';

export const useWeatherData = ( ) => {

  const [ weather, setWeather ] = useState < SetStateAction<any> > ( { } );

  useEffect( ( ) => {
    getWeather( );
  }, [ ] );

  const getWeather: ( ) => void = async ( ) => {
    try {
     const data = await getWeatherData( 5959 );
      setWeather( data! );
    } catch ( e: any ) {
       return e
    }
  }

  return { 
    weather
  }
}