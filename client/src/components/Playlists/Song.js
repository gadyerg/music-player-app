import React from "react";
import classes from "./Song.module.css";

function Song(props) {
  return (
    <React.Fragement>
      <img src={props.cover} alt="song cover" />
      <p>{props.name}</p>
      {songInPlaylist ? <button>Remove</button> : <button>Add</button>}
    </React.Fragement>
  )
}
