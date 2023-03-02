import logo from '../img/logo.png';

function Landing() {
  return (
    <div className="landing-group">
      <img src={logo} alt="Logo" width={356}></img>
      <h1 style={{fontSize: 4+"vh"}}>Set, keep track and acheve your goals with us!</h1>
      <a href="/login" className="btn btn-dark">
        Get started
      </a>
    </div>
  );
}

export default Landing;
