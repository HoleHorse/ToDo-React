import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Alert from "../components/UI/Alert";
import AES from "crypto-js/aes";
import cfg from "../cfg.json";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const cookies = new Cookies();

  function onChangeU(e) {
    setUsername(e.target.value);
  }
  function onChangeP(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var u = {
      username: username,
      password: password,
    };
    fetch(cfg.server + "/login", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(u),
    })
      .then((res) => res.json())
      .then((res) => {
        setRole(res.role);
        setResult(res);
        cookies.set(
          "user-session",
          AES.encrypt(res._id.toString(), cfg.secret).toString(),
          {
            path: "/",
            maxAge: 3600 * 3,
          }
        );
      }).catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login-form">
      {role === undefined ? (
        <Alert m={result} v={"visible"} />
      ) : (
        <Alert m={"Hidden"} v={"hidden"} />
      )}
      {role === "admin" && navigate("/admin")}
      {role === "user" && navigate("/todo")}
      <form action="/login" method="post">
        <h2 className="text-center">Log in</h2>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Username"
            type={"text"}
            onChange={onChangeU}
          ></input>
        </div>
        <div className="d-flex"></div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Password"
            type={"password"}
            onChange={onChangeP}
          ></input>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={
              username.length >= 5 && password.length >= 5 ? false : true
            }
          >
            Log in
          </button>
        </div>
        <p className="text-center">
          <a href="/register">Create an Account</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
