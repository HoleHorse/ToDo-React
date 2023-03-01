function Register() {
  return (
    <div className="login-form">
      <form action="/login" method="post">
        <h2 className="text-center">Register</h2>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Username"
            name="username"
            type={"text"}
          ></input>
        </div>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Password"
            name="password"
            type={"password"}
          ></input>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
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
