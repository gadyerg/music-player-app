import { useContext } from "react";
import SongContext from "../store/song-context";
import Form from "../components/Form/Form";

function AddSong() {
  const songCtx = useContext(SongContext);

  if (songCtx.song) {
    songCtx.song.pause();
    songCtx.song.currentTime = 0;
  }

  return <Form />;
}

export default AddSong;
