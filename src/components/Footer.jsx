import React from 'react';
import logo from '../assets/VisibeenLogo.png';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <img src={logo} alt="Visibeen" className="footer-logo" />
          <p>Copyright © 2024 ezeu digitech pvt ltd.<br />All rights reserved.</p>
          <div className="footer-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <strong>Company</strong><br />
            About us<br />
            Blog<br />
            Contact us<br />
            Pricing<br />
            Testimonials
          </div>
          <div className="footer-col">
            <strong>Support</strong><br />
            Help center<br />
            Terms of service<br />
            Legal<br />
            Privacy policy<br />
            Status
          </div>
          <div className="footer-col">
            <strong>Stay up to date</strong><br />
            <input type="email" placeholder="Your email address" />
            <button className="send-btn">→</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;