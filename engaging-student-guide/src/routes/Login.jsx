import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";
import { supabase } from "../lib/supabaseClient";
/* Login component for handling user login functionality.
  Allows users to input their email and password, validates the form,
  and submits the data to the Supabase authentication system.
 */

export default function Login() {
  // State hooks for form inputs and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
/*
    Validates the form fields to ensure that the email and password
    inputs are correctly formatted before submission.
   */

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email.");
      isValid = false;
    } else {
      setEmailError(""); // Clear error if valid
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError(""); // Clear error if valid
    }

    return isValid;
  };
  /*Handles the form submission for logging in the user.
   First, it validates the form and then sends the login request to Supabase.
   If the login is successful, it navigates the user to the home page.
   Otherwise, displays an error message if login fails.
   */

  const signIn = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorMsg(error.message); // Display error from Supabase
      return;
    }

    const userResponse = await supabase.auth.getUser();

    if (userResponse.data.user) {
      navigate("/");
    }
  };
{/*Login container*/}
  return (
    <>
      <div className="signup-container">
        <div className="form-container">
          <div className="form-header">
            <h3>Login</h3>
          </div>
          <form onSubmit={signIn} className="form">
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
              {emailError && (
                <p style={{ color: "red", paddingTop: "5px" }}>{emailError}</p>
              )}
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
              {passwordError && (
                <p style={{ color: "red", paddingTop: "5px" }}>{passwordError}</p>
              )}
            </div>

            <div className="form-action">
              <button type="submit" className="submit-btn">
                Login
              </button>
              <span className="signup">Don&apos;t have an account? </span>
              <Link className="signup" to={"/signup"}>
                Signup
              </Link>
            </div>
            {errorMsg && (
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
