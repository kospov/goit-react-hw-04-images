import s from './Button.module.css';

const Button = ({ increasePageNumber }) => {
  return (
    <button type="button" className={s.button} onClick={increasePageNumber}>
      Load more
    </button>
  );
};

export default Button;
