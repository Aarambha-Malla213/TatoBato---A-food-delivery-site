import React, { useContext } from "react";
import "./LogInPopUp.css";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/StoreContext";

const LogInPopUp = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = React.useState("Login");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const { loginUser } = useContext(StoreContext);

  React.useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = "hidden";
    // Restore scrolling when popup unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: formData.name || "Demo User",
      email: formData.email || "demo@example.com"
    };
    loginUser(userData);
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
          )}
          <input 
            type="email" 
            name="email"
            placeholder="Your Email" 
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
          <input 
            type="password" 
            name="password"
            placeholder="Your Password" 
            value={formData.password}
            onChange={handleInputChange}
            required 
          />
        </div>
        <button type="submit">
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
