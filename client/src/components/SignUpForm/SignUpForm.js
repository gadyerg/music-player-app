import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./SignUpForm.module.css";
import { useNavigate } from "react-router-dom";
import Error from "../Error/Error";

function SignUpForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  async function submitHandler(evt) {
    evt.preventDefault();
    const data = {
      username: evt.target[0].value,
      password: evt.target[1].value,
    };
    try {
      await axios.post("http://localhost:5000/signup", data);
      navigate("/login");
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  }

  return (
    <React.Fragment>
      <h1 className={classes.title}>Register</h1>
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button>Register</button>
      </form>
      {errorMessage && <Error message={errorMessage} />}
    </React.Fragment>
  );
}

export default SignUpForm;
