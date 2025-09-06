import React, { useEffect, useRef, useState } from 'react';

import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

// Footer Variant 1 - Blue Professional with gradient
const FooterContainer1 = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1B365D 0%, #2B4A7A 100%)',
  padding: '14px 18px',
  borderRadius: '0 0 12px 12px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '65px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 2px 8px rgba(27, 54, 93, 0.3)'
}));

// Footer Variant 2 - Dark Blue with Contact Sections
const FooterContainer2 = styled(Box)(({ theme }) => ({
  background: 'rgb(17, 58, 76)',
  padding: '16px 20px',
  borderRadius: '0 0 12px 12px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '65px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  boxShadow: '0 2px 12px rgba(17, 58, 76, 0.4)',
  overflow: 'hidden',
  gap: '15px'
}));

const FooterLeft2 = styled(Box)(({ theme }) => ({
  flex: '0 0 auto'
}));

const FooterCenter2 = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  flex: '1'
}));

const FooterRight2 = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '8px',
  flex: '0 0 auto'
}));

const CompanyName2 = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 700,
  lineHeight: 1.2,
  color: 'white'
}));

const ContactItem2 = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '6px'
}));

const ContactIcon2 = styled(Box)(({ theme }) => ({
  width: '18px',
  height: '18px',
  background: 'rgba(29, 181, 132, 0.2)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  '& svg': {
    width: '10px',
    height: '10px'
  }
}));

const ContactText2 = styled(Box)(({ theme }) => ({
  fontSize: '6px',
  lineHeight: 1.3,
  color: '#ecf0f1'
}));

const AddressText2 = styled(Box)(({ theme }) => ({
  fontSize: '6px',
  lineHeight: 1.4,
  color: '#ecf0f1'
}));

// Footer Variant 4 - Purple with White Footer Section
const FooterContainer4 = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #c44fc4 0%, #8b4cb8 50%, #6b46c1 100%) !important',
  padding: '0',
  borderRadius: '0 0 12px 12px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '65px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'center',
  boxShadow: '0 2px 12px rgba(107, 70, 193, 0.4)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 2px, transparent 2px),
      radial-gradient(circle at 80% 30%, rgba(255,255,255,0.3) 2px, transparent 2px),
      radial-gradient(circle at 40% 10%, rgba(255,255,255,0.3) 2px, transparent 2px),
      radial-gradient(circle at 60% 15%, rgba(255,255,255,0.3) 2px, transparent 2px)
    `,
    backgroundSize: '100px 100px',
    zIndex: 1,
    pointerEvents: 'none'
  }
}));

const WhiteFootSection = styled(Box)(({ theme }) => ({
  background: 'white !important',
  width: '100%',
  padding: '12px 18px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  position: 'relative',
  zIndex: 10
}));

// Footer Variant 5 - Ocean Blue with wave pattern
const FooterContainer5 = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #06B6D4 100%)',
  padding: '14px 18px',
  borderRadius: '0 0 12px 12px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '65px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 2px 8px rgba(30, 58, 138, 0.3)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20px',
    background: 'url("data:image/svg+xml,%3Csvg width="40" height="20" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 20c10-5 20-5 40 0V20H0z" fill="rgba(255,255,255,0.1)"%3E%3C/path%3E%3C/svg%3E")',
    backgroundRepeat: 'repeat-x'
  }
}));

// Footer Variant 6 - Pixel-perfect layout (285x46) matching provided CSS with responsive scaling
const FooterContainer6 = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  color: '#ffffff'
}));

const ScaledWrapper6 = styled(Box)(({ theme }) => ({
  width: '285px',
  height: '46px',
  transformOrigin: 'top left',
  position: 'relative'
}));

const OverlapGroup6 = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '46px'
}));

const BackgroundShape6 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '285px',
  height: '32px',
  top: '13px',
  left: 0,
  background: 'linear-gradient(135deg, #003f92 0%, #0066cc 100%)',
  borderRadius: '4px'
}));

const PhoneGroup6 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '52px',
  height: '15px',
  top: '22px',
  left: '14px'
}));

const PhoneContent6 = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '43px',
  height: '15px',
  left: '13px'
}));

const PhoneNumber6 = styled(Typography)(({ theme }) => ({
  width: '39px',
  left: 0,
  fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  fontWeight: 600,
  color: '#fdfffe',
  fontSize: '5.3px',
  lineHeight: 1,
  position: 'absolute',
  letterSpacing: 0
}));

const WebsiteGroup6 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '71px',
  height: '9px',
  top: '25px',
  left: '102px'
}));

const WebsiteIcon6 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '9px',
  height: '9px',
  top: 0,
  left: 0,
  fontSize: '7px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const WebsiteText6 = styled(Typography)(({ theme }) => ({
  width: '57px',
  position: 'absolute',
  top: '2px',
  left: '13px',
  fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  fontWeight: 600,
  color: '#ffffff',
  fontSize: '5.3px',
  textAlign: 'center',
  lineHeight: 1,
  letterSpacing: 0
}));

const AddressGroup6 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '83px',
  height: '12px',
  top: '23px',
  left: '190px'
}));

const LocationIcon6 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '9px',
  height: '9px',
  top: '2px',
  left: 0,
  fontSize: '7px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const AddressText6 = styled(Typography)(({ theme }) => ({
  width: '68px',
  position: 'absolute',
  top: 0,
  left: '13px',
  fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  fontWeight: 600,
  color: '#ffffff',
  fontSize: '5.3px',
  lineHeight: 1,
  letterSpacing: 0
}));

const LogoBackground6 = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '160px',
  height: '18px',
  top: 0,
  left: '63px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
  borderRadius: '9px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
}));

const CompanyName6 = styled(Typography)(({ theme }) => ({
  width: '129px',
  position: 'absolute',
  top: '3px',
  left: '80px',
  fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
  fontWeight: 700,
  color: '#003f92',
  fontSize: '9px',
  textAlign: 'center',
  lineHeight: '11.2px',
  letterSpacing: 0
}));

// Business Name Styles with enhanced typography
const BusinessName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 700,
  color: '#ffffff',
  marginBottom: '8px',
  lineHeight: 1.2,
  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  letterSpacing: '0.5px'
}));

// Contact Info Container with better spacing
const ContactInfo = styled(Stack)(({ theme }) => ({
  gap: '4px',
  position: 'relative',
  zIndex: 1
}));

// Info Text Styles with better readability
const InfoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#ffffff',
  opacity: 0.95,
  lineHeight: 1.4,
  textShadow: '0 1px 1px rgba(0,0,0,0.2)'
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 500,
  color: '#ffffff',
  opacity: 1,
  lineHeight: 1.4,
  textShadow: '0 1px 1px rgba(0,0,0,0.2)'
}));

const WebsiteText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 500,
  color: '#ffffff',
  opacity: 1,
  lineHeight: 1.4,
  textDecoration: 'underline',
  textShadow: '0 1px 1px rgba(0,0,0,0.2)',
  '&:hover': {
    opacity: 0.8
  }
}));

const AddressText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '9px',
  fontWeight: 400,
  color: '#ffffff',
  opacity: 0.9,
  lineHeight: 1.3,
  textShadow: '0 1px 1px rgba(0,0,0,0.2)'
}));

// Pixel-perfect Template 1 styled components (color variant #121927)
const FooterContainer1PX = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative',
  color: '#ffffff'
}));

const ScaledWrapper1PX = styled(Box)(({ theme }) => ({
  width: '285px',
  height: '46px',
  transformOrigin: 'top left',
  position: 'relative'
}));

const OverlapGroup1PX = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '46px'
}));

const BackgroundShape1PX = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '285px',
  height: '32px',
  top: '13px',
  left: 0,
  background: '#121927',
  borderRadius: '4px'
}));

const PhoneGroup1PX = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '52px',
  height: '15px',
  top: '22px',
  left: '14px'
}));

const PhoneContent1PX = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '43px',
  height: '15px',
  left: '13px'
}));

const PhoneNumber1PX = styled(Typography)(({ theme }) => ({
  width: '39px',
  left: 0,
  fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  fontWeight: 600,
  color: '#fdfffe',
  fontSize: '5.3px',
  lineHeight: 1,
  position: 'absolute',
  letterSpacing: 0
}));

const WebsiteGroup1PX = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '71px',
  height: '9px',
  top: '25px',
  left: '102px'
}));

const WebsiteIcon1PX = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '9px',
  height: '9px',
  top: 0,
  left: 0,
  fontSize: '7px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const WebsiteText1PX = styled(Typography)(({ theme }) => ({
  width: '57px',
  position: 'absolute',
  top: '2px',
  left: '13px',
  fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  fontWeight: 600,
  color: '#ffffff',
  fontSize: '5.3px',
  textAlign: 'center',
  lineHeight: 1,
  letterSpacing: 0
}));

const AddressGroup1PX = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '83px',
  height: '12px',
  top: '23px',
  left: '190px'
}));

const LocationIcon1PX = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '9px',
  height: '9px',
  top: '2px',
  left: 0,
  fontSize: '7px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const AddressText1PX = styled(Typography)(({ theme }) => ({
  width: '68px',
  position: 'absolute',
  top: 0,
  left: '13px',
  fontFamily: 'Inter, Helvetica, Arial, sans-serif',
  fontWeight: 600,
  color: '#ffffff',
  fontSize: '5.3px',
  lineHeight: 1,
  letterSpacing: 0
}));

const LogoBackground1PX = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '160px',
  height: '18px',
  top: 0,
  left: '63px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
  borderRadius: '9px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
}));

const CompanyName1PX = styled(Typography)(({ theme }) => ({
  width: '129px',
  position: 'absolute',
  top: '3px',
  left: '80px',
  fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
  fontWeight: 700,
  color: '#121927',
  fontSize: '9px',
  textAlign: 'center',
  lineHeight: '11.2px',
  letterSpacing: 0
}));
// Template Footer Variants with unique layouts
// Footer 1 - Centered Layout with Icons
export const TemplateFooter1 = ({ accountInfo }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w) setScale(w / 285);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <FooterContainer1PX ref={containerRef} sx={{ height: `${46 * scale}px` }}>
      <ScaledWrapper1PX sx={{ transform: `scale(${scale})` }}>
        <OverlapGroup1PX>
          <BackgroundShape1PX />

          <PhoneGroup1PX>
            <PhoneContent1PX>
              <PhoneNumber1PX sx={{ top: '9px' }}>
                {accountInfo?.contact || '6858653555'}
              </PhoneNumber1PX>
              <PhoneNumber1PX sx={{ top: 0 }}>
                {accountInfo?.contact || '6858653555'}
              </PhoneNumber1PX>
            </PhoneContent1PX>
          </PhoneGroup1PX>

          <WebsiteGroup1PX>
            <WebsiteIcon1PX>🌐</WebsiteIcon1PX>
            <WebsiteText1PX>
              {(accountInfo?.website || 'WWW.WEBSITE.COM').toUpperCase()}
            </WebsiteText1PX>
          </WebsiteGroup1PX>

          <AddressGroup1PX>
            <LocationIcon1PX>📍</LocationIcon1PX>
            <AddressText1PX>
              {(accountInfo?.address || '2385 SYCAMORE STREET, COLUMBUS, OH 43215')}
            </AddressText1PX>
          </AddressGroup1PX>

          <LogoBackground1PX />
          <CompanyName1PX>
            {(accountInfo?.businessName || 'URBANTECH SOLUTIONS').toUpperCase()}
          </CompanyName1PX>
        </OverlapGroup1PX>
      </ScaledWrapper1PX>
    </FooterContainer1PX>
  );
};

// Footer 2 - Dark Blue with Contact Sections
export const TemplateFooter2 = ({ accountInfo }) => (
  <FooterContainer2>
    <FooterLeft2>
      <CompanyName2>
{accountInfo?.businessName || 'NorthBay'}<br />Logistics
      </CompanyName2>
    </FooterLeft2>
    
    <FooterCenter2>
      <ContactItem2>
        <ContactIcon2>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122L9.98 10.98s-.58.122-1.228-.525S7.98 9.02 7.98 9.02l.549-1.903a.678.678 0 0 0-.122-.58L6.613 4.23a.678.678 0 0 0-.959-.122z" fill="#1DB584"/>
          </svg>
        </ContactIcon2>
        <ContactText2>
          <div>{accountInfo?.contact || '+123-456-7890'}</div>
          <div>{accountInfo?.contact || '+123-456-7890'}</div>
        </ContactText2>
      </ContactItem2>
      
      <ContactItem2>
        <ContactIcon2>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#1DB584" strokeWidth="2" fill="none"/>
            <path d="M1 8h14M8 1a6.5 6.5 0 0 1 0 14 6.5 6.5 0 0 1 0-14z" stroke="#1DB584" strokeWidth="1"/>
          </svg>
        </ContactIcon2>
        <ContactText2>{accountInfo?.website || 'reallygreatsite.com'}</ContactText2>
      </ContactItem2>
    </FooterCenter2>
    
    <FooterRight2>
      <ContactIcon2 sx={{ mt: '2px' }}>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
          <path d="M8 1a5 5 0 0 0-5 5c0 3.5 5 9 5 9s5-5.5 5-9a5 5 0 0 0-5-5z" stroke="#1DB584" strokeWidth="2" fill="none"/>
          <circle cx="8" cy="6" r="2" stroke="#1DB584" strokeWidth="2" fill="none"/>
        </svg>
      </ContactIcon2>
      <AddressText2>
        {accountInfo?.address || 'B-4/168, General Chanda Singh'}<br />
        Colony, Near Fountain Chowk, Back<br />
        Side Bhagat Petrol Pump, Patiala
      </AddressText2>
    </FooterRight2>
  </FooterContainer2>
);

// Footer Container 3 - Modern Professional Style
const FooterContainer3 = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #732f00 0%, #8b3a00 50%, #a04400 100%)',
  color: '#ffffff',
  position: 'relative',
  overflow: 'hidden',
  padding: '12px 16px',
  minHeight: '65px',
  borderRadius: '0 0 12px 12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 4px 12px rgba(115, 47, 0, 0.4)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)
    `,
    zIndex: 0
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent 0%, #ff6b35 50%, transparent 100%)',
    zIndex: 1
  }
}));

const VintageOrnament = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontSize: '10px',
  color: '#8b7355',
  opacity: 0.5,
  zIndex: 1
}));

const VintageLogo = styled(Typography)(({ theme }) => ({
  fontFamily: '"Times New Roman", serif',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#d4af37',
  textShadow: '1px 1px 0px #1a0e08',
  letterSpacing: '1px',
  marginBottom: '2px'
}));

const VintageEst = styled(Typography)(({ theme }) => ({
  fontSize: '6px',
  color: '#8b7355',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  border: '1px solid #8b7355',
  padding: '1px 3px',
  background: 'rgba(139, 115, 85, 0.1)',
  display: 'inline-block'
}));

const VintageDivider = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  background: '#d4af37',
  margin: '4px 0',
  position: 'relative',
  '&::before': {
    content: '"❦"',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#2d1b16',
    color: '#d4af37',
    padding: '0 3px',
    fontSize: '6px'
  }
}));

const VintageContactLine = styled(Typography)(({ theme }) => ({
  fontSize: '7px',
  color: '#a0956b',
  textAlign: 'center',
  lineHeight: 1.2,
  '&.highlight': {
    color: '#d4af37',
    fontWeight: 'bold',
    fontSize: '8px'
  }
}));

const VintageSocial = styled(Box)(({ theme }) => ({
  width: '16px',
  height: '16px',
  background: '#d4af37',
  color: '#2d1b16',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '6px',
  fontWeight: 'bold',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: '#ffd700',
    transform: 'translateY(-1px)'
  }
}));

