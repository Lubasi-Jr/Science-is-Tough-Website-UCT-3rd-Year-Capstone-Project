import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MuscleIcon from "../assets/muscle.svg";
import "./NavBar.css";
import { useEffect } from "react";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
export default function NavBar() {
  const auth = useAuth();
  const [points, setPoints] = useState(0);
  useEffect(() => {
    async function fetchStudentPoints() {
      const { data, error } = await supabase
        .from("student")
        .select("points")
        .eq("id", auth.user.id)
        .single();
      if (error) {
        console.log("Error fetching student score: ", error);
      } else {
        setPoints(data.points);
      }
    }

    fetchStudentPoints();
  }, [auth]);
  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <Link to="/">Science is Tough</Link>
        </div>
        <div className="navbar-center">
          <Link to="/">Game</Link>
          <Link to="/" onClick={() => auth.signOut()}>
            Logout
          </Link>
        </div>
        <div className="navbar-right">
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
