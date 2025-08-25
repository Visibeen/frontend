import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import GSTInfoForm from './GSTInfoForm';
import './AccountInfoPage.css';

const GSTInfoPage = () => (
  <div className="account-info-page">
    <Sidebar />
    <div className="main-content">
      <Header />
      <div className="account-info-card">
        <GSTInfoForm />
      </div>
      <Footer />
    </div>
  </div>
);

export default GSTInfoPage;
