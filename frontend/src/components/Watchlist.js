/** @jsx jsx */
import { jsx } from '@emotion/core';
import TickerListItem from './TickerListItem';

const Watchlist = ({ watchlist }) => {
  return (
    <div className="my-8">
      <span className="flex flex-wrap items-center">
        <img className="w-6 h-5 mr-2" src={require('../icons/bookmark.svg')} />
        <p className="font-bold text-2xl uppercase">Watch List</p>
      </span>
      {watchlist?.map((company, index) => {
        return <TickerListItem key={index} company={company} />;
      })}
    </div>
  );
};

export default Watchlist;
