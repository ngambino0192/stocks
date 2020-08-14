/** @jsx jsx */
import { css, jsx } from '@emotion/core';

const TickerListItem = ({ company }) => {
  const { symbol, description, c } = company;
  return (
    <div className="flex flex-wrap justify-between p-4 mt-5 shadow-md">
      <div>
        <p className="font-bold text-xl">{symbol}</p>
        <p className="text-xs">{description}</p>
      </div>
      <p className="text-sm">${c}</p>
    </div>
  );
};

export default TickerListItem;
