/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import Cookies from 'js-cookie';

import Modal from './Modal';
import { ModalHeaderBasic } from './ModalHeader';
import { modalWrapper, buttonWrapper } from './styles';

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
      modalHeader={<ModalHeaderBasic setShowDialog={setShowDialog} title="Sign Out" />}
    >
      <form css={modalWrapper} onSubmit={(ev) => handleSubmit(ev, setShowDialog)}>
        <div>Are you sure you want to sign out?</div>
        <div css={buttonWrapper}>
          <button
            disabled={submitting}
            type="submit"
            class="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 hover:bg-gray-800"
          >
            {submitting ? 'Signing Out…' : 'Sign Out'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SignOut;
