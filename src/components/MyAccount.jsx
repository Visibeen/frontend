import React, { useState } from 'react';
import { Home, BarChart3, Users, Download, Globe, MessageSquare, FileText, Share2, Gift, User, Instagram, Settings, Twitter, Youtube } from 'lucide-react';
import Layout from './Layouts/Layout';
import logo from '../assets/VisibeenLogo.png';

export default function VisiBeenMyAccountPage() {
  const [formData, setFormData] = useState({
    name: 'John wick',
    businessName: 'Medical shop',
    address: 'Office Floor, Bestech, Sector 66, Sahibzada Ajit Singh Nagar, Punjab 160066',
    email: 'xyz@gmail.com',
    contactNumber: '6858653555',
    alternativeContactNumber: '6858653555',
    website: 'www.visibeen.com'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
  };

  const handleUpdate = () => {
    console.log('Update clicked', formData);
  };

  const sidebarItems = [
    { icon: Home, label: 'Overview', active: false },
    { icon: BarChart3, label: 'Performance', active: false },
    { icon: Users, label: 'Reputation Management', active: false },
    { icon: Download, label: 'Get EDMs', active: false },
    { icon: Globe, label: 'Free Website', active: false },
    { icon: MessageSquare, label: 'Whats app', active: false, badge: 'Coming soon' },
    { icon: FileText, label: 'Blogs', active: false, badge: 'Coming soon' },
    { icon: Share2, label: 'Social Media', active: false, badge: 'Coming soon' },
    { icon: Gift, label: 'Refer & Earn', active: false },
    { icon: User, label: 'My Account', active: true }
  ];

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
        <div className="edm-form-card">
          {[
            { label: 'Name', field: 'name', placeholder: 'Enter name' },
            { label: 'Business Name', field: 'businessName', placeholder: 'Enter business name' },
            { label: 'Address', field: 'address', placeholder: 'Enter address', type: 'textarea' },
            { label: 'Email Id', field: 'email', placeholder: 'Enter email id' },
            { label: 'Contact Number', field: 'contactNumber', placeholder: 'Enter contact number' },
            { label: 'Alternative Contact Number', field: 'alternativeContactNumber', placeholder: 'Enter alternative contact number' },
            { label: 'Website', field: 'website', placeholder: 'Enter website' },
          ].map((field, idx) => (
            <div key={idx} className="edm-field">
              <label className="edm-label">
                {field.label}<span className="text-red-500">*</span>
              </label>
              {field.type === 'textarea' ? (
                <div className="edm-input-wrap">
                  <textarea
                    value={formData[field.field]}
                    onChange={(e) => handleInputChange(field.field, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className="edm-input"
                    style={{ borderRadius: '10px 0 0 10px', resize: 'none', border: 'solid 1px #d1d5db' }}
                  />
                  <button type="button" className="edm-edit" aria-label={`Edit ${field.label}`}>
                    ✎
                  </button>
                </div>
              ) : (
                <div className="edm-input-wrap">
                  <input
                    type="text"
                    value={formData[field.field]}
                    onChange={(e) => handleInputChange(field.field, e.target.value)}
                    placeholder={field.placeholder}
                    className="edm-input"
                  />
                  <button type="button" className="edm-edit" aria-label={`Edit ${field.label}`}>
                    ✎
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="edm-actions">
            <button type="button" onClick={handleCancel} className="edm-btn edm-btn-outline">Cancel</button>
            <button type="button" onClick={handleUpdate} className="edm-btn edm-btn-primary">Update</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

