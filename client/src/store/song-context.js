import React, { useState } from "react";

const SongContext = React.createContext({
  song: new Audio(),
  changeSong: () =>{},
  songList: [{}],
  changeSongList: () => {}
});

export function SongProvider (props) {
  const [song, setSong] = useState(new Audio());
  const [songList, setSongList] = useState([{}]);
  
  return (
    <SongContext.Provider
      value={{
        song: song,
        changeSong: setSong,
        songList: songList,
        changeSongList: setSongList,
      }}
    >
      {props.children}
    </SongContext.Provider>
  )
}

export default SongContext;
