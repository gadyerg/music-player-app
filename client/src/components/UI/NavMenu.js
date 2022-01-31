import classes from "./NavMenu.module.css";
import { motion } from "framer-motion";
import { menuSlide } from "../../animations/animtions";
import { Link } from 'react-router-dom'

function NavMenu() {
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
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/add-song'>Add Song</Link></li>
      </ul>
    </motion.nav>
  );
}

export default NavMenu;
