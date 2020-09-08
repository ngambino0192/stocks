/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { postForm } from '../../lib/form';
import Cookies from 'js-cookie';

import Modal from './Modal';
import { ModalHeaderAuth } from './ModalHeader';
import { modalWrapper, input, inputText, buttonWrapper } from './styles';

const { REACT_APP_API_HOST } = process.env;

const SignIn = function ({ showDialog, setShowDialog, setHasAccount }) {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [email, setEmail] = useState('');
  let [submitting, setSubmitting] = useState(false);
  let submittable = email !== '';

  let handleSubmit = function (ev) {
    ev.preventDefault();
    setSubmitting(true);
    postForm(`${REACT_APP_API_HOST}/user/create`, {
      body: JSON.stringify({ username, email, password }),
    })
      .then(({ resp, json }) => {
        if (resp.ok) {
          Cookies.set('user', json);
          setShowDialog(false);
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
      showDialog={showDialog}
      modalHeader={
        <ModalHeaderAuth
          title="Sign In"
          setHasAccount={setHasAccount}
          setShowDialog={setShowDialog}
        />
      }
    >
      <form css={modalWrapper} onSubmit={handleSubmit}>
        <label htmlFor="user-name" css={inputText}>
          Create Username
        </label>
        <input
          type="text"
          id="user-name"
          name="user-name"
          required
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          aria-label="Username"
          css={input}
          placeholder="housestark"
        />
        <label htmlFor="email" css={inputText}>
          Create Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          aria-label="Email"
          css={input}
          placeholder="housestark@winterfellmail.com"
        />
        <label htmlFor="password" css={inputText}>
          Create Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          aria-label="Password"
          css={input}
          placeholder="password"
        />
        <div css={buttonWrapper}>
          <button
            disabled={!submittable || submitting}
            type="submit"
            class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 hover:bg-gray-800"
          >
            {submitting ? 'Registering…' : 'Register'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SignIn;
