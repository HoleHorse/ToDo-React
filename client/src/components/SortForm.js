function SortForm({sortBy, onSortChange}) {
  function handleChange(e) {
    onSortChange(e.target.value)
  }
  return (
    <form className="input-group" style={{marginRight: 10}}>
      <select
        className="form-select"
        value={sortBy}
        onChange={handleChange}
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
        onClick={(evt) => evt.preventDefault()}
      >
        Submit
      </button>
    </form>
  );
}

export default SortForm;
