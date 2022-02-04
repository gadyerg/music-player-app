import { useState } from "react";
import classes from "./TimeBar.module.css";

function TimeBar(props) {
  const [time, setTime] = useState(0);
  
  // updates the bar on time update and ads an event listener
  props.currentSong.addEventListener("timeupdate", () => {
    setTime(props.currentSong.currentTime);
    if (props.currentSong.currentTime === props.currentSong.duration) {
      props.onSongEnd();
    }
  });

  // feeds the time bar info to the MusicPlayer Component
  function updateWhenClick(evt) {
    const clientX = evt.clientX;
    const offsetLeft = evt.target.offsetLeft;
    const clientWidth = evt.target.clientWidth;
    props.onSetTime(clientX, offsetLeft, clientWidth);
    setTime(props.currentSong.currentTime);
  }

  return (
    <div className={classes["bar-container"]} onClick={updateWhenClick}>
      <div
        className={classes["bar-fill"]}
        style={{ width: `${(time / props.currentSong.duration) * 100}%` }}
      ></div>
    </div>
  );
}

export default TimeBar;
