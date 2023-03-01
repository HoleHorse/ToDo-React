function Login() {
  return (
    <div className="login-form">
      <form action="/login" method="post">
        <h2 className="text-center">Log in</h2>
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
