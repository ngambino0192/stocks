/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { updateWatchlist } from "../lib/utils";

const header = css`
  text-align: center;
`;

const button = css`
  cursor: pointer;
`;

const PrimaryTicker = ({
  priceData,
  primaryTicker,
  bottomState,
  setBottomState,
  watchlist,
  setWatchlist,
}) => {
  const handleWatchlist = function () {
    setBottomState(true);
    if (priceData.c) {
      updateWatchlist(watchlist, setWatchlist, primaryTicker, priceData);
    }
  };

  return (
    <div css={header}>
      {/* <button css={button} onClick={() => handleWatchlist()}>
        Add
      </button> */}
      <div>
        {priceData.c ? (
          <div>
            {primaryTicker}: {priceData.c}
          </div>
        ) : (
          <div>No Results Found</div>
        )}
      </div>
      {/* {bottomState ? (
        <button css={button} onClick={() => setBottomState(false)}>
          News
        </button>
      ) : (
        <button css={button} onClick={() => setBottomState(true)}>
          Watchlist
        </button>
      )} */}
    </div>
  );
};

export default PrimaryTicker;
