import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

// Footer Variant 1 - Blue Professional (Urbantech Solutions style)
const FooterContainer1 = styled(Box)(({ theme }) => ({
  background: '#1B365D',
  padding: '12px 16px',
  borderRadius: '0 0 8px 8px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '60px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

// Footer Variant 2 - Dark Blue/Black (Urbantech Solutions style)
const FooterContainer2 = styled(Box)(({ theme }) => ({
  background: '#0F1419',
  padding: '12px 16px',
  borderRadius: '0 0 8px 8px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '60px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

// Footer Variant 3 - Brown/Orange (GreenPeak Marketing style)
const FooterContainer3 = styled(Box)(({ theme }) => ({
  background: '#8B4513',
  padding: '12px 16px',
  borderRadius: '0 0 8px 8px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '60px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

// Footer Variant 4 - Purple Gradient (Digital Marketing style)
const FooterContainer4 = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #6B46C1 0%, #9333EA 100%)',
  padding: '12px 16px',
  borderRadius: '0 0 8px 8px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '60px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

// Footer Variant 5 - Teal/Navy (Digital Marketing Agency style)
const FooterContainer5 = styled(Box)(({ theme }) => ({
  background: '#1E3A8A',
  padding: '12px 16px',
  borderRadius: '0 0 8px 8px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '60px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

// Footer Variant 6 - Dark Gray (Car Repair Services style)
const FooterContainer6 = styled(Box)(({ theme }) => ({
  background: '#374151',
  padding: '12px 16px',
  borderRadius: '0 0 8px 8px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '60px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

// Business Name Styles
const BusinessName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '13px',
  fontWeight: 600,
  color: '#ffffff',
  marginBottom: '6px',
  lineHeight: 1.2
}));

// Contact Info Container
const ContactInfo = styled(Stack)(({ theme }) => ({
  gap: '2px',
  position: 'relative',
  zIndex: 1
}));

// Info Text Styles
const InfoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '9px',
  fontWeight: 400,
  color: '#ffffff',
  opacity: 0.9,
  lineHeight: 1.3
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '9px',
  fontWeight: 500,
  color: '#ffffff',
  opacity: 0.95,
  lineHeight: 1.3
}));

const WebsiteText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '9px',
  fontWeight: 500,
  color: '#ffffff',
  opacity: 1,
  lineHeight: 1.3,
  textDecoration: 'underline'
}));

const AddressText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '8px',
  fontWeight: 400,
  color: '#ffffff',
  opacity: 0.8,
  lineHeight: 1.2
}));

// Template Footer Variants matching Figma design
export const TemplateFooter1 = ({ accountInfo }) => (
  <FooterContainer1>
    <BusinessName>{accountInfo?.businessName || 'URBANTECH SOLUTIONS'}</BusinessName>
    <ContactInfo>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: '8px' }}>
        <ContactText>📞 {accountInfo?.contact || '+91 1234567890'}</ContactText>
        <WebsiteText>🌐 {accountInfo?.website || 'www.urbantechsolutions.com'}</WebsiteText>
      </Stack>
      <AddressText>{accountInfo?.address || '123 Tech Park, Bangalore, Karnataka 560001'}</AddressText>
    </ContactInfo>
  </FooterContainer1>
);

export const TemplateFooter2 = ({ accountInfo }) => (
  <FooterContainer2>
    <BusinessName>{accountInfo?.businessName || 'URBANTECH SOLUTIONS'}</BusinessName>
    <ContactInfo>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: '8px' }}>
        <ContactText>📞 {accountInfo?.contact || '+91 1234567890'}</ContactText>
        <WebsiteText>🌐 {accountInfo?.website || 'www.urbantechsolutions.com'}</WebsiteText>
      </Stack>
      <AddressText>{accountInfo?.address || '123 Tech Park, Bangalore, Karnataka 560001'}</AddressText>
    </ContactInfo>
  </FooterContainer2>
);

export const TemplateFooter3 = ({ accountInfo }) => (
  <FooterContainer3>
    <BusinessName>{accountInfo?.businessName || 'GREENPEAK MARKETING'}</BusinessName>
    <ContactInfo>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: '8px' }}>
        <ContactText>📞 {accountInfo?.contact || '+91 1234567890'}</ContactText>
        <WebsiteText>🌐 {accountInfo?.website || 'www.greenpeakmarketing.com'}</WebsiteText>
      </Stack>
      <AddressText>{accountInfo?.address || '456 Marketing Hub, Mumbai, Maharashtra 400001'}</AddressText>
    </ContactInfo>
  </FooterContainer3>
);

export const TemplateFooter4 = ({ accountInfo }) => (
  <FooterContainer4>
    <BusinessName sx={{ color: '#FFE4B5' }}>{accountInfo?.businessName || 'BLUE HORIZON TECH'}</BusinessName>
    <ContactInfo>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: '8px' }}>
        <ContactText>📞 {accountInfo?.contact || '+91 1234567890'}</ContactText>
        <WebsiteText>🌐 {accountInfo?.website || 'www.bluehorizontech.com'}</WebsiteText>
      </Stack>
      <AddressText>{accountInfo?.address || '789 Innovation Street, Hyderabad, Telangana 500001'}</AddressText>
    </ContactInfo>
  </FooterContainer4>
);

export const TemplateFooter5 = ({ accountInfo }) => (
  <FooterContainer5>
    <BusinessName>{accountInfo?.businessName || 'DIGITAL MARKETING AGENCY'}</BusinessName>
    <ContactInfo>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: '8px' }}>
        <ContactText>📞 {accountInfo?.contact || '+91 1234567890'}</ContactText>
        <WebsiteText>🌐 {accountInfo?.website || 'www.digitalmarketingagency.com'}</WebsiteText>
      </Stack>
      <AddressText>{accountInfo?.address || '321 Digital Plaza, Chennai, Tamil Nadu 600001'}</AddressText>
    </ContactInfo>
  </FooterContainer5>
);

export const TemplateFooter6 = ({ accountInfo }) => (
  <FooterContainer6>
    <BusinessName>{accountInfo?.businessName || 'CAR REPAIR SERVICES'}</BusinessName>
    <ContactInfo>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: '8px' }}>
        <ContactText>📞 {accountInfo?.contact || '+91 1234567890'}</ContactText>
        <WebsiteText>🌐 {accountInfo?.website || 'www.carrepairservices.com'}</WebsiteText>
      </Stack>
      <AddressText>{accountInfo?.address || '654 Service Center, Delhi, NCR 110001'}</AddressText>
    </ContactInfo>
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