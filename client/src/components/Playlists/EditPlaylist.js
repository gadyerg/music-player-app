import { useContext } from "react";
import classes from "./EditPlaylist.module.css";
import Song from "./Song";
import axios from "axios";

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
