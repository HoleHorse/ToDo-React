function SearchForm() {
  return (
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
  );
}

export default SearchForm;
