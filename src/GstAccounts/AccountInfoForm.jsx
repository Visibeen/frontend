import React, { useState, useRef } from 'react';
import './AccountInfoForm.css';
import { getSession, getAutoToken, clearSession } from '../utils/authUtils';
import api from '../services/api';
const initialFormState = {
  business_name: '',
  industry_type: '',
  start_date: '',
  end_date: '',
  cro_employee_name: '',
  seo_employee_name: '',
  password: '',
  contact_person: '',
  contact_number: '',
  email: '',
  address: '',
  website: '',
};

const AccountInfoForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };
  const handleCancel = async (e) => {
    e.preventDefault();
    setForm(initialFormState);
    setLogo(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get session and token using centralized utilities
    const session = getSession();
    const authToken = getAutoToken();
    
    // Debug token information
    console.log('[AccountInfoForm] Token Debug Info:', {
      hasSession: !!session,
      hasToken: !!authToken,
      sessionId: session?.id || session?.user?.id,
      tokenPreview: authToken ? `${authToken.substring(0, 10)}...` : 'No token'
    });
    
    // Check for authentication
    if (!session || !authToken) {
      console.error('[AccountInfoForm] Missing authentication data');
      alert('Authentication required. Please log in again.');
      clearSession();
      // Note: Navigation would need to be implemented if this component is within a router context
      return;
    }
    
    const payload = {
      user_id: session?.id || session?.user?.id,
      business_name: form.business_name,
      industry_type: form.industry_type,
      start_date: form.start_date,
      end_date: form.end_date,
      cro_employee_name: form.cro_employee_name,
      seo_employee_name: form.seo_employee_name,
      password: form.password,
      contact_person: form.contact_person,
      contact_number: form.contact_number,
      email: form.email,
      address: form.address,
      website: form.website
    };
    
    try {
      console.log('[AccountInfoForm] Submitting account info...');
      
      // Use centralized API service with automatic token injection
      const response = await api.post('/customer/accounts/create-account', payload);
      
      console.log('[AccountInfoForm] API Response:', response);
      alert('Updated!');
    } catch (error) {
      console.error('[AccountInfoForm] API Error:', error);
      
      if (error.status === 401) {
        // Handle authentication error
        console.log('[AccountInfoForm] Authentication failed, clearing session');
        clearSession();
        alert('Your session has expired. Please log in again.');
        // Note: Navigation would need to be implemented if this component is within a router context
      } else if (error.status === 400) {
        // Handle bad request with specific feedback
        const errorMessage = error.body?.message || error.body?.error || 'Invalid request data. Please check your information and try again.';
        console.error('[AccountInfoForm] Validation error:', errorMessage);
        alert(`Error: ${errorMessage}`);
      } else {
        console.error('[AccountInfoForm] Unexpected error:', error.message);
        alert('Something went wrong while submitting the form. Please try again.');
      }
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <div className="account-info-form-container">
      <h2>Account Information</h2>
      <p>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</p>
      <div className="account-info-logo-section">
        <div className="account-info-logo">
          {logoPreview ? (
            <img src={logoPreview} alt="Logo Preview" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <>
              LOGO<br /><span style={{ fontSize: '12px', color: '#009fe3' }}> </span>
            </>
          )}
        </div>
        <label className="update-logo-btn" style={{ cursor: 'pointer' }}>
          Update Logo
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleLogoChange}
            ref={fileInputRef}
          />
        </label>
      </div>
      <form className="account-info-form" onSubmit={handleSubmit}>
        <label>Business Name*<input name="business_name" value={form.business_name} onChange={handleChange} /></label>
        <label>Industry Type*<input name="industry_type" value={form.industry_type} onChange={handleChange} /></label>
        <div className="form-row">
          <label>Start Date*
            <input name="start_date" type="date" value={form.start_date} onChange={handleChange} />
          </label>
          <label>End Date*
            <input name="end_date" type="date" value={form.end_date} onChange={handleChange} />
          </label>
        </div>
        <div className="form-row">
          <label>CRO Employee
            <input name="cro_employee_name" value={form.cro_employee_name} onChange={handleChange} />
          </label>
          <label>SEO Employee
            <input name="seo_employee_name" value={form.seo_employee_name} onChange={handleChange} />
          </label>
        </div>
        <label>Email ID*<input name="email" value={form.email} onChange={handleChange} /></label>
        <label>Password*<input name="password" value={form.password} onChange={handleChange} autoComplete="current-password" minLength="8" /></label>
        <label>Address*<input name="address" value={form.address} onChange={handleChange} /></label>
        <label>Website*<input name="website" value={form.website} onChange={handleChange} /></label>
        <label>Contact Person*<input name="contact_person" value={form.contact_person} onChange={handleChange} /></label>
        <label>Contact Number<input name="contact_number" value={form.contact_number} onChange={handleChange} /></label>
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="update-btn">Update</button>
        </div>
      </form>
    </div>
  );
};

export default AccountInfoForm; 