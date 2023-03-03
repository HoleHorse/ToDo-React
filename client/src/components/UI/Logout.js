import Cookies from "universal-cookie";

function Logout() {
  const cookies = new Cookies();
  function logout() {
    cookies.remove("user-session");
  }
  return (
    <a href="/login">
      <i
        className="fa-sharp fa-solid fa-right-from-bracket logout-btn"
        title="Logout"
        onClick={logout}
      ></i>
    </a>
  );
}

export default Logout;
