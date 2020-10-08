import React, { useState } from 'react';

import Login from './Login';
import Register from './Register';

const Authenticate = function ({ showDialog, setShowDialog, setShowForgotPassword }) {
  const [hasAccount, setHasAccount] = useState(true);

  if (hasAccount) {
    return (
      <Login
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        setShowForgotPassword={setShowForgotPassword}
      />
    );
  } else {
    return (
      <Register
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
      />
    );
  }
};

export default Authenticate;
