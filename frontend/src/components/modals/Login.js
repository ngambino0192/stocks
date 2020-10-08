/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState } from "react";
import { motion } from "framer-motion";
import { postForm } from "../../lib/form";
import Cookies from "js-cookie";

import Modal from "./Modal";
import { ModalHeaderAuth } from "./ModalHeader";
import {
  modalWrapper,
  inputText,
  buttonWrapper,
  input,
  spinnerWrapper,
} from "./styles";
import { Loading } from "./Loading";

const { REACT_APP_API_HOST } = process.env;

const LogIn = function ({
  showDialog,
  setShowDialog,
  setShowForgotPassword,
  hasAccount,
  setHasAccount,
}) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [submitting, setSubmitting] = useState(false);
  let submittable = email !== "";

  let handleSubmit = function (ev) {
    ev.preventDefault();
    setSubmitting(true);
    postForm(`${REACT_APP_API_HOST}/api/user/login`, {
      body: JSON.stringify({ email, password }),
    })
      .then(({ resp, json }) => {
        if (resp.status === 200) {
          Cookies.set("user", json);
          setShowDialog(false);
        } else if (resp.status === 401) {
          window.alert(json);
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
      {!submitting ? (
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
            placeholder="housestark@wintermail.com"
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
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={!submittable || submitting}
              type="submit"
            >
              Sign In
            </motion.button>
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
      ) : (
        <Loading />
      )}
    </Modal>
  );
};

export default LogIn;
