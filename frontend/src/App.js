/** @jsx jsx */
import { useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";

const header = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6vh;
  border: solid black 2px;
  font-size: 24px;
  font-family: "Roboto";
`;

const graph = css`
  display: flex;
  width: 100%;
  height: 48vh;
  border: solid black 2px;
`;

const news = css`
  display: flex;
  width: 100%;
  height: 48vh;
  border: solid black 2px;
`;

function App() {
  const [primaryData, setPrimaryData] = useState({});
  const [primaryTicker, setPrimaryTicker] = useState("AAPL");
  const [formField, setForm] = useState("");

  useEffect(() => {
    const HTTP_OK = 200;
    const fetchData = async () => {
      let response = await fetch(
        `http://localhost:6969/quote/${primaryTicker}`
      );
      if (response.status === HTTP_OK) {
        let json = await response.json();
        setPrimaryData(json);
      } else {
        alert(`error: ${response.status}`);
      }
    };
    fetchData();
  }, [primaryTicker]);

  const handleSubmit = function (ev) {
    ev.preventDefault();
    setPrimaryTicker(formField);
  };

  return (
    <div css={{ margin: 0, padding: 0 }}>
      <div css={header}>
        {primaryData.c ? (
          <div>
            {primaryTicker}: {primaryData.c}
          </div>
        ) : (
          <div>No Results Found</div>
        )}
      </div>
      <div css={graph}></div>
      <div>
        <form onSubmit={(ev) => handleSubmit(ev)}>
          <label htmlFor="ticker-select">
            <input
              id="ticker-select"
              name="ticker-select"
              type="text"
              value={formField}
              onChange={(ev) => setForm(ev.target.value)}
              placeholder="select ticker"
            />
          </label>
          <button type="submit">submit</button>
        </form>
      </div>
      <div css={news}></div>
    </div>
  );
}

export default App;
