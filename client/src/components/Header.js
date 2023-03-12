import logo from "../img/logo.png";

function Header({children}) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/todo" style={{ marginTop: 20 }}>
          <img
            src={logo}
            width={70}
            style={{ marginBottom: 20 }}
            alt="Logo"
          ></img>
          <span style={{ color: "white", fontSize: 45 }}>ToDo</span>
        </a>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#content"
          aria-controls="content"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="content">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex">{children}</div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
