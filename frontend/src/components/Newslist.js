/** @jsx jsx */
// import React from "react";
import Slider from "react-slick";
import { css, jsx } from "@emotion/core";

const Newslist = ({ newslist }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 1,
  };
  const news = newslist.slice(0, 20);
  return (
    <div className="w-11/12">
      <Slider {...settings}>
        {news.map((article, index) => {
          return (
            <div key={index}>
              <h3>{article.headline}</h3>
              <h4>{article.summary}</h4>
              <img height={200} src={article.image}></img>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Newslist;
