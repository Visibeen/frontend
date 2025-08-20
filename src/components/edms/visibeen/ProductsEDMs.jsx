import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import './ProductsEDMs.css';
import visibenLogo from './VISIBEN.svg';

const templates = [
  { label: 'Template 1', url: 'template1.html' },
  { label: 'Template 2', url: 'template2.html' },
  { label: 'Template 3', url: 'template3.html' },
  { label: 'Template 4', url: 'template4.html' },
];

const ProductsEDMs = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('Select template');
  const dropdownRef = useRef(null);

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
    // Navigate to special day EDMs page with the selected product template
    navigate('../product-template-display', { 
      state: { selectedTemplate: template.label } 
    });
  };

  return (
  
      <div className="main-content">
        <div className="main-title">
          <div className="products-title">Products EDMs</div>
          <div className="products-subtitle">Select your product template</div>
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
  
  );
};

export default ProductsEDMs;