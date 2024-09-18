import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MuscleIcon from "../assets/muscle.svg";
import "./NavBar.css";
// import { useEffect } from "react";
// import { useState } from "react";
// import { supabase } from "../lib/supabaseClient";
import { GetPointsContext } from "../context/PointsContext";
export default function NavBar() {
  const auth = useAuth();

  const { points } = GetPointsContext();

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
<<<<<<< HEAD
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
=======
          <div className="profile-pic">
            <img
              src="../../public/default-profile-icon.png"
              alt="Profile Picture"
            />
>>>>>>> 80ff65f029231cd3fe64d2edad0c81fd5a342c05
          </div>
        </div>
      </div>
    </>
  );
}
