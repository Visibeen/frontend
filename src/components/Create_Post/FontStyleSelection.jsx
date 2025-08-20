import React, { useState, useEffect } from "react";
import visibeenLogo from "../../assets/VisibeenLogo.png";
import '../edms/visibeen/FontStyleSelection.css';
import { useNavigate } from 'react-router-dom';

const FONT_STYLES = [
  "Modern",
  "Elegant",
  "Slab",
  "Hand Written",
  "Playful",
  "Futuristic"
];

export default function FontStyleSelection({ selectedStyles = [], onGenerate, onBack }) {
  // Only one style can be selected at a time
  const [selected, setSelected] = useState(selectedStyles[0] ? [selectedStyles[0]] : []);

  const toggleStyle = (style) => {
    console.log('Toggling style:', style);
    setSelected((prev) =>
      prev[0] === style ? [] : [style]
    );
    console.log('New selected state (after toggle):', selected);
  };

  const navigate = useNavigate();
  const handleGenerate = () => {
    console.log('Generate button clicked. Current selected:', selected);
    if (selected.length > 0) {
      // You can still call onGenerate if it does something else, but navigation will happen here
      navigate('../select-edm');
    }
  };

  return (
    <div className="font-style-page">
      {/* Logo and Welcome Section */}
      <div className="font-style-header-card">
        <img src={visibeenLogo} alt="VISIBEEN Logo" className="font-style-logo" />
        <div className="font-style-welcome">Welcome</div>
        <div className="font-style-company">E2E Digitech Pvt Ltd</div>
      </div>
      {/* Title, Description, and Font Style Grid */}
      <div className="font-style-card">
        <div className="font-style-title">Select Font Styles That You Like</div>
        <div className="font-style-desc">
          Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing
        </div>
        <div className="font-style-grid">
          {FONT_STYLES.map((style) => (
            <div
              key={style}
              className={`font-style-box${selected.includes(style) ? " selected" : ""}`}
              onClick={() => toggleStyle(style)}
            >
              {style}
            </div>
          ))}
        </div>
        {/* Generate and Back Buttons with gap and fixed width */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', width: '100%', marginTop: 8 }}>
          <button
            className="font-style-generate"
            onClick={handleGenerate}
            disabled={selected.length === 0}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}