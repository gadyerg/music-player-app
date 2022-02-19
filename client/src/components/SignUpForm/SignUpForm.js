import React from "react";
import axios from "axios";
import classes from "./SignUpForm.module.css";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const navigate = useNavigate();

  async function submitHandler(evt) {
    evt.preventDefault();
    const data = {
      username: evt.target[0].value,
      password: evt.target[1].value,
    };
    try {
      await axios.post("http://localhost:5000/SignUp", data);
      navigate("/login");
    } catch (error) {
      console.log(error);
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
    </React.Fragment>
  );
}

export default SignUpForm;