const VintageWebsite = styled(Typography)(({ theme }) => ({
  fontSize: '8px',
  color: '#d4af37',
  fontWeight: 'bold',
  textDecoration: 'underline',
  marginBottom: '1px'
}));

const VintageTagline = styled(Typography)(({ theme }) => ({
  fontSize: '5px',
  color: '#8b7355',
  fontStyle: 'italic',
  textTransform: 'uppercase',
  letterSpacing: '0.3px'
}));

// Modern styled components for Template 3
const ModernBusinessName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff',
  textAlign: 'center',
  marginBottom: '6px',
  letterSpacing: '0.5px',
  textShadow: '0 1px 2px rgba(0,0,0,0.3)',
  position: 'relative',
  zIndex: 2
}));

const ModernContactRow = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 2,
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '12px',
  position: 'relative',
  zIndex: 2
}));

const ModernContactItem = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '10px',
  fontWeight: 400,
  color: '#fdfffe',
  lineHeight: 1.3,
  textShadow: '0 1px 1px rgba(0,0,0,0.2)',
  '&.phone': {
    fontWeight: 500
  },
  '&.website': {
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8
    }
  }
}));

const ModernAddressText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '8px',
  fontWeight: 400,
  color: '#fdfffe',
  textAlign: 'center',
  lineHeight: 1.4,
  marginTop: '4px',
  opacity: 0.9,
  textShadow: '0 1px 1px rgba(0,0,0,0.2)',
  position: 'relative',
  zIndex: 2
}));

