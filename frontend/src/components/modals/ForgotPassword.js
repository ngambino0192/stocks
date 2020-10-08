/** @jsx jsx */
import { jsx } from "@emotion/core";
import { motion } from "framer-motion";
import { useState } from "react";
import { postForm } from "../../lib/form";

import Modal from "./Modal";
import { ModalHeaderBasic } from "./ModalHeader";
import { inputText, modalWrapper, input, buttonWrapper } from "./styles";

const { REACT_APP_API_HOST } = process.env;

const Reset = function ({ showDialog, setShowDialog }) {
  let [email, setEmail] = useState("");
  let [submitting, setSubmitting] = useState(false);

  let handleSubmit = function (ev) {
    ev.preventDefault();
    setSubmitting(true);
    postForm(`${REACT_APP_API_HOST}/api/user/forgot-password`, {
      body: JSON.stringify({ email }),
    })
      .then(({ resp }) => {
        if (resp.status === 200) {
          window.alert(
            "We have sent you your reset instructions to your email address. Please also check your spam folder"
          );
        } else if (resp.status === 404) {
          window.alert(
            "We do not have an account associated with this email address. Create account instead!"
          );
        } else {
          window.alert("Whoops, there was an error. Please try again.");
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
        <ModalHeaderBasic
          setShowDialog={setShowDialog}
          title="Recover Password"
        />
      }
    >
      <form css={modalWrapper} onSubmit={(ev) => handleSubmit(ev)}>
        <h3 className="forgot-subtitle">
          No worries, it happens to the best of us.
        </h3>
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
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
          >
            {submitting ? "Sending..." : "Email me a recovery link"}
          </motion.button>
        </div>
      </form>
    </Modal>
  );
};

export default Reset;
