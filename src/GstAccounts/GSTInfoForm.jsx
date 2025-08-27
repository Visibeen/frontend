import React, { useState } from 'react';
import './GSTInfoForm.css';
import axios from 'axios';

const initialFormState = {
  gst_detail: '45241524',
  start_date: '02-01-2025',
  end_date: '02-01-2025'
};

const invoiceData = [
  { id: '#50650', billingDate: '18 Aug 2025', plan: 'Gold', amount: '5252', status: 'Paid' },
  { id: '#50650', billingDate: '25 Dec 2025', plan: 'Silver', amount: '5252', status: 'Pending' },
  { id: '#50650', billingDate: '02 Oct 2025', plan: 'Gold', amount: '5252', status: 'Paid' },
  { id: '#50650', billingDate: '25 Dec 2025', plan: 'Silver', amount: '5252', status: 'Pending' },
  { id: '#50650', billingDate: '18 Aug 2025', plan: 'Gold', amount: '5252', status: 'Paid' },
  { id: '#50650', billingDate: '02 Oct 2025', plan: 'Silver', amount: '5252', status: 'Paid' },
  { id: '#50650', billingDate: '23 Aug 2025', plan: 'Gold', amount: '5252', status: 'Paid' }
];

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
    try {
      const token = JSON.parse(localStorage.getItem('userData'));
      const payload = {
        gst_detail: form.gst_detail,
        start_date: form.start_date,
        end_date: form.end_date
      };

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

  const downloadBill = (invoice) => {
    // Create CSV data for individual invoice
    const csvData = [
      ['Invoice ID', 'Billing Date', 'Plan', 'Amount', 'Status'],
      [invoice.id, invoice.billingDate, invoice.plan, invoice.amount, invoice.status]
    ];

    // Convert to CSV format
    const csvContent = csvData.map(row => row.join(',')).join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `invoice_${invoice.id.replace('#', '')}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusClass = (status) => {
    return status === 'Paid' ? 'status-paid' : 'status-pending';
  };
  return (
    <div className="gst-page-container">
      {/* GST Information Section */}
      <div className="gst-info-section">
        <h2>GST Information</h2>
        <p>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</p>

        <form className="gst-info-form" onSubmit={handleSubmit}>
          <div className="form-field">
  <label>GST detail*</label>
  <div className="input-with-icon" >
    <input name="gst_detail" value={form.gst_detail} onChange={handleChange} className="gst-input" />
    <span className="edit-icon">✏️</span>
  </div>
</div>

<div className="form-row">
  <div className="form-field">
    <label>Date of Registration*</label>
    <input name="start_date" value={form.start_date} onChange={handleChange} type="text" />
  </div>
  <div className="form-field">
      <label>End Date*</label>
      <input name="end_date" value={form.end_date} onChange={handleChange} type="text" />
      </div>
      </div>
    <div className="form-actions">
  <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
  <button type="submit" className="update-btn">Update</button>
    </div>
  </form>
</div>

{/* Invoice Section */}
<div className="invoice-section">
<div className="invoice-header">
  <h3>Invoice</h3>
</div>
<div className="invoice-table-container">
<table className="invoice-table">
  <thead>
    <tr>
      <th>Invoice ID</th>
      <th>Billing Date</th>
      <th>Plan</th>
      <th>Amount</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {invoiceData.map((invoice, index) => (
      <tr key={index}>
  <td className="invoice-id">{invoice.id}</td>
  <td>{invoice.billingDate}</td>
  <td>{invoice.plan}</td>
  <td>{invoice.amount}</td>
  <td>
  <span className={`status ${getStatusClass(invoice.status)}`}>
 {invoice.status}
 </span>
  </td>
  <td>
  <button className="download-btn-small" onClick={() => downloadBill(invoice)} title="Download Bill">Download Bill</button>
 </td>
</tr>
 ))}
  </tbody>
 </table>
   </div>
   </div>
   </div>
  );
};

export default GSTInfoForm;