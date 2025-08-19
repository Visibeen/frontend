import React, { useRef, useEffect } from 'react';
import { useAccount } from './AccountContext';
import './ImageWithAccountInfo.css';

const ImageWithAccountInfo = ({ 
  imageSrc, 
  className = '', 
  style = {},
  showBusinessName = true,
  showWebsite = true,
  showContact = true,
  showAddress = true,
  showLogo = true,
  position = 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left', 'center'
  designStyle = 'modern' // 'modern', 'elegant', 'minimal', 'bold'
}) => {
  const canvasRef = useRef(null);
  const { accountInfo, uploadedLogo } = useAccount();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the original image
      ctx.drawImage(img, 0, 0);
      
      // Add account information overlay
      addAccountInfoOverlay(ctx, canvas.width, canvas.height);
    };
    
    img.src = imageSrc;
  }, [imageSrc, accountInfo, uploadedLogo, position, showBusinessName, showWebsite, showContact, showAddress, showLogo, designStyle]);

  const addAccountInfoOverlay = (ctx, width, height) => {
    const { businessName, website, contact, altContact, address } = accountInfo;
    
    // Calculate position based on position prop
    let x, y;
    const padding = 20;
    const lineHeight = 25;
    
    switch (position) {
      case 'bottom-right':
        x = width - 350;
        y = height - 150;
        break;
      case 'bottom-left':
        x = padding;
        y = height - 150;
        break;
      case 'top-right':
        x = width - 350;
        y = padding + 40;
        break;
      case 'top-left':
        x = padding;
        y = padding + 40;
        break;
      case 'center':
        x = width / 2 - 175;
        y = height / 2 - 75;
        break;
      default:
        x = width - 350;
        y = height - 150;
    }
    
    // Create text lines
    const textLines = [];
    if (showBusinessName && businessName) textLines.push(businessName);
    if (showWebsite && website) textLines.push(website);
    if (showContact && contact) textLines.push(`Contact: ${contact}`);
    if (showContact && altContact) textLines.push(`Alt: ${altContact}`);
    if (showAddress && address) textLines.push(address);
    
    if (textLines.length === 0) return;
    
    // Apply design style
    applyDesignStyle(ctx, x, y, textLines, designStyle);
    
    // Add logo if available
    if (showLogo && uploadedLogo) {
      addLogoToCanvas(ctx, x, y, textLines.length * lineHeight);
    }
  };

  const applyDesignStyle = (ctx, x, y, textLines, style) => {
    const lineHeight = 25;
    
    switch (style) {
      case 'elegant':
        // Elegant design with gradient background and serif font
        const bgHeight = textLines.length * lineHeight + 30;
        const bgWidth = Math.max(...textLines.map(line => ctx.measureText(line).width)) + 40;
        
        // Gradient background
        const gradient = ctx.createLinearGradient(x - 20, y - 15, x + bgWidth - 20, y + bgHeight - 15);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x - 20, y - 15, bgWidth, bgHeight);
        
        // Elegant border
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 20, y - 15, bgWidth, bgHeight);
        
        // Text with elegant styling
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Georgia, serif';
        ctx.textAlign = 'left';
        
        textLines.forEach((line, index) => {
          ctx.fillText(line, x, y + (index * lineHeight));
        });
        break;
        
      case 'minimal':
        // Minimal design with clean lines
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillRect(x - 15, y - 10, 320, textLines.length * lineHeight + 20);
        
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 15, y - 10, 320, textLines.length * lineHeight + 20);
        
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial, sans-serif';
        ctx.textAlign = 'left';
        
        textLines.forEach((line, index) => {
          ctx.fillText(line, x, y + (index * lineHeight));
        });
        break;
        
      case 'bold':
        // Bold design with strong colors
        const boldBgHeight = textLines.length * lineHeight + 25;
        const boldBgWidth = Math.max(...textLines.map(line => ctx.measureText(line).width)) + 30;
        
        ctx.fillStyle = 'rgba(220, 20, 60, 0.9)';
        ctx.fillRect(x - 15, y - 12, boldBgWidth, boldBgHeight);
        
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.strokeRect(x - 15, y - 12, boldBgWidth, boldBgHeight);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial, sans-serif';
        ctx.textAlign = 'left';
        
        textLines.forEach((line, index) => {
          ctx.fillText(line, x, y + (index * lineHeight));
        });
        break;
        
      default: // modern
        // Modern design with rounded corners effect and modern typography
        const modernBgHeight = textLines.length * lineHeight + 25;
        const modernBgWidth = Math.max(...textLines.map(line => ctx.measureText(line).width)) + 35;
        
        // Modern background with subtle shadow effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(x - 17, y - 12, modernBgWidth, modernBgHeight);
        
        // Modern border
        ctx.strokeStyle = 'rgba(0, 150, 230, 0.8)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x - 17, y - 12, modernBgWidth, modernBgHeight);
        
        // Modern text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 15px Arial, sans-serif';
        ctx.textAlign = 'left';
        
        textLines.forEach((line, index) => {
          ctx.fillText(line, x, y + (index * lineHeight));
        });
        break;
    }
  };

  const addLogoToCanvas = (ctx, x, y, textHeight) => {
    if (!uploadedLogo) return;
    
    const logoImg = new Image();
    logoImg.onload = () => {
      // Calculate logo position (top-right of the text block)
      const logoSize = 60;
      const logoX = x + 280; // Position logo to the right of text
      const logoY = y - 10;
      
      // Draw logo with white border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.strokeRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
      
      // Draw logo
      ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
    };
    logoImg.src = uploadedLogo;
  };

  return (
    <div className={`image-with-account-info ${className}`} style={style}>
      <canvas
        ref={canvasRef}
        className="account-info-canvas"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default ImageWithAccountInfo; 