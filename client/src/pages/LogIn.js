import { useContext } from "react";
import LogInForm from "../components/LogInForm/LogInForm.js";
import SongContext from "../store/song-context";

function LogIn() {
  const songCtx = useContext(SongContext);

  songCtx.onPageChange();

  return <LogInForm />;
}

export default LogIn;
