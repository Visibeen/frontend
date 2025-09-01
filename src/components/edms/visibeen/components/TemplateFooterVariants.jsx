import React from 'react';
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

// Footer Variant 6 - Industrial Steel with metallic accent
const FooterContainer6 = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #374151 0%, #4B5563 50%, #6B7280 100%)',
  padding: '14px 18px',
  borderRadius: '0 0 12px 12px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '65px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 2px 8px rgba(55, 65, 81, 0.4)',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '8px',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '30px',
    background: 'linear-gradient(180deg, #FFA500 0%, #FF6B35 100%)',
    borderRadius: '2px'
  }
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

// Template Footer Variants with unique layouts
// Footer 1 - Centered Layout with Icons
export const TemplateFooter1 = ({ accountInfo }) => (
  <FooterContainer1>
    <BusinessName sx={{ textAlign: 'center', textTransform: 'uppercase' }}>
      {accountInfo?.businessName || 'URBANTECH SOLUTIONS'}
    </BusinessName>
    <ContactInfo sx={{ alignItems: 'center' }}>
      <Stack direction="row" spacing={3} sx={{ justifyContent: 'center', flexWrap: 'wrap' }}>
        <ContactText> {accountInfo?.contact || '+91 1234567890'}</ContactText>
        <WebsiteText> {accountInfo?.website || 'www.urbantechsolutions.com'}</WebsiteText>
      </Stack>
      <AddressText sx={{ textAlign: 'center', fontSize: '8px', mt: 1 }}>
        {accountInfo?.address || '123 Tech Park, Bangalore, Karnataka 560001'}
      </AddressText>
    </ContactInfo>
  </FooterContainer1>
);

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

// Footer Container 3 - Retro Vintage Style
const FooterContainer3 = styled(Box)(({ theme }) => ({
  background: '#2d1b16',
  color: '#d4af37',
  borderTop: '3px solid #d4af37',
  position: 'relative',
  overflow: 'hidden',
  padding: '14px 18px',
  minHeight: '65px',
  borderRadius: '0 0 12px 12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 2px 8px rgba(45, 27, 22, 0.3)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 30%),
      radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.05) 0%, transparent 30%)
    `,
    zIndex: 0
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 5,
    left: 15,
    right: 15,
    height: '1px',
    background: 'repeating-linear-gradient(90deg, #d4af37 0px, #d4af37 8px, transparent 8px, transparent 16px)',
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

// Footer 3 - Retro Vintage Style (Compact)
export const TemplateFooter3 = ({ accountInfo }) => (
  <FooterContainer3>
    {/* Corner Ornaments */}
    <VintageOrnament sx={{ top: '8px', left: '8px' }}>❦</VintageOrnament>
    <VintageOrnament sx={{ top: '8px', right: '8px' }}>❦</VintageOrnament>
    <VintageOrnament sx={{ bottom: '8px', left: '8px' }}>❦</VintageOrnament>
    <VintageOrnament sx={{ bottom: '8px', right: '8px' }}>❦</VintageOrnament>
    
    {/* Business Name */}
    <VintageLogo sx={{ position: 'relative', zIndex: 2, textAlign: 'center', mb: 0.5 }}>
      {accountInfo?.businessName || 'HERITAGE'}
    </VintageLogo>
    
    {/* Contact Info */}
    <Stack sx={{ position: 'relative', zIndex: 2, alignItems: 'center' }}>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
        <VintageEst>Est. 1925</VintageEst>
        <Typography sx={{ fontSize: '8px', color: '#d4af37' }}>•</Typography>
        <VintageContactLine className="highlight">Tel: {accountInfo?.contact || '(212) 555-0123'}</VintageContactLine>
        <Typography sx={{ fontSize: '8px', color: '#d4af37' }}>•</Typography>
        <VintageWebsite>{accountInfo?.website || 'heritage.co'}</VintageWebsite>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', mt: 0.5, alignItems: 'center' }}>
        <VintageSocial>f</VintageSocial>
        <VintageSocial>t</VintageSocial>
        <VintageSocial>ig</VintageSocial>
        <Typography sx={{ fontSize: '8px', color: '#d4af37', mx: 1 }}>•</Typography>
        <VintageTagline>Timeless Elegance</VintageTagline>
      </Stack>
    </Stack>
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

// Footer 5 - Banner with Contact Ribbon
export const TemplateFooter5 = ({ accountInfo }) => {
  const getInitials = (name) => {
    return name ? name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase() : 'SW';
  };

  return (
    <FooterContainer5>
      {/* Decorative Circles */}
      <DecorativeCircle sx={{ width: '30px', height: '30px', top: '20%', left: '10%', animationDelay: '0s' }} />
      <DecorativeCircle sx={{ width: '20px', height: '20px', top: '60%', right: '15%', animationDelay: '1s' }} />
      <DecorativeCircle sx={{ width: '15px', height: '15px', bottom: '30%', left: '70%', animationDelay: '2s' }} />
      
      {/* Banner Top */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 15px', position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
          <BannerLogo>
            {getInitials(accountInfo?.businessName)}
          </BannerLogo>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <BannerCompanyName>
              {accountInfo?.businessName || 'SILVER WOLF'}
            </BannerCompanyName>
            <BannerDescription>
              Digital Marketing Studio
            </BannerDescription>
          </Box>
        </Box>
      </Box>
      
      {/* Contact Ribbon */}
      <ContactRibbon>
        <RibbonSection>
          <RibbonIcon>📍</RibbonIcon>
          <RibbonText>{accountInfo?.address || '890 Wolf Street, Denver, CO 80202'}</RibbonText>
        </RibbonSection>
        
        <RibbonDivider />
        
        <RibbonSection>
          <RibbonIcon>📱</RibbonIcon>
          <RibbonText className="phone">{accountInfo?.contact || '+1 (555) 789-WOLF'}</RibbonText>
        </RibbonSection>
        
        <RibbonDivider />
        
        <RibbonSection>
          <RibbonIcon>🌐</RibbonIcon>
          <RibbonText className="highlight">{accountInfo?.website || 'www.silverwolf.studio'}</RibbonText>
        </RibbonSection>
      </ContactRibbon>
    </FooterContainer5>
  );
};

// Footer 6 - Industrial Badge Style
export const TemplateFooter6 = ({ accountInfo }) => (
  <FooterContainer6>
    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
      <Stack sx={{ flex: 1, pl: 2 }}>
        <BusinessName sx={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          {accountInfo?.businessName || 'Car Repair Services'}
        </BusinessName>
        <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
          <ContactText sx={{ fontSize: '7px', fontFamily: 'monospace' }}>
            TEL: {accountInfo?.contact || '+91 1234567890'}
          </ContactText>
          <WebsiteText sx={{ fontSize: '7px', fontFamily: 'monospace' }}>
            WEB: {accountInfo?.website || 'www.carrepairservices.com'}
          </WebsiteText>
        </Stack>
      </Stack>
      <AddressText sx={{ 
        fontSize: '6px', 
        textAlign: 'right', 
        writingMode: 'vertical-rl', 
        textOrientation: 'mixed',
        height: '40px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {accountInfo?.address || '654 Service Center, Delhi, NCR 110001'}
      </AddressText>
    </Stack>
  </FooterContainer6>
);

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