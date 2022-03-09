import classes from "./EditPlaylist.module.css";

function EditPlaylist(props) {
  return (
    <div>
      <div>
        <img src={} alt="Playlist cover"/>
        <h1>{Playlist Name}</h1>
        <ul>
          allSongs.map((song) => {
            return (
              <li>
                <Song
                  name={song.name}
                  cover={song.cover}
                />
              </li>)
          })
        </ul>
      </div>
    </div>
  )
}
