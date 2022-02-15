import axios from "axios";
import classes from "./SignUpForm.module.css";

function SignUpForm() {
  function submitHandler(evt) {
    evt.preventDefault();
    const data = {
      username: evt.target[0].value,
      password: evt.target[1].value,
    };
    try {
      axios.post("http://localhost:5000/SignUp", data);
    } catch (error){
      console.log(error);
    }
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" required />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" />
      <button>Register</button>
    </form>
  );
}

export default SignUpForm;
