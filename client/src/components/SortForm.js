function SortForm() {
  return (
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
  );
}

export default SortForm;
