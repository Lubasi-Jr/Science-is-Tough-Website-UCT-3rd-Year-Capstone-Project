import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { supabase } from "../lib/supabaseClient";

export default function SignUp() {
  // State hooks for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const singIn = async (e) => {
    e.preventDefault();

    if (email && password.length > 0) {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      const userResponse = await supabase.auth.getUser();

      if (userResponse.data.user) {
        navigate("/");
      }
    } else {
      setErrorMsg("Fields are either empty or passwords do not match.");
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="form-container">
          <div className="form-header">
            <h3>Login</h3>
          </div>
          <form onSubmit={singIn} className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                placeholder="Enter email"
                type="email"
                name="email"
                id="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                placeholder="Enter password"
                type="password"
                name="password"
                id="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-action">
              <button type="submit" className="submit-btn">
                Login
              </button>
            </div>
            {errorMsg !== "" && (
              <p style={{ color: "red", paddingTop: "10px" }}>{errorMsg}</p>
            )}
          </form>
        </div>
        <div className="image-container">
          <img
            src="../../public/auth.jpg"
            alt="Students"
            className="students-image"
          />
        </div>
      </div>
    </>
  );
}
