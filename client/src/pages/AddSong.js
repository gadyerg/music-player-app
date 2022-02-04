import { useContext } from "react";
import SongContext from "../store/song-context";
import Form from "../components/Form/Form";

function AddSong() {
  const ctx = useContext(SongContext);
  if (ctx.song) {
    ctx.song.pause();
    ctx.song.currentTime = 0;
  }

  return <Form />;
}

export default AddSong;
