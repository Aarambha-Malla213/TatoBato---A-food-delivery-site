import React from "react";
import "./LogInPopUp.css";
import { assets } from "../../assets/assets.js";

const LogInPopUp = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = React.useState("Login");

  React.useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = "hidden";
    // Restore scrolling when popup unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your Name" required />
          )}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Your Password" required />
        </div>
        <button>
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-state">
          <input type="checkbox" required />
          <p>
            By continuing , I agree with the terms of use and privacy policy.
          </p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LogInPopUp;
