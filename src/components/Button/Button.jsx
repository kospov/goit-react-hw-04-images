import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ increasePageNumber }) => {
  return (
    <button type="button" className={s.button} onClick={increasePageNumber}>
      Load more
    </button>
  );
};

Button.propTypes = {
  increasePageNumber: PropTypes.func,
};

export default Button;
