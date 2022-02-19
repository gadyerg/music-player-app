import { useContext } from "react";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import SongContext from "../store/song-context";

function SignUp() {
  const songCtx = useContext(SongContext);
  
  if (songCtx.song) {
    songCtx.song.pause();
    songCtx.song.currentTime = 0;
  }

  return <SignUpForm />;
}

export default SignUp;
