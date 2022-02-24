import Playlist from "./Playlist.js";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import React, { useEffect, useState } from "react";
import axios from "axios";

function PlaylistsList() {
  const [popup, setPopup] = useState(false);
  const [listOfPlaylists, setListOfPlaylists] = useState([]);

  useEffect(() => {
    async function getPlaylists(){
      try {
        const playlistData = await axios.get(`http://localhost:5000/${localStorage.getItem("id")}/GetPlaylists`); 
        setListOfPlaylists(playlistData.data);
      } catch {
        console.log("error");
      }
    }

    getPlaylists();
  }, [])
  
  function addPlaylistHandler() {
    setPopup(true);
  }

  function onClosePopup() {
    setPopup(false);
  }
  listOfPlaylists.map((playlist) => {
    console.log(playlist);
  })
  return (
    <React.Fragment>
      {popup && <CreatePlaylist close={onClosePopup} />}
      <button onClick={addPlaylistHandler}>Add Playlist</button>
        {listOfPlaylists.map((playlist) => {
          <Playlist
            name={playlist.name}
            key={playlist._id}
          />
        })}
    </React.Fragment>
  )
}

export default PlaylistsList;
