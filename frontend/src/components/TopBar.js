/** @jsx jsx */
import { jsx } from '@emotion/core';

const TopBar = () => {
  return (
    <div className="flex items-center justify-end w-full p-8 flex-nowrap">
      <img
        src={require('../icons/bookmark.svg')}
        alt="Watch List"
        title="Watch List"
      />
      <img src={require('../icons/icons8-news.svg')} alt="News" title="News" />
    </div>
  );
};

export default TopBar;
