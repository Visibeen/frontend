import React, { useState } from 'react';
import './GSTInfoForm.css';
import axios from 'axios';

const initialFormState = {
  gst_details: '',
  payment_details: '',
  bank_name: '',
  cheque_number: '',
  payment_with_gst: '',
  net_payment: '',
  gst: '',
  advance: '',
  pending: '',
  top_up_amount: '',
  net_sale: '',
  emi_date: '',
  emi_payment_per_month: '',
  esc_amount_number: '',
  esc_bank_name: '',
  esc_ifsc_code: '',
  umrn_number: '',
  contact_person: '',
  contact_number: '',
  alternative_contact_number: '',
};

const paymentOptions = ['Cash', 'QR Code', ' NEFT', 'Cheque'];
const numberOptions = ['1', '5', '10', '15', '20', '25', '30'];

const GSTInfoForm = () => {
  const [form, setForm] = useState(initialFormState);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      gst_details: form.gst_details,
      payment_details: form.payment_details,
      bank_name: form.bank_name,
      cheque_number: form.cheque_number,
      payment_with_gst: form.payment_with_gst,
      net_payment: form.net_payment,
      gst: form.gst,
      advance: form.advance,
      pending: form.pending,
      top_up_amount: form.top_up_amount,
      net_sale: form.net_sale,
      emi_date: form.emi_date,
      emi_payment_per_month: form.emi_payment_per_month,
      esc_amount_number: form.esc_amount_number,
      esc_bank_name: form.esc_bank_name,
      esc_ifsc_code: form.esc_ifsc_code,
      umrn_number: form.umrn_number,
      contact_person: form.contact_person,
      contact_number: form.contact_number,
      alternative_contact_number: form.alternative_contact_number
    }
    try {
      const token = JSON.parse(localStorage.getItem('userData'));
      const response = await axios.post(
        'http://52.44.140.230:8089/api/v1/customer/gst-information/create-gst-information',
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
    <div className="gst-info-form-container">
      <h2>GST Information</h2>
      <p>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</p>
      <form className="gst-info-form" onSubmit={handleSubmit}>
        <label>GST detail*<input name="gst_details" value={form.gst_details} onChange={handleChange} /></label>
        <label>Payment detail*
          <select name="payment_details" value={form.payment_details} onChange={handleChange}>
            {paymentOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </label>
        <div className="form-row">
          <label>Bank Name*<input name="bank_name" value={form.bank_name} onChange={handleChange} /></label>
          <label>Cheque Number*<input name="cheque_number" value={form.cheque_number} onChange={handleChange} /></label>
        </div>
        <label>Payment with GST*<input name="payment_with_gst" value={form.payment_with_gst} onChange={handleChange} /></label>
        <div className="form-row">
          <label>Net Payment*<input name="net_payment" value={form.net_payment} onChange={handleChange} /></label>
          <label>GST*<input name="gst" value={form.gst} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>Advance*<input name="advance" value={form.advance} onChange={handleChange} /></label>
          <label>Pending*<input name="pending" value={form.pending} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>Top Up Amount*<input name="top_up_amount" value={form.top_up_amount} onChange={handleChange} /></label>
          <label>Net Sale After Top Up Amount*<input name="net_sale" value={form.net_sale} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>EMI Date*
            <select name="emi_date" value={form.emi_date} onChange={handleChange}>
              {numberOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>EMI Payment per month*<input name="emi_payment_per_month" value={form.emi_payment_per_month} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>ESC Account Number*
            <select name="esc_amount_number" value={form.esc_amount_number} onChange={handleChange}>
              {numberOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>ESC Bank Name*<input name="esc_bank_name" value={form.esc_bank_name} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>ESC IFSC Code*
            <select name="esc_ifsc_code" value={form.esc_ifsc_code} onChange={handleChange}>
              {numberOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>UMSN Number*<input name="umrn_number" value={form.umrn_number} onChange={handleChange} /></label>
        </div>
        <label>Contact Person*<input name="contact_person" value={form.contact_person} onChange={handleChange} /></label>
        <label>Contact Number*<input name="contact_number" value={form.contact_number} onChange={handleChange} /></label>
        <label>Alternative Contact Number*<input name="alternative_contact_number" value={form.alternative_contact_number} onChange={handleChange} /></label>
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="update-btn">update</button>
        </div>
      </form>
    </div>
  );
};

export default GSTInfoForm; 