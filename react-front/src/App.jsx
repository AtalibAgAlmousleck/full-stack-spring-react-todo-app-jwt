import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Registration from "./component/Registration.jsx";
import Login from './component/Login.jsx';
import { isUserLoggedIn } from "./service/AuthService.js";
import ListTodoComponent from "./component/ListTodoComponent.jsx";
import TodoComponent from "./component/TodoComponent.jsx";
import HeaderComponent from "./component/HeaderComponent.jsx";

function App() {

  function AuthenticatedRoute({ children }) {
    const isAuthenticated = isUserLoggedIn();
    if (isAuthenticated) {
      return children;
    } else {
      return <Navigate to='/' />
    }
  }

  return (
    <>
      <BrowserRouter>
      <HeaderComponent />
        <Routes>
          {/*http://localhost:8080*/}
          <Route path="/" element={<Login />} />

          {/*http://localhost:8080/todos*/}
          <Route path="/todos" element={
            <AuthenticatedRoute>
              <ListTodoComponent />
            </AuthenticatedRoute>
          } />

          {/*http://localhost:8080/add-todo*/}
          <Route path="/add-todo" element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          } />

          {/*http://localhost:8080/update-todo/1*/}
          <Route path="/update-todo/:id" element={
            <AuthenticatedRoute>
              <TodoComponent />
            </AuthenticatedRoute>
          } />
          

          {/*http://localhost:8080/register*/}
          <Route path="/register" element={<Registration />} />
          {/*http://localhost:8080/login*/}
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
