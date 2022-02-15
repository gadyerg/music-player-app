import { useContext, useEffect } from "react";
import SongContext from "../store/song-context";
import Form from "../components/Form/Form";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

function AddSong() {
  const navigate = useNavigate();
  const songCtx = useContext(SongContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate("/signup");
    }
  }, [authCtx.isLoggedIn, navigate]);

  if (songCtx.song) {
    songCtx.song.pause();
    songCtx.song.currentTime = 0;
  }

  return <Form />;
}

export default AddSong;
