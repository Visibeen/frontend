import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from './AccountContext';
import { getSession, getAutoToken, clearSession } from '../../../utils/authUtils';
import api from '../../../services/api';
import DashboardLayout from '../../Layouts/DashboardLayout';
import './AccountInfo.css';

const AccountInfo = () => {
  const navigate = useNavigate();
  const { accountInfo, updateAccountInfo } = useAccount();
  const [form, setForm] = useState({
    name: accountInfo.name || '',
    business_name: accountInfo.business_name || '',
    address: accountInfo.address || '',
    email: accountInfo.email || '',
    contact_number: accountInfo.contact_number || '',
    alternative_contact_number: accountInfo.alternative_contact_number || '',
    website: accountInfo.website || '',
  });
  
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSaveAndNext = async (e) => {
    e.preventDefault();
    updateAccountInfo(form);
    
    // Get session and token using centralized utilities
    const session = getSession();
    const authToken = getAutoToken();
    
    // Debug token information
    console.log('[AccountInfo] Token Debug Info:', {
      hasSession: !!session,
      hasToken: !!authToken,
      sessionId: session?.id || session?.user?.id,
      sessionKeys: session ? Object.keys(session) : [],
      sessionUser: session?.user ? Object.keys(session.user) : [],
      tokenPreview: authToken ? `${authToken.substring(0, 10)}...` : 'No token'
    });
    
    // Check for authentication
    if (!session || !authToken) {
      console.error('[AccountInfo] Missing authentication data');
      alert('Authentication required. Please log in again.');
      clearSession();
      navigate('/login');
      return;
    }
    
    // Extract user ID with multiple fallback strategies
    const userId = session?.id || session?.user?.id || session?.userId || session?.user_id;
    
    if (!userId) {
      console.error('[AccountInfo] Unable to extract user ID from session:', session);
      alert('Invalid session data. Please log in again.');
      clearSession();
      navigate('/login');
      return;
    }
    
    const payload = {
      user_id: userId,
      name: form.name,
      business_name: form.business_name,
      address: form.address,
      email: form.email,
      contact_number: form.contact_number,
      alternative_contact_number: form.alternative_contact_number,
      website: form.website,
    };
    
    try {
      setLoading(true);
      console.log('[AccountInfo] Submitting EDMS account info...');
      console.log('[AccountInfo] Payload:', payload);
      
      // Use centralized API service with automatic token injection
      const response = await api.post('/customer/edms/create-edms', payload);
      
      console.log('[AccountInfo] API Response:', response);
      navigate('../upload-logo');
      
      console.log('[AccountInfo] API Response:', response);
      navigate('../upload-logo');
    } catch (error) {
      console.error('[AccountInfo] API Error:', error);
      
      if (error.status === 401) {
        // Handle authentication error
        console.log('[AccountInfo] Authentication failed, clearing session');
        clearSession();
        alert('Your session has expired. Please log in again.');
        navigate('/login');
      } else if (error.status === 400) {
        // Handle bad request with specific feedback
        const errorMessage = error.body?.message || error.body?.error || 'Invalid request data. Please check your information and try again.';
        console.error('[AccountInfo] Validation error:', errorMessage);
        alert(`Error: ${errorMessage}`);
      } else {
        console.error('[AccountInfo] Unexpected error:', error.message);
        alert('Something went wrong while submitting the form. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    console.log('Cancel button clicked');
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
            <input type="text" name="business_name" placeholder="Enter your business name" value={form.business_name} onChange={handleChange} required />
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
            <input type="tel" name="contact_number" placeholder="Enter your contact number" value={form.contact_number} onChange={handleChange} required />
            <i className="fas fa-pencil-alt pencil-icon"></i>
          </div>
          <div className="input-container">
            <label>Alternative Contact Number <span className="required">*</span></label>
            <input type="tel" name="alternative_contact_number" placeholder="Enter your alternative contact number" value={form.alternative_contact_number} onChange={handleChange} required />
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
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn save"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save & Next'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountInfo;