import React, { useContext, useState } from "react";
import Error from "../Error/Error";
import classes from "./LogInForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

function LogInForm() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  async function submitHandler(evt) {
    evt.preventDefault();
    const data = {
      username: evt.target[0].value,
      password: evt.target[1].value,
    };
    try {
      const match = await axios.post(
        "https://music-player-2022.herokuapp.com/login",
        data,
        {
          withCredentials: true,
        }
      );
      if (match.data.id) {
        authCtx.onLogIn(match.data);
        navigate("/");
      }
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  }

  return (
    <React.Fragment>
      <h1 className={classes.title}>Log In</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required />
        <button>Log In</button>
      </form>
      {errorMessage && <Error message={errorMessage} />}
    </React.Fragment>
  );
}

export default LogInForm;
