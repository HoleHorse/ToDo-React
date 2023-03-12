import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Alert from "../components/UI/Alert";
import ValidMessage from "../components/UI/ValidMessage";
import SmallSpinner from "../components/UI/SmallSpinner";
import cfg from "../cfg.json";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [valid, setValid] = useState("");
  const [loading, setLoading] = useState(false);
  const userRef = useRef(null);
  const [timer, setTimer] = useState(null);

  function onChangeU(e) {
    setUsername(e.target.value);
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setLoading(true);
        fetch(cfg.server + "/validate/" + userRef.current.value, {
          method: "POST",
          mode: "cors",
        })
          .then((res) => res.json())
          .then((data) => {
            setValid(data);
            setLoading(false);
          });
      }, 750)
    );
    setLoading(true);
  }
  function onChangeP(e) {
    setPassword(e.target.value);
  }
  function notFull() {
    return (
      (password.length < 5 || username.length < 5) &&
      (password !== "" || username !== "")
    );
  }
  function notValid() {
    return valid === "Username already occupied!";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    var user = {
      username: username,
      password: password,
    };
    fetch(cfg.server + "/register", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setState(data);
      });
  };

  return (
    <div className="login-form">
      {state === "success" && <Navigate to={"/login"} replace={true} />}
      {notFull() ? (
        <Alert
          m={"Passowrd and Username must be 5 symbols long"}
          v={"visible"}
        />
      ) : (
        <Alert m={"Hidden"} v={"hidden"} />
      )}
      <form>
        <h2 className="text-center">Register</h2>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Username"
            type={"text"}
            onChange={onChangeU}
            ref={userRef}
            autoComplete="off"
          ></input>
        </div>
        <div className="d-flex" style={{ margin: 0, padding: 0 }}>
          {notValid() ? (
            <ValidMessage m={valid} color={"red"} />
          ) : (
            <ValidMessage m={valid} color={"#10cc42"} />
          )}
          {loading && <SmallSpinner />}
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
              username.length < 5 || password.length < 5 || notValid()
                ? true
                : false
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
