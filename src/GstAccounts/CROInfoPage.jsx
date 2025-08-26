import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import CROInfoForm from './CROInfoForm';
import './AccountInfoPage.css';

const CROInfoPage = () => (
  <div className="account-info-page">
    <Sidebar />
    <div className="main-content">
      <Header />
      <div className="account-info-card">
        <CROInfoForm />
      </div>
      <Footer />
    </div>
  </div>
);

export default CROInfoPage; 