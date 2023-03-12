import { useNavigate } from "react-router-dom";
import { useState } from "react";
import cfg from "../cfg.json";

function ToDoCard({ todo }) {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [read, setRead] = useState(false);
  const [edit, setEdit] = useState(false);
  function clickR() {
    setRead(true);
  }
  function clickE() {
    setEdit(true);
  }
  const handleDelete = () => {
    fetch(cfg.server + "/delete/" + todo._id, {
      method: "POST",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
      });
  };
  if (result === "success") {
    return navigate("/todo");;
  }
  return (
    <>
      {read && navigate("/read", { state: { todo: todo } })}
      {edit && navigate("/edit", { state: { todo: todo } })}
      <div className="card todo-card">
        <div className="card-header d-flex justify-content-between">
          <h5 className="card-title">{todo.title}</h5>
          <h5 className="card-title text-primary">{todo.state}</h5>
        </div>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">
            Category: {todo.category}
          </h6>
          <h6 className="card-subtitle mb-2 text-muted">Due: {todo.due}</h6>
          <p className="card-text">{todo.text.slice(0, 100) + "..."}</p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button
            onClick={clickE}
            className="btn btn-warning"
            style={{ width: 80 }}
          >
            Update
          </button>
          <button onClick={handleDelete} className="btn btn-danger" style={{ width: 80 }}>
            Delete
          </button>
          <button
            onClick={clickR}
            className="btn btn-success"
            style={{ width: 80 }}
          >
            Read
          </button>
        </div>
      </div>
    </>
  );
}

export default ToDoCard;
