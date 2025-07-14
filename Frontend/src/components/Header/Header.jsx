import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>FOR HUNGRY</h2>
        <h2>
          <span className="foodies">FOODIES</span>
        </h2>
        <p>
          Choose from a menu featuring array of dishes crafted with finest
          precision and care.
        </p>
      </div>
      <div className="header-image"/>
    </div>
  );
};

export default Header;
