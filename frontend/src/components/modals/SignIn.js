/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import { postForm } from "../../lib/form";
import Cookies from "js-cookie";

import Modal from "./Modal";
import { ModalHeaderAuth } from "./ModalHeader";

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
    color: black;
  }
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  color: black;
`;

const SignIn = function ({ showDialog, setShowDialog, setHasAccount }) {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [submitting, setSubmitting] = useState(false);
  let submittable = email !== "";

  let handleSubmit = function (ev) {
    ev.preventDefault();
    setSubmitting(true);
    postForm(`${REACT_APP_API_HOST}/api/user/create`, {
      body: JSON.stringify({ username, email, password }),
    })
      .then(({ resp, json }) => {
        if (resp.ok) {
          Cookies.set("user", json);
          setShowDialog(false);
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
        />
        <div css={buttonWrapper}>
          <button disabled={!submittable || submitting} type="submit">
            {submitting ? "Submitting…" : "Sign In"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SignIn;
