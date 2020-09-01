/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useState } from "react";
import { postForm } from "../../lib/form";

import Modal from "./Modal";
import { ModalHeaderBasic } from "./ModalHeader";

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
  }
`;

const buttonWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  color: black;
`;

const Reset = function ({ showDialog, setShowDialog }) {
  let [email, setEmail] = useState("");
  let [submitting, setSubmitting] = useState(false);

  let handleSubmit = function (ev) {
    ev.preventDefault();
    setSubmitting(true);
    postForm("http://localhost:6969/api/user/reset", {
      body: JSON.stringify({ email }),
    })
      .then(({ resp, json }) => {
        console.log("resp: ", resp);
        console.log("json: ", json);
        if (resp.status === 200) {
          window.alert(
            "We have sent you your password reset instructions to your email address. Please also check your spam folder"
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
        <ModalHeaderBasic setShowDialog={setShowDialog} title="Sign Out" />
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
          placeholder="Email"
          onChange={(ev) => setEmail(ev.target.value)}
          aria-label="Email"
          css={input}
        />
        <div css={buttonWrapper}>
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </Modal>
  );
};

export default Reset;
