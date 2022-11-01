
import SearchTypes from '../models/search';

import '../styles/components/search.css';
import '../styles/components/medias/search.css';

export const Search = ( { value, fn, searchFn } : SearchTypes ) => {
  return (
    <>
      <section>
          <input
            type='text'
            value={ value }
            onChange={ fn }
            placeholder='  Digite aqui sua busca... '
          />
          
        <button onClick={ searchFn } className='searchButton' />
      </section>
    </>
  );
}