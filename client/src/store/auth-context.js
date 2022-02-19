import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogIn: () => {},
  onLogOut: () => {},
});

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (localStorage.getItem("id")) {
    setIsLoggedIn(true);
  }

  function loginHandler(id) {
    setIsLoggedIn(true);
    localStorage.setItem("id", id);
  }

  function logoutHandler() {
    setIsLoggedIn(false);
    localStorage.removeItem("id");
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogIn: loginHandler, onLogOut: logoutHandler}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
