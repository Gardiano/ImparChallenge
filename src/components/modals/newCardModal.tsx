
import createIcon  from '../../assets/icone_criar.svg';

import '../../styles/modals/newCardModal.css';
import '../../styles/components/medias/modals/newCardModal.css';

type NewCardModalTypes = {
  deleteFn: ( ) => void;
}

export const NewCardModal = ( { deleteFn } : NewCardModalTypes ) => {
  return (
    <div className='newCardContainer'>
      <div className='newCardBox'>
        <div>
            <button className='newCardCloseModal' onClick={ deleteFn }> X </button>
        </div>
        
         <span>
            <img src={ createIcon } />
            <h1> Criar Card </h1>
         </span>

         <hr />

        <label> DIGITE O NOME DO POKEMON </label>
        <input type='text' placeholder='  Ex: Charizard ' />
        
        <label> INCLUA UMA IMAGEM PARA APARECER NO CARD </label>
        <input type='file' placeholder='  Ex: Charizard ' />

        <div className='customFileUpdateBox'>
            <label className="customFileUpload">
                <input type="file"/>
                <b> Escolher arquivo </b>
            </label>
        </div>

        <hr />

        <button onClick={ deleteFn }> Adicionar Pokemon </button>
      </div>
    </div>
    );
  }
  

  