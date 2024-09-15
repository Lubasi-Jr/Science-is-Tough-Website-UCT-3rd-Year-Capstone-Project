import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MuscleIcon from "../assets/muscle.svg";
import "./NavBar.css"
export default function NavBar() {
  const auth = useAuth()
  return (
    <>
      <div className="navbar">
          <div className="navbar-left">
            <Link to="/">Science is Tough</Link>
          </div>
          <div className="navbar-center">
            
            
          </div>
          <div className="navbar-right">
          <Link to="/"  onClick={() => auth.signOut()}>Logout</Link>
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
