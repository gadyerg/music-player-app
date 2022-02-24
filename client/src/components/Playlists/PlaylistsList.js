import Playlist from "./Playlist.js";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./PlaylistsList.module.css";

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

  return (
    <React.Fragment>
      {popup && <CreatePlaylist close={onClosePopup} />}
      <div className={classes.list}>
        <button onClick={addPlaylistHandler} className={classes.add}>Add Playlist</button>
          {listOfPlaylists.map((playlist) => {
            return <Playlist
              name={playlist.name}
              key={playlist._id}
              id={playlist._id}
            />
          })}
      </div>
    </React.Fragment>
  )
}

export default PlaylistsList;
