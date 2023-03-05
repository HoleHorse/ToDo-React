import { useState, useEffect } from "react";
import Header from "../components/UI/Header";
import Spinner from "../components/UI/Spinner";
import ToDoContainer from "../components/ToDoContainer";
import Logout from "../components/UI/Logout";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import AddBtn from "../components/UI/AddBtn";

function ToDo() {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const id = cookies.get("user-session");

  useEffect(() => {
    fetch("http://localhost:4000/todo/" + id, {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response !== null) {
          setTodos(response);
        }
        setLoading(false);
      });
  }, [id]);
  if (cookies.get("user-session") === undefined) {
    return <Navigate to={"/login"} replace={true} />;
  }
  if (loading) {
    return (
      <div>
        <Header />
        <Spinner />
        <Logout />
      </div>
    );
  }
  return (
    <>
      <Header />
      <ToDoContainer todos={todos} />
      <Logout />
      <AddBtn />
    </>
  );
}

export default ToDo;
