import React, { useState, useRef } from 'react';
import './AccountInfoForm.css';

const initialFormState = {
  businessName: 'Medical shop',
  industryType: 'Dental clinic',
  startDate: '2025-01-02',
  endDate: '2025-01-02',
  email: 'xyz@gmail.com',
  address: 'Office Floor, Bestech, Sector 66, Sahibzada Ajit Singh Nagar, Punjab 160066',
  website: 'www.visibeen.com',
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

  const handleCancel = (e) => {
    e.preventDefault();
    setForm(initialFormState);
    setLogo(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle update logic here
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
               LOGO<br /><span style={{fontSize:'12px',color:'#009fe3'}}> </span>
            </>
          )}
        </div>
        <label className="update-logo-btn" style={{cursor:'pointer'}}>
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
        <label>Business Name*<input name="businessName" value={form.businessName} onChange={handleChange} /></label>
        <label>Industry Type*<input name="industryType" value={form.industryType} onChange={handleChange} /></label>
        <div className="form-row">
          <label>Start Date*
            <input name="startDate" type="date" value={form.startDate} onChange={handleChange} />
          </label>
          <label>End Date*
            <input name="endDate" type="date" value={form.endDate} onChange={handleChange} />
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