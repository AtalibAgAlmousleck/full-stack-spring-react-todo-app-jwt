import { useState } from "react";
import "./Login.css";
import { registerAPICall } from "../service/AuthService.js";
import {  Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // handle registration form
  const handleRegistrationForm = function (e) {
    e.preventDefault();
    const register = { name, username, email, password };

    registerAPICall(register)
      .then((response) => {
        console.log(response.data);
        //todo: navigate to the home page
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //function handle submit & input changes
  const handleInputChange = function (identier, value) {
    if (identier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  };

  // validation input
  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  const handleLogin = function () {
    setSubmitted(true);
  };
  return (
    <div id="auth-inputs">
      <div className="controls">
        <p>
          <label>Name</label>
          <input
            type="text"
            name="name"
            // className={emailNotValid ? "invalid" : undefined}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>
        <p>
          <label>Username</label>
          <input
            type="text"
            name="name"
            // className={emailNotValid ? "invalid" : undefined}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label>Email</label>
          <input
            type="email"
            name="name"
            // className={emailNotValid ? "invalid" : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            name="name"
            // className={passwordNotValid ? "invalid" : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
      </div>
      <div className="actions">
          <Link className="text-button" to='/login'>Have an account ? SignIn</Link>
        <button
          type="submit"
          className="button"
          onClick={(e) => handleRegistrationForm(e)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Registration;
