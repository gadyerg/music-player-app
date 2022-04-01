import classes from "./Error.module.css";

function Error(props) {
  return (
    <div className={classes["error-container"]}>
      <h2 className={classes["error-header"]}>Error</h2>
      <p className={classes.message}>{props.message}</p>
    </div>
  );
}

export default Error;
