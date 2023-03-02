import logo from "../../img/logo.png";

function HeaderSearch() {
  function handleSort(e) {
    e.preventDefault()
  }
  function handleSearch(e) {
    e.preventDefault()
  }
  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <div className="row">
          <a className="navbar-brand d-flex col-lg-3" href="/todo">
            <img
              src={logo}
              alt="Logo"
              width={75}
              className="d-inline-block align-text-top"
            />
            <span style={{ fontSize: 50, color: "white" }}>ToDo</span>
          </a>
          <form
            className="d-flex col-lg-4"
            style={{ marginLeft: 10, marginTop: 25 }}
          >
            <div style={{ flexDirection: "column", marginRight: 10 }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type={"radio"}
                  value="asc"
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
                  defaultChecked
                />
                <label style={{ fontSize: 16 }} className="form-check-label">
                  Descending
                </label>
              </div>
            </div>
            <select
              className="form-select"
              style={{ height: 40, marginTop: 3 }}
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
                width: 100 + "px",
                marginRight: 10,
                height: 40,
                marginTop: 3,
              }}
              onClick={handleSort}
            >
              Sort
            </button>
          </form>
          <form
            className="d-flex col-lg-4"
            style={{ marginTop: 25, paddingBottom: 25 }}
          >
            <input
              className="form-control"
              placeholder="Search"
              style={{ height: 5, marginTop: 3 }}
            />
            <button
              className="btn btn-outline-success"
              style={{ height: 5, marginTop: 3 }}
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default HeaderSearch;
