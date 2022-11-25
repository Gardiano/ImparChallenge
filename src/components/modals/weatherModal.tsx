
import { useWeatherData } from '../../hooks/useWeather';

import { AiFillFire } from 'react-icons/ai';
import { WiHumidity } from 'react-icons/wi';
import { TiWeatherCloudy } from 'react-icons/ti';
import { BsThermometerHalf, BsWind } from 'react-icons/bs';

import '../../styles/modals/weatherModal.css';
import '../../styles/components/medias/modals/weatherModal.css';

type weatherProps = {
  fn: ( ) => void
}

export const WeatherModal = ( { fn } : weatherProps ) => {

  const { weather } = useWeatherData( );

  return (
    <div className='weatherContainer'>
      <div className='weatherBox' key={ weather.id } >
        <div>
          <button className='closeWeatherModal' onClick={ fn } > X </button>
        </div>

        <h2> Tempo agora em - { weather.name }, { weather.state } </h2>
        <b> <BsThermometerHalf className='temperatureIcon' /> { weather.data?.temperature } º </b>

        <div>
          <label> <TiWeatherCloudy className='conditionsIcon' /> Condições: { weather.data?.humidity } </label>
          <label> <AiFillFire className='sensationIcon' /> Sensação: { weather.data?.sensation } º </label>
        </div>

        <span> <BsWind className='windIcon' /> Vento: { weather.data?.wind_velocity } km/h </span>
        <span> <WiHumidity className='HumidityIcon' /> umidade: { weather.data?.humidity } % </span>
      </div>
    </div>
    );
  }