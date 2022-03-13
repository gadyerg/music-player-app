import { useContext } from "react";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import SongContext from "../store/song-context";

function SignUp() {
  const songCtx = useContext(SongContext);

  songCtx.onPageChange();

  return <SignUpForm />;
}

export default SignUp;
