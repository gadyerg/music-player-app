import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogIn: () => {},
  onLogOut: () => {},
});

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(async () => {
    const authCheck = await axios.get("http://localhost:5000/AuthCheck", {withCredentials: true});
    if (authCheck.data.user) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  function loginHandler() {
    setIsLoggedIn(true);
  }

  function logoutHandler() {
    setIsLoggedIn(false);
    localStorage.removeItem("id");
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogIn: loginHandler,
        onLogOut: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
