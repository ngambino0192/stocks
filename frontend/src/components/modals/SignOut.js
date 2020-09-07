/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import Cookies from 'js-cookie';

import Modal from './Modal';
import { ModalHeaderBasic } from './ModalHeader';

const modalWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: black;
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 20px;
  color: black;
`;

const SignOut = function ({ showDialog, setShowDialog }) {
  let [submitting, setSubmitting] = useState(false);

  let handleSubmit = function (ev, setShowDialog) {
    ev.preventDefault();
    setSubmitting(true);
    Cookies.remove('user');
    setTimeout(() => {
      setSubmitting(false);
      setShowDialog(false);
    }, 500);
  };

  return (
    <Modal
      showDialog={showDialog}
      modalHeader={
        <ModalHeaderBasic setShowDialog={setShowDialog} title="Sign Out" />
      }
    >
      <form css={modalWrapper} onSubmit={ev => handleSubmit(ev, setShowDialog)}>
        <div>Are you sure you want to sign out?</div>
        <div css={buttonWrapper}>
          <button disabled={submitting} type="submit">
            {submitting ? 'Signing Out…' : 'Sign Out'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SignOut;
