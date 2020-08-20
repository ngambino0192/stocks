import React, { useState } from "react";

import Login from "./Login";
import SignIn from "./SignIn";

const Authenticate = function ({ showDialog, setShowDialog }) {
  const [hasAccount, setHasAccount] = useState(true);

  if (hasAccount) {
    return (
      <Login
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
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
