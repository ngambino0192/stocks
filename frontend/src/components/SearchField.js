import React, { useState } from 'react';

const SearchField = ({ setPrimaryTicker }) => {
  const [symbol, setSymbol] = useState('');

  const handleSubmit = function (ev) {
    ev.preventDefault();
    setPrimaryTicker({ symbol });
  };
  return (
    <form
      className="flex-nowrap lg:flex-no-wrap flex justify-center w-full"
      onSubmit={ev => handleSubmit(ev)}
    >
      <div className="w-10/12 mx-1">
        <label htmlFor="ticker-select">
          <input
            className="focus:outline-none focus:bg-white w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none"
            id="ticker-select"
            name="ticker-select"
            type="text"
            placeholder="Search"
            value={symbol}
            onChange={ev => setSymbol(ev.target.value.toUpperCase())}
          />
        </label>
      </div>
      <button className="w-2/12" type="submit">
        <img src={require('../icons/search.svg')} alt="search" />
      </button>
    </form>
  );
};

export default SearchField;
