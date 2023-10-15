import React, { useState } from 'react';
import css from './SearchBar.module.css';

export function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Can not be empty');
      return;
    }
    onSubmit(query);
  };

  // handleInputChange = e => {
  //   this.setState({ query: e.target.value });
  // };

  return (
    <header className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <input
          name="inputForSearch"
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className={css.SearchFormButton} type="submit">
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
}
