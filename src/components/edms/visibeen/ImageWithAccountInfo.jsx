import React from 'react';
import { useAccount } from './AccountContext';

const ImageWithAccountInfo = ({ imageSrc, isUploadedLogo = false, imageIndex = 0, isMainPreview = false, logoPosition, isDraggingLogo, handleLogoMouseDown, handleLogoMouseMove, handleLogoMouseUp, customFooterColor, getFontFamily }) => {
  const { uploadedLogo, isLogoUploaded, accountInfo, selectedFontStyle } = useAccount();

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
      
      {/* Dynamic Footer Design */}
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
    </div>
  );
};

export default ImageWithAccountInfo; 