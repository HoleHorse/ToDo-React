import { useRef } from "react";

function Register() {
  const username = useRef(null);
  const password = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    var user = {
      "username": username.current.value,
      "password": password.current.value,
    };
    fetch("http://localhost:4000/register", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(user),
    });
  };

  return (
    <div className="login-form">
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
