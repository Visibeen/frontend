import React from 'react';
import './PurchaseLogo.css';
import visibenLogo from './VISIBEN.svg';

const PurchaseLogo = () => (
  <>
   


    <div className="purchase-section center">
      <div className="purchase-title">Purchase logo</div>
      <div className="purchase-desc">Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</div>
      <form className="form">
        <div className="form-group">
          <label>Name<span className="required">*</span></label>
          <input type="text" placeholder="Enter name" required />
        </div>
        <div className="form-group">
          <label>Business Name<span className="required">*</span></label>
          <input type="text" placeholder="Enter business name" required />
        </div>
        <div className="form-group">
          <label>Email Id<span className="required">*</span></label>
          <input type="email" placeholder="Enter email id" required />
        </div>
        <div className="form-group">
          <label>Contact Number<span className="required">*</span></label>
          <input type="text" placeholder="Enter contact number" required />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>

  </>
);

export default PurchaseLogo; 