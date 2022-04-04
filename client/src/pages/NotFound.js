import classes from "./NotFound.module.css"

function NotFound() {
  return (
    <div>
      <h1 className={classes.title}>404</h1>
      <p className={classes.explanation}>The page you are looking for does not exist</p>
    </div>
  )
}

export default NotFound;
