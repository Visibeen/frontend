import React, { useState, useEffect } from 'react';
import './GSTInfoForm.css';
import { getSession, getAutoToken, clearSession } from '../utils/authUtils';
import api from '../services/api';

const initialFormState = {
  gst_detail: '',
  gst: '',
  gst_name:'',
  gst_address: '',
  supply_state: ''
};

const invoiceData = [
  { id: '#50650', billingDate: '18 Aug 2025', amount: '5252', status: 'Paid' },
  { id: '#50651', billingDate: '25 Dec 2025', amount: '5252', status: 'Pending' },
  { id: '#50652', billingDate: '02 Oct 2025', amount: '5252', status: 'Paid' },
  { id: '#50653', billingDate: '25 Dec 2025', amount: '5252', status: 'Pending' },
  { id: '#50654', billingDate: '18 Aug 2025', amount: '5252', status: 'Paid' },
  { id: '#50655', billingDate: '02 Oct 2025', amount: '5252', status: 'Paid' },
  { id: '#50656', billingDate: '23 Aug 2025', amount: '5252', status: 'Paid' }
];

const GSTInfoForm = () => {
  const [form, setForm] = useState(initialFormState);
  // Autofill from session if available
  useEffect(() => {
    const session = getSession();
    const sessionGst = session?.gst_detail || session?.user?.gst_detail || session?.gstNumber || session?.user?.gstNumber || session?.gst_number || session?.user?.gst_number || '';
    const sessionName = session?.name || session?.user?.name || session?.gst || session?.user?.gst || '';
    const sessionAddress = session?.address || session?.user?.address || session?.gst_address || session?.user?.gst_address || '';
    const sessionSupplyState = session?.supply_state || session?.user?.supply_state || session?.state || session?.user?.state || '';

    setForm(prev => ({
      ...prev,
      gst_detail: sessionGst || prev.gst_detail || '',
      gst: sessionName || prev.gst || '',
      gst_address: sessionAddress || prev.gst_address || '',
      supply_state: sessionSupplyState || prev.supply_state || ''
    }));
  }, []);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCancel = (e) => {
    e.preventDefault();
  // Reset to session-backed initial value (if any) or empty
  const session = getSession();
  const sessionGst = session?.gst_detail || session?.user?.gst_detail || session?.gstNumber || session?.user?.gstNumber || session?.gst_number || session?.user?.gst_number || '';
  const sessionName = session?.name || session?.user?.name || session?.gst || session?.user?.gst || '';
  const sessionAddress = session?.address || session?.user?.address || session?.gst_address || session?.user?.gst_address || '';
  const sessionSupplyState = session?.supply_state || session?.user?.supply_state || session?.state || session?.user?.state || '';
  setForm({ gst_detail: sessionGst, gst: sessionName, gst_address: sessionAddress, supply_state: sessionSupplyState });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get session and token using centralized utilities
    const session = getSession();
    const authToken = getAutoToken();
    
    // Debug token information
    console.log('[GSTInfoForm] Token Debug Info:', {
      hasSession: !!session,
      hasToken: !!authToken,
      sessionId: session?.id || session?.user?.id,
      tokenPreview: authToken ? `${authToken.substring(0, 10)}...` : 'No token'
    });
    
    // Check for authentication
    if (!session || !authToken) {
      console.error('[GSTInfoForm] Missing authentication data');
      alert('Authentication required. Please log in again.');
      clearSession();
      // Note: Navigation would need to be implemented if this component is within a router context
      return;
    }
    
    const payload = {
      user_id: session?.id || session?.user?.id,
      gst_detail: form.gst_detail,
      gst: form.gst,
      gst_name: form.gst_name,
      gst_address: form.gst_address,
      supply_state: form.supply_state
    };

    try {
      console.log('[GSTInfoForm] Submitting GST information...');
      
      // Use centralized API service with automatic token injection
      const response = await api.post('/customer/gst-information/create-gst-information', payload);
      
      console.log('[GSTInfoForm] API Response:', response);
      alert('Updated!');
    } catch (error) {
      console.error('[GSTInfoForm] API Error:', error);
      
      if (error.status === 401) {
        // Handle authentication error
        console.log('[GSTInfoForm] Authentication failed, clearing session');
        clearSession();
        alert('Your session has expired. Please log in again.');
        // Note: Navigation would need to be implemented if this component is within a router context
      } else if (error.status === 400) {
        // Handle bad request with specific feedback
        const errorMessage = error.body?.message || error.body?.error || 'Invalid request data. Please check your information and try again.';
        console.error('[GSTInfoForm] Validation error:', errorMessage);
        alert(`Error: ${errorMessage}`);
      } else {
        console.error('[GSTInfoForm] Unexpected error:', error.message);
        alert('Something went wrong while submitting the form. Please try again.');
      }
    }
  };

  const downloadBill = (invoice) => {
    // Create CSV data for individual invoice
    const csvData = [
      ['Invoice ID', 'Billing Date', 'Amount', 'Status'],
      [invoice.id, invoice.billingDate, invoice.amount, invoice.status]
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

  const viewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedInvoice(null);
  };

  return (
    <div className="gst-page-container">
      {/* GST Information Section */}
      <div className="gst-info-section">
        <h2>GST Information</h2>
        <p>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</p>

        <form className="gst-info-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>GST Detail*</label>
            <div className="input-with-icon">
              <input name="gst_detail" value={form.gst_detail} onChange={handleChange} className="gst-input" />
              <span className="edit-icon">✏️</span>
            </div>
          </div>

          <div className="form-field">
            <label>GST Name</label>
            <input name="gst_name" value={form.gst_name} onChange={handleChange} type="text" />
          </div>

          <div className="form-field">
            <label>GST Address</label>
            <input name="gst_address" value={form.gst_address} onChange={handleChange} type="text" />
          </div>

          <div className="form-field">
            <label>Supply State</label>
            <input name="supply_state" value={form.supply_state} onChange={handleChange} type="text" />
          </div>

          {/* <div className="form-row"> */}
            {/* <div className="form-field">
              <label>Date of Registration*</label>
              <input name="start_date" value={form.start_date} onChange={handleChange} type="text" />
            </div> */}
            {/* <div className="form-field">
              <label>End Date*</label>
              <input name="end_date" value={form.end_date} onChange={handleChange} type="text" />
            </div> */}
          {/* </div> */}
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
  {/* plan removed intentionally */}
        <td>{invoice.amount}</td>
        <td>
          <span className={`status ${getStatusClass(invoice.status)}`}>
            {invoice.status}
          </span>
        </td>
        <td>
          <div className="action-buttons">
            <button className="action-btn view-btn" onClick={() => viewInvoice(invoice)} title="View Invoice">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.5C7.5 4.5 3.73 7.61 2.73 12C3.73 16.39 7.5 19.5 12 19.5S20.27 16.39 21.27 12C20.27 7.61 16.5 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12S9.24 7 12 7S17 9.24 17 12S14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12S10.34 15 12 15S15 13.66 15 12S13.66 9 12 9Z" fill="currentColor" />
              </svg>
            </button>
            {/* Download button intentionally removed for now */}
            {/* {invoice.status === 'Pending' && invoice.paymentLink && (
              <button className="action-btn paynow-btn" onClick={() => window.open(invoice.paymentLink, '_blank')} title="Pay Now">
                Pay Now
              </button>
            )} */}
          </div>
        </td>
      </tr>
    ))}
  </tbody>
    </table>
  </div>
