import React, { useState } from 'react';

const SearchField = ({ setPrimaryTicker }) => {
  const [formField, setForm] = useState('');

  const handleSubmit = function (ev) {
    ev.preventDefault();
    setPrimaryTicker(formField);
  };
  return (
    <form className="flex flex-wrap lg:flex-no-wrap" onSubmit={(ev) => handleSubmit(ev)}>
      <div>
        <div className="mx-1">
          <label htmlFor="ticker-select">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="ticker-select"
              name="ticker-select"
              type="text"
              placeholder="Search"
              value={formField}
              onChange={(ev) => setForm(ev.target.value.toUpperCase())}
            />
          </label>
        </div>
      </div>
      <div>
        <div className="w-2/3">
          <button
            className="shadow bg-gray-900 hover:bg-gray-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mx-1"
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
