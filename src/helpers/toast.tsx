
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const successToast = ( ) => toast.success( ' Pokemon encontrado com sucesso! ' , {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

export const warningToast = ( ) => toast.warning( ' Pokemon não encontrado... ' , {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

export const notFoundToast = ( ) => toast.warning( ' Informe um Pokemon válido: Ex Charizard ' , {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

export const editToast = ( ) => toast.warning( ' Funcionalidade não implementada ' , {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});
