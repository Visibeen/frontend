import React from 'react';
import './PurchaseLogo.css';
import visibenLogo from './VISIBEN.svg';

const PurchaseLogo = () => (
  <>
    <div className="header">
      <div className="header-content">
        <img src={visibenLogo} alt="VISIBEEN Logo" className="logo" />
        <div className="nav">
          <a href="#">Change design</a>
          <div className="dropdown">
            <a href="#">Upload logo</a>
            <div className="dropdown-content">
              <a href="#">Have a logo</a>
              <a href="#">Don't have a logo</a>
            </div>
          </div>
          <a href="#">My profile</a>
          <a href="#">Logout</a>
        </div>
      </div>
    </div>

    <div className="main-section center">
              <img src={visibenLogo} alt="VISIBEEN Logo" className="main-logo" />
      <div className="welcome">Welcome</div>
      <div className="company">E2E Digitech Pvt Ltd</div>
    </div>

    <div className="purchase-section center">
      <div className="purchase-title">Purchase logo</div>
      <div className="purchase-desc">Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</div>
      <form className="form">
        <div className="form-group">
          <label>Name<span className="required">*</span></label>
          <input type="text" placeholder="Enter name" required />
        </div>
        <div className="form-group">
          <label>Business Name<span className="required">*</span></label>
          <input type="text" placeholder="Enter business name" required />
        </div>
        <div className="form-group">
          <label>Email Id<span className="required">*</span></label>
          <input type="email" placeholder="Enter email id" required />
        </div>
        <div className="form-group">
          <label>Contact Number<span className="required">*</span></label>
          <input type="text" placeholder="Enter contact number" required />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>

    <div className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <img src={visibenLogo} alt="VISIBEEN Logo" className="footer-logo" />
          <div style={{ marginBottom: 8 }}>Copyright © 2025 e2e digitech pvt ltd.<br />All rights reserved</div>
          <div className="footer-social">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Testimonials</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help center</a></li>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Legal</a></li>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Status</a></li>
          </ul>
        </div>
        <div className="footer-col footer-newsletter">
          <h4>Stay up to date</h4>
          <form>
            <input type="email" placeholder="Your email address" required />
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <div></div>
      </div>
    </div>
  </>
);

export default PurchaseLogo; 