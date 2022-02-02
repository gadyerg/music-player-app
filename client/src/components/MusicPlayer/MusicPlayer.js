import { useState, useContext } from "react";
import SongContext from "../../store/song-context";
import classes from "./MusicPlayer.module.css";
import TimeBar from "./TimeBar";
import Kyoto from "../../music/Kyoto.mp3";
import Dilittante from "../../music/Dilettante.mp3";
import LDA from "../../music/Little Dark Age.mp3";
import PB from "../../music/Piano Black.mp3";

const SONG_LIST = [
  {
    name: "Kyoto",
    artist: "Phoebe Bridges",
    cover:
      "https://ourculturemag.com/wp-content/uploads/2020/08/333B7425-1-scaled.jpg",
    audio: new Audio(Kyoto),
  },
  {
    name: "Dilettante",
    artist: "St. Vincent",
    cover:
      "https://64.media.tumblr.com/441c8c1769238d953c38936dc3839386/tumblr_inline_p7cyb5ij9O1ry2xr3_1280.jpg",
    audio: new Audio(Dilittante),
  },
  {
    name: "Little Dark Age",
    artist: "MGMT",
    cover:
      "https://www.indiependent.co.uk/wp-content/uploads/2018/06/cby-dp.jpg",
    audio: new Audio(LDA),
  },
  {
    name: "Piano Black",
    artist: "SEATBELTS",
    cover: "https://m.media-amazon.com/images/I/41V6S7NGC6L.jpg",
    audio: new Audio(PB),
  },
];

function MusicPlayer() {
  const ctx = useContext(SongContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);

  const PlayingSong = SONG_LIST[currentSong];
  ctx.song = PlayingSong;

  if (isPlaying) {
    PlayingSong.audio.play();
  }

  function Play() {
    setIsPlaying(true);
    PlayingSong.audio.play();
  }

  function Pause() {
    setIsPlaying(false);
    PlayingSong.audio.pause();
  }

  // next and prev both toggle through the songs and loop when the arrray of songs finishes
  function NextSong() {
    PlayingSong.audio.pause();
    PlayingSong.audio.currentTime = 0;
    setCurrentSong((prevState) => {
      if (currentSong + 1 === SONG_LIST.length) {
        return 0;
      }
      return prevState + 1;
    });
  }

  function PrevSong() {
    PlayingSong.audio.pause();
    PlayingSong.audio.currentTime = 0;
    setCurrentSong((prevState) => {
      if (currentSong === 0) {
        return SONG_LIST.length - 1;
      }
      return prevState - 1;
    });
  }

  // timeControl changes song time depending on where the user clicks the bar
  function timeControl(clientX, offsetLeft, clientWidth) {
    const x = clientX - offsetLeft;
    const songTime = x / clientWidth;
    PlayingSong.audio.currentTime = songTime * PlayingSong.audio.duration;
  }

  return (
    <div className={classes.player}>
      <div className={classes["cover-pic"]}>
        <img src={`${PlayingSong.cover}`} alt="song cover" />
        <p>
          {PlayingSong.name} - {PlayingSong.artist}
        </p>
        <TimeBar
          song={PlayingSong.audio}
          playing={isPlaying}
          onSongEnd={NextSong}
          onSetTime={timeControl}
          currentSong={PlayingSong}
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
    </div>
  );
}

export default MusicPlayer;
