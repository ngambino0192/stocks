/** @jsx jsx */
import { useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";

import PrimaryTicker from "./components/PrimaryTicker";
import Chart from "./components/Chart";
import SearchField from "./components/SearchField";
import Watchlist from "./components/Watchlist";
import Newslist from "./components/Newslist";
import { updateWatchlist } from "./lib/utils";

// const graph = css`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   height: 48vh;
// `;

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function App() {
  const [priceData, setpriceData] = useState({});
  const [newslist, setNewslist] = useState([]);
  const [primaryTicker, setPrimaryTicker] = useState("AAPL");
  const [watchlist, setWatchlist] = useState([]);
  const [bottomState, setBottomState] = useState(true);

  useEffect(() => {
    const HTTP_OK = 200;
    const fetchData = async () => {
      let response = await fetch(
        `http://localhost:6969/${primaryTicker}/quote`
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

  useEffect(() => {
    const HTTP_OK = 200;
    const fetchNewslist = async () => {
      let response = await fetch(`http://localhost:6969/${primaryTicker}/news`);
      if (response.status === HTTP_OK) {
        let json = await response.json();
        setNewslist(json);
      } else {
        alert(`error: ${response.status}`);
      }
    };
    fetchNewslist();
  }, [primaryTicker]);

  const handleWatchlist = function () {
    setBottomState(true);
    if (priceData.c) {
      updateWatchlist(watchlist, setWatchlist, primaryTicker, priceData);
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/3 h-12">
        <SearchField setPrimaryTicker={setPrimaryTicker} />
        <button onClick={() => handleWatchlist()}>Add</button>
        <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
      </div>
      <div className="w-full md:w-2/3 h-12">
        <PrimaryTicker
          priceData={priceData}
          primaryTicker={primaryTicker}
          bottomState={bottomState}
          setBottomState={setBottomState}
          watchlist={watchlist}
          setWatchlist={setWatchlist}
        />
        {/* <div css={graph}> */}
        <Chart data={data} />
        {/* </div> */}
        <Newslist newslist={newslist} />
      </div>
    </div>
  );
}

export default App;

{
  /* <PrimaryTicker
        priceData={priceData}
        primaryTicker={primaryTicker}
        bottomState={bottomState}
        setBottomState={setBottomState}
        watchlist={watchlist}
        setWatchlist={setWatchlist}
      />
      <div css={graph}>
        <Chart data={data} />
      </div>
      <div>
        <SearchField setPrimaryTicker={setPrimaryTicker} />
      </div>
      {bottomState ? (
        <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
      ) : (
        <Newslist newslist={newslist} />
      )} */
}
