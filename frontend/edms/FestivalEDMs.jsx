import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FestivalEDMs.css';

const templates = [
  { label: 'Holi', url: 'template1.html' },
  { label: 'Diwali', url: 'template2.html' },
  { label: 'Dassera', url: 'template3.html' },
  { label: 'Navratri', url: 'template4.html' },
];

const FestivalEDMs = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('Select template');
  const dropdownRef = useRef(null);

  // Load account info when component mounts
  useEffect(() => {
    // Removed loadAccountInfo as per edit hint
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDropdownClick = () => setDropdownOpen((open) => !open);
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.label);
    setDropdownOpen(false);
    // Navigate to festival special EDMs page with the selected festival
    navigate('../festival-template-display', { 
      state: { selectedFestival: template.label } 
    });
  };

  return (
    <>
      {/* Header */}
      <div className="header">
        <div className="header-container">
          <div className="header-logo-block">
            <img src="VISIBEN.svg" alt="Logo" className="logo-image" />
          </div>
          <div className="header-nav">
            <a href="#">Change design</a>
            <a href="#">Upload logo</a>
            <a href="#">My profile</a>
            <a href="#">Logout</a>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="main-content">
        <div className="main-title">
          <div className="products-title">Festival EDMs</div>
          <div className="products-subtitle">Select your festival</div>
        </div>
        <div className="template-section">
          <div className={`custom-dropdown${dropdownOpen ? ' open' : ''}`} ref={dropdownRef}>
            <div className="custom-dropdown-selected" onClick={handleDropdownClick}>
              {selectedTemplate} <span className="dropdown-arrow">&#9660;</span>
            </div>
            <ul className="custom-dropdown-list">
              {templates.map((template) => (
                <li key={template.label} onClick={() => handleTemplateSelect(template)}>{template.label}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="spacer"></div>
      </div>
      {/* Footer */}
      <div className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo-block">
              <img src="VISIBEN.svg" alt="Logo" className="logo-image" />
            </div>
            <div className="footer-copyright">
              Copyright © 2025 e2e digitech pvt ltd.<br />All rights reserved
            </div>
            <div className="footer-social">
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <div className="footer-title">Company</div>
              <a href="#">About us</a>
              <a href="#">Blog</a>
              <a href="#">Contact us</a>
              <a href="#">Pricing</a>
              <a href="#">Testimonials</a>
            </div>
            <div className="footer-section">
              <div className="footer-title">Support</div>
              <a href="#">Help center</a>
              <a href="#">Terms of service</a>
              <a href="#">Legal</a>
              <a href="#">Privacy policy</a>
              <a href="#">Status</a>
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-title">Stay up to date</div>
            <form className="footer-newsletter">
              <div className="input-icon-wrapper">
                <input type="email" placeholder="Your email address" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FestivalEDMs; 