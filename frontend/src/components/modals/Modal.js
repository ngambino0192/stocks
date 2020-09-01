/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

const contentWrapper = css`
  padding: 20px;
`;

const dialogOverlayStyles = {
  zIndex: 20,
  background: "rgba(243, 242, 244, 0.5)",
};

const dialogContentStyles = {
  padding: 0,
  boxShadow: "0 2px 20px 0 rgba(0,0,0,0.1)",
  borderRadius: 3,
  backgroundColor: "white",
};

const Modal = function ({ children, showDialog, modalHeader }) {
  return (
    <DialogOverlay style={dialogOverlayStyles} isOpen={showDialog}>
      <DialogContent
        aria-label="onboarding-process"
        style={dialogContentStyles}
      >
        {modalHeader}
        <div css={contentWrapper}>{children}</div>
      </DialogContent>
    </DialogOverlay>
  );
};

export default Modal;
