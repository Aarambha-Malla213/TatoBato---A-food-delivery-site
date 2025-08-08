import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img className="logo" src={assets.logo} />
          <p>End of the page</p>
          <div className="footer-socials">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li>About us</li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+9779865507314</li>
            <li>info@tatobato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">© 2025 TatoBato. All rights reserved.</p>
    </div>
  );
};

export default Footer;
