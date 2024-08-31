import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const auth = useAuth()
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ backgroundColor: "#FFF5E1" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <h1>Science is Tough</h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favourites">
                  Favourites
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/quizzes">
                  Quizzes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/distract">
                  Distract Me
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/weekly">
                  {" "}
                  Weekly challenge
                </Link>
              </li>
            </ul>
            <img
              className="rewards"
              src="https://th.bing.com/th/id/OIP.fn-lQEKilSWQEAi43Y1aRAHaFj?rs=1&pid=ImgDetMain"
              style={{ height: "50px", width: "50px", marginLeft: "5px" }}
            ></img>
            <h5 style={{ marginRight: "20px", marginLeft: "10px" }}>
              <b style={{color: "black"}}>100</b>
            </h5>
            <li className="nav-item">
                <a className="nav-link" onClick={() => auth.signOut()}>
                  {" "}
                  Logout
                </a>
              </li>

            <form className="d-flex" role="search">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
