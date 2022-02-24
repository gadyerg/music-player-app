import classes from "./Playlist.module.css";

function Playlist(props){
  return (
    <div className={classes.info}>
      <p>{props.name}</p>
      <div className={classes.buttons}>
        <button>Edit</button>
        <button>Select</button>
      </div>
    </div>
  )
}

export default Playlist;
