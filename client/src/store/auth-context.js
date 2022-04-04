import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogIn: () => {},
  onLogOut: () => {},
  user: {},
});

export function AuthProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function checkAuth() {
      const authCheck = await axios.get("https://music-player-2022.herokuapp.com/AuthCheck", {
        withCredentials: true,
      });
      if (authCheck.data.id) {
        setUser(authCheck.data);
        setIsLoggedIn(true);
      }
    }

    checkAuth();
  }, [isLoggedIn]);

  function loginHandler(data) {
    setUser(data);
    setIsLoggedIn(true);
  }

  async function logoutHandler() {
    await axios.get("http://localhost:5000/signout", { withCredentials: true });
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogIn: loginHandler,
        onLogOut: logoutHandler,
        user: user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
