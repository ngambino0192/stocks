import React from "react";
import { updateWatchlist } from "../lib/utils";
import { useEffect } from "react";

const PrimaryTicker = ({
  priceData,
  primaryTicker,
  setBottomState,
  watchlist,
  setWatchlist,
}) => {
  const handleWatchlist = () => {
    setBottomState(true);
    if (priceData.c) {
      updateWatchlist(watchlist, setWatchlist, primaryTicker, priceData);
    }
  };

  const isWatching = () => {
    return watchlist.filter((item) => {
      return item.displaySymbol === primaryTicker;
    });
  };

  return (
    <div className="text-center">
      <div className="text-4xl font-bold">
        {priceData.c ? (
          <span className="flex flex-wrap justify-center items-center">
            <h1 className="mx-3">
              {primaryTicker}: {priceData.c}
            </h1>
            <button onClick={() => handleWatchlist()}>
              {isWatching().length > 0 ? (
                <img
                  src={require("../icons/star-filled.svg")}
                  alt="Add to watch list"
                  title="Add to watch list"
                  className="w-6 h-6"
                />
              ) : (
                <img
                  src={require("../icons/star.svg")}
                  alt="Watching"
                  title="Watching"
                  className="w-6 h-6"
                />
              )}
            </button>
          </span>
        ) : (
          <h1>No Results Found</h1>
        )}
      </div>
    </div>
  );
};

export default PrimaryTicker;
