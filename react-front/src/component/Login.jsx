import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginAPICall, saveLoggedInUser, storeToken } from "../service/AuthService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      navigate('/todos');
      console.log(response.data);

      window.location.reload();
     }).catch((error) => {
      console.log(error);
     });
  }

  return (
    <div id="auth-inputs">
      <div className="controls">
        <form>
        <p>
          <label>Email</label>
          <input
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            name="name"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </p>
        <div className="actions">
        <Link className="text-button" to="/register">
          Create a new account
        </Link>

        <button className="button" onClick={(e) => handleLoginForm(e)}>
          Sign In
        </button>
      </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
