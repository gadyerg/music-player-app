import { useState, useContext, useEffect } from "react";
import SongContext from "../../store/song-context";
import classes from "./MusicPlayer.module.css";
import TimeBar from "./TimeBar";
import axios from "axios";
import { motion } from "framer-motion";
import { imageSpin } from "../../animations/animtions";
import play from "../../assets/play.svg";
import pause from "../../assets/pause.svg";
import forward from "../../assets/forward.svg";
import backward from "../../assets/back.svg";
import axios from "axios";

function MusicPlayer(props) {
  const [gotData, setGotData] = useState(false);
  const ctx = useContext(SongContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);

  const image = axios.get(ctx.songList[props.currentSong].cover)
  console.log(image);

  useEffect(() => {
    async function getSongs() {
      try {
        const allSongs = await axios.get(
          "https://music-player-2022.herokuapp.com/songs",
          {
            withCredentials: true,
          }
        );
        ctx.changeSongList(allSongs.data);
        setGotData(true);
      } catch {
        setError(true);
        setGotData(true);
      }
    }

    if (ctx.songList[0] === undefined || !ctx.songList[0].song) {
      getSongs();
    } else if (ctx.songList[0].song) {
      setGotData(true);
    }
  }, []);

  // update song src on a different song
  if (
    ctx.songList[0] !== undefined &&
    ctx.song.src !== ctx.songList[props.currentSong].song
  ) {
    ctx.song.src = ctx.songList[props.currentSong].song;
  }

  if (isPlaying) {
    ctx.song.play();
  }

  function Play() {
    setIsPlaying(true);
    ctx.song.play();
  }

  function Pause() {
    setIsPlaying(false);
    ctx.song.pause();
  }

  // next and prev both toggle through the songs and loop when the arrray of songs finishes
  async function NextSong() {
    props.setCurrentSong((prevState) => {
      if (ctx.songList[prevState + 1] === undefined) {
        return 0;
      }
      return prevState + 1;
    });
  }

  function PrevSong() {
    props.setCurrentSong((prevState) => {
      if (props.currentSong === 0) {
        return ctx.songList.length - 1;
      }
      return prevState - 1;
    });
  }

  // timeControl changes song time depending on where the user clicks the bar
  function timeControl(clientX, offsetLeft, clientWidth) {
    const x = clientX - offsetLeft;
    const songTime = x / clientWidth;
    ctx.song.currentTime = songTime * ctx.song.duration;
  }

  return (
    <div className={classes.player}>
      <div className={classes.box}>
        {ctx.songList[0] === undefined && <p>No songs found.</p>}
        {!gotData && <p>loading...</p>}
        {gotData && !error && ctx.songList[0] !== undefined && (
          <div className={classes["cover-pic"]}>
            {isPlaying ? (
              <motion.img
                animate="spin"
                variants={imageSpin}
                src={ctx.songList[props.currentSong].cover}
                alt="song cover"
              />
            ) : (
              <img
                src={ctx.songList[props.currentSong].cover}
                alt="song cover"
              />
            )}
            <p>
              {`${ctx.songList[props.currentSong].title}`} -{" "}
              {`${ctx.songList[props.currentSong].artist}`}
            </p>
            <TimeBar
              onSongEnd={NextSong}
              onSetTime={timeControl}
              currentSong={ctx.song}
            />

            {/* The three media buttons and toggle for play and pause */}
            <div className={classes["media-buttons"]}>
              <button onClick={PrevSong}>
                <img src={backward} alt="back" />
              </button>
              {isPlaying ? (
                <button onClick={Pause}>
                  <img src={pause} alt="pause" />
                </button>
              ) : (
                <button onClick={Play}>
                  <img src={play} alt="play" />
                </button>
              )}
              <button onClick={NextSong}>
                <img src={forward} alt="next" />
              </button>
            </div>
          </div>
        )}
        {gotData && error && <p>There has been an error</p>}
      </div>
    </div>
  );
}

export default MusicPlayer;
