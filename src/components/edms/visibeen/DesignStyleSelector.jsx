import React, { useState } from 'react';
import { useAccount } from './AccountContext';
import ImageWithAccountInfo from './ImageWithAccountInfo';
import './DesignStyleSelector.css';

const DesignStyleSelector = () => {
  const { accountInfo, uploadedLogo } = useAccount();
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [selectedPosition, setSelectedPosition] = useState('bottom-right');

  const designStyles = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional with blue accents',
      preview: 'modern-preview'
    },
    {
      id: 'elegant',
      name: 'Elegant',
      description: 'Sophisticated with gold accents and serif fonts',
      preview: 'elegant-preview'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and clean with white background',
      preview: 'minimal-preview'
    },
    {
      id: 'bold',
      name: 'Bold',
      description: 'Strong and eye-catching with red accents',
      preview: 'bold-preview'
    }
  ];

  const positions = [
    { id: 'bottom-right', name: 'Bottom Right' },
    { id: 'bottom-left', name: 'Bottom Left' },
    { id: 'top-right', name: 'Top Right' },
    { id: 'top-left', name: 'Top Left' },
    { id: 'center', name: 'Center' }
  ];

  const demoImage = 'car1.jpg';

  return (
    <div className="design-style-selector">
      <div className="selector-header">
        <h1>Choose Your Design Style</h1>
        <p>Select how your business information will appear on your marketing materials</p>
      </div>

      <div className="selector-content">
        <div className="style-options">
          <h3>Design Styles</h3>
          <div className="style-grid">
            {designStyles.map((style) => (
              <div 
                key={style.id}
                className={`style-option ${selectedStyle === style.id ? 'selected' : ''}`}
                onClick={() => setSelectedStyle(style.id)}
              >
                <div className="style-preview">
                  <ImageWithAccountInfo
                    imageSrc={require(`./${demoImage}`)}
                    position="bottom-right"
                    showBusinessName={true}
                    showWebsite={true}
                    showContact={true}
                    showAddress={true}
                    showLogo={true}
                    designStyle={style.id}
                    style={{ maxWidth: '200px', height: 'auto' }}
                  />
                </div>
                <div className="style-info">
                  <h4>{style.name}</h4>
                  <p>{style.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="position-options">
          <h3>Position Options</h3>
          <div className="position-grid">
            {positions.map((position) => (
              <div 
                key={position.id}
                className={`position-option ${selectedPosition === position.id ? 'selected' : ''}`}
                onClick={() => setSelectedPosition(position.id)}
              >
                <div className="position-preview">
                  <ImageWithAccountInfo
                    imageSrc={require(`./${demoImage}`)}
                    position={position.id}
                    showBusinessName={true}
                    showWebsite={true}
                    showContact={true}
                    showAddress={true}
                    showLogo={true}
                    designStyle={selectedStyle}
                    style={{ maxWidth: '150px', height: 'auto' }}
                  />
                </div>
                <span>{position.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="final-preview">
          <h3>Final Preview</h3>
          <div className="preview-container">
            <ImageWithAccountInfo
              imageSrc={require(`./${demoImage}`)}
              position={selectedPosition}
              showBusinessName={true}
              showWebsite={true}
              showContact={true}
              showAddress={true}
              showLogo={true}
              designStyle={selectedStyle}
            />
          </div>
          <div className="preview-info">
            <p><strong>Style:</strong> {designStyles.find(s => s.id === selectedStyle)?.name}</p>
            <p><strong>Position:</strong> {positions.find(p => p.id === selectedPosition)?.name}</p>
            {uploadedLogo && <p><strong>Logo:</strong> ✓ Included</p>}
            {!uploadedLogo && <p><strong>Logo:</strong> ✗ Not uploaded</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStyleSelector; 