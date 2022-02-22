import Playlist from "./Playlist.js";

function Playlists() {
  return (
    listOfPlaylists.map((playlist) => {
      <Playlist
        key={playlist.key}
        id={playlist._id}
        name={playlist.name}
        />
    })
  )
}

export default Playlists;
