import React from "react";
import classes from "./NavMenu.module.css";
import { motion } from "framer-motion";
import { menuSlide } from "../../animations/animtions";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

function NavMenu(props) {
  const ctx = useContext(AuthContext);
  
  async function logOut() {
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
              <Link to="/Playlists">Playlists</Link>
            </li>
            <li>
              <button onClick={logOut}>Log Out</button>
            </li>
          </React.Fragment>
        )}
        {!ctx.isLoggedIn && (
          <React.Fragment>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </motion.nav>
  );
}

export default NavMenu;
