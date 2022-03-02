import {useContext} from "react";
import PlaylistList from "../components/Playlists/PlaylistsList";
import SongContext from "../store/song-context";

function Playlists() {
  const ctx = useContext(SongContext);

  if (ctx.song) {
    ctx.song.pause();
    ctx.song.currentTime = 0;
  }

  return <PlaylistList />;
}

export default Playlists;
