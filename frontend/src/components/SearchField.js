import React, { useState } from 'react';

const SearchField = ({ setPrimaryTicker }) => {
  const [formField, setForm] = useState('');

  const handleSubmit = function (ev) {
    ev.preventDefault();
    setPrimaryTicker(formField);
  };
  return (
    <div>
      <form onSubmit={(ev) => handleSubmit(ev)}>
        <label htmlFor="ticker-select">
          <input
            id="ticker-select"
            name="ticker-select"
            type="text"
            value={formField}
            onChange={(ev) => setForm(ev.target.value.toUpperCase())}
            placeholder="select ticker"
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default SearchField;
