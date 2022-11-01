
import { AiOutlineDelete } from 'react-icons/ai';

import '../../styles/modals/deleteModal.css';
import '../../styles/components/medias/modals/deleteModal.css';

type deleteModalTypes = {
  deleteFn: ( ) => void;
}

export const DeleteModal = ( { deleteFn } : deleteModalTypes ) => {

  return (
    <div className='deleteModalContainer'>
      <div className='deleteModalBox'>
          <div>
            <button className='closeModalButton' onClick={ deleteFn }> X </button>
          </div>

          <span>
            <AiOutlineDelete />
          </span>

          <h1> Excluir </h1>
          
          <label> CERTEZA QUE DESEJA EXCLUIR? </label>

          <hr />

          <div className='deleteModalButtons'>
            <button onClick={ deleteFn } > Excluir </button>
            <button onClick={ deleteFn } > Cancelar </button>
          </div>
      </div>
    </div>
    );
  }
  

  