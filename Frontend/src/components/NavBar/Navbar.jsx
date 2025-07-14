import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";



const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <img src={assets.logo} alt="Logo" />
      </Link>

      {/* Navigation Menu */}
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          HOME
        </Link>
        <a
          href="#menu"
          onClick={() => setMenu("restaurants")}
          className={menu === "restaurants" ? "active" : ""}
        >
          RESTAURANTS
        </a>
        <a
          href="#about"
          onClick={() => setMenu("about")}
          className={menu === "about" ? "active" : ""}
        >
          ABOUT US
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact")}
          className={menu === "contact" ? "active" : ""}
        >
          CONTACT
        </a>
      </ul>

      {/* Right Side */}
      <div className="navbar-right">
        <div className={`navbar-search-container ${showSearch ? "show" : ""}`}>
          <input
            type="text"
            placeholder="Search for food, restaurants, etc."
            className="navbar-search"
            autoFocus={showSearch}
          />
        </div>

        <img
          src={assets.search_icon}
          alt="Search"
          className="icon-button"
          onClick={() => setShowSearch((prev) => !prev)}
        />

        <Link to="/cart" className="navbar-cart">
          <img src={assets.basket_icon} alt="Cart" />
          <div className="dot" />
        </Link>
        {console.log("setShowLogin type:", typeof setShowLogin)}
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
