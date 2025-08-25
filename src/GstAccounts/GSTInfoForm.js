import React, { useState } from 'react';
import './GSTInfoForm.css';

const initialFormState = {
  gstdetial: '2125888888',
  paymentDetail: 'Cash',
  bankName: 'SBI Bank',
  chequeNumber: '02012025',
  paymentWithGST: '3434',
  netPayment: '2323',
  gst: '233',
  advance: '3434',
  pending: '0',
  topUpAmount: '2323',
  netSaleAfterTopUp: '233',
  emiDate: '5',
  emiPaymentPerMonth: '2313',
  escAccountNumber: '5',
  escBankName: '2313',
  escIfscCode: '5',
  umsnNumber: '2313',
  contactPerson: '3434',
  contactNumber: '695225521',
  altContactNumber: '695225521',
};

const paymentOptions = ['Cash', 'QR Code',' NEFT','Cheque'];
const numberOptions = ['1', '5', '10', '15', '20','25','30'];

const GSTInfoForm = () => {
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    <div className="gst-info-form-container">
      <h2>GST Information</h2>
      <p>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</p>
      <form className="gst-info-form" onSubmit={handleSubmit}>
        <label>GST detail*<input name="gstSerial" value={form.gstSerial} onChange={handleChange} /></label>
        <label>Payment detail*
          <select name="paymentDetail" value={form.paymentDetail} onChange={handleChange}>
            {paymentOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </label>
        <div className="form-row">
          <label>Bank Name*<input name="bankName" value={form.bankName} onChange={handleChange} /></label>
          <label>Cheque Number*<input name="chequeNumber" value={form.chequeNumber} onChange={handleChange} /></label>
        </div>
        <label>Payment with GST*<input name="paymentWithGST" value={form.paymentWithGST} onChange={handleChange} /></label>
        <div className="form-row">
          <label>Net Payment*<input name="netPayment" value={form.netPayment} onChange={handleChange} /></label>
          <label>GST*<input name="gst" value={form.gst} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>Advance*<input name="advance" value={form.advance} onChange={handleChange} /></label>
          <label>Pending*<input name="pending" value={form.pending} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>Top Up Amount*<input name="topUpAmount" value={form.topUpAmount} onChange={handleChange} /></label>
          <label>Net Sale After Top Up Amount*<input name="netSaleAfterTopUp" value={form.netSaleAfterTopUp} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>EMI Date*
            <select name="emiDate" value={form.emiDate} onChange={handleChange}>
              {numberOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>EMI Payment per month*<input name="emiPaymentPerMonth" value={form.emiPaymentPerMonth} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>ESC Account Number*
            <select name="escAccountNumber" value={form.escAccountNumber} onChange={handleChange}>
              {numberOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>ESC Bank Name*<input name="escBankName" value={form.escBankName} onChange={handleChange} /></label>
        </div>
        <div className="form-row">
          <label>ESC IFSC Code*
            <select name="escIfscCode" value={form.escIfscCode} onChange={handleChange}>
              {numberOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </label>
          <label>UMSN Number*<input name="umsnNumber" value={form.umsnNumber} onChange={handleChange} /></label>
        </div>
        <label>Contact Person*<input name="contactPerson" value={form.contactPerson} onChange={handleChange} /></label>
        <label>Contact Number*<input name="contactNumber" value={form.contactNumber} onChange={handleChange} /></label>
        <label>Alternative Contact Number*<input name="altContactNumber" value={form.altContactNumber} onChange={handleChange} /></label>
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
          <button type="submit" className="update-btn">update</button>
        </div>
      </form>
    </div>
  );
};

export default GSTInfoForm; 