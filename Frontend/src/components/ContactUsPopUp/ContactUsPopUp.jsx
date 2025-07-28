import React from "react";
import "./ContactUsPopUp.css";

const ContactUsPopUp = ({ setShowContactUs }) => {
  React.useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = "hidden";
    // Restore scrolling when popup unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send email
    alert("Email sent successfully!");
    setShowContactUs(false);
  };

  return (
    <div className="contactus-popup">
      <form className="contactus-popup-container" onSubmit={handleSubmit}>
        <div className="contactus-popup-title">
          <h2>Contact Us</h2>
          <span onClick={() => setShowContactUs(false)}>&times;</span>
        </div>
        <div className="contactus-popup-inputs">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Your Phone Number" required />
          <textarea placeholder="Your Message" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ContactUsPopUp;
