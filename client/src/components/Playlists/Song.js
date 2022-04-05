import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./Song.module.css";

function Song(props) {
  const [inPlaylist, setInPlaylist] = useState(false);

  useEffect(() => {
    function checkInPlaylist() {
      const isInPlaylist = props.songList.includes(props.id);
      if (isInPlaylist) {
        setInPlaylist(true);
      }
    }
    checkInPlaylist();
  }, [props.id, props.songList]);

  async function addSong() {
    const data = {
      song: props.id,
    };

    try {
      await axios.patch(
        `https://music-player-2022.herokuapp.com/playlist/${props.playlist}/addsong`,
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
        `https://music-player-2022.herokuapp.com/playlist/${props.playlist}/removesong`,
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
      <img src={props.cover} alt="song cover" />
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