// Footer 3 - Modern Professional Style
export const TemplateFooter3 = ({ accountInfo }) => (
  <FooterContainer3>
    {/* Business Name */}
    <ModernBusinessName>
      {accountInfo?.businessName || 'Greenpeak Marketing'}
    </ModernBusinessName>
    
    {/* Contact Information */}
    <ModernContactRow>
      <ModernContactItem className="phone">
        Contact: {accountInfo?.contact || '+91 875550293'}, {accountInfo?.contact || '+91 875550293'}
      </ModernContactItem>
      <ModernContactItem className="website">
        Website: {accountInfo?.website || 'www.urbantechusa.com'}
      </ModernContactItem>
    </ModernContactRow>
    
    {/* Address */}
    <ModernAddressText>
      {accountInfo?.address || 'B-4/168, General Chanda Singh Colony, Near Fountain Chowk, Back Side Bhagat Petrol Pump, Patiala'}
    </ModernAddressText>
  </FooterContainer3>
);

// CTA Button Component
const CtaButton = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #8b4cb8 0%, #6b46c1 100%) !important',
  color: 'white !important',
  border: 'none',
  padding: '6px 20px',
  borderRadius: '25px',
  fontSize: '9px',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  textAlign: 'center',
  '&:hover': {
    transform: 'translateY(-1px)'
  }
}));

const FooterIconSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  alignItems: 'center'
}));

const FooterItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '6px',
  color: '#333333'
}));

const FooterIcon = styled(Box)(({ theme }) => ({
  width: '14px',
  height: '14px',
  background: 'rgba(139, 76, 184, 0.1)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '7px'
}));

const FooterTextGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1px',
  fontSize: '6px',
  lineHeight: 1.2
}));

