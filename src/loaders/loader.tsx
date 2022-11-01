
import gif from '../assets/loader.gif';

import '../styles/loaders/loader.css';

export const Loader = ( ) => {
  return (
      <div className='loaderContainer'>
        <img src={ gif } alt='loaderImage' className='loaderGif' />
        <label> Aguarde um momento... </label>
      </div>
    );
  }
  

  