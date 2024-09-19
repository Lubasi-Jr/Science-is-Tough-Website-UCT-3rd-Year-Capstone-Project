import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MuscleIcon from "../assets/muscle.svg";
import "./NavBar.css";
import { GetPointsContext } from "../context/PointsContext";
export default function NavBar() {
  const auth = useAuth();

  const { points } = GetPointsContext();
/*creates navbar on top of webpage which has a logout options,amount of points and profile picture*/

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <Link to="/">Science is Tough</Link>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-right">
          <Link to="/" onClick={() => auth.signOut()}>
            Logout
          </Link>
          <div className="icon-text">
            <img className="muscle-icon" src={MuscleIcon} alt="muscle icon" />
            <p className="first">{points}</p>
            <p className="second">pts</p>
          </div>
          <div className="profile-pic">
            <img
              src="../../public/default-profile-icon.png"
              alt="Profile Picture"
            />
          </div>
        </div>
      </div>
    </>
  );
}
