import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginAPICall, saveLoggedInUser, storeToken } from "../service/AuthService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  //handle login
  async function handleLoginForm(e) {
    e.preventDefault();

    await loginAPICall(username, password)
     .then((response) => {
      console.log(response.data);

      const token = 'Bearer ' + response.data.accessToken;
      const role = response.data.role;

      storeToken(token);
      saveLoggedInUser(username, role);
      //todo: redirect to the welcome page:
      navigate('/register');

      window.location.reload();
     }).catch((error) => {
      console.log(error);
     });
  }

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
          <label>Email</label>
          <input
            type="email"
            name="name"
            // className={emailNotValid ? "invalid" : undefined}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            name="name"
            // className={passwordNotValid ? "invalid" : undefined}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </p>
      </div>
      <div className="actions">
        <Link className="text-button" to="/register">
          Create a new account
        </Link>

        <button type="submit" className="button" onClick={(e) => handleLoginForm(e)}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
