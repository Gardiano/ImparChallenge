
import { Link } from 'react-router-dom';

import icon from '../assets/icone@2x.png';
import deleteIcon from '../assets/Icon-trash.png';
import editIcon from '../assets/Icon-edit.png';

import PokemonsType from '../models/pokemons';

import '../styles/components/cards.css';

export const SearchPokemons = ( { obj, deleteFn, editFn } : PokemonsType ) => {
return (
  <>
    <div className='cardContainer'>
            <div className='card'>
              <div className='cardItens'>
                { obj.sprites.other.dream_world.front_default ? (
                  <Link to={ `/pokemon/${ obj.id }` }> 
                    <img src={ `${ obj.sprites.other.dream_world.front_default }` } alt='image' /> 
                  </Link>
                ) : (
                  <span> <img src={ `${ icon }` } alt='image' /> </span>
                )}
                <hr />
                
                <label> { obj.id } { obj.name } </label>
              </div>

              <div className='cardButton'>
                <button onClick={ deleteFn } > <img src={ `${ deleteIcon }` } /> <label> Excluir </label> </button>
                <button onClick={ editFn } > <img src={ `${ editIcon }` } /> <label> Editar </label> </button>
              </div>
            </div>
    </div>
  </>  
  );
}
  

  