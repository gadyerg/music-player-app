import { useContext, useEffect, useState } from "react";
import classes from "./EditPlaylist.module.css";
import Song from "./Song";
import axios from "axios";
import AuthContext from "../../store/auth-context";

function EditPlaylist(props) {
  const [songs, setSongs] = useState([{}]);
  const authCtx = useContext(AuthContext);
  
  useEffect(() => {
    async function getSongData() {
      const songData = await axios.get(`http://localhost:5000/${authCtx.user.id}/GetSongs`, { withCredentials: true });
      setSongs(songData.data);
    }

    getSongData();
  }, []);

  return (
    <div className={classes.background}>
      <div className={classes.card}>
        <img src={`http://localhost:5000/${props.thumbnail}`}alt="Playlist cover" className={classes.thumbnail} />
        <h1 className={classes.name}>{props.name}</h1>
        {songs[0]._id ? <ul className={classes.songList}>
          {songs.map((song) => {
              return (<li key={song._id}>
                <Song
                  songList={props.songs}
                  id={song._id}
                  name={song.title}
                  cover={song.cover}
                  playlist={props.id}
                />
              </li>)
          })}
        </ul> :
          <h2>No songs found.</h2>}
      </div>
    </div>
  )
}

export default EditPlaylist;
