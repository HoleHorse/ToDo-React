import logo from "../../img/logo.png";

function HeaderBack() {
  return (
    <nav class="navbar bg-dark">
      <div class="container">
        <a class="navbar-brand d-flex" href="/todo">
          <img
            src={logo}
            alt="Logo"
            width={75}
            class="d-inline-block align-text-top"
          />
          <span className="brand-name">ToDo</span>
        </a>
        <a href="/todo">
          <i
            style={{ fontSize: 50 }}
            class="fa-sharp fa-solid fa-rotate-left"
            title={"Go back"}
          ></i>
        </a>
      </div>
    </nav>
  );
}

export default HeaderBack;
