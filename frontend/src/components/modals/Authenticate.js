import React, { useState } from "react";

import Login from "./Login";
import SignIn from "./SignIn";
import Reset from "./Reset";

const Authenticate = function ({ showDialog, setShowDialog, setShowReset }) {
  const [hasAccount, setHasAccount] = useState(true);

  if (hasAccount) {
    return (
      <Login
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        setShowReset={setShowReset}
      />
    );
  } else {
    return (
      <SignIn
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
      />
    );
  }
};

export default Authenticate;
