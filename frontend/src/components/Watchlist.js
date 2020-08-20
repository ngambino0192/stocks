/** @jsx jsx */
import { jsx } from '@emotion/core';
import TickerListItem from './TickerListItem';

const Watchlist = ({ watchlist }) => {
  return (
    <div css={watchlist}>
      {watchlist?.map((company, index) => {
        return <TickerListItem key={index} company={company} />;
      })}
    </div>
  );
};

export default Watchlist;
