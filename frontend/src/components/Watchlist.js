/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx } from "@emotion/core";
import TickerListItem from "./TickerListItem";

const Watchlist = ({ watchlist }) => {
  const [state, setState] = useState([]);
  useEffect(() => {
    const stateCheck = state.map((company) => {
      return company.symbol;
    });
    const query = [
      ...new Set(
        watchlist.map((watchlist) => {
          return watchlist.name;
        })
      ),
    ];

    query.forEach((value) => {
      if (!stateCheck.includes(value) && watchlist.length > 0) {
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
    });

    if (watchlist.length > 0) {
    }
  }, [watchlist, state]);

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
