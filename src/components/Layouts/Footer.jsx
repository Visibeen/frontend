import React from 'react';
import logo from '../../assets/VisibeenLogo.png';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <img src={logo} alt="Visibeen" className="footer-logo" />
          <p>Copyright © 2025 e2e digitech pvt ltd.<br />All rights reserved</p>
          <div className="footer-icons">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-columns">
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Help center</a></li>
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Legal</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>
          <div className="footer-col newsletter">
            <h3>Stay up to date</h3>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="send-btn" aria-label="Subscribe">→</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;