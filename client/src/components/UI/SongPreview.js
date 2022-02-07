import classes from "./SongPreview.module.css";
import SongContext from "../../store/song-context";
import { useContext } from "react";

function SongPreview(props) {
  const ctx = useContext(SongContext);

  function songClick() {
    const songIndex = ctx.currentSongList.findIndex(
      (el) => el._id === props.id
    );
    props.onSongClick(songIndex);
  }

  return (
    <div className={classes.preview} onClick={songClick}>
      <img src={`http://localhost:5000/${props.image}`} alt="song cover" />
      <p>{props.songTitle}</p>
    </div>
  );
}

export default SongPreview;
