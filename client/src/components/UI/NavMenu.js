import React from "react";
import classes from "./NavMenu.module.css";
import { motion } from "framer-motion";
import { menuSlide } from "../../animations/animtions";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

function NavMenu(props) {
  const ctx = useContext(AuthContext);

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
          <li>
            <Link to="/">Home</Link>
          </li>
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
        {ctx.isLoggedIn && (
          <li>
            <Link to="/add-song">Add Song</Link>
          </li>
        )}
      </ul>
    </motion.nav>
  );
}

export default NavMenu;
