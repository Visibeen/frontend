import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from './AccountContext';
import DashboardLayout from '../../Layouts/DashboardLayout';
import './AccountInfo.css';

const AccountInfo = () => {
  const navigate = useNavigate();
  const { accountInfo, updateAccountInfo } = useAccount();
  const [form, setForm] = useState({
    name: accountInfo.name || '',
    businessName: accountInfo.businessName || '',
    address: accountInfo.address || '',
    email: accountInfo.email || '',
    contact: accountInfo.contact || '',
    altContact: accountInfo.altContact || '',
    website: accountInfo.website || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Input change:', name, value); // Debug log
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAndNext = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form); // Debug log
    
    // Save to global context
    updateAccountInfo(form);
    console.log('Account info updated'); // Debug log

    // Navigate to next page
    navigate('../upload-logo');
  };

  const handleCancel = () => {
    console.log('Cancel button clicked'); // Debug log
    try {
      navigate('/');
      console.log('Navigation successful');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
  

      <div className="container">
        <h2>Account Information</h2>
        <h6>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</h6>
        <form onSubmit={handleSaveAndNext}>
          <div className="form-fields-column">
            <div className="input-container">
              <label>Full Name <span className="required">*</span></label>
              <input type="text" name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} required />
              <i className="fas fa-pencil-alt pencil-icon"></i>
            </div>
            <div className="input-container">
              <label>Business Name <span className="required">*</span></label>
              <input type="text" name="businessName" placeholder="Enter your business name" value={form.businessName} onChange={handleChange} required />
              <i className="fas fa-pencil-alt pencil-icon"></i>
            </div>
            <div className="input-container">
              <label>Business Address <span className="required">*</span></label>
              <input type="text" name="address" placeholder="Enter your business address" value={form.address} onChange={handleChange} required />
              <i className="fas fa-pencil-alt pencil-icon"></i>
            </div>
            <div className="input-container">
              <label>Email Address <span className="required">*</span></label>
              <input type="email" name="email" placeholder="Enter your email address" value={form.email} onChange={handleChange} required />
              <i className="fas fa-pencil-alt pencil-icon"></i>
            </div>
            <div className="input-container">
              <label>Contact Number <span className="required">*</span></label>
              <input type="tel" name="contact" placeholder="Enter your contact number" value={form.contact} onChange={handleChange} required />
              <i className="fas fa-pencil-alt pencil-icon"></i>
            </div>
            <div className="input-container">
              <label>Alternative Contact Number <span className="required">*</span></label>
              <input type="tel" name="altContact" placeholder="Enter your alternative contact number" value={form.altContact} onChange={handleChange} required />
              <i className="fas fa-pencil-alt pencil-icon"></i>
            </div>
            <div className="input-container">
              <label>Website URL <span className="required">*</span></label>
              <input type="url" name="website" placeholder="Enter your website URL (e.g., https://www.yourwebsite.com)" value={form.website} onChange={handleChange} required />
              <i className="fas fa-pencil-alt pencil-icon"></i>
            </div>
            <div className="buttons">
              <button 
                type="button" 
                className="btn cancel" 
                onClick={handleCancel}
                style={{ cursor: 'pointer', zIndex: 1000 }}
              >
                Cancel
              </button>
              <button type="submit" className="btn save">Save & Next</button>
            </div>
          </div>
        </form>
      </div>
  );
};

export default AccountInfo; 