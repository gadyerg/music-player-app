import React, { useState } from "react";
import classes from "./Form.module.css";
import axios from "axios";

function Form() {
  const [image, setImage] = useState('');
  const [songFile, setSongFile] = useState('')

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

  function onImageChange(evt) {
    const selectedImage = URL.createObjectURL(evt.target.files[0])
    setImage(selectedImage)
  }
  function onSongChange (evt) {
    setSongFile(evt.target.files[0].name)
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
        <label htmlFor="cover" className={classes.filelabel} required>Cover Upload</label>
        <input type="file" accept="image/*" id="cover" onChange={onImageChange}/>
        <img src={image}/>
        <label htmlFor="song" className={classes.filelabel}>Song Upload</label>
        <input type="file" accept="audio/*" id="song" required onChange={onSongChange}/>
        {songFile && <p>{songFile}</p>}
        <button>Add</button>
      </form>
    </React.Fragment>
  );
}

export default Form;
