import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us" id="about-us">
      <p className="description">
        Tatobato brings your favorite meals straight to your doorstep with
        speed, style, and a local touch. Crafted for convenience and designed
        with love, our platform connects hungry customers to trusted restaurants
        across the city making food delivery seamless, satisfying, and just a
        tap away. Whether it's a midnight craving or a hearty family dinner,
        Tatobato is here to deliver happiness, one bite at a time.
      </p>
      <div className="credit">
        <p>In efforts of:</p>
        <div className="names">
          <span onClick={() => window.open("https://www.facebook.com/aarambha.malla", "_blank")}>
            Aarambha Bom Malla
          </span>
          <span onClick={() => window.open("https://www.facebook.com/pranjal.barnwal.39", "_blank")}>
            Pranjal Barnwal
          </span>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
