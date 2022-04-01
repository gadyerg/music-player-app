import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Song.module.css";

function Song(props) {
  const [inPlaylist, setInPlaylist] = useState(false);

  function checkInPlaylist() {
    const isInPlaylist = props.songList.includes(props.id);
    if (isInPlaylist) {
      setInPlaylist(true);
    }
  }

  useEffect(() => {
    checkInPlaylist();
  }, []);

  async function addSong() {
    const data = {
      song: props.id,
    };

    try {
      await axios.patch(
        `http://localhost:5000/playlist/${props.playlist}/addsong`,
        data,
        { withCredentials: true }
      );
      setInPlaylist((prevState) => {
        return !prevState;
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function removeSong() {
    const data = {
      song: props.id,
    };

    try {
      await axios.patch(
        `http://localhost:5000/Playlist/${props.playlist}/removesong`,
        data,
        { withCredentials: true }
      );
      setInPlaylist((prevState) => {
        return !prevState;
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.box}>
      <img src={`http://localhost:5000/${props.cover}`} alt="song cover" />
      <p>{props.name}</p>
      {inPlaylist ? (
        <button className={classes.remove} onClick={removeSong}>
          Remove
        </button>
      ) : (
        <button className={classes.add} onClick={addSong}>
          Add
        </button>
      )}
    </div>
  );
}

export default Song;
