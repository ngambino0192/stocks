/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { colors } from "../..//lib/theme";
import "@reach/dialog/styles.css";

import closeIcon from "../../icons/close.svg";

const modalHeader = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  background-color: white;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
`;

const cancelButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  padding: 20px;
`;

const toggleWrapper = css`
  display: flex;
  width: 30%;
  border-radius: 2px;
`;

const toggleItem = css`
  background: none;
  border: none;
  outline: none;
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: black;
  &:hover {
    background-color: white;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const titleItem = css`
  background: none;
  border: none;
  outline: none;
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
`;

const toggleItemActive = css`
  background: none;
  border: none;
  outline: none;
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  background-color: red;
  color: white;
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

export const ModalHeaderAuth = function ({
  setShowDialog,
  hasAccount,
  setHasAccount,
}) {
  return (
    <div css={modalHeader}>
      <div css={toggleWrapper}>
        <button
          css={hasAccount ? toggleItemActive : toggleItem}
          onClick={() => setHasAccount(true)}
        >
          Log In
        </button>
        <button
          css={!hasAccount ? toggleItemActive : toggleItem}
          onClick={() => setHasAccount(false)}
        >
          Create Account
        </button>
      </div>
      <div onClick={() => setShowDialog(false)} css={cancelButton}>
        <img
          src={closeIcon}
          css={{ height: 22, width: 22 }}
          alt="Close Modal"
        />
      </div>
    </div>
  );
};

export const ModalHeaderBasic = function ({ title, setShowDialog }) {
  return (
    <div css={modalHeader}>
      <div css={toggleWrapper}>
        <div css={titleItem}>{title}</div>
      </div>
      <div onClick={() => setShowDialog(false)} css={cancelButton}>
        <img
          src={closeIcon}
          css={{ height: 22, width: 22 }}
          alt="Close Modal"
        />
      </div>
    </div>
  );
};
