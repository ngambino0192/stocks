/** @jsx jsx */
import { jsx } from '@emotion/core';
import { motion } from 'framer-motion';
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
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={submitting}
            type="submit"
          >
            {submitting ? 'Signing Out…' : 'Sign Out'}
          </motion.button>
        </div>
      </form>
    </Modal>
  );
};

export default SignOut;
