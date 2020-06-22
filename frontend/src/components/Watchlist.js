/** @jsx jsx */
import { useState, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import TickerListItem from "./TickerListItem";

const watchlist = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 48vh;
  border: solid black 2px;
`;

const Watchlist = ({ watchlist, setWatchlist }) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    const query = watchlist.map((watchlist) => {
      return watchlist.name;
    });
    if (watchlist.length > 0) {
      const HTTP_OK = 200;
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:6969/watchlist/${query.join(",")}`
        );
        if (response.status === HTTP_OK) {
          const json = await response.json();
          setState(json);
        }
      };
      fetchData();
    }
  }, [watchlist]);

  return (
    <div css={watchlist}>
      {state.map((company, index) => {
        return (
          <TickerListItem
            key={index}
            company={company}
            priceData={watchlist[index].priceData}
          />
        );
      })}
    </div>
  );
};

export default Watchlist;
