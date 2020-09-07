/** @jsx jsx */
import { jsx } from '@emotion/core';
import TickerListItem from './TickerListItem';

const Watchlist = ({ watchlist }) => {
  return (
    <div className="flex-col items-center hidden my-8 lg:flex">
      <span className="flex items-center flex-nowrap">
        <img
          className="w-6 h-5 mr-2"
          alt="icon-bookmark"
          src={require('../icons/bookmark.svg')}
        />
        <p className="text-2xl font-bold uppercase">Watch List</p>
      </span>
      {watchlist?.map((company, index) => {
        return <TickerListItem key={index} company={company} />;
      })}
    </div>
  );
};

export default Watchlist;
