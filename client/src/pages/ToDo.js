import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeaderSearch from "../components/headers/HeaderSearch";
import Spinner from "../components/UI/Spinner";
import CardContainer from "../components/CardContainer";

function ToDo() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const { state } = useLocation();
  const { id } = state;

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
    }, 2000);
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
      <CardContainer todos={todos} />
    </div>
  );
}

export default ToDo;
