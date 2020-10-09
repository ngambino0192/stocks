/** @jsx jsx */
import { jsx } from '@emotion/core';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import {
  dialogOverlayStyles,
  dialogContentStyles,
  contentWrapper,
} from './styles';

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
