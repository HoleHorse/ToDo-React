import { useState, useRef } from "react";
import { Navigate } from "react-router-dom"

function Register() {
  const username = useRef(null);
  const password = useRef(null);
  const [state, setState] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    var user = {
      username: username.current.value,
      password: password.current.value,
    };
    fetch("http://localhost:4000/register", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => setState(data.result));
  };

  return (
    <div className="login-form">
      {state === "success" && <Navigate to={"/login"} replace={true} />}
      <form action="/register" method="post">
        <h2 className="text-center">Register</h2>
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
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </div>
        <p className="text-center">
          <a href="/login">Already have an account?</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
