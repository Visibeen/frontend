
// components/Layout.jsx
import React from 'react';
import Footer from './Footer';
import logo from '../../assets/VisibeenLogo.png';
import './Layout.css'; // New CSS for full-width layout

const ContactUsLayout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <img src={logo} alt="Visibeen" className="header-logo" />
      </header>

      <div className="main-section">

        <main className="main-content">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUsLayout;
