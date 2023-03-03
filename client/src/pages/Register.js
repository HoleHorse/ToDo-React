import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert, HiddenAlert } from "../components/UI/Alert";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");

  function onChangeU(e) {
    setUsername(e.target.value);
  }
  function onChangeP(e) {
    setPassword(e.target.value);
  }
  function isAlert() {
    return (
      (password.length < 5 || username.length < 5) &&
      (password !== "" || username !== "")
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var user = {
      username: username,
      password: password,
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
      {isAlert() ? (
        <Alert m={"Passowrd and Username must be 5 symbols long"} />
      ) : (
        <HiddenAlert />
      )}
      <form>
        <h2 className="text-center">Register</h2>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Username"
            type={"text"}
            onChange={onChangeU}
          ></input>
        </div>
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
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
            disabled={
              username.length >= 5 && password.length >= 5 ? false : true
            }
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
