import { useState, useEffect } from "react";
import Header from "../components/Header";
import Spinner from "../components/UI/Spinner";
import ToDoContainer from "../components/ToDoContainer";
import Logout from "../components/UI/Logout";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import AddBtn from "../components/UI/AddBtn";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import cfg from "../cfg.json";
import SearchForm from "../components/SearchForm";
import SortForm from "../components/SortForm";

function ToDo() {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const id = AES.decrypt(cookies.get("user-session"), cfg.secret).toString(
    CryptoJS.enc.Utf8
  );

  useEffect(() => {
    fetch(cfg.server + "/todo/" + id, {
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
        <Header>
          <SortForm />
          <SearchForm />
        </Header>
        <Spinner />
        <Logout />
      </div>
    );
  }
  return (
    <>
      <Header>
        <SortForm />
        <SearchForm />
      </Header>
      <ToDoContainer todos={todos} />
      <Logout />
      <AddBtn />
    </>
  );
}

export default ToDo;
