import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ ADDED
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
  const navigate = useNavigate(); // ✅ ADDED

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = currentState === "Sign Up" 
        ? "http://localhost:8000/api/register/" 
        : "http://localhost:8000/api/login/";

      const response = await axios.post(endpoint, formData);
      console.log("Response:", response.data);

      // ✅ Set user context
      const name = response.data.name || formData.name;
      loginUser({ name, email: formData.email });

      setShowLogin(false);
      navigate("/profile"); // ✅ Redirect to profile page

    } catch (error) {
      console.error("Error submitting form:", error);

      if (error.response) {
        if (error.response.status === 404) {
          alert("Oops! No user found with this email. Please sign up first.");
        } else if (error.response.status === 401) {
          alert("Incorrect email or password. Please try again.");
        } else {
          alert("Oops! Something went wrong on our side. Please try again later.");
        }
      } else {
        alert("Unable to connect to the server. Please check your internet and try again.");
      }
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
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
            By continuing, I agree with the terms of use and privacy policy.
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
