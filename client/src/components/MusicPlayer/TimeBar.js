import { useState } from "react";
import classes from "./TimeBar.module.css";

function TimeBar(props) {
  const [time, setTime] = useState(0);
  
  // updates the bar on time update and ads an event listener
  props.currentSong.audio.addEventListener("timeupdate", () => {
    setTime(props.currentSong.audio.currentTime);
    if (props.currentSong.audio.currentTime === props.currentSong.audio.duration) {
      props.onSongEnd();
    }
  });

  // feeds the time bar info to the MusicPlayer Component
  function updateWhenClick(evt) {
    const clientX = evt.clientX;
    const offsetLeft = evt.target.offsetLeft;
    const clientWidth = evt.target.clientWidth;
    props.onSetTime(clientX, offsetLeft, clientWidth);
    setTime(props.song.currentTime);
  }

  return (
    <div className={classes["bar-container"]} onClick={updateWhenClick}>
      <div
        className={classes["bar-fill"]}
        style={{ width: `${(time / props.song.duration) * 100}%` }}
      ></div>
    </div>
  );
}

export default TimeBar;
