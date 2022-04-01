import { useContext } from "react";
import PlaylistList from "../components/Playlists/PlaylistsList";
import SongContext from "../store/song-context";

function Playlists() {
  const ctx = useContext(SongContext);

  ctx.onPageChange();

  return <PlaylistList />;
}

export default Playlists;
