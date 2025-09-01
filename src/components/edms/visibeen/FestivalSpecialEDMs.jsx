import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAccount } from './AccountContext';
import './FestivalSpecialEDMs.css';
import TemplateFooterVariants from './components/TemplateFooterVariants';

const templateData = [
  // Holi
  ['holi4.jpg','holi-design2.jpg','holi3.jpg', 'happy-holi.jpg'],
  // Diwali
  ['crackers copy.jpg', 'happy-diwali1.jpg', 'diwali2.jpg', 'diwali.jpg'],
  // Dussehra
  ['dussehra1.jpg', 'dussehra2.jpg', 'dussehra3.jpg', 'dussehra.jpg'],
  // Navratri
  ['happy-navratri.jpg', 'navratri2.jpg', 'navratri3.jpg', 'navratri1.jpg'],
];
const templateNames = [
  'Holi',
  'Diwali',
  'Dussehra',
  'Navratri'
];

const shareOptions = [
  { icon: 'fas fa-envelope', label: 'Email' },
  { icon: 'fab fa-facebook', label: 'Facebook' },
  { icon: 'fab fa-whatsapp', label: 'WhatsApp' },
  { icon: 'fab fa-instagram', label: 'Instagram' },
  { icon: 'fab fa-google', label: 'Google Profile', extra: <span style={{ color: '#e74c3c', fontSize: '0.9em' }}>(coming soon)</span> },
  { icon: 'fas fa-link', label: 'Copy link' },
];

const FestivalSpecialEDMs = () => {
  const location = useLocation();
  const { uploadedLogo, isLogoUploaded, loadAccountInfo, accountInfo, selectedFontStyle } = useAccount();
  const selectedFestival = location.state?.selectedFestival || 'Holi';
  
  // Load account info when component mounts
  useEffect(() => {
    loadAccountInfo();
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
  
  // Find the index of the selected festival
  const initialTemplateIndex = templateNames.findIndex(name => 
    name.toLowerCase() === selectedFestival.toLowerCase()
  );
  
  const [currentTemplate, setCurrentTemplate] = useState(
    initialTemplateIndex >= 0 ? initialTemplateIndex : 0
  );
  const [imageOrder, setImageOrder] = useState(templateData.map(() => [0, 1, 2]));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState('premium'); // Add design state
  const [mainImg, setMainImg] = useState(templateData[initialTemplateIndex >= 0 ? initialTemplateIndex : 0][1]);
  const [selectedFooterId, setSelectedFooterId] = useState(1);
  const [logoPosition, setLogoPosition] = useState(50); // Logo position (0-100)
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [customFooterColor, setCustomFooterColor] = useState('#4A90E2'); // Custom footer color
  const [showColorPicker, setShowColorPicker] = useState(false);
  const dropdownRef = useRef(null);
  const shareRef = useRef(null);

  // Update mainImg when template changes
  useEffect(() => {
    setMainImg(templateData[currentTemplate][1]);
  }, [currentTemplate]);

  // Read selected footer id from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('visibeen.selectedFooterId');
      const parsed = raw != null ? parseInt(raw, 10) : NaN;
      if (!Number.isNaN(parsed) && parsed > 0) {
        setSelectedFooterId(parsed);
      }
    } catch (e) {
      console.debug('[FestivalSpecialEDMs] could not read selected footer id', e);
    }
  }, []);

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

  // Design variations for account info overlay
  const designVariations = {
    premium: {
      name: 'Premium Gold',
      background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.85) 30%, rgba(40,40,40,0.75) 70%, rgba(60,60,60,0.6) 100%)',
      accentColor: '#FFD700',
      borderColor: 'rgba(255,215,0,0.8)',
      textGradient: 'linear-gradient(45deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)'
    },
    modern: {
      name: 'Modern Blue',
      background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(30,30,60,0.8) 50%, rgba(60,60,100,0.7) 100%)',
      accentColor: '#4FC3F7',
      borderColor: 'rgba(79,195,247,0.8)',
      textGradient: 'linear-gradient(45deg, #4FC3F7 0%, #29B6F6 50%, #4FC3F7 100%)'
    },
    elegant: {
      name: 'Elegant Purple',
      background: 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(50,20,80,0.85) 40%, rgba(80,40,120,0.75) 100%)',
      accentColor: '#E1BEE7',
      borderColor: 'rgba(225,190,231,0.8)',
      textGradient: 'linear-gradient(45deg, #E1BEE7 0%, #CE93D8 50%, #E1BEE7 100%)'
    },
    vibrant: {
      name: 'Vibrant Orange',
      background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(80,40,0,0.8) 50%, rgba(120,60,0,0.7) 100%)',
      accentColor: '#FF9800',
      borderColor: 'rgba(255,152,0,0.8)',
      textGradient: 'linear-gradient(45deg, #FF9800 0%, #FF5722 50%, #FF9800 100%)'
    },
    minimal: {
      name: 'Minimal White',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,240,240,0.9) 100%)',
      accentColor: '#333333',
      borderColor: 'rgba(51,51,51,0.8)',
      textGradient: 'linear-gradient(45deg, #333333 0%, #666666 50%, #333333 100%)'
    }
  };

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

  const downloadImage = async () => {
    try {
      // Get the large preview element
      const previewElement = document.querySelector('.large-preview');
      if (!previewElement) {
        console.error('Preview element not found');
        return;
      }

      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Get the image element inside the preview
      const imgElement = previewElement.querySelector('img');
      if (!imgElement) {
        console.error('Image element not found');
        return;
      }

      // Set canvas size
      canvas.width = imgElement.naturalWidth || 800;
      canvas.height = imgElement.naturalHeight || 600;

      // Create a new image to avoid CORS issues
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // Draw the image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Draw footer at the bottom of the image
        const footerHeight = 80; // Fixed footer height
        const footerY = canvas.height - footerHeight;
        const footerX = 0;
        const footerWidth = canvas.width;
        
        // Draw footer background - purple gradient like reference
        const gradient = ctx.createLinearGradient(footerX, footerY, footerX, footerY + footerHeight);
        gradient.addColorStop(0, `${customFooterColor}dd`); // Dark version
        gradient.addColorStop(1, `${customFooterColor}aa`); // Light version
        
        ctx.fillStyle = gradient;
        ctx.fillRect(footerX, footerY, footerWidth, footerHeight);
        
        // Draw text with exact positioning like reference
        if (accountInfo) {
          const selectedFont = getFontFamily(selectedFontStyle);
          
          // Company name - centered at top of footer
          if (accountInfo.businessName) {
            ctx.font = `bold 20px ${selectedFont}`;
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(accountInfo.businessName.toUpperCase(), footerWidth/2, footerY + 25);
          }
          
          // Address - left aligned with better spacing
          if (accountInfo.address) {
            ctx.font = `14px ${selectedFont}`;
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'left';
            ctx.fillText(`Address: ${accountInfo.address}`, 15, footerY + 50);
          }
          
          // Contact - left aligned with better spacing
          if (accountInfo.contact) {
            ctx.font = `14px ${selectedFont}`;
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'left';
            ctx.fillText(`Contact: ${accountInfo.contact}`, 15, footerY + 70);
          }
          
          // Website - right aligned with better spacing
          if (accountInfo.website) {
            ctx.font = `14px ${selectedFont}`;
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'right';
            ctx.fillText(`Website: ${accountInfo.website}`, footerWidth - 15, footerY + 70);
          }
        }

        // Draw uploaded logo if present
        if (uploadedLogo && isLogoUploaded) {
          const logoImg = new Image();
          logoImg.crossOrigin = 'anonymous';
          logoImg.onload = () => {
            const logoSize = 70;
            const logoX = 20; // Fixed position in top-left
            const logoY = 20;
            
            // Draw logo background
            ctx.fillStyle = 'rgba(255,255,255,0.95)';
            ctx.fillRect(logoX - 3, logoY - 3, logoSize + 6, logoSize + 6);
            
            // Draw logo
            ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
            
            // Convert canvas to blob and download
            canvas.toBlob((blob) => {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `visibeen-edm-${Date.now()}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }, 'image/png');
          };
          logoImg.src = uploadedLogo;
        } else {
          // Convert canvas to blob and download
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `visibeen-edm-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 'image/png');
        }
      };

      img.onerror = () => {
        // Fallback: download the original image
    const link = document.createElement('a');
        link.href = imgElement.src;
        link.download = `visibeen-edm-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

      // Set the image source
      img.src = imgElement.src;
      
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback: try to download the original image
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

  // Component to display image with account info overlay
  const ImageWithAccountInfo = ({ imageSrc, isUploadedLogo = false, imageIndex = 0, isMainPreview = false, showFooterOverlay = true }) => {
    // Create attractive footer design based on image colors
    const createAttractiveImageBasedDesign = (imageIndex) => {
      const selectedFont = getFontFamily(selectedFontStyle);
      
      // Different attractive footer styles that complement images
      const attractiveFooterStyles = {
        0: { // First photo - Vibrant & Modern
          background: `linear-gradient(135deg, ${customFooterColor}dd, ${customFooterColor}aa)`,
          companyFont: selectedFont,
          companyColor: '#ffffff', 
          detailFont: selectedFont,  
          detailColor: '#fff8dc',  
          borderStyle: '2px solid rgba(255,255,255,0.4)',
          companySize: '12px',
          detailSize: '9px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)', 
          backdropFilter: 'blur(10px)'
        },
        1: { // Second photo - Elegant & Professional
          background: `linear-gradient(135deg, ${customFooterColor}dd, ${customFooterColor}aa)`,
          companyFont: selectedFont,
          companyColor: '#ffffff',
          detailFont: selectedFont,
          detailColor: '#e6e6fa',
          borderStyle: '2px solid rgba(255,255,255,0.3)',
          companySize: '11px',
          detailSize: '8px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)'
        },
        2: { // Third photo - Sophisticated & Clean
          background: `linear-gradient(135deg, ${customFooterColor}dd, ${customFooterColor}aa)`,
          companyFont: selectedFont,
          companyColor: '#ffffff',
          detailFont: selectedFont,
          detailColor: '#f0f8ff',
          borderStyle: 'none',
          companySize: '10px',
          detailSize: '7px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(10px)'
        }
      };

      return attractiveFooterStyles[imageIndex] || attractiveFooterStyles[0];
    };

    const currentDesign = createAttractiveImageBasedDesign(imageIndex);
    
    return (
      <div style={{ 
        position: 'relative', 
        display: 'inline-block',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseMove={isMainPreview ? handleLogoMouseMove : undefined}
      onMouseUp={isMainPreview ? handleLogoMouseUp : undefined}
      onMouseLeave={isMainPreview ? handleLogoMouseUp : undefined}
      >
        <img 
          src={imageSrc} 
          alt="Template Image" 
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'cover', 
            transition: 'transform 0.3s ease' 
          }}  
        /> 
        
        {/* Draggable Logo Overlay */}
        {uploadedLogo && isLogoUploaded && isMainPreview && (
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: `${logoPosition}%`,
              transform: 'translateX(-50%)',
              cursor: isDraggingLogo ? 'grabbing' : 'grab',
              zIndex: 10,
              transition: isDraggingLogo ? 'none' : 'left 0.1s ease',
              userSelect: 'none'
            }}
            onMouseDown={handleLogoMouseDown}
          >
            <img
              src={uploadedLogo}
              alt="Uploaded Logo"
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'contain',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.9)',
                padding: '5px',
                border: '2px solid rgba(255,255,255,0.8)'
              }}
            />
          </div>
        )}
        
        {/* Dynamic Footer Design (toggleable) */}
        {showFooterOverlay && (
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          background: currentDesign.background,
          color: 'white',
          padding: '6px 12px',
          fontSize: '10px',
          lineHeight: '1.2',
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
          backdropFilter: currentDesign.backdropFilter,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '50px',
          border: currentDesign.borderStyle,
          boxShadow: currentDesign.boxShadow,
          transition: 'all 0.3s ease'
        }}>
          {/* Top content */}
          <div style={{ flex: '1' }}>
            {/* Company Name - Dynamic styling */}
            {accountInfo.businessName && (
              <div style={{ 
                fontWeight: 'bold',
                fontSize: currentDesign.companySize,
                marginBottom: '4px',
                color: currentDesign.companyColor,
                letterSpacing: '0.5px',
                fontFamily: currentDesign.companyFont,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                textTransform: 'uppercase'
              }}>
                {accountInfo.businessName}
              </div>
            )}
            
            {/* Address - Dynamic styling */}
            {accountInfo.address && (
              <div style={{ 
                fontSize: currentDesign.detailSize,
                marginBottom: '3px',
                marginTop: '6px',
                color: currentDesign.detailColor,
                textAlign: 'left',
                fontFamily: currentDesign.detailFont,
                textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.3)',
                lineHeight: '1.2'
              }}>
                Address: {accountInfo.address}
              </div>
            )}
          </div>
          
          {/* Bottom row - Contact and Website */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            marginTop: '8px'
          }}>
            {/* Contact Numbers - Bottom left */}
            {accountInfo.contact && (
              <div style={{ 
                fontSize: currentDesign.detailSize,
                color: currentDesign.detailColor,
                textAlign: 'left',
                fontFamily: currentDesign.detailFont,
                fontWeight: '500',
                textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.3)',
                lineHeight: '1.2'
              }}>
                Contact: {accountInfo.contact}
                {accountInfo.altContact && `, ${accountInfo.altContact}`}
              </div>
            )}
            
            {/* Website - Bottom right */}
            {accountInfo.website && (
              <div style={{ 
                fontSize: currentDesign.detailSize,
                color: currentDesign.detailColor,
                textAlign: 'right',
                fontFamily: currentDesign.detailFont,
                fontWeight: '400',
                textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.3)',
                lineHeight: '1.2'
              }}>
                Website: {accountInfo.website}
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    );
  };

  return (
    <>
    
      {/* Main Content */}
      <div className="main-content">
        <div className="main-title">
          <div className="products-title">Festival EDMs</div>
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
                <ImageWithAccountInfo imageSrc={require(`./${img}`)} imageIndex={idx} isMainPreview={false} showFooterOverlay={false} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                  <TemplateFooterVariants designId={selectedFooterId} accountInfo={accountInfo} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Large Preview */}
        <div className="large-preview">
          <div style={{ position: 'relative' }}>
            <ImageWithAccountInfo imageSrc={require(`./${mainImg}`)} imageIndex={templateData[currentTemplate].indexOf(mainImg)} isMainPreview={true} showFooterOverlay={false} />
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
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)'
        }}>
          <button 
            onClick={toggleColorPicker}
            style={{
              padding: '10px 20px',
              backgroundColor: '#9C27B0',
              color: 'white',
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
          <div style={{
            padding: '10px 20px',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            borderRadius: '5px',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>Current Color:</span>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: customFooterColor,
              borderRadius: '3px',
              border: '2px solid white'
            }}></div>
            <span>{customFooterColor}</span>
          </div>
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
              
              {/* Custom Color Picker */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>Custom Color:</h4>
                <input
                  type="color"
                  value={customFooterColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  style={{
                    width: '100%',
                    height: '50px',
                    border: '2px solid #ddd',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                />
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

    </>
  );
};

export default FestivalSpecialEDMs; 