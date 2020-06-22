/** @jsx jsx */
import { useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import PrimaryTicker from "./components/PrimaryTicker";
import SearchField from "./components/SearchField";
import Watchlist from "./components/Watchlist";

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
  const [priceData, setpriceData] = useState({});
  const [primaryTicker, setPrimaryTicker] = useState("AAPL");
  const [watchlist, setWatchlist] = useState([]);
  const [bottomState, setBottomState] = useState(true);

  useEffect(() => {
    const HTTP_OK = 200;
    const fetchData = async () => {
      let response = await fetch(
        `http://localhost:6969/quote/${primaryTicker}`
      );
      if (response.status === HTTP_OK) {
        let json = await response.json();
        setpriceData(json);
      } else {
        alert(`error: ${response.status}`);
      }
    };
    fetchData();
  }, [primaryTicker]);

  return (
    <div css={{ height: "100vh", overflow: "hidden" }}>
      <PrimaryTicker
        priceData={priceData}
        primaryTicker={primaryTicker}
        bottomState={bottomState}
        setBottomState={setBottomState}
        watchlist={watchlist}
        setWatchlist={setWatchlist}
      />
      <div css={graph}></div>
      <div>
        <SearchField setPrimaryTicker={setPrimaryTicker} />
      </div>
      {bottomState ? (
        <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
      ) : (
        <div css={news}>News</div>
      )}
    </div>
  );
}

export default App;
