import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Layouts/DashboardLayout';
import './SelectEDM.css';
import visibenLogo from './VISIBEN.svg';
import productEDM from './Frame 5.svg';
import festivalEDM from './Frame 6.svg';  
import specialDayEDM from './Frame 7.svg';

const edmOptions = [
  {
    img: productEDM,
    title: "Product EDM's",
    alt: "Product EDM's",
  },
  {
    img: festivalEDM,
    title: "Festival EDM's",
    alt: "Festival EDM's",
  },
  {
    img: specialDayEDM,
    title: "Special Day EDM's",
    alt: "Special Day EDM's",
  },
];

const SelectEDM = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (idx) => {
    setSelected(idx);
    setTimeout(() => {
      // Navigate to different EDM pages based on selection
      const edmRoutes = ['/products-edms', '/festival-edms', '/special-days-edms'];
      navigate(edmRoutes[idx] || '/products-edms');
    }, 200);
  };

  return (
    <DashboardLayout>
      <div className="container">
        <div className="welcome-box">
          <div className="welcome-logo">
            <img src={visibenLogo} alt="VISIBEEN Logo" />
          </div>
          <div className="welcome-sub">Welcome</div>
          <div className="welcome-title">E2E Digitech Pvt Ltd</div>
        </div>
        <div className="edm-section">
          <div className="edm-title">Select your EDM's</div>
          <div className="edm-desc">Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</div>
          <div className="edm-cards">
            {edmOptions.map((edm, idx) => (
              <div
                className={`edm-card${selected === idx ? ' selected' : ''}`}
                key={edm.title}
                onClick={() => handleCardClick(idx)}
              >
                <img src={edm.img} alt={edm.alt} />
                <div className="edm-card-title">{edm.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SelectEDM; 