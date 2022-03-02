import classes from "./Playlist.module.css";

function Playlist(props){
  return (
    <div className={classes.info}>
      <p>{props.name}</p>
      <div className={classes.buttons}>
        <button className={classes.edit}>Edit</button>
        <button className={classes.select}>Select</button>
      </div>
    </div>
  )
}

export default Playlist;
