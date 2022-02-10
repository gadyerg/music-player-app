import classes from "./CreatePlaylist.module.css";
import axios from "axios";

function CreatePlaylist(props) {
  function close() {
    props.toggleCreatePlayList(false);
  }

  async function submitHandler(evt) {
    evt.preventDefault();
    const data = { name: evt.target[0].value };
    try {
      await axios.post("http://localhost:5000/CreatePlaylist", data);
      props.toggleCreatePlayList(false);
    } catch {
      console.log("Error");
    }
  }

  return (
    <div className={classes.modal}>
      <button className={classes.exit} onClick={close}>
        X
      </button>
      <form onSubmit={submitHandler} className={classes["playlist-form"]}>
        <input type="text" placeholder="Playlist Name" />
        <button className={classes.create}>Create</button>
      </form>
    </div>
  );
}

export default CreatePlaylist;
