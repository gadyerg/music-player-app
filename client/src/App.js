import React, { useState, useContext } from "react";
import Home from "./pages/Home";
import Nav from "./components/UI/Nav";
import AddSong from "./pages/AddSong";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Playlists from "./pages/Playlists";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Nav /> 
      <Routes>
        <Route
          path="/"
          element={!authCtx.isLoggedIn ? <Navigate to="/login" /> : <Home />}
        />
        <Route
          path="/add-song"
          element={authCtx.isLoggedIn ? <AddSong /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/login"
          element={authCtx.isLoggedIn ? <Navigate to="/" /> : <LogIn />}
        />
        <Route
          path="/Playlists"
          element={authCtx.isLoggedIn ? <Playlists /> : <LogIn />}
        />
      </Routes>
    </div>
  );
}

export default App;
