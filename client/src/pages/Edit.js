import { useState } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Return from "../components/UI/Return";
import cfg from "../cfg.json";

function Edit() {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  var { state } = useLocation();
  if (state === null) {
    state = {
      todo: 0,
    };
  }
  const { todo } = state;
  const [Todo, setTodo] = useState({
    title: todo.title,
    category: todo.category,
    text: todo.text,
    due: todo.due,
    state: todo.state,
  });
  function handleChange(e) {
    const value = e.target.value;
    setTodo({
      ...Todo,
      [e.target.name]: value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    var t = {
      title: Todo.title,
      category: Todo.category,
      text: Todo.text,
      due: Todo.due,
      state: Todo.state,
    };
    fetch(cfg.server + "/edit/" + todo._id, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(t),
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
      });
  };
  if (result === "success") {
    return navigate(-1);
  }
  return (
    <>
      {todo === 0 && <Navigate to={"/todo"} replace={true} />}
      <Header />
      <div className="container add-card">
        <form action="/add" method="post" style={{ padding: 2 + "%" }}>
          <div className="row">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label className="form-label">Title:</label>
                  </td>
                  <td>
                    <input
                      name="title"
                      type="text"
                      className="form-control"
                      value={Todo.title}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="tr-border-bm">
                  <td>
                    <label className="form-label">Category:</label>
                  </td>
                  <td>
                    <input
                      name="category"
                      type="text"
                      className="form-control"
                      style={{ marginBottom: 2 + "%", marginTop: 2 + "%" }}
                      value={Todo.category}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="form-label">Text:</label>
                  </td>
                  <td>
                    <textarea
                      style={{ marginTop: 2 + "%" }}
                      className="form-control"
                      name="text"
                      rows="10"
                      onChange={handleChange}
                      value={Todo.text}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="form-label">Due date:</label>
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      name="due"
                      value={Todo.due}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="form-label">State:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="state"
                      value={Todo.state}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{ textAlign: "right" }}>
                    <button onClick={handleSubmit} className="btn btn-success">
                      Submit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
      <Return />
    </>
  );
}

export default Edit;
