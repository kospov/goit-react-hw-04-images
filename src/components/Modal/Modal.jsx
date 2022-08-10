import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const Modal = ({ modalParams, handleKeyDown, closeModalByClickOnOverlay }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const { alt, href } = modalParams;

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModalByClickOnOverlay();
    }
  };

  return (
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div class={s.modal}>
        <img src={href} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalParams: PropTypes.object,
  handleKeyDown: PropTypes.func,
  closeModalByClickOnOverlay: PropTypes.func,
};

export default Modal;
