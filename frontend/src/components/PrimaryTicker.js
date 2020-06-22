/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const header = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  height: 6vh;
  border: solid black 2px;
  font-size: 24px;
  font-family: "Roboto";
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
  const updateWatchlist = function () {
    setBottomState(true);
    const watchlistCheck = watchlist.map((company) => {
      return company.name;
    });
    if (!watchlistCheck.includes(primaryTicker) && primaryTicker) {
      const watchLimit = 6;
      if (watchlist.length < watchLimit) {
        setWatchlist([
          ...watchlist,
          { name: primaryTicker, priceData: priceData },
        ]);
      } else {
        alert(
          `Cannot add more that ${watchLimit} companies to watchlist. Please remove a company before adding ${primaryTicker} to watchlist.`
        );
      }
    } else {
      alert(`${primaryTicker} already in watchlist`);
    }
  };
  return (
    <div css={header}>
      <button css={button} onClick={() => priceData.c && updateWatchlist()}>
        Add
      </button>
      <div>
        {priceData.c ? (
          <div>
            {primaryTicker}: {priceData.c}
          </div>
        ) : (
          <div>No Results Found</div>
        )}
      </div>
      {bottomState ? (
        <button css={button} onClick={() => setBottomState(false)}>
          News
        </button>
      ) : (
        <button css={button} onClick={() => setBottomState(true)}>
          Watchlist
        </button>
      )}
    </div>
  );
};

export default PrimaryTicker;
