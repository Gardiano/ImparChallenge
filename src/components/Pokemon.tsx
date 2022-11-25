
import { useLayoutEffect, useState, useEffect } from 'react';

import icon from '../assets/icone@2x.png';
import deleteIcon from '../assets/Icon-trash.png';
import editIcon from '../assets/Icon-edit.png';

import addButton from '../assets/add.png'

import { Link } from 'react-router-dom';

import PokemonsType from '../models/pokemons';

import '../styles/components/cards.css';


export const Pokemons = ( { arr, fn, deleteFn, editFn } : PokemonsType ) => {

return <>
  <div className='cardContainer'>
    { arr!.map( ( data: any, index: number ) => {
      return (
          <div className='card' key={ index } >
            <div className='cardItens'
            >
              { data.sprites.other.dream_world.front_default ? (
                <Link to={ `/pokemon/${data.id}` }> 
                  <img src={ data.sprites.other.dream_world.front_default } alt='image' /> 
                </Link>
              ) : (
                <span> <img src={ `${ icon }` } alt='image' /> </span>
              )}
              <hr />
              
              <label> #{ data.id } { data.name } </label>
            </div>

            <div className='cardButton'>
              <button onClick={ deleteFn } > <img src={ `${ deleteIcon }` } /> <label> Excluir </label> </button>
              <button onClick={ editFn } > <img src={ `${ editIcon }` } /> <label> Editar </label> </button>
            </div>
          </div>
      );})}
  </div>

  <button className='loadMorePokemons' onClick={ fn } > <img src={ addButton } /> </button>
</>;
}
  

  