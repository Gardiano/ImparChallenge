
import { AiFillFire } from 'react-icons/ai';
import { WiHumidity } from 'react-icons/wi';
import { TiWeatherCloudy } from 'react-icons/ti';
import { BsThermometerHalf, BsWind } from 'react-icons/bs';

import { WeatherTypes } from '../../models/weather';

import '../../styles/modals/weatherModal.css';
import '../../styles/components/medias/modals/weatherModal.css';

export const WeatherModal = ( {
  fn, state, name, temperature, condition, sensation, wind_velocity, humidity 
} : WeatherTypes ) => {

  return (
    <div className='weatherContainer'>
      <div className='weatherBox'>
        <div>
          <button className='closeWeatherModal' onClick={ fn } > X </button>
        </div>

        <h2> Tempo agora em - { name }, { state } </h2>
        <b> <BsThermometerHalf className='temperatureIcon' /> { temperature } º </b>

        <div>
          <label> <TiWeatherCloudy className='conditionsIcon' /> Condições: { condition } </label>
          <label> <AiFillFire className='sensationIcon' /> Sensação: { sensation } º </label>
        </div>

        <span> <BsWind className='windIcon' /> Vento: { wind_velocity } km/h </span>
        <span> <WiHumidity className='HumidityIcon' /> umidade: { humidity } % </span>
      </div>
    </div>
    );
  }