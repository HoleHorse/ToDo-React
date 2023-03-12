function Alert({ m, v }) {
  return (
    <div className="alert alert-warning" style={{ maxWidth: 400 + "px", visibility: `${v}` }}>
      {m}
    </div>
  );
}

export default Alert;
