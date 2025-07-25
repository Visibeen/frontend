import React, { useState } from 'react';
import { Home, BarChart3, Users, Download, Globe, MessageSquare, FileText, Share2, Gift, User, Instagram, Settings, Twitter, Youtube } from 'lucide-react';
import Layout from './Layouts/Layout';

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
    // <div className="min-h-screen bg-gray-50 flex">
      <Layout>

        {/* Main Content */}
        <div className="main-content">
          {/* Main Form Area */}
          <div className="content-area">
            <div className="form-container">
              <h1 className="page-title">Account Information</h1>
              <p className="page-description">Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</p>

              <div className="form-group">
                {/* Name */}
                <div>
                  <label className="form-label">
                    Name*
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="form-input "
                    />
                    <button className="edit-button ">
                      <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <label className="form-label">
                    Business Name*
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                      className="form-input"
                    />
                    <button className="edit-button ">
                      <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="form-label">
                    Address*
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="form-label">
                    Email Id*
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="form-input"
                    />
                    <button className="edit-button">
                      <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Contact Number */}
                <div>
                  <label className="form-label">
                    Contact Number*
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                      className="form-input"
                    />
                    <button className="edit-button">
                      <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Alternative Contact Number */}
                <div>
                  <label className="form-label">
                    Alternative Contact Number*
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      value={formData.alternativeContactNumber}
                      onChange={(e) => handleInputChange('alternativeContactNumber', e.target.value)}
                      className="form-input"
                    />
                    <button className="edit-button">
                      <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Website */}
                <div>
                  <label className="form-label">
                    Website*
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="form-input"
                    />
                    <button className="edit-button">
                      <svg className="edit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="action-buttons">
                  <button
                    onClick={handleCancel}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout >
    // </div >
  );

}

