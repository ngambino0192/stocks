/** @jsx jsx */
import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core';
import Cookies from 'js-cookie';
import { BrowserRouter as Router } from 'react-router-dom';

import PrimaryTicker from './components/PrimaryTicker';
import Chart from './components/Chart';
import SearchField from './components/SearchField';
import Watchlist from './components/Watchlist';
import Newslist from './components/Newslist';
import SignOut from './components/modals/SignOut';
import ForgotPassword from './components/modals/ForgotPassword';
import Reset from './components/modals/Reset';
import Authenticate from './components/modals/Authenticate';
import { theme } from './theme';
import TopBar from './components/TopBar';

const { colors } = theme;
const { REACT_APP_API_HOST } = process.env;

const sidebar = css`
  background: ${colors.gray100};
`;

function App() {
  const [priceData, setpriceData] = useState({});
  const [newslist, setNewslist] = useState([]);
  const [primaryTicker, setPrimaryTicker] = useState({
    symbol: 'AAPL',
    period: '1m',
  });
  const [watchlist, setWatchlist] = useState([]);
  const [showSignOut, setShowSignOut] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [queryString] = useState(window.location.search);
  const [historicalData, setHistoricalData] = useState([]);

  const user = Cookies.get('user');
  const HTTP_OK = 200;

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        `${REACT_APP_API_HOST}/api/markets/quote/${primaryTicker.symbol}`
      );
      if (response.status === HTTP_OK) {
        let json = await response.json();
        setpriceData(json);
      } else {
        alert(`error: ${response.status}`);
      }
    };
    fetchData();
  }, [primaryTicker.symbol]);

  useEffect(() => {
    const fetchNewslist = async () => {
      let response = await fetch(
        `${REACT_APP_API_HOST}/api/markets/news/${primaryTicker.symbol}`
      );
      if (response.status === HTTP_OK) {
        let json = await response.json();
        setNewslist(json);
      } else {
        alert(`error: ${response.status}`);
      }
    };
    fetchNewslist();
  }, [primaryTicker.symbol]);

  useEffect(() => {
    if (queryString) {
      setShowReset(true);
    }
  }, [queryString]);

  useEffect(() => {
    if (
      historicalData.length < 1 ||
      historicalData[0].symbol !== primaryTicker.symbol
    ) {
      const fetchHistoricalData = async () => {
        const { symbol, period } = primaryTicker;
        let response = await fetch(
          `${REACT_APP_API_HOST}/api/markets/history/${symbol}/${
            period ?? '1m'
          }`
        );
        if (response.status === HTTP_OK) {
          let json = await response.json();
          setHistoricalData(json);
        } else {
          alert(`error: ${response.status}`);
        }
      };
      fetchHistoricalData();
    }
  }, [historicalData, primaryTicker]);

  return (
    <Router>
      <TopBar
        user={user && JSON.parse(user).user}
        setShowAuth={setShowAuth}
        setShowSignOut={setShowSignOut}
      />
      <div className="flex flex-wrap">
        <SignOut showDialog={showSignOut} setShowDialog={setShowSignOut} />
        <ForgotPassword
          showDialog={showForgotPassword}
          setShowDialog={setShowForgotPassword}
        />
        <Reset showDialog={showReset} setShowDialog={setShowReset} />
        <Authenticate
          showDialog={showAuth}
          setShowDialog={setShowAuth}
          setShowForgotPassword={setShowForgotPassword}
        />

        <div
          className="w-full lg:w-3/12 xl:w-2/12 lg:h-screen py-5 px-2 shadow-md"
          css={sidebar}
        >
          <SearchField setPrimaryTicker={setPrimaryTicker} />
          <Watchlist watchlist={watchlist} setWatchlist={setWatchlist} />
        </div>
        <div className="flex flex-col items-center w-full lg:w-9/12 xl:w-10/12 h-12 p-5">
          <PrimaryTicker
            priceData={priceData}
            primaryTicker={primaryTicker.symbol}
            watchlist={watchlist}
            setWatchlist={setWatchlist}
          />
          {historicalData.length > 1 && (
            <Chart historicalData={historicalData} />
          )}
          <Newslist newslist={newslist} />
        </div>
      </div>
    </Router>
  );
}

export default App;
