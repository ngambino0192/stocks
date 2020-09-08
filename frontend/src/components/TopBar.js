/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { motion } from 'framer-motion';
import accountIcon from '../icons/account-white.svg';
import { theme } from '../theme';
const { colors } = theme;

const topbar = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: ${colors.gray100};
  border-bottom: 0.5px solid ${colors.gray300};
  padding: 20px;

  .account-icon {
    width: 30px;
    height: 30px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const TopBar = ({ user, setShowSignOut, setShowAuth }) => {
  return (
    <div css={topbar} className="shadow-md">
      <div className="mercury" data-text="mercury">
        mercury
      </div>
      {user ? (
        <div onClick={() => setShowSignOut(true)} className="flex items-center">
          <span className="username px-5 text-lg">Hi, {user.username}</span>
          <img alt="icon-account" src={accountIcon} className="account-icon" />
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          type="submit"
          onClick={() => setShowAuth(true)}
        >
          Sign In
        </motion.button>
      )}
    </div>
  );
};

export default TopBar;
