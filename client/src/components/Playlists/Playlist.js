import React, { useState, useContext } from "react";
import axios from "axios";
import classes from "./Playlist.module.css";
import EditPlaylist from "./EditPlaylist";
import SongContext from "../../store/song-context";
import { useNavigate } from "react-router-dom";

function Playlist(props) {
  const [isEditing, setIsEditing] = useState(false);
  const songCtx = useContext(SongContext);
  const navigate = useNavigate();

  function edit() {
    setIsEditing(true);
  }

  function closeEdit() {
    setIsEditing(false);
  }

  async function select() {
    try {
      const data = await axios.get(
        `http://localhost:5000/playlist/${props.id}/songs`,
        { withCredentials: true }
      );
      songCtx.changeSongList(data.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <React.Fragment>
      {isEditing && (
        <EditPlaylist
          id={props.id}
          songs={props.songs}
          name={props.name}
          thumbnail={props.thumbnail}
          close={closeEdit}
          update={props.update}
        />
      )}
      <div className={classes.info}>
        <img
          src={`http://localhost:5000/${props.thumbnail}`}
          alt="playlist Thumnail"
          className={classes.thumbnail}
        />
        <p>{props.name}</p>
        <div className={classes.buttons}>
          <button className={classes.edit} onClick={edit}>
            Edit
          </button>
          <button className={classes.select} onClick={select}>
            Select
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Playlist;
