import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/UI/Header";
import Spinner from "../components/UI/Spinner";
import CardContainer from "../components/CardContainer";
import Logout from "../components/UI/Logout";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";

function ToDo() {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  var { state } = useLocation();
  if (state === null) {
    state = {
      id: 0,
    };
  }

  useEffect(() => {
    fetch("http://localhost:4000/todo/" + state.id, {
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
  }, [state]);
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
      <CardContainer todos={todos} />
      <Logout />
    </>
  );
}

export default ToDo;
