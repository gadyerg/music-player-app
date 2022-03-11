import React, { useState } from "react";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import SearchBar from "../components/UI/SearchBar";
import { SongProvider } from "../store/song-context";

function Home() {
  const [currentSong, setCurrentSong] = useState(0);

  function getIndex(index) {
    setCurrentSong(index);
  }

  return (
    <React.Fragment>
      <SongProvider>
        <SearchBar passSongIndex={getIndex} />
        <MusicPlayer currentSong={currentSong} setCurrentSong={setCurrentSong} />
      </SongProvider>
    </React.Fragment>
  );
}

export default Home;
