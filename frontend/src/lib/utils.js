export const updateWatchlist = function (
  watchlist,
  setWatchlist,
  primaryTicker,
  priceData
) {
  const HTTP_OK = 200;
  const watchLimit = 6;
  const watchlistCheck = watchlist.map((company) => {
    return company.displaySymbol;
  });
  if (!watchlistCheck.includes(primaryTicker) && primaryTicker) {
    if (watchlist.length < watchLimit) {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:6969/watchlist/${primaryTicker}`
        );
        if (response.status === HTTP_OK) {
          const [json] = await response.json();
          setWatchlist([...watchlist, Object.assign(json, priceData)]);
        }
      };
      fetchData();
    } else {
      alert(
        `Cannot add more that ${watchLimit} companies to watchlist. Please remove a company before adding ${primaryTicker} to watchlist.`
      );
    }
  } else {
    alert(`${primaryTicker} already in watchlist`);
  }
};
