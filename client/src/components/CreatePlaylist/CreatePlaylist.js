import classes from "./CreatePlaylist.module.css";
import axios from "axios";

function CreatePlaylist(props) {
  async function submitHandler(evt) {
    evt.preventDefault();
    const data = { name: evt.target[0].value };
    try {
      await axios.post(
        `http://localhost:5000/${localStorage.getItem("id")}/CreatePlaylist`,
        data
      );
      props.updateList();
      props.close();
    } catch {
      console.log("Error");
    }
  }

  return (
    <div className={classes.modal}>
      <button className={classes.exit} onClick={props.close}>
        X
      </button>
      <form onSubmit={submitHandler} className={classes["playlist-form"]}>
        <input type="text" placeholder="Playlist Name" autoFocus />
        <button className={classes.create}>Create</button>
      </form>
    </div>
  );
}

export default CreatePlaylist;
