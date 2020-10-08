import React, { useState } from 'react';

const SearchField = ({ setPrimaryTicker }) => {
  const [formField, setForm] = useState('');

  const handleSubmit = function (ev) {
    ev.preventDefault();
    setPrimaryTicker(formField);
  };
  return (
    <form
      className="flex flex-nowrap lg:flex-no-wrap w-full justify-center"
      onSubmit={(ev) => handleSubmit(ev)}
    >
      <div className="mx-1 w-10/12">
        <label htmlFor="ticker-select">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
            id="ticker-select"
            name="ticker-select"
            type="text"
            placeholder="Search"
            value={formField}
            onChange={(ev) => setForm(ev.target.value.toUpperCase())}
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
