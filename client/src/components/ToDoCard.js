function ToDoCard({ todo }) {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between">
        <h5 className="card-title">{todo.title}</h5>
        <h5 className="card-title">{todo.state}</h5>
      </div>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-muted">
          Category: {todo.category}
        </h6>
        <h6 className="card-subtitle mb-2 text-muted">Due: {todo.due}</h6>
        <p className="card-text">{todo.text}</p>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <a
          href="/edit/{{.Id}}"
          className="btn btn-warning"
          style={{ width: 80 }}
        >
          Update
        </a>
        <a
          href="/delete/{{.Id}}"
          className="btn btn-danger"
          style={{ width: 80 }}
        >
          Delete
        </a>
        <a
          href="/read/{{.Id}}"
          className="btn btn-success"
          style={{ width: 80 }}
        >
          Read
        </a>
      </div>
    </div>
  );
}

export default ToDoCard;