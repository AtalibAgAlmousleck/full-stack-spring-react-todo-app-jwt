import axios from "axios";

const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/auth";

export const registerAPICall = (registerObj) =>
  axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);

//login
export const loginAPICall = (usernameOrEmail, password) =>
  axios.post(AUTH_REST_API_BASE_URL + '/login', {usernameOrEmail, password});

export const storeToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');

export const saveLoggedInUser = (username, role) => {
  sessionStorage.setItem('authenticatedUser', username);
  sessionStorage.setItem('role', role);
}

// check if the user is loggedIn
export const isUserLoggedIn = () => {
  const username = sessionStorage.getItem('authenticatedUser');
  return username !== null;
};

// logout the user
export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
}

// check if the user has ROLE_ADMIN
export const isAdminUser = () => {
  let role = sessionStorage.getItem('role');
  return role != null && role === 'ROLE_ADMIN';
}