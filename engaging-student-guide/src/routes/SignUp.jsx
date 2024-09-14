import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";
import { supabase } from "../lib/supabaseClient";

export default function SignUp() {
  // State hooks for form inputs
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [studentYear, setStudentYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isInternational, setIsInternational] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();

    if (
      email &&
      name &&
      password.length > 0 &&
      password === confirmPassword &&
      studentYear !== ""
    ) {

        const { error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                }
            }
          });
      
          if (error) {
            setErrorMsg(error.message);
            return;
          }


      const userResponse = await supabase.auth.getUser();

      if (userResponse.data.user) {
        const student = {
          id: userResponse.data.user.id,
          name: name,
          email: email,
          year: studentYear,
          isInternational: isInternational,
          points: 20,
          level: "Beginner",
        };

        const { error } = await supabase.from("student").insert(student);
        if (error === null) {
          navigate("/");
        } else {
          setErrorMsg("Error inserting student data.");
          console.log("Error inserting data ",error.details);
          return
          
        }
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
            <h3>Sign up</h3>
          </div>
          <form onSubmit={signUp} className="form">
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
              <label htmlFor="name">Name</label>
              <input
                placeholder="Enter name"
                name="name"
                id="name"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentYear">What year are you in?</label>
              <select
                id="studentYear"
                className="select-field"
                value={studentYear}
                onChange={(e) => setStudentYear(e.target.value)}
              >
                <option disabled value="">
                  Select year
                </option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={isInternational}
                  onChange={(e) => setIsInternational(e.target.checked)}
                />
                Are you an international student?
              </label>
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
            <div className="form-group">
              <label htmlFor="confpassword">Confirm Password</label>
              <input
                placeholder="Confirm password"
                type="password"
                name="confpassword"
                id="confpassword"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-action">
              <button type="submit" className="submit-btn">
                Create Account
              </button>
              <span className="signup">Already have an account? </span><Link className="signup" to={"/login"}>Login</Link>

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