// Footer 4 - Purple Background with White Footer Section
export const TemplateFooter4 = ({ accountInfo }) => (
  <FooterContainer4>
    {/* White Footer Section */}
    <WhiteFootSection>
      {/* CTA Button */}
      <CtaButton>
        {accountInfo?.businessName || 'BLUE HORIZON TECH'}
      </CtaButton>
      
      {/* Footer Icons */}
      <FooterIconSection>
        <FooterItem>
          <FooterIcon>🌐</FooterIcon>
          <span>{accountInfo?.website || 'www.website.com'}</span>
        </FooterItem>
        
        <FooterItem>
          <FooterIcon>📱</FooterIcon>
          <FooterTextGroup>
            <div>{accountInfo?.contact || '+91 4556665663'}</div>
            <div>{accountInfo?.contact || '+91 4556665663'}</div>
          </FooterTextGroup>
        </FooterItem>
        
        <FooterItem>
          <FooterIcon>📍</FooterIcon>
          <FooterTextGroup>
            <div>{accountInfo?.address || '123 Anywhere St., Any City'}</div>
            <div>123 Anywhere St., Any City</div>
          </FooterTextGroup>
        </FooterItem>
      </FooterIconSection>
    </WhiteFootSection>
  </FooterContainer4>
);

// Banner Footer Components
const BannerLogo = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 'bold',
  color: 'white',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
}));

const BannerCompanyName = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 'bold',
  color: 'white',
  textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)',
  marginBottom: '2px'
}));

const BannerDescription = styled(Typography)(({ theme }) => ({
  fontSize: '7px',
  color: 'white',
  opacity: 0.9,
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
}));

const ContactRibbon = styled(Box)(({ theme }) => ({
  height: '25px',
  background: '#2d3436',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 15px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-5px',
    left: 0,
    right: 0,
    height: '5px',
    background: '#2d3436',
    clipPath: 'polygon(0 100%, 5% 0, 15% 0, 20% 100%, 25% 0, 35% 0, 40% 100%, 45% 0, 55% 0, 60% 100%, 65% 0, 75% 0, 80% 100%, 85% 0, 95% 0, 100% 100%)'
  }
}));

const RibbonSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: 'white'
}));

const RibbonIcon = styled(Typography)(({ theme }) => ({
  fontSize: '8px',
  opacity: 0.8
}));

const RibbonText = styled(Typography)(({ theme }) => ({
  fontSize: '6px',
  fontWeight: 500,
  '&.highlight': {
    color: '#74b9ff',
    fontWeight: 'bold'
  },
  '&.phone': {
    color: '#00b894',
    fontWeight: 'bold'
  }
}));

const RibbonDivider = styled(Box)(({ theme }) => ({
  width: '1px',
  height: '10px',
  background: 'rgba(255, 255, 255, 0.2)'
}));

const DecorativeCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.1)',
  pointerEvents: 'none',
  animation: 'float 4s ease-in-out infinite',
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)', opacity: 0.3 },
    '50%': { transform: 'translateY(-8px)', opacity: 0.6 }
  }
}));

// Pixel-perfect Template 5 (Greenpeak style) with responsive scaling
const FooterContainer5PX = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'relative'
}));

const ScaledWrapper5PX = styled(Box)(({ theme }) => ({
  width: '285.17px',
  height: '38.3px',
  transformOrigin: 'top left',
  position: 'relative'
}));

const Frame5 = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '285.17px',
  height: '38.3px',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2.64px',
  padding: '4.75px 7.39px',
  position: 'relative',
  backgroundColor: '#121927cc'
}));

const Container5 = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '270.12px',
  gap: '2.64px',
  marginTop: '-0.74px',
  marginBottom: '-0.74px',
  alignItems: 'center',
  position: 'relative',
  flex: '0 0 auto'
}));

const Title5 = styled(Typography)(({ theme }) => ({
  position: 'relative',
  alignSelf: 'stretch',
  marginTop: '-0.26px',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 500,
  color: '#ffffff',
  fontSize: '9px',
  textAlign: 'center',
  letterSpacing: 0,
  lineHeight: '11.2px'
}));

const Info5 = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '2.64px',
  alignSelf: 'stretch',
  width: '100%',
  alignItems: 'center',
  position: 'relative',
  flex: '0 0 auto'
}));

const Address5 = styled(Typography)(({ theme }) => ({
  alignSelf: 'stretch',
  position: 'relative',
  marginTop: '-0.26px',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 400,
  color: '#fdfffe',
  fontSize: '4.8px',
  letterSpacing: 0,
  lineHeight: 1
}));