</div>

{/* Invoice Details Modal */}
{showModal && selectedInvoice && (
<div className="modal-overlay" onClick={closeModal}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <div className="modal-header">
  <h3>Invoice Details</h3>
  <button className="close-btn" onClick={closeModal}>&times;</button>
</div>
<div className="modal-body">
  <div className="invoice-detail-row">
    <span className="detail-label">Invoice ID:</span>
    <span className="detail-value">{selectedInvoice.id}</span>
  </div>
 <div className="invoice-detail-row">
   <span className="detail-label">Billing Date:</span>
   <span className="detail-value">{selectedInvoice.billingDate}</span>
 </div>
 {/* <div className="invoice-detail-row">
   <span className="detail-label">Plan:</span>
   <span className="detail-value">{selectedInvoice.plan}</span>
 </div> */}
 <div className="invoice-detail-row">
   <span className="detail-label">Amount:</span>
   <span className="detail-value">${selectedInvoice.amount}</span>
 </div>
 <div className="invoice-detail-row">
   <span className="detail-label">Status:</span>
   <span className={`detail-value status ${getStatusClass(selectedInvoice.status)}`}>
     {selectedInvoice.status}
   </span>
 </div>
  </div>
  <div className="modal-footer">
  <button className="modal-download-btn" onClick={() => downloadBill(selectedInvoice)}>
    Download Invoice
  </button>
  <button className="modal-close-btn" onClick={closeModal}>
    Close
  </button>
  </div>
</div>
</div>
)}
</div>
);
};

export default GSTInfoForm;