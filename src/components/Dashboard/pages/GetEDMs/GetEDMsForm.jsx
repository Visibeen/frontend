import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../Layouts/Layout';
import '../../../../styles.css';

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
      <div className="get-edms-container px-[197.5px] pt-[134px] pb-[50px]">
        <div className="text-center mb-8">
          <h2 className="text-[24px] font-semibold">Account Information</h2>
          <p className="text-gray-500">
            Lorem ipsum is a dummy or placeholder text commonly used in graphic design,
            publishing
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto w-[620px] bg-white shadow-md p-6 rounded-lg"
        >
          {/* Input Fields */}
          {[
            { label: 'Name', name: 'name' },
            { label: 'Business Name', name: 'businessName' },
            { label: 'Address', name: 'address' },
            { label: 'Email Id', name: 'email' },
            { label: 'Contact Number', name: 'contactNumber' },
            { label: 'Alternative Contact Number', name: 'altContactNumber' },
            { label: 'Website', name: 'website' },
          ].map((field, idx) => (
            <div key={idx} className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md focus:outline-none"
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              className="border border-red-500 text-red-500 px-6 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Save & Next
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default GetEDMs;
