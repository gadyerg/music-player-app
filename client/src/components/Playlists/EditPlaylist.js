import { useEffect, useState } from "react";
import classes from "./EditPlaylist.module.css";
import Song from "./Song";
import axios from "axios";

function EditPlaylist(props) {
  const [songs, setSongs] = useState([{}]);

  useEffect(() => {
    async function getSongData() {
      const songData = await axios.get(
        `https://music-player-2022.herokuapp.com/songs`,
        {
          withCredentials: true,
        }
      );
      setSongs(songData.data);
    }

    getSongData();
  }, []);

  async function deletePlaylist() {
    try {
      await axios.delete(
        `https://music-player-2022.herokuapp.com/playlist/${props.id}`,
        {
          withCredentials: true,
        }
      );
      props.close();
      props.update();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.background}>
      <div className={classes.card}>
        <img
          src={props.thumbnail}
          alt="Playlist cover"
          className={classes.thumbnail}
        />
        <h1 className={classes.name}>{props.name}</h1>
        <button className={classes.close} onClick={props.close}>
          Close
        </button>
        <button className={classes.delete} onClick={deletePlaylist}>
          Delete Playlist
        </button>
        {songs[0] ? (
          <ul className={classes.songList}>
            {songs.map((song) => {
              return (
                <li key={song._id}>
                  <Song
                    songList={props.songs}
                    id={song._id}
                    name={song.title}
                    cover={song.cover}
                    playlist={props.id}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <h2 className={classes["no-songs"]}>No songs found.</h2>
        )}
      </div>
    </div>
  );
}

export default EditPlaylist;
