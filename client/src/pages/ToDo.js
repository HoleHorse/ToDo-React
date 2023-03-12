import { useState, useEffect, useMemo } from "react";
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
import PaginationControls from "../components/UI/PaginationControls";

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

  const memoizedTodos = useMemo(() => todos, [todos]);

  const [searchBy, setSeacrhBy] = useState("");
  const [sortBy, setSortBy] = useState("title");

  function onSearchChange(e) {
    setSeacrhBy(e.target.value);
  }

  function onSortChange(value) {
    setSortBy(value);
  }

  const filteredData = useMemo(() => {
    var data = memoizedTodos
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(searchBy.toLowerCase()) ||
          item.category.toLowerCase().includes(searchBy.toLowerCase()) ||
          item.text.toLowerCase().includes(searchBy.toLowerCase()) ||
          item.state.toLowerCase().includes(searchBy.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (sortBy === "due") {
          return a.due.localeCompare(b.due);
        } else if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        } else if (sortBy === "category") {
          return a.category.localeCompare(b.category);
        } else if (sortBy === "text") {
          return a.text.localeCompare(b.text);
        } else if (sortBy === "text") {
          return a.text.localeCompare(b.text);
        } else {
          return 0;
        }
      });
    return data;
  }, [memoizedTodos, searchBy, sortBy]);

  const [currentPage, setCurrentPage] = useState(1);
  const ipp = 6; // items per page
  const n = Math.ceil(filteredData.length / ipp);

  function onPageChange(i) {
    setCurrentPage(i);
  }

  if (cookies.get("user-session") === undefined) {
    return <Navigate to={"/login"} replace={true} />;
  }
  if (loading) {
    return (
      <div>
        <Header>
          <SortForm sortBy={sortBy} onSortChange={onSortChange} />
          <SearchForm searchBy={searchBy} onSearchChange={onSearchChange} />
        </Header>
        <Spinner />
        <Logout />
      </div>
    );
  }
  return (
    <>
      <Header>
        <SortForm sortBy={sortBy} onSortChange={onSortChange} />
        <SearchForm searchBy={searchBy} onSearchChange={onSearchChange} />
      </Header>
      <ToDoContainer
        todos={filteredData.slice(
          (currentPage - 1) * ipp,
          (currentPage - 1) * ipp + ipp
        )}
      />
      <Logout />
      <AddBtn />
      {n > 1 && <PaginationControls n={n} onPageChange={onPageChange} />}
    </>
  );
}

export default ToDo;
