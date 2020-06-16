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
  const [state, setState] = useState("AAPL");

  // const { c } = state;

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:6969/quote/PFE").then((resp) => {
      setState(resp.data);
    });
  }, []);

  return (
    <div css={{ margin: 0, padding: 0 }}>
      <div css={header}>AAPL</div>
      <div css={graph}></div>
      <div css={news}></div>
    </div>
  );
}

export default App;
