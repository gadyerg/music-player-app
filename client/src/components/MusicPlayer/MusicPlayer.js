import { useState, useContext, useEffect } from "react";
import SongContext from "../../store/song-context";
import classes from "./MusicPlayer.module.css";
import TimeBar from "./TimeBar";
import axios from "axios";

let song = new Audio();
let songList = [{}];

function MusicPlayer() {
  const [gotData, setGotData] = useState(false);
  const ctx = useContext(SongContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getSongs() {
      try {
        const allSongs = await axios.get("http://localhost:5000/GetSongs");
        songList = allSongs.data;
        setGotData(true)
      } catch {
        setError(true);
        setGotData(true);
      }
    }
    getSongs();
  }, []);

  if (song.src !== `http://localhost:5000/${songList[currentSong].song}`) {
    song.src = `http://localhost:5000/${songList[currentSong].song}`;
  }
  ctx.song = song;

  if (isPlaying) {
    song.play();
  }

  function Play() {
    setIsPlaying(true);
    song.play();
  }

  function Pause() {
    setIsPlaying(false);
    song.pause();
  }

  // next and prev both toggle through the songs and loop when the arrray of songs finishes
  async function NextSong() {
    song.currentTime = 0;
    setCurrentSong((prevState) => {
      if (songList[prevState + 1] === undefined) {
        return 0;
      }
      return prevState + 1;
    });
  }

  function PrevSong() {
    song.currentTime = 0;
    setCurrentSong((prevState) => {
      if (currentSong === 0) {
        return songList.length - 1;
      }
      return prevState - 1;
    });
  }

  // timeControl changes song time depending on where the user clicks the bar
  function timeControl(clientX, offsetLeft, clientWidth) {
    const x = clientX - offsetLeft;
    const songTime = x / clientWidth;
    song.currentTime = songTime * song.duration;
  }

  return (
    <div className={classes.player}>
      <div className={classes.box}>
        {!gotData && <p>loading...</p>}
        {gotData && !error && (
          <div className={classes["cover-pic"]}>
            <img
              src={`http://localhost:5000/${songList[currentSong].cover}`}
              alt="song cover"
            />
            <p>
              {`${songList[currentSong].title}`} -{" "}
              {`${songList[currentSong].artist}`}
            </p>
            <TimeBar
              onSongEnd={NextSong}
              onSetTime={timeControl}
              currentSong={song}
            />

            {/* The three media buttons and toggle for play and pause */}
            <div className={classes["media-buttons"]}>
              <button onClick={PrevSong}>&#9198;</button>
              {isPlaying ? (
                <button onClick={Pause}>&#9208;</button>
              ) : (
                <button onClick={Play}>&#9654;</button>
              )}
              <button onClick={NextSong}>&#9197;</button>
            </div>
          </div>
        )}
        {gotData && error && <p>There has been an error</p>}
      </div>
    </div>
  );
}

export default MusicPlayer;
