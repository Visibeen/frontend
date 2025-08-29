import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
  padding: '16px',
  borderRadius: '0 0 8px 8px',
  color: '#ffffff',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    pointerEvents: 'none'
  }
}));

const BusinessName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 600,
  color: '#ffffff',
  marginBottom: '8px',
  textShadow: '0 1px 2px rgba(0,0,0,0.3)'
}));

const ContactInfo = styled(Stack)(({ theme }) => ({
  gap: '4px',
  position: 'relative',
  zIndex: 1
}));

const InfoText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  color: '#ffffff',
  opacity: 0.9,
  lineHeight: 1.3
}));

const ContactLabel = styled('span')(({ theme }) => ({
  fontWeight: 500,
  opacity: 1
}));

const WebsiteText = styled(InfoText)(({ theme }) => ({
  fontWeight: 500,
  textDecoration: 'underline',
  opacity: 1
}));

const AddressText = styled(InfoText)(({ theme }) => ({
  fontSize: '10px',
  opacity: 0.8,
  fontStyle: 'italic'
}));

const TemplateFooter = ({ accountInfo }) => {
  return (
    <FooterContainer>
      <BusinessName>
        {accountInfo?.businessName || 'Your Business Name'}
      </BusinessName>
      <ContactInfo>
        <InfoText>
          <ContactLabel>Contact:</ContactLabel> {accountInfo?.contact || '+91 1234567890'}
        </InfoText>
        <WebsiteText>
          {accountInfo?.website || 'www.yourwebsite.com'}
        </WebsiteText>
        <AddressText>
          {accountInfo?.address || 'Your business address'}
        </AddressText>
      </ContactInfo>
    </FooterContainer>
  );
};

export default TemplateFooter;