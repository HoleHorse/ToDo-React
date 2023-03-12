function SearchForm({searchBy, onSearchChange}) {
  return (
    <form className="input-group">
      <input
        className="form-control"
        placeholder="Search"
        value={searchBy}
        onChange={onSearchChange}
      />
      <button
        className="btn btn-outline-success"
        onClick={(evt) => evt.preventDefault()}
      >
        Submit
      </button>
    </form>
  );
}

export default SearchForm;
