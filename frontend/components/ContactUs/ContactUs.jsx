
import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-page">
      
      <div className="top-bar"></div>

      <div className="form-wrapper">
        <div className="form-card">

          <h1 className="form-title">Get in Touch</h1>
          <p className="form-subtitle">Need to get in touch With us? Please fill out this form.</p>

          <form className="contact-form">

      
            <div className="input-row">
              <div className="input-group">
                <label className="field-label">First Name</label>
                <input 
                  type="text" 
                  placeholder="Enter first name.." 
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label className="field-label">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Enter last name.." 
                  className="input-field"
                />
              </div>
            </div>

            
            <div className="input-row">
              <div className="input-group">
                <label className="field-label">Email</label>
                <input 
                  type="email" 
                  placeholder="Enter email.." 
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label className="field-label">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="Enter phone number.." 
                  className="input-field"
                />
              </div>
            </div>

       
            <div className="input-group full">
              <label className="field-label">What do you have in mind</label>
              <textarea 
                rows="5" 
                placeholder="Enter query." 
                className="input-field textarea"
              ></textarea>
            </div>

        
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>


          <div className="social-icons">
            <a href="#" className="social-icon">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
            <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
             <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;