function ValidMessage({m, color}) {
  return (
    <p
      style={{ textAlign: "start", marginLeft: 15 + "px", color: color, display: "flex", marginBottom: 0}}
    >
      {m}
    </p>
  );
}

export default ValidMessage;
