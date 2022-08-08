import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    const { value } = e.target;

    return this.setState({ query: value.trim() });
  };

  handleSubmitClick = e => {
    e.preventDefault();
    const { query } = this.state;
    const formEl = document.querySelector('form');

    this.props.updateQuery(query);

    formEl.reset();
    this.reset();
  };

  reset = () => {
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmitClick}>
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  updateQuery: PropTypes.func,
};

export default Searchbar;
