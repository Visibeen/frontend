import React, { useState, useRef } from 'react';
import './AccountInfoForm.css';
import axios from 'axios';
const initialFormState = {
  business_name: '',
  industry_type: '',
  start_date: '',
  end_date: '',
  email: '',
  address: '',
  website: '',
};

const AccountInfoForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [logo, setLogo] = useState(null);
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
    const user = (localStorage.getItem('authToken'));
    const payload = {
      user_id: user?.id,
      business_name: form.business_name,
      industry_type: form.industry_type,
      start_date: form.start_date,
      end_date: form.end_date,
      email: form.email,
      address: form.address,
      website: form.website
    }
    try {
      const token = JSON.parse(localStorage.getItem('userData'));
      const response = await axios.post(
        'http://52.44.140.230:8089/api/v1/customer/accounts/create-account',
        payload,
        {
          headers: {
            Authorization: `${token?.token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      alert('Updated!');
      console.log('API Response:', response.data);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
      alert('Something went wrong while submitting the form. Please try again.');
    }
    alert('Updated!');
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
        <label>Email ID*<input name="email" value={form.email} onChange={handleChange} /></label>
        <label>Address*<input name="address" value={form.address} onChange={handleChange} /></label>
        <label>Website*<input name="website" value={form.website} onChange={handleChange} /></label>
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="update-btn">Update</button>
        </div>
      </form>
    </div>
  );
};

export default AccountInfoForm; 