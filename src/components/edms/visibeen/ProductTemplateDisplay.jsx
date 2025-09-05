import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAccount } from './AccountContext';
import './ProductsEDMs.css'; // Reusing ProductsEDMs.css for initial styling
import visibenLogo from './VISIBEN.svg';
import ImageWithAccountInfo from './ImageWithAccountInfo';
import TemplateFooterVariants from './components/TemplateFooterVariants';

// Import all template images
import car1 from './car1.jpg';
import digitalMarketAgency from './digital market agency.png';
import home from './home.jpg';
import exportWebDev from './Export  Web Development services.png';
import carRepair from './car repair.png';
import crackers from './crackers.jpg';
import car2 from './car2.jpg';
import plotOnSale from './Plot  on sale.png';
import car3 from './car3.jpg';
import car4 from './car4.jpeg';
import car5 from './car5.jpg';
import car6 from './car6.jpg';

const templateData = [
  // Product Template 1 - Use placeholder images from visibeen
  [car1, digitalMarketAgency, home],
  // Product Template 2
  [exportWebDev, carRepair, crackers],
  // Product Template 3
  [car2, plotOnSale, car3],
  // Product Template 4
  [car4, car5, car6],
];

const templateNames = [
  'Template 1',
  'Template 2',
  'Template 3',
  'Template 4',
];

const shareOptions = [
  { icon: 'fas fa-envelope', label: 'Email' },
  { icon: 'fab fa-facebook', label: 'Facebook' },
  { icon: 'fab fa-whatsapp', label: 'WhatsApp' },
  { icon: 'fab fa-instagram', label: 'Instagram' },
  { icon: 'fab fa-google', label: 'Google Profile', extra: <span style={{ color: '#e74c3c', fontSize: '0.9em' }}>(coming soon)</span> },
  { icon: 'fas fa-link', label: 'Copy link' },
];

const ProductTemplateDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { uploadedLogo, isLogoUploaded, loadAccountInfo, accountInfo, selectedFontStyle } = useAccount();
  const selectedProductTemplate = location.state?.selectedTemplate || templateNames[0];

  const initialTemplateIndex = templateNames.findIndex(name => 
    name.toLowerCase() === selectedProductTemplate.toLowerCase()
  );
  
  const [currentTemplate, setCurrentTemplate] = useState(
    initialTemplateIndex >= 0 ? initialTemplateIndex : 0
  );
  const [imageOrder, setImageOrder] = useState(templateData.map(() => [0, 1, 2]));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [mainImg, setMainImg] = useState(templateData[initialTemplateIndex >= 0 ? initialTemplateIndex : 0][1]);
  const [selectedFooterId, setSelectedFooterId] = useState(1);
  const [logoPosition, setLogoPosition] = useState(50); // Logo position (0-100)
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [customFooterColor, setCustomFooterColor] = useState('#4A90E2'); // Custom footer color
  const [showColorPicker, setShowColorPicker] = useState(false);
  const dropdownRef = useRef(null);
  const shareRef = useRef(null);
  const largePreviewRef = useRef(null);

  // Load account info when component mounts
  useEffect(() => {
    loadAccountInfo();
  }, []);

  // Read selected footer id from localStorage (persisted by SelectDesignPage)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('visibeen.selectedFooterId');
      const parsed = raw != null ? parseInt(raw, 10) : NaN;
      if (!Number.isNaN(parsed) && parsed > 0) {
        setSelectedFooterId(parsed);
      }
    } catch (e) {
      console.debug('[ProductTemplateDisplay] could not read selected footer id', e);
    }
  }, []);

  // Function to get font family based on selected font style
  const getFontFamily = (fontStyle) => {
    const fontMappings = {
      'Modern': 'Arial, Helvetica, sans-serif',
      'Elegant': 'Georgia, Times New Roman, serif',
      'Slab': 'Roboto Slab, Georgia, serif',
      'Hand Written': 'Cursive, Brush Script MT, cursive',
      'Playful': 'Comic Sans MS, cursive, sans-serif',
      'Futuristic': 'Orbitron, Arial, sans-serif'
    };
    return fontMappings[fontStyle] || 'Arial, sans-serif';
  };

  // Update mainImg when template changes
  useEffect(() => {
    setMainImg(templateData[currentTemplate][1]);
  }, [currentTemplate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShareOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const updateTemplate = (idx) => {
    setCurrentTemplate(idx);
    setDropdownOpen(false);
    setImageOrder([0, 1, 2]); // Reset image order when changing template
  };

  const rotateLeft = () => {
    setImageOrder((prev) => {
      const newOrder = [...prev];
      const order = newOrder[currentTemplate];
      newOrder[currentTemplate] = [order[1], order[2], order[0]];
      return newOrder;
    });
  };
  const rotateRight = () => {
    setImageOrder((prev) => {
      const newOrder = [...prev];
      const order = newOrder[currentTemplate];
      newOrder[currentTemplate] = [order[2], order[0], order[1]];
      return newOrder;
    });
  };

  // Logo interaction functions
  const handleLogoMouseDown = (e) => {
    e.preventDefault();
    setIsDraggingLogo(true);
  };

  const handleLogoMouseMove = (e) => {
    if (!isDraggingLogo) return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setLogoPosition(percentage);
  };

  const handleLogoMouseUp = () => {
    setIsDraggingLogo(false);
  };

  const moveLogoLeft = () => {
    setLogoPosition(prev => Math.max(0, prev - 10));
  };

  const moveLogoRight = () => {
    setLogoPosition(prev => Math.min(100, prev + 10));
  };

  // Color picker functions
  const handleColorChange = (color) => {
    setCustomFooterColor(color);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };
 
  const downloadImage = async () => {
    try {
      if (!largePreviewRef.current) {
        console.error('Large preview container not found');
        return;
      }

      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(largePreviewRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false
      });

      const link = document.createElement('a');
      link.download = `visibeen-edm-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image with html2canvas:', error);
      // Fallback: try to download the main image if present
      const imgElement = document.querySelector('.large-preview img');
      if (imgElement) {
        const link = document.createElement('a');
        link.href = imgElement.src;
        link.download = `visibeen-edm-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
     
      <div className="main-content">
        <div className="main-title">
          <div className="products-title">Product EDMs</div>
          <div className="products-subtitle">Select your Template</div>
        </div>
        {/* Dropdown */}
        <div className="template-section">
          <div className={`custom-dropdown${dropdownOpen ? ' open' : ''}`} ref={dropdownRef}>
            <div className="custom-dropdown-selected" onClick={() => setDropdownOpen((open) => !open)}>
              {templateNames[currentTemplate]} <span className="dropdown-arrow">&#9660;</span>
            </div>
            <ul className="custom-dropdown-list">
              {templateNames.map((name, idx) => (
                <li key={name} onClick={() => updateTemplate(idx)}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* Card Previews */}
        <div className="card-preview-row">
          {templateData[currentTemplate].map((img, idx) => (
            <div key={`${img}-${idx}`} className={`card-preview${mainImg === img ? ' selected' : ''}`} onClick={() => {
              // Set the clicked image as the main preview
              setMainImg(img);
            }}>
              <div style={{ position: 'relative' }}>
                <ImageWithAccountInfo imageSrc={img} imageIndex={idx} isMainPreview={false} 
                  logoPosition={logoPosition} isDraggingLogo={isDraggingLogo} 
                  handleLogoMouseDown={handleLogoMouseDown} handleLogoMouseMove={handleLogoMouseMove} handleLogoMouseUp={handleLogoMouseUp}
                  customFooterColor={customFooterColor} getFontFamily={getFontFamily} showFooterOverlay={false}
                />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                  <TemplateFooterVariants designId={selectedFooterId} accountInfo={accountInfo} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Large Preview */}
        <div className="large-preview">
          <div ref={largePreviewRef} style={{ position: 'relative' }}>
            <ImageWithAccountInfo imageSrc={mainImg} imageIndex={templateData[currentTemplate].indexOf(mainImg)} isMainPreview={true} 
                logoPosition={logoPosition} isDraggingLogo={isDraggingLogo} 
                handleLogoMouseDown={handleLogoMouseDown} handleLogoMouseMove={handleLogoMouseMove} handleLogoMouseUp={handleLogoMouseUp}
                customFooterColor={customFooterColor} getFontFamily={getFontFamily} showFooterOverlay={false}
            />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
              <TemplateFooterVariants designId={selectedFooterId} accountInfo={accountInfo} />
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn-download" onClick={downloadImage}>Download</button>
          <div className="share-btn-wrapper" ref={shareRef}>
            <button className="btn-share" onClick={() => setShareOpen((open) => !open)} id="shareBtn">Share</button>
            {shareOpen && (
              <div className="share-menu" id="shareMenu">
                <ul>
                  {shareOptions.map((opt, idx) => (
                    <li key={opt.label}><i className={opt.icon}></i> {opt.label} {opt.extra || null}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Logo Control Buttons */}
        {uploadedLogo && isLogoUploaded && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)'
          }}>
            <button 
              onClick={moveLogoLeft}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              ← Move Logo Left
            </button>
            {/* <div style={{
              padding: '10px 20px',
              backgroundColor: 'rgba(0,0,0,0.7)', 
              color: 'white', 
              borderRadius: '5px', 
              fontSize: '14px', 
              fontWeight: 'bold' 
            }}> 
              Position: {Math.round(logoPosition)}% 
            </div>  */}
            <button  
              onClick={moveLogoRight} 
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#2196F3', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer', 
                fontSize: '14px', 
                fontWeight: 'bold', 
                transition: 'background-color 0.3s ease' 
              }} 
              onMouseOver={(e) => e.target.style.backgroundColor = '#1976D2'} 
              onMouseOut={(e) => e.target.style.backgroundColor = '#2196F3'} 
            > 
              Move Logo Right → 
            </button> 
          </div> 
        )} 
         
        {/* Footer Color Picker */} 
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: 'rgba(216, 205, 205, 0.1)', 
          borderRadius: '10px', 
          backdropFilter: 'blur(10px)' 
        }}> 
          <button  
            onClick={toggleColorPicker} 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#9C27B0', 
              color: 'white',
              width: '200px',
              height: '45px',
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',  
              fontSize: '14px',  
              fontWeight: 'bold',  
              transition: 'background-color 0.3s ease' 
            }} 
            onMouseOver={(e) => e.target.style.backgroundColor = '#7B1FA2'} 
            onMouseOut={(e) => e.target.style.backgroundColor = '#9C27B0'} 
          > 
            🎨 Change Footer Color 
          </button> 
         
           
          
        </div>
        
        {/* Color Picker Modal */}
        {showColorPicker && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }} onClick={toggleColorPicker}>
            <div style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              minWidth: '300px'
            }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>Choose Footer Color</h3>
              
              {/* Preset Colors */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>Preset Colors:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                  {['#4A90E2', '#E74C3C', '#2ECC71', '#F39C12', '#9B59B6', '#1ABC9C', '#E67E22', '#34495E', '#FF6B6B', '#4ECDC4'].map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: color,
                        border: '2px solid #ddd',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              
              
              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={toggleColorPicker}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6C757D',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleColorChange('#4A90E2');
                    toggleColorPicker();
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#DC3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    
  );
};

export default ProductTemplateDisplay;
