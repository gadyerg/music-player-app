import React from "react";

function Form() {
  return (
    <React.Fragment>
      <form>
        <label for="song-title">Song Title</label>
        <input type="text" id="song-title" />
        <label for="artist">Artist Name</label>
        <input type="text" id="artist" />
        <label for="album">Album/song cover</label>
        <input type='file' accept="image/*" id="album" />
        <label for='song'>Song file</label>
        <input type='file' accept="audio/*" />
      </form>
    </React.Fragment>
  );
}

export default Form;