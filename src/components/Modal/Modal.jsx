import { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const Modal = ({ modalParams, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const { alt, href } = modalParams;

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
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
  closeModal: PropTypes.func,
};

export default Modal;
