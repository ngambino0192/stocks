import { css, jsx } from '@emotion/core';
import { theme } from '../../theme';
const { colors } = theme;

/********* MAIN MODAL BEGIN **********/
export const dialogOverlayStyles = {
  zIndex: 20,
  background: 'rgba(12, 12, 12, 0.75)',
};

export const dialogContentStyles = {
  padding: 0,
  boxShadow: '0 2px 20px 0 rgba(0,0,0,0.1)',
  borderRadius: 3,
};

export const contentWrapper = css`
  padding: 20px;
  background: ${colors.gray200};
`;

/********* MAIN MODAL END **********/

/********* MODAL HEADER BEGIN **********/
export const modalHeader = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: ${colors.gray100};
  font-weight: bold;
`;

export const cancelButton = css`
  flex: 0;
  cursor: pointer;
  color: ${colors.lightGray100};
  font-size: 2rem;
  margin: 0px 12px;
`;

export const toggleWrapper = css`
  flex: 3;
  display: flex;
  flex-flow: row nowrap;
  border-radius: 2px;
  height: 100%;
`;

export const toggleItem = css`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${colors.lightGray100};
  &:hover {
    background-color: ${colors.lightGray100};
    color: ${colors.gray100};
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const toggleItemActive = css`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  background-color: ${colors.lightGray100};
  cursor: pointer;
  transition: all ease 200ms;
  &:hover {
    background-color: white;
    color: black;
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const titleItem = css`
  background: none;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  padding-left: 16px;
  font-weight: bold;
`;
/********* MODAL HEADER END **********/

export const inputText = css`
  font-size: 16px;
  font-weight: 500px;
  letter-spacing: 0;
  line-height: 20px;
  color: ${colors.lightGray200};
`;

export const modalWrapper = css`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const input = css`
  -webkit-appearance: none;
  background-color: ${colors.gray100};
  border-radius: 3px;
  line-height: 20px;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 16px;
  margin: 16px 0px;
  outline: none;
  color: ${colors.lightGray200};
  &:focus {
    border: 2px solid ${colors.lightGray100};
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  }
`;

export const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  button {
    background: ${colors.lightGray100};
    padding: 10px 30px;
    border-radius: 3px;
    font-weight: bold;
  }

  .forgot-password-btn {
    background: transparent;
    color: ${colors.lightGray200};
    margin-top: 12px;
  }
`;
