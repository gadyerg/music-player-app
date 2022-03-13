import React from "react";
import classes from "./Song.module.css";

function Song(props) {
  const songInPlaylist = false;
  return (
    <div className={classes.box}>
      <img src={`http://localhost:5000/${props.cover}`} alt="song cover" />
      <p>{props.name}</p>
      {songInPlaylist ? <button>Remove</button> : <button>Add</button>}
    </div>
  )
}

export default Song;
