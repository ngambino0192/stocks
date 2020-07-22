/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const header = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  height: 6vh;
  border: solid black 2px;
  font-family: "Roboto";
`;

const title = css`
  font-size: 24px;
`;

const subtitle = css`
  font-size: 12px;
`;

const TickerListItem = ({ company }) => {
  const { symbol, description, c } = company;
  return (
    <div css={header}>
      <div>
        <div css={title}>{symbol}</div>
        <div css={subtitle}>{description}</div>
      </div>
      <div>PRICE: {c}</div>
    </div>
  );
};

export default TickerListItem;
