import React from "react";
import classes from './Form.module.css';

function Form() {
  return (
    <React.Fragment>
      <form className={classes.container} encType="multipart/form-data" method="post">
        <label for="song-title">Song Title</label>
        <input type="text" id="song-title" required />
        <label for="artist">Artist Name</label>
        <input type="text" id="artist" required />
        <label for="album">Album/song cover (optional)</label>
        <input type='file' accept="image/*" id="album" />
        <label for='song'>Song file</label>
        <input type='file' accept="audio/*" required />
        <button>Add</button>
      </form>
    </React.Fragment>
  );
}

export default Form; 