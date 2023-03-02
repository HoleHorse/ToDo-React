import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderSearch from "../components/headers/HeaderSearch";
import Spinner from "../components/UI/Spinner";

function ToDo() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const { state } = useLocation();
  const { id } = state;
  console.log(id);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:4000/todo/" + id, {
        method: "GET",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((response) => {
          setTodos(response);
          setLoading(false);
        });
    }, 2000)
  }, [id]);

  if (loading) {
    return (
      <div>
        <HeaderSearch />
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <HeaderSearch />
      {todos.map((todo) => (
        <div>{todo.title}</div>
      ))}
    </div>
  );
}

export default ToDo;
