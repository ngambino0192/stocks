import React, { useState } from 'react';

const SearchField = ({ setPrimaryTicker }) => {
  const [formField, setForm] = useState('');

  const handleSubmit = function (ev) {
    ev.preventDefault();
    setPrimaryTicker(formField);
  };
  return (
    <form
      className="flex flex-wrap lg:flex-no-wrap"
      onSubmit={ev => handleSubmit(ev)}
    >
      <div>
        <div className="mx-1">
          <label htmlFor="ticker-select">
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
              id="ticker-select"
              name="ticker-select"
              type="text"
              placeholder="Search"
              value={formField}
              onChange={ev => setForm(ev.target.value.toUpperCase())}
            />
          </label>
        </div>
      </div>
      <div>
        <div className="w-2/3">
          <button
            className="px-4 py-2 mx-1 font-bold text-white bg-gray-900 rounded shadow hover:bg-gray-800 focus:shadow-outline focus:outline-none"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
  // return (
  //   <div>
  //     <form onSubmit={(ev) => handleSubmit(ev)}>
  //       <label htmlFor="ticker-select">
  //         <input
  //           id="ticker-select"
  //           name="ticker-select"
  //           type="text"
  //           value={formField}
  //           onChange={(ev) => setForm(ev.target.value.toUpperCase())}
  //           placeholder="select ticker"
  //         />
  //       </label>
  //       <button type="submit">submit</button>
  //     </form>
  //   </div>
  // );
};

export default SearchField;
