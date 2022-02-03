import React from "react";
import classes from "./Form.module.css";
import axios from "axios";

function Form() {
  function onSubmitHandler(evt) {
    evt.preventDefault();

    const config = {
      header: {
        "Content-ype": "application/json",
      },
    };
    const songInfo = {
      title: evt.target[0].value,
      artist: evt.target[1].value,
      cover: evt.target[2].files[0],
      song: evt.target[3].files[0],
    };
    console.log(songInfo)

    axios.post("http://localhost:5000/AddSong", songInfo, config);
  }

  return (
    <React.Fragment>
      <form
        onSubmit={onSubmitHandler}
        className={classes.container}
        encType="multipart/form-data"
      >
        <label htmlFor="title">Song Title</label>
        <input type="text" id="title" required />
        <label htmlFor="artist">Artist Name</label>
        <input type="text" id="artist" required />
        <label htmlFor="cover">Album/song cover (optional)</label>
        <input type="file" accept="image/*" id="cover" />
        <label htmlFor="song">Song file</label>
        <input type="file" accept="audio/*" id="song" required />
        <button>Add</button>
      </form>
    </React.Fragment>
  );
}

export default Form;
