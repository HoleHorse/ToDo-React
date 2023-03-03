import { useRef, useState } from "react";
import { Navigate } from "react-router-dom"
import Cookies from "universal-cookie";
import Header from "../components/UI/Header";

function Add() {
  const [result, setResult] = useState("")
  const cookies = new Cookies()
  const title = useRef(null);
  const category = useRef(null);
  const text = useRef(null);
  const due = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault()
    var todo = {
      title: title.current.value,
      category: category.current.value,
      text: text.current.value,
      due: due.current.value,
      author: cookies.get("user-session")
    };
    fetch("http://localhost:4000/add", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res.result)
      });
  };
  if (result === "success") {
    return <Navigate to={"/todo"} replace={true} />;
  }
  return (
    <>
      <Header />
      <div className="container add-card">
        <form action="/add" method="post" style={{ padding: 2 + "%" }}>
          <div className="row">
            <table>
              <tr>
                <td>
                  <label className="form-label">Title:</label>
                </td>
                <td>
                  <input
                    ref={title}
                    name="title"
                    type="text"
                    className="form-control"
                  />
                </td>
              </tr>
              <tr className="tr-border-bm">
                <td>
                  <label className="form-label">Category:</label>
                </td>
                <td>
                  <input
                    ref={category}
                    name="category"
                    type="text"
                    className="form-control"
                    style={{ marginBottom: 2 + "%", marginTop: 2 + "%" }}
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
                    ref={text}
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="form-label">Due date:</label>
                </td>
                <td>
                  <input ref={due} type="datetime-local" name="due" />
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
            </table>
          </div>
        </form>
      </div>
    </>
  );
}

export default Add;
