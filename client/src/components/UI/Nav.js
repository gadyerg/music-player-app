import React, { useState } from "react";
import classes from "./Nav.module.css";
import NavMenu from "./NavMenu";
import { AnimatePresence, motion } from "framer-motion";

function Nav(props) {
  const [menuState, setMenuState] = useState(false);

  function toggleMenu() {
    setMenuState(!menuState);
  }

  return (
    <div className={classes["nav-container"]}>
      <AnimatePresence>
        {menuState && <NavMenu playlistPopUp={props.toggleCreatePlayList} />}
      </AnimatePresence>
      <motion.button isvisible={`${menuState}`} onClick={toggleMenu}>
        &#8801;
      </motion.button>
    </div>
  );
}

export default Nav;
