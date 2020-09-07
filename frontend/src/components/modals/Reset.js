/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postForm } from '../../lib/form';

import Modal from './Modal';
import { ModalHeaderBasic } from './ModalHeader';

const { REACT_APP_API_HOST } = process.env;

const inputText = css`
  font-size: 16px;
  font-weight: 500px;
  letter-spacing: 0;
  line-height: 20px;
  color: black;
`;

const modalWrapper = css`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
`;

const input = css`
  -webkit-appearance: none;
  border: 1px solid black;
  background-color: white;
  border-radius: 3px;
  line-height: 20px;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  outline: none;
  color: black;
  &:focus {
    border: 2px solid red;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  }
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  color: black;
`;

const Reset = function ({ showDialog, setShowDialog }) {
  let [password, setPassword] = useState('');
  let [submitting, setSubmitting] = useState(false);
  let queryString = useState(window.location.search);
  let history = useHistory();

  let handleSubmit = function (ev) {
    ev.preventDefault();
    setSubmitting(true);

    postForm(`${REACT_APP_API_HOST}/api/user/reset-password`, {
      body: JSON.stringify({ queryString, password }),
    })
      .then(({ resp }) => {
        if (resp.status === 201) {
          setShowDialog(false);
        }
        if (resp.status === 500) {
          alert('Reset token invalid, try requesting a new reset link');
        }
      })
      .finally(() => {
        setSubmitting(false);
        history.push('/');
      });
  };

  return (
    <Modal
      showDialog={showDialog}
      modalHeader={
        <ModalHeaderBasic
          setShowDialog={setShowDialog}
          title="Reset Password"
        />
      }
    >
      <form css={modalWrapper} onSubmit={ev => handleSubmit(ev)}>
        <label htmlFor="password" css={inputText}>
          Create a new password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          placeholder="Password"
          onChange={ev => setPassword(ev.target.value)}
          aria-label="Password"
          css={input}
        />
        <div css={buttonWrapper}>
          <button type="submit">
            {submitting ? 'Processing...' : 'Reset Password'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Reset;
