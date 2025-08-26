import React, { useState } from 'react';
import './CROInfoForm.css';
import axios from 'axios';

const initialFormState = {
  cro_employee_name: '',
  seo_employee_name: '',
  cro_category: '',
  fa_account: '',
  seo_post_period: '',
  total_post: '',
  report_period: '',
  client_status: '',
  email: '',
  password: '',
  recory_email: '',
  recory_password: '',
  google_account: '',
  location: '',
};

const tagOptions = ['Property', 'Buy/Rent Property', 'Builder', 'Tiles work', 'Wooden flowing', 'Civil work'];
const employeeOptions = ['Sourav ', 'Sachin', 'Virat', 'Rohit', 'Dhoni', 'Kohli'];
const categoryOptions = ['Gold', 'Silver', 'Platinum', 'Diamond', 'ESC'];
const periodOptions = ['Daily', 'Weekly', 'Monthly'];
const clientStatusOptions = ['Dormant', 'Non Dormant'];

const CROInfoForm = () => {
  const [form, setForm] = useState(initialFormState);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleTagClick = (tag) => {
    setForm((prev) => {
      const selected = prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter((t) => t !== tag)
        : [...prev.selectedTags, tag];
      return { ...prev, selectedTags: selected };
    });
  };

  const handleTagRemove = (tag) => {
    setForm((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.filter((t) => t !== tag),
    }));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setForm(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = (localStorage.getItem('authToken'));
    const payload = {
      user_id: user?.id,
      cro_employee_name: form.cro_employee_name,
      seo_employee_name: form.seo_employee_name,
      cro_category: form.cro_category,
      fa_account: form.fa_account,
      seo_post_period: form.seo_post_period,
      total_post: form.total_post,
      report_period: form.report_period,
      client_status: form.client_status,
      email: form.email,
      password: form.password,
      recory_email: form.recory_email,
      recory_password: form.recory_password,
      google_account: form.google_account,
      location: form.location,
    }
    try {
      const token = JSON.parse(localStorage.getItem('userData'));
      const response = await axios.post(
        'http://52.44.140.230:8089/api/v1/customer/cro-information/create-cro-information',
        payload,
        {
          headers: {
            Authorization: `${token?.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
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
  };

  return (
    <div className="cro-info-form-container">
      <h2>CRO Information</h2>
      <p>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</p>
      <form className="cro-info-form" onSubmit={handleSubmit}>
        <label>Civil work<input name="civilWork" value={form.civilWork} onChange={handleChange} /></label>
        <div className="form-row">
          <label>CRO Employee
            <select name="cro_employee_name" value={form.cro_employee_name} onChange={handleChange}>
              {employeeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>SEO Employee
            <select name="seo_employee_name" value={form.seo_employee_name} onChange={handleChange}>
              {employeeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
        </div>

        <div className="checkbox-row">
          <label><input type="checkbox" name="welcomeCall" checked={form.welcomeCall} onChange={handleChange} /> Welcome Call</label>
          <label><input type="checkbox" name="claimTaken" checked={form.claimTaken} onChange={handleChange} /> Claim Taken</label>
        </div>
        <div className="form-row">
          <label>Category
            <select name="cro_category" value={form.cro_category} onChange={handleChange}>
              {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>FA Account<input name="fa_account" value={form.fa_account} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>SEO Post Period
            <select name="seo_post_period" value={form.seo_post_period} onChange={handleChange}>
              {periodOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>Total Post<input name="total_post" value={form.total_post} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>Report Period
            <select name="report_period" value={form.report_period} onChange={handleChange}>
              {periodOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>Client Status
            <select name="client_status" value={form.client_status} onChange={handleChange}>
              {clientStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>Gmail ID<input name="email" value={form.email} onChange={handleChange} /></label>
          <label>Password<input name="password" value={form.password} onChange={handleChange} /></label>
        </div>
        <label>Recovery Gmail and Password<input name="recory_email" value={form.recory_email} onChange={handleChange} /></label>
        <div className="form-row">
          <label>Google Account<input name="google_account" value={form.google_account} onChange={handleChange} /></label>
          <label>Location<input name="location" value={form.location} onChange={handleChange} /></label>
        </div>
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="update-btn">Update</button>

        </div>
      </form>
    </div>
  );
};

export default CROInfoForm; 