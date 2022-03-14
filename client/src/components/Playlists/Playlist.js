import React, { useState }from "react";
import classes from "./Playlist.module.css";
import EditPlaylist from "./EditPlaylist";

function Playlist(props) {
  const [isEditing, setIsEditing] = useState(false);

  function edit() {
    setIsEditing(true);
  }

  return (
    <React.Fragment>
      {isEditing && <EditPlaylist name={props.name} thumbnail={props.thumbnail} />}
      <div className={classes.info}>
        <img src={`http://localhost:5000/${props.thumbnail}`} alt="playlist Thumnail" className={classes.thumbnail} />
        <p>{props.name}</p>
        <div className={classes.buttons}>
          <button className={classes.edit} onClick={edit}>Edit</button>
          <button className={classes.select}>Select</button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Playlist;
