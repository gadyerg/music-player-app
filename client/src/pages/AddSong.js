import { useContext } from "react";
import SongContext from "../store/song-context";
import Form from "../components/Form/Form";

function AddSong() {
  const songCtx = useContext(SongContext);

  songCtx.onPageChange();

  return <Form />;
}

export default AddSong;
