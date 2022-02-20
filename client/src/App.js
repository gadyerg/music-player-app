import React, { useState, useContext } from "react";
import Home from "./pages/Home";
import Nav from "./components/UI/Nav";
import CreatePlaylist from "./components/CreatePlaylist/CreatePlaylist";
import AddSong from "./pages/AddSong";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./store/auth-context";

function App() {
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Nav toggleCreatePlayList={setCreatePlaylist} />
      {createPlaylist && (
        <CreatePlaylist toggleCreatePlayList={setCreatePlaylist} />
      )}
      <Routes>
        <Route path="/" element={!authCtx.isLoggedIn ? <Navigate to="/login" /> : <Home />} />
        <Route path="/add-song" element={authCtx.isLoggedIn ? <AddSong /> : <Navigate to ="/login" />} />
        <Route path="/signup" element={authCtx.isLoggedIn ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/login" element={authCtx.isLoggedIn ? <Navigate to="/" /> : <LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
