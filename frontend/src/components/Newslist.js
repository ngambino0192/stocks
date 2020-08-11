/** @jsx jsx */
// import React from "react";
import Slider from 'react-slick';
import { css, jsx } from '@emotion/core';

const Newslist = ({ newslist }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 1,
  };
  const news = newslist.slice(0, 20);
  return (
    <div className="w-11/12">
      <Slider {...settings}>
        {news.map((article, index) => {
          const { image, headline, summary } = article;
          return (
            <div key={`slide_item_${index}`} className="max-w-md overflow-hidden shadow-lg">
              <img className="w-full article-image" src={image} />
              <div className="px-6 py-4">
                <div className="font-bold text-base mb-2">{headline}</div>
                <p className="text-gray-700 text-sm truncate">{summary}</p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Newslist;
