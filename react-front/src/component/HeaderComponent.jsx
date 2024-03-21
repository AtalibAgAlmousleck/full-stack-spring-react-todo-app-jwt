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
              <NavLink to="/todos">Todos</NavLink>
            </li>
          )}

          {isAuthenticated && (
            <li>
              <NavLink to='/login' onClick={handleLogout}>Logout</NavLink>
            </li>
          )}
          
          {!isAuthenticated && (
            <li>
              <NavLink to='/register'>Register</NavLink>
            </li>
          )}

          {!isAuthenticated && (
            <li>
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
