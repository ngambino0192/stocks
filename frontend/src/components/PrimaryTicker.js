/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { updateWatchlist } from '../lib/utils';

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
    <div className="text-center text-2xl font-bold">
      <div>
        {priceData.c ? (
          <div>
            {primaryTicker}: {priceData.c}
          </div>
        ) : (
          <div>No Results Found</div>
        )}
      </div>
    </div>
  );
};

export default PrimaryTicker;
