import logo from "../../img/logo.png";

function Header() {
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
          <form className="d-flex">
            <div style={{ flexDirection: "column", marginRight: 10 }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type={"radio"}
                  value="asc"
                  name="sortType"
                  defaultChecked
                />
                <label style={{ fontSize: 16 }} className="form-check-label">
                  Ascending
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type={"radio"}
                  value="desc"
                  name="sortType"
                />
                <label style={{ fontSize: 16 }} className="form-check-label">
                  Descending
                </label>
              </div>
            </div>
            <select
              className="form-select"
              style={{
                width: 100 + "%",
                height: 40,
                marginTop: 5,
              }}
            >
              <option defaultValue={true}>Sort by</option>
              <option value="category">Category</option>
              <option value="title">Title</option>
              <option value="state">State</option>
              <option value="due">Due</option>
              <option value="text">Text</option>
            </select>
            <button
              className="btn btn-outline-success"
              style={{
                marginRight: 10,
                height: 40,
                marginTop: 5,
              }}
              onClick={(evt) => evt.preventDefault()}
            >
              Submit
            </button>
          </form>
          <form className="d-flex" style={{ marginBottom: 10 }}>
            <input
              className="form-control"
              placeholder="Search"
              style={{ height: 5, marginTop: 5 }}
            />
            <button
              className="btn btn-outline-success"
              style={{ height: 5, marginTop: 5, marginRight: 10 }}
              onClick={(evt) => evt.preventDefault()}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
