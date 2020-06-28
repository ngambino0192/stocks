/** @jsx jsx */
// import React from "react";
import Slider from "react-slick";
import { css, jsx } from "@emotion/core";

const Newslist = ({ newslist }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
  };
  const news = newslist.slice(0, 20);
  console.log({ news });
  return (
    <div css={{ height: "200px" }}>
      <Slider {...settings}>
        {news.map((article, index) => {
          return (
            <div key={index} css={{ backgroundColor: "gray", height: "400px" }}>
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
