import axios from "axios";
import { getToken } from "./AuthService";

const BASE_REST_API_URL = "http://localhost:8080/api/todos";

// adding the request interceptor
axios.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// connect the frontend to the backend!
export const getAllTodos = () => axios.get(BASE_REST_API_URL);

export const saveTodo = () => axios.post(BASE_REST_API_URL, todo);

export const getTodo = (id) => axios.get(BASE_REST_API_URL + "/" + id);

export const updateTodo = (id, todo) =>
  axios.put(BASE_REST_API_URL + "/" + id, todo);

export const deleteTodo = (id) => axios.delete(BASE_REST_API_URL + "/" + id);

export const completeTodo = (id) =>
  axios.patch(BASE_REST_API_URL + "/" + id + "/complete");

export const inCompleteTodo = (id) =>
  axios.patch(BASE_REST_API_URL + "/" + id + "/incomplete");
