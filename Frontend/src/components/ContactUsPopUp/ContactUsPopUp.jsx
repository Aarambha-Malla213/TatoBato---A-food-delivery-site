import React, { useState } from "react";
import "./ContactUsPopUp.css";

const ContactUsPopUp = ({ setShowContactUs }) => {
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

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
    setIsMessageSent(true);
    
    setTimeout(() => {
      setShowContactUs(false);
    }, 2000);
  };

  return (
    <div className="contactus-popup">
      <div className="contactus-popup-container">
        <div className="contactus-popup-title">
          <h2>{isMessageSent ? "Message Sent!" : "Contact Us"}</h2>
          <span onClick={() => setShowContactUs(false)}>&times;</span>
        </div>
        
        {isMessageSent ? (
          <div className="message-sent-confirmation">
            <div className="checkmark">✓</div>
            <p>Thank you for contacting us!</p>
            <p>We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="contactus-popup-inputs">
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="text" 
                name="phone"
                placeholder="Your Phone Number" 
                value={formData.phone}
                onChange={handleInputChange}
                required 
              />
              <textarea 
                name="message"
                placeholder="Your Message" 
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactUsPopUp;
