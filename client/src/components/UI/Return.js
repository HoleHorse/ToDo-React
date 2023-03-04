import { useNavigate } from "react-router-dom";

function Return() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)}>
      <i
        className="fa-sharp fa-solid fa-rotate-left logout-btn"
        title="Go back"
      ></i>
    </button>
  );
}

export default Return;
