import React, { useState, useContext, useEffect } from "react";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import SearchBar from "../components/UI/SearchBar";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

function Home() {
  const [currentSong, setCurrentSong] = useState(0);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate("/signup");
    }
  }, [authCtx.isLoggedIn, navigate]);

  function getIndex(index) {
    setCurrentSong(index);
  }

  return (
    <React.Fragment>
      <SearchBar passSongIndex={getIndex} />
      <MusicPlayer currentSong={currentSong} setCurrentSong={setCurrentSong} />
    </React.Fragment>
  );
}

export default Home;
