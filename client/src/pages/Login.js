import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function Login() {
  const username = useRef(null);
  const password = useRef(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = (e) => {
    e.preventDefault();
    var u = {
      username: username.current.value,
      password: password.current.value,
    };
    fetch("http://localhost:4000/login", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(u),
    })
      .then((res) => res.json())
      .then((res) => setUser(res));
    cookies.set("user-session", user.password, { path: "/" });
  };
  return (
    <div className="login-form">
      {user.role === "admin"
        ? navigate("/admin", { state: { id: user._id } })
        : navigate("/todo", { state: { id: user._id } })}
      <form action="/login" method="post">
        <h2 className="text-center">Log in</h2>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Username"
            name="username"
            type={"text"}
            ref={username}
          ></input>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Password"
            name="password"
            type={"password"}
            ref={password}
          ></input>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
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
