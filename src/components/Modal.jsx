import React from 'react';
import '../styles/modal.scss';

export const Modal = ({ closeModal, children }) => {
  return (
    <div className='modal' onClick={closeModal}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='close-button' onClick={closeModal}>
          X
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
