// import * as basicLightbox from 'basiclightbox';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const Modal = ({ modalParams }) => {
  const { alt, href } = modalParams;
  return (
    <div className={s.overlay}>
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
