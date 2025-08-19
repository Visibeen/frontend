import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from './AccountContext';
import DashboardLayout from '../../Layouts/DashboardLayout';
import './SelectDesign.css';
import visibenLogo from './VISIBEN.svg';
import plotOnSale from './Plot  on sale.png';
import plotOnSale1 from './Plot on sale1.png';
import greenPeak from './GreenPeak Marketing.png';
import exportWebDev from './Export  Web Development services.png';
import digitalMarket from './digital market agency.png';
import carRepair from './car repair.png';

const designs = [
  {
    href: 'design1.html',
    img: plotOnSale, 
    title: '',
    desc: '',
    label: '',
  },
  {
    href: 'design2.html',
    img: plotOnSale1,
    title: '',
    desc: '',
    label: '',
  },
  {
    href: 'design3.html',
    img: greenPeak,
    title: '',
    desc: '',
    label: '',
  },
  {
    href: 'design4.html',
    img: exportWebDev,
    title: '',
    desc: '',
    label: '',
  },
  {
    href: 'design5.html',
    img: digitalMarket,
    title: '',
    desc: '',
    label: '',
  },
  {
    href: 'design6.html',
    img: carRepair,
    title: '',
    desc: '',
    label: '',
  },
];

const SelectDesign = () => {
  const navigate = useNavigate();
  const { accountInfo } = useAccount();
  
  const handleCardClick = () => {
    navigate('/font-style');
  };

  return (
    <DashboardLayout>
      <main>
        <section className="welcome-section">
          <img src={visibenLogo} width={143} height={48} alt="VISIBEEN Logo" />
          <div style={{ marginBottom: 8 }}>Welcome</div>
          <h2>E2E Digitech Pvt Ltd</h2>
        </section>
        <section className="select-design-section">
          <h3>Select Design</h3>
          <p>Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</p>
          <div className="design-grid">
            {designs.map((design, idx) => (
              <div className="design-card" key={idx} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                <img src={design.img} alt={design.label} style={{ width: '100%', height: 'auto' }} />
                <div className="design-title">{design.title}</div>
                <div className="design-desc">{design.desc}</div>
                <div className="design-label">{design.label}</div>
                <div className="design-footer">
                  <div className="footer-info">
                    <div className="footer-business-name">{accountInfo.businessName || 'Your Business Name'}</div>
                    <div className="footer-contact">Contact: {accountInfo.contact || '+91 1234567890'}</div>
                    <div className="footer-website">{accountInfo.website || 'www.yourwebsite.com'}</div>
                    <div className="footer-address">{accountInfo.address || 'your business address'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default SelectDesign; 