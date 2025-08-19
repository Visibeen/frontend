import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import './SpecialDaysEDMs.css';

const templates = [
  { label: 'World Refugee Day' },
  { label: 'Happy Father\'s Day' },
  { label: 'Happy Mother\'s Day' },
  { label: 'World Wind Day' },
];

const SpecialDaysEDMs = () => {
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
    // Navigate to special days photo EDMs page with the selected special day
    navigate('/special-days-photo-edms', { 
      state: { selectedSpecialDay: template.label } 
    });
  };

  return (
    <DashboardLayout>
      <div className="main-content">
        <div className="main-title">
          <div className="products-title">Special Days EDMs</div>
          <div className="products-subtitle">Select your special day</div>
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
    </DashboardLayout>
  );
};

export default SpecialDaysEDMs; 