/** @jsx jsx */
import { jsx } from '@emotion/core';
import TickerListItem from './TickerListItem';

const Watchlist = ({ watchlist }) => {
  return (
    <div className="my-8 hidden lg:flex flex-col">
      <span className="flex flex-nowrap items-center">
        <img className="w-6 h-5 mr-2" alt="icon-bookmark" src={require('../icons/bookmark.svg')} />
        <h2 className="font-bold text-xl uppercase">Watch List</h2>
      </span>
      {watchlist?.map((company, index) => {
        return <TickerListItem key={index} company={company} />;
      })}
    </div>
  );
};

export default Watchlist;
