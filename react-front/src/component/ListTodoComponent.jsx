import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  inCompleteTodo,
} from "../service/TodoService.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAdminUser } from "../service/AuthService.js";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  const isAdmin = isAdminUser();

  useEffect(() => {
    listTodos();
  }, []);

  function listTodos() {
    getAllTodos()
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewTodo() {
    navigate("/add-todo");
  }

  function handleUpdateClick(id) {
    console.log(id);
    navigate(`/update-todo/${id}`);
  }

  function removeTodo(id) {
    deleteTodo(id)
      .then(() => {
        listTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function markCompleteTodo(id) {
    completeTodo(id)
      .then(() => {
        listTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function markInCompleteTodo(id) {
    inCompleteTodo(id)
      .then(() => {
        listTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center mt-4">List of Todos</h2>
      {isAdmin && (
        <button className="btn btn-primary mb-2" onClick={addNewTodo}>
          Add Todo
        </button>
      )}
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Todo Tile</th>
              <th>Todo Description</th>
              <th>Complete</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos  && todos.map((todo) => {
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "Yes" : "No"}</td>
                <td>
                  {isAdmin && (
                    <button
                      className="btn btn-info"
                      onClick={(e) => handleUpdateClick(todo.id)}
                    >
                      Update
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => removeTodo(todo.id)}
                    >
                      Delete
                    </button>
                  )}

                  <button
                    className="btn btn-success"
                    style={{ marginLeft: "10px" }}
                    onClick={() => markCompleteTodo(todo.id)}
                  >
                    Complete
                  </button>
                  <button
                    className="btn btn-info"
                    style={{ marginLeft: "10px" }}
                    onClick={() => markInCompleteTodo(todo.id)}
                  >
                    Incomplete
                  </button>
                </td>
              </tr>
})}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodoComponent;
