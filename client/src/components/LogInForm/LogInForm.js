import React, { useContext } from "react";
import classes from "./LogInForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

function LogInForm() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  async function submitHandler(evt) {
    evt.preventDefault();
    const data = {
      username: evt.target[0].value,
      password: evt.target[1].value,
    };
    try {
      const match = await axios.post("http://localhost:5000/LogIn", data, {withCredentials: true});
      if (match.data.id) {
        authCtx.onLogIn(match.data);
        navigate("/");
      }
    } catch {
      console.log("error");
    }
  }

  return (
    <React.Fragment>
      <h1 className={classes.title}>Log In</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button>Log In</button>
      </form>
    </React.Fragment>
  );
}

export default LogInForm;
