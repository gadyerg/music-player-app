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
    const data = new FormData()
    data.append('title', evt.target[0].value)
    data.append('artist', evt.target[1].value)
    data.append('cover', evt.target[2].files[0])
    data.append('song', evt.target[3].files[0])

    console.log(data)
    axios.post("http://localhost:5000/AddSong", data, config);
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
