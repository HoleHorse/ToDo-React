import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../components/Header";
import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";
import cfg from "../cfg.json";
import Return from "../components/UI/Return";

function Add() {
  const [result, setResult] = useState("");
  const cookies = new Cookies();
  const title = useRef(null);
  const category = useRef(null);
  const text = useRef(null);
  const due = useRef(null);
  const state = useRef(null);
  const SecretKey = cfg.secret;
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = AES.decrypt(cookies.get("user-session"), SecretKey).toString(
      CryptoJS.enc.Utf8
    );
    var todo = {
      title: title.current.value,
      category: category.current.value,
      text: text.current.value,
      due: due.current.value,
      state: state.current.value,
      author: id,
    };
    fetch(cfg.server + "/add", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
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
              <tbody>
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
                  <td>
                    <label className="form-label">State:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="state"
                      ref={state}
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

export default Add;
