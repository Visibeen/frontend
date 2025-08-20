import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from './AccountContext';
import './FontStyleSelection.css';
import logo from '../visibeen/VISIBEN.svg';

const fontStyles = [
  'Modern',
  'Elegant',
  'Slab',
  'Hand Written',
  'Playful',
  'Futuristic',
 ];

const FontStyleSelection = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const { updateFontStyle } = useAccount();

  const handleSelect = (idx) => setSelected(idx);

  const handleGenerate = () => {
    if (selected !== null) {
      updateFontStyle(fontStyles[selected]);
      navigate('/select-edm');
    } else {
      alert('Please select a font style first.');
    }
  };

  return (
    
      <main className="main-container">
         {/* <section className="welcome-box" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src={logo} alt="VISIBEEN Logo" className="main-logo" style={{ height: 48, marginBottom: 12 }} />
          <div className="welcome-title" style={{ margin: 0 }}>Welcome</div>
          <div className="welcome-company">E2E Digitech Pvt Ltd</div>
        </section>*/}
        <section className="font-style-box">
          <div className="font-style-title">Select Font Styles That You Like</div>
          <div className="font-style-desc">Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing</div>
          <div className="font-style-grid">
            {fontStyles.map((style, idx) => (
              <a
                href="#"
                className="font-style-link"
                key={style}
                onClick={e => { e.preventDefault(); handleSelect(idx); }}
              >
                <div className={`font-style-card${selected === idx ? ' selected' : ''}`}>{style}</div>
              </a>
            ))}
          </div>
          <button className="font-style-btn" onClick={handleGenerate}>Generate</button>
        </section>
      </main>
  );
};

export default FontStyleSelection; 