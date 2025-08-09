import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoggedIn, searchMenuItems, clearSearch } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchMenuItems(searchQuery.trim());
      navigate('/search');
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  const handleSearchIconClick = async () => {
    if (showSearch && searchQuery.trim()) {
      await searchMenuItems(searchQuery.trim());
      navigate('/search');
    } else {
      setShowSearch((prev) => !prev);
      if (!showSearch) {
        clearSearch();
      }
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={assets.logo} alt="Logo" />
      </Link>

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
          href="#about-us"
          onClick={() => setMenu("about-us")}
          className={menu === "about-us" ? "active" : ""}
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

      <div className="navbar-right">
        <div className={`navbar-search-container ${showSearch ? "show" : ""}`}>
          <input
            type="text"
            placeholder="Search for food, restaurants, etc."
            className="navbar-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            autoFocus={showSearch}
          />
        </div>

        <img
          src={assets.search_icon}
          alt="Search"
          className="icon-button"
          onClick={handleSearchIconClick}
        />

        {isLoggedIn && (
          <Link to="/cart" className="navbar-cart">
            <img src={assets.basket_icon} alt="Cart" />
            <div className="dot" />
          </Link>
        )}
        {isLoggedIn ? (
          <Link 
            to="/profile" 
            className="profile-link"
            onClick={() => setMenu("profile")}
          >
            <img src={assets.profile_icon} alt="Profile" className="profile-icon" />
          </Link>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
