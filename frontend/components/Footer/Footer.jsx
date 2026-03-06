import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        
        <div className="footer-col">
          <h3 className="footer-logo">SkillConnect</h3>
          <p>
            Connecting skilled workers with customers easily and securely.
            Find trusted professionals near you anytime.
          </p>
        </div>

        
        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            <li>Plumbing</li>
            <li>Electrician</li>
            <li>Carpenter</li>
            <li>Cleaning</li>
            <li>Painting</li>
          </ul>
        </div>

        
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Contact</li>
            <li>Support</li>
          </ul>
        </div>

       
        <div className="footer-col">
          <h4>Subscribe</h4>
          <div className="subscribe-box">
            <input type="email" placeholder="Enter email address" />
            <button>→</button>
          </div>

          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
            <FaYoutube />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 SkillConnect | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;