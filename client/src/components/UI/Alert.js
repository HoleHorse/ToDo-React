function Alert({ m }) {
  return (
    <div className="alert alert-warning" style={{ maxWidth: 400 + "px" }}>
      {m}
    </div>
  );
}

function HiddenAlert() {
  return (
    <div
      className="alert alert-warning"
      style={{ maxWidth: 400 + "px", visibility: "hidden" }}
    >
      Hidden alert
    </div>
  );
}

export { Alert, HiddenAlert };
