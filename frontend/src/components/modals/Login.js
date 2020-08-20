/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";

import Modal from "./Modal";
import { ModalHeaderAuth } from "./ModalHeader";

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
`;

const LogIn = function ({
  showDialog,
  setShowDialog,
  hasAccount,
  setHasAccount,
}) {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [submitting, setSubmitting] = useState(false);
  let submittable = email !== "";

  let handleSubmit = function (ev) {
    ev.preventDefault();
    console.log("LOG USER IN");
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
        <label htmlFor="user-name" css={inputText}>
          Username
        </label>
        <input
          type="text"
          id="user-name"
          name="user-name"
          required
          value={username}
          // placeholder="Username"
          onChange={(ev) => setUsername(ev.target.value)}
          aria-label="Username"
          css={input}
        />
        <label htmlFor="email" css={inputText}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          // placeholder="Email"
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
          // placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
          aria-label="Password"
          css={input}
        />
        <div css={buttonWrapper}>
          <button disabled={!submittable || submitting} type="submit">
            {submitting ? "Logging in…" : "Log In"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LogIn;
