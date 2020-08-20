/** @jsx jsx */
import { jsx } from '@emotion/core';

const TopBar = () => {
  return (
    <div className="w-full flex flex-nowrap justify-end items-center p-8">
      <img src={require('../icons/bookmark.svg')} alt="Watch List" title="Watch List" />
      <img src={require('../icons/icons8-news.svg')} alt="News" title="News" />
    </div>
  );
};

export default TopBar;
