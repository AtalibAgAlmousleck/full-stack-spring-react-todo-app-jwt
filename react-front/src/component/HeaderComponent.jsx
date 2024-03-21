import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../service/AuthService";
import "./Header.css";

const HeaderComponent = () => {
  const isAuthenticated = isUserLoggedIn();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/logout");
  }

  return (
    <div>
      <header id="main-header">
        <nav>
          <ul>
            {isAuthenticated && (
              <li>
                <a href="/admin">
                  <NavLink to="/todos">Todos</NavLink>
                </a>
              </li>
            )}

            {isAuthenticated && (
                <li>
                {/* <form action="/logout" method="POST">
                  <button>Logout</button>
                </form> */}
                <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
              </li>
            )}
            
            {!isAuthenticated && (
                <li>
                {/* <a href="/signup">Signup</a> */}
                <NavLink to='/register'>Register</NavLink>
              </li>
            )}

            {!isAuthenticated && (
                <li>
                {/* <a href="/login">Login</a> */}
                <NavLink to='/login'>Login</NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
