import React, {useState} from "react";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import SearchBar from "../components/UI/SearchBar";

function Home() {
  const [currentSong, setCurrentSong] = useState(0);

  function getIndex(index) {
    setCurrentSong(index)
  }

  return (
    <React.Fragment>
      <SearchBar passSongIndex={getIndex} />
      <MusicPlayer currentSong={currentSong} setCurrentSong={setCurrentSong} />
    </React.Fragment>
  );
}

export default Home;
