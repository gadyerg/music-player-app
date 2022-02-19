import React, { useState } from "react";
import Home from "./pages/Home";
import Nav from "./components/UI/Nav";
import CreatePlaylist from "./components/CreatePlaylist/CreatePlaylist";
import AddSong from "./pages/AddSong";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { Route, Routes } from "react-router-dom";

function App() {
  const [createPlaylist, setCreatePlaylist] = useState(false);

  return (
    <div>
      <Nav toggleCreatePlayList={setCreatePlaylist} />
      {createPlaylist && (
        <CreatePlaylist toggleCreatePlayList={setCreatePlaylist} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-song" element={<AddSong />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
