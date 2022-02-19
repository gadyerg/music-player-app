import { useContext } from "react";
import LogInForm from "../components/LogInForm/LogInForm.js";
import SongContext from "../store/song-context";

function LogIn() {
  const songCtx = useContext(SongContext);

  if (songCtx.song) {
    songCtx.song.pause();
    songCtx.song.currentTime = 0;
  }
  
  return <LogInForm />;
}

export default LogIn;
