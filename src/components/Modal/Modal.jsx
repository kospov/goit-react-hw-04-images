// import * as basicLightbox from 'basiclightbox';
import s from './Modal.module.css';

const Modal = ({ imageParams }) => {
  const { alt, href } = imageParams;
  return (
    <div className={s.overlay}>
      <div class={s.modal}>
        <img src={href} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
