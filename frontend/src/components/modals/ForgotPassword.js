/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { postForm } from '../../lib/form';

import Modal from './Modal';
import { ModalHeaderBasic } from './ModalHeader';
import { inputText, modalWrapper, input, buttonWrapper } from './styles';

const { REACT_APP_API_HOST } = process.env;

const Reset = function ({ showDialog, setShowDialog }) {
  let [email, setEmail] = useState('');
  let [submitting, setSubmitting] = useState(false);

  let handleSubmit = function (ev) {
    ev.preventDefault();
    setSubmitting(true);
    postForm(`${REACT_APP_API_HOST}/user/forgot-password`, {
      body: JSON.stringify({ email }),
    })
      .then(({ resp }) => {
        if (resp.status === 200) {
          window.alert(
            'We have sent you your reset instructions to your email address. Please also check your spam folder'
          );
        } else if (resp.status === 404) {
          window.alert(
            'We do not have an account associated with this email address. Create account instead!'
          );
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
      modalHeader={<ModalHeaderBasic setShowDialog={setShowDialog} title="Recover Password" />}
    >
      <form css={modalWrapper} onSubmit={(ev) => handleSubmit(ev)}>
        <div>Don't worry, it happens to the best of us.</div>
        <label htmlFor="email" css={inputText}>
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          placeholder="Email"
          onChange={(ev) => setEmail(ev.target.value)}
          aria-label="Email"
          css={input}
        />
        <div css={buttonWrapper}>
          <button type="submit">{submitting ? 'Sending...' : 'Email me a recovery link'}</button>
        </div>
      </form>
    </Modal>
  );
};

export default Reset;
