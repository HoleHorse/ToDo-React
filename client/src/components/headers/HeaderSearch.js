import logo from "../../img/logo.png"

function HeaderSearch() {
  return (
    <nav className="navbar bg-dark">
      <div className="container">
        <a className="navbar-brand d-flex" href="/todo">
          <img
            src={logo}
            alt="Logo"
            width={75}
            className="d-inline-block align-text-top"
          />
          <text>ToDo</text>
        </a>
        <div className="d-flex">
          <form action="/sort" className="d-flex" style={{ marginLeft: 10 }}>
            <div style={{ flexDirection: "column", marginRight: 10 }}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type={"radio"}
                  name={"sortType"}
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
                  name={"sortType"}
                  value="desc"
                  checked
                />
                <label style={{ fontSize: 16 }} className="form-check-label">
                  Descending
                </label>
              </div>
            </div>
            <select className="form-select" name="sort">
              <option selected>Sorting</option>
              <option value="category">Category</option>
              <option value="title">Title</option>
              <option value="state">State</option>
              <option value="due">Due</option>
              <option value="text">Text</option>
            </select>
            <button className="btn btn-outline-success" style={{marginRight: 10}}>Sort</button>
          </form>
          <form className="d-flex" action="/search" method="get">
            <input
              className="form-control"
              placeholder="Search"
              name="search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default HeaderSearch;
