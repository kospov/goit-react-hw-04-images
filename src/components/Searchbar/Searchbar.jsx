import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

const Searchbar = ({ updateQuery }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;

    return setQuery(value.trim());
  };

  const handleSubmitClick = e => {
    e.preventDefault();
    const formEl = document.querySelector('form');

    updateQuery(query);

    formEl.reset();

    reset();
  };

  const reset = () => {
    setQuery('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmitClick}>
        <button type="submit" className={s.button}>
          <span style={{ fontSize: 26 }}>&#9906;</span>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          // autocomplete="off"
          // auto focus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  updateQuery: PropTypes.func,
};

export default Searchbar;
