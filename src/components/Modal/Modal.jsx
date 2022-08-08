import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.handleKeyDown);
  }

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModalByClickOnOverlay();
    }
  };

  render() {
    const { alt, href } = this.props.modalParams;

    return (
      <div className={s.overlay} onClick={this.handleOverlayClick}>
        <div class={s.modal}>
          <img src={href} alt={alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imageParams: PropTypes.object,
  handleKeyDown: PropTypes.func,
  closeModalByClickOnOverlay: PropTypes.func,
};

export default Modal;
