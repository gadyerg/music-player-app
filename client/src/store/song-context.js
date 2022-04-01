import React, { useState } from "react";

const SongContext = React.createContext({
  song: new Audio(),
  changeSong: () => {},
  songList: [{}],
  changeSongList: () => {},
  onPageChange: () => {},
});

export function SongProvider(props) {
  const [song, setSong] = useState(new Audio());
  const [songList, setSongList] = useState([{}]);

  function stopSong() {
    song.pause();
    song.currentTime = 0;
  }

  return (
    <SongContext.Provider
      value={{
        song: song,
        changeSong: setSong,
        songList: songList,
        changeSongList: setSongList,
        onPageChange: stopSong,
      }}
    >
      {props.children}
    </SongContext.Provider>
  );
}

export default SongContext;
