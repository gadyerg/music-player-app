import classes from "./SongPreview.module.css";
import SongContext from "../../store/song-context";
import { useContext } from "react";

function SongPreview(props) {
    const ctx = useContext(SongContext)

    function songClick(evt) {
        const song = ctx.currentSongList.filter(el => el._id === props.id)
        ctx.song = song[0]
      }

  return (
    <div className={classes.preview} onClick={songClick}>
      <img src={`http://localhost:5000/${props.image}`} alt="song cover" />
      <p>{props.songTitle}</p>
    </div>
  );
}

export default SongPreview;
