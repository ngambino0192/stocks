/** @jsx jsx */
import { jsx } from '@emotion/core';
import '@reach/dialog/styles.css';
import {
  modalHeader,
  toggleWrapper,
  cancelButton,
  toggleItem,
  toggleItemActive,
  titleItem,
} from './styles';

export const ModalHeaderAuth = function ({ setShowDialog, hasAccount, setHasAccount }) {
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
        ✕
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
        ✕
      </div>
    </div>
  );
};
