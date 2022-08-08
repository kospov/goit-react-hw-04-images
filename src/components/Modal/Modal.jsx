import PropTypes from 'prop-types';
import s from './Modal.module.css';

const Modal = ({ modalParams, closeModalByClickOnOverlay }) => {
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
  imageParams: PropTypes.object,
};

export default Modal;
