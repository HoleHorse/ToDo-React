import Header from "../components/UI/Header";
import { useLocation, Navigate } from "react-router-dom";

function Read() {
  var {state} = useLocation()
  if (state === null) {
    state = {
      todo: true
    }
  }
  const {todo} = state
  return (
    <>
      {todo && <Navigate to={"/todo"} replace={true}/> }
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
            <button className="btn btn-warning">
              Update
            </button>
            <button h className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Read;
