import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import '../../../../styles.css';
import logo from '../../../../assets/VisibeenLogo.png';

const GetEDMs = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'John wick',
    businessName: 'Medical shop',
    address:
      'Office Floor, Bestech, Sector 66, Sahibzada Ajit Singh Nagar, Punjab 160066',
    email: 'xyz@gmail.com',
    contactNumber: '6858653555',
    altContactNumber: '6858653555',
    website: 'www.visibeen.com',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const response = await fetch('/api/save-client-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Save success:', data);
      navigate('/upload-logo');
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  return (
    <Layout>
      <div className="edm-shell px-[24px] md:px-[60px] lg:px-[120px] pt-[24px] md:pt-[36px] pb-[40px]">
        {/* Header card */}
        <div className="edm-header-card">
          <div className="edm-welcome">
          <img src={logo} alt="logo" className="edm-logo" />
            <div>
              <div className="edm-welcome-title">Welcome</div>
              <div className="edm-company">E2E Digitech Pvt Ltd</div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mt-6 mb-6">
          <h2 className="text-[22px] md:text-[24px] font-semibold">Account Information</h2>
          <p className="text-gray-500">Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</p>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit} className="edm-form-card">
          {[
            { label: 'Name', name: 'name', placeholder: 'Enter name' },
            { label: 'Business Name', name: 'businessName', placeholder: 'Enter business name' },
            { label: 'Address', name: 'address', placeholder: 'Enter address' },
            { label: 'Email Id', name: 'email', placeholder: 'Enter email id' },
            { label: 'Contact Number', name: 'contactNumber', placeholder: 'Enter contact number' },
            { label: 'Alternative Contact Number', name: 'altContactNumber', placeholder: 'Enter alternative contact number' },
            { label: 'Website', name: 'website', placeholder: 'Enter website' },
          ].map((field, idx) => (
            <div key={idx} className="edm-field">
              <label className="edm-label">
                {field.label}<span className="text-red-500">*</span>
              </label>
              <div className="edm-input-wrap">
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="edm-input"
                />
                <button type="button" className="edm-edit" aria-label={`Edit ${field.label}`}>
                  ✎
                </button>
              </div>
            </div>
          ))}

          <div className="edm-actions">
            <button type="button" className="edm-btn edm-btn-outline">Cancel</button>
            <button type="submit" className="edm-btn edm-btn-primary">Save & Next</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default GetEDMs;
