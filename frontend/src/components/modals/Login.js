/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { postForm } from '../../lib/form';
import Cookies from 'js-cookie';

import Modal from './Modal';
import { ModalHeaderAuth } from './ModalHeader';
import { modalWrapper, inputText, buttonWrapper, input } from './styles';

const { REACT_APP_API_HOST } = process.env;

const LogIn = function ({
  showDialog,
  setShowDialog,
  setShowForgotPassword,
  hasAccount,
  setHasAccount,
}) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [submitting, setSubmitting] = useState(false);
  let submittable = email !== '';

  let handleSubmit = function (ev) {
    ev.preventDefault();
    setSubmitting(true);
    postForm(`${REACT_APP_API_HOST}/user/login`, {
      body: JSON.stringify({ email, password }),
    })
      .then(({ resp, json }) => {
        console.log('resp: ', resp.status);
        if (resp.status === 200) {
          Cookies.set('user', json);
          setShowDialog(false);
        } else if (resp.status === 401) {
          window.alert(json);
        } else {
          window.alert('Whoops, there was an error. Please try again.');
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <Modal
      title="Log In"
      showDialog={showDialog}
      modalHeader={
        <ModalHeaderAuth
          title="Log In"
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          setShowDialog={setShowDialog}
        />
      }
    >
      <form css={modalWrapper} onSubmit={(ev) => handleSubmit(ev)}>
        <label htmlFor="email" css={inputText}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          placeholder="housestark@winterfellmail.com"
          onChange={(ev) => setEmail(ev.target.value)}
          aria-label="Email"
          css={input}
        />
        <label htmlFor="password" css={inputText}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          placeholder="password"
          onChange={(ev) => setPassword(ev.target.value)}
          aria-label="Password"
          css={input}
        />
        <div css={buttonWrapper}>
          <button
            disabled={!submittable || submitting}
            type="submit"
            class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 hover:bg-gray-800"
          >
            {submitting ? (
              <React.Fragment>
                <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
                'Signing in…'
              </React.Fragment>
            ) : (
              'Sign In'
            )}
          </button>
          <button
            onClick={() => {
              setShowDialog(false);
              setShowForgotPassword(true);
            }}
            className="forgot-password-btn"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LogIn;
