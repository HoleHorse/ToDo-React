import Header from "../components/UI/Header";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function Read() {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  function clickE() {
    setEdit(true);
  }
  var { state } = useLocation();
  if (state === null) {
    state = {
      todo: 0,
    };
  }
  const { todo } = state; 
  return (
    <>
      {todo === 0 && <Navigate to={"/todo"} replace={true} />}
      {edit && navigate("/edit", { state: { todo: todo } })}
      <Header />
      <div className="d-flex justify-content-center">
        <div className="card read-card">
          <div className="card-header d-flex justify-content-between">
            <h5 className="card-title">{todo.title}</h5>
            <h5 className="card-title text-primary">{todo.state}</h5>
          </div>
          <div className="card-body">
            <h6 className="card-subtitle mb-2 text-muted">
              Category: {todo.category}
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">Due: {todo.due}</h6>
            <p className="card-text">{todo.text}</p>
          </div>
          <div className="card-footer">
            <button onClick={clickE} className="btn btn-warning">
              Update
            </button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Read;