const Row5 = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  gap: '26.4px',
  alignItems: 'center',
  position: 'relative',
  flex: '0 0 auto'
}));

const Contact5 = styled(Typography)(({ theme }) => ({
  width: '97.7px',
  position: 'relative',
  marginTop: '-0.26px',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 400,
  color: '#fdfffe',
  fontSize: '4.8px',
  letterSpacing: 0,
  lineHeight: 1
}));

const Website5 = styled(Typography)(({ theme }) => ({
  width: '83.97px',
  position: 'relative',
  marginTop: '-0.26px',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 400,
  color: '#fdfffe',
  fontSize: '4.8px',
  letterSpacing: 0,
  lineHeight: 1
}));

export const TemplateFooter5 = ({ accountInfo }) => {
  const containerRef = React.useRef(null);
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w) setScale(w / 285.17);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const businessName = accountInfo?.businessName || 'Greenpeak Marketing';
  const contact = accountInfo?.contact || '+91 875550293';
  const website = accountInfo?.website || 'www.urbantechusa.com';
  const address = accountInfo?.address || 'B-4/168, General Chanda Singh Colony, Near Fountain Chowk, Back Side Bhagat Petrol Pump, Patiala';

  return (
    <FooterContainer5PX ref={containerRef} sx={{ height: `${38.3 * scale}px` }}>
      <ScaledWrapper5PX sx={{ transform: `scale(${scale})` }}>
        <Frame5>
          <Container5>
            <Title5>{businessName}</Title5>
            <Info5>
              <Address5>Address: {address}</Address5>
              <Row5>
                <Contact5>Contact: {contact} , {contact}</Contact5>
                <Website5>
                  Website: {website}
                </Website5>
              </Row5>
            </Info5>
          </Container5>
        </Frame5>
      </ScaledWrapper5PX>
    </FooterContainer5PX>
  );
};

// Footer 6 - Blue gradient info bar with company pill
export const TemplateFooter6 = ({ accountInfo }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w) {
          setScale(w / 285);
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <FooterContainer6 ref={containerRef} sx={{ height: `${46 * scale}px` }}>
      <ScaledWrapper6 sx={{ transform: `scale(${scale})` }}>
        <OverlapGroup6>
          <BackgroundShape6 />

          <PhoneGroup6>
            <PhoneContent6>
              <PhoneNumber6 sx={{ top: '9px' }}>
                {accountInfo?.contact || '6858653555'}
              </PhoneNumber6>
              <PhoneNumber6 sx={{ top: 0 }}>
                {accountInfo?.contact || '6858653555'}
              </PhoneNumber6>
            </PhoneContent6>
          </PhoneGroup6>

          <WebsiteGroup6>
            <WebsiteIcon6>🌐</WebsiteIcon6>
            <WebsiteText6>
              {(accountInfo?.website || 'WWW.WEBSITE.COM').toUpperCase()}
            </WebsiteText6>
          </WebsiteGroup6>

          <AddressGroup6>
            <LocationIcon6>📍</LocationIcon6>
            <AddressText6>
              {(accountInfo?.address || '2385 SYCAMORE STREET, COLUMBUS, OH 43215')}
            </AddressText6>
          </AddressGroup6>

          <LogoBackground6 />
          <CompanyName6>
            {(accountInfo?.businessName || 'URBANTECH SOLUTIONS').toUpperCase()}
          </CompanyName6>
        </OverlapGroup6>
      </ScaledWrapper6>
    </FooterContainer6>
  );
};

// Main component that selects the appropriate footer variant
const TemplateFooterVariants = ({ designId, accountInfo }) => {
  const footerComponents = {
    1: TemplateFooter1,
    2: TemplateFooter2,
    3: TemplateFooter3,
    4: TemplateFooter4,
    5: TemplateFooter5,
    6: TemplateFooter6
  };

  const FooterComponent = footerComponents[designId] || TemplateFooter1;
  
  return <FooterComponent accountInfo={accountInfo} />;
};

export default TemplateFooterVariants;