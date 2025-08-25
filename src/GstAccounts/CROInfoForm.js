import React, { useState } from 'react';
import './CROInfoForm.css';

const initialFormState = {
  selectedTags: ['Property', 'Buy/Rent Property'],
  civilWork: '',
  croEmployee: 'John',
  seoEmployee: 'John',
  welcomeCall: false,
  claimTaken: false,
  category: 'Gold',
  faAccount: '',
  seoPostPeriod: 'Daily',
  totalPost: '2',
  reportPeriod: 'Daily',
  clientStatus: '5',
  gmailId: '',
  password: '',
  recoveryGmail: '',
  googleAccount: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Updated!');
  };

  return (
    <div className="cro-info-form-container">
      <h2>CRO Information</h2>
      <p>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</p>
      <form className="cro-info-form" onSubmit={handleSubmit}>
        <label>Keyword*
          <div className="keyword-input-wrapper" >
            {form.selectedTags.map((tag) => (
              <span className="tag selected" key={tag}>
                {tag}
                <span className="tag-remove" onClick={() => handleTagRemove(tag)}>&times;</span>
              </span>
            ))}
          </div>
          <div className="tag-row keyword-tag-row">
            {tagOptions.map((tag) => (
              <span
                key={tag}
                className={form.selectedTags.includes(tag) ? 'tag selected' : 'tag'}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </span>
            ))}
          </div>
        </label>
        <label>Civil work<input name="civilWork" value={form.civilWork} onChange={handleChange} /></label>
        <div className="form-row">
          <label>CRO Employee
            <select name="croEmployee" value={form.croEmployee} onChange={handleChange}>
              {employeeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>SEO Employee
            <select name="seoEmployee" value={form.seoEmployee} onChange={handleChange}>
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
            <select name="category" value={form.category} onChange={handleChange}>
              {categoryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>FA Account<input name="faAccount" value={form.faAccount} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>SEO Post Period
            <select name="seoPostPeriod" value={form.seoPostPeriod} onChange={handleChange}>
              {periodOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>Total Post<input name="totalPost" value={form.totalPost} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>Report Period
            <select name="reportPeriod" value={form.reportPeriod} onChange={handleChange}>
              {periodOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>Client Status
            <select name="clientStatus" value={form.clientStatus} onChange={handleChange}>
              {clientStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>Gmail ID<input name="gmailId" value={form.gmailId} onChange={handleChange} /></label>
          <label>Password<input name="password" value={form.password} onChange={handleChange} /></label>
        </div>
        <label>Recovery Gmail and Password<input name="recoveryGmail" value={form.recoveryGmail} onChange={handleChange} /></label>
        <div className="form-row">
          <label>Google Account<input name="googleAccount" value={form.googleAccount} onChange={handleChange} /></label>
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