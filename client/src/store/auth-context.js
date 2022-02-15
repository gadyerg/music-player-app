import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  userID: 0,
});

export default AuthContext;
