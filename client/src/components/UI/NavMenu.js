import React from "react";
import classes from "./NavMenu.module.css";
import { motion } from "framer-motion";
import { menuSlide } from "../../animations/animtions";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import SongContext from "../../store/song-context";
import { useContext } from "react";

function NavMenu(props) {
  const ctx = useContext(AuthContext);
  const songCtx = useContext(SongContext);

  async function logOut() {
    songCtx.changeSongList([{}]);
    await ctx.onLogOut();
    props.close();
  }

  return (
    <motion.nav
      className={classes.nav}
      initial="initial"
      animate="slideIn"
      exit="slideOut"
      key="menu"
      variants={menuSlide}
    >
      <ul>
        {ctx.isLoggedIn && (
          <React.Fragment>
            <li onClick={props.close}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={props.close}>
              <Link to="/add-song">Add Song</Link>
            </li>
            <li onClick={props.close}>
              <Link to="/playlists">Playlists</Link>
            </li>
            <li>
              <button className={classes.logout} onClick={logOut}>
                Log Out
              </button>
            </li>
          </React.Fragment>
        )}
        {!ctx.isLoggedIn && (
          <React.Fragment>
            <li onClick={props.close}>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li onClick={props.close}>
              <Link to="/login">Log In</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </motion.nav>
  );
}

export default NavMenu;
