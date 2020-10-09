/** @jsx jsx */
import Slider from 'react-slick';
import { css, jsx } from '@emotion/core';

const Newslist = ({ newslist }) => {
  // const settings = {
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   initialSlide: 1,
  //   className: 'slick-slide-item',
  // };

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
              <img
                className="w-full"
                alt="news-thumbnail"
                css={img}
                src={image}
              />
              <div className="px-6 py-4">
                <div className="lg:text-base mb-2 text-sm font-bold">
                  {headline}
                </div>
                <p className="text-sm text-gray-700" css={summaryCSS}>
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
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 700,
      settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
  ],
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
