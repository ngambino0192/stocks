/** @jsx jsx */
import Slider from 'react-slick';
import { css, jsx } from '@emotion/core';

const Newslist = ({ newslist }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 1,
  };

  const news = newslist.slice(0, 20);

  return (
    <div className="w-11/12">
      <Slider {...settings}>
        {news.map((article, index) => {
          const { image, headline, summary } = article;
          return (
            <div
              key={`slide_item_${index}`}
              className="max-w-md overflow-hidden shadow-lg"
              css={card}
            >
              <img className="w-full" css={img} src={image} />
              <div className="px-6 py-4">
                <div className="font-bold text-sm mb-2 lg:text-base">{headline}</div>
                <p className="text-gray-700 text-sm" css={summaryCSS}>
                  {summary}
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

const img = css`
  height: 10em;
`;

const card = css`
  height: 20em;
  margin-bottom: 16px;
`;

const summaryCSS = css`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export default Newslist;
