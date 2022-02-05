import React from "react";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import SearchBar from "../components/UI/SearchBar";

function Home() {
  return (
    <React.Fragment>
      <SearchBar />
      <MusicPlayer />
    </React.Fragment>
  );
}

export default Home;
