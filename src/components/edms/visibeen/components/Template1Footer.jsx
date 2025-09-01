import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: '#1B365D',
  width: '100px',
  padding: '16px 20px',
  borderRadius: '0 0 8px 8px',
  color: '#ffffff',
  position: 'relative',
  minHeight: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '12px'
}));

const BusinessName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 700,
  color: '#ffffff',
  textAlign: 'center',
  letterSpacing: '0.5px',
  marginBottom: '8px'
}));

const ContactInfoContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '8px'
  }
}));

const ContactItem = styled(Stack)(({ theme }) => ({
  direction: 'row',
  alignItems: 'center',
  gap: '6px',
  flex: 1,
  justifyContent: 'center',
  minWidth: 'fit-content'
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 500,
  color: '#ffffff',
  lineHeight: 1.2,
  whiteSpace: 'nowrap'
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    fontSize: '16px'
  }
}));

const Template1Footer = ({ accountInfo }) => {
  const businessName = accountInfo?.businessName || 'URBANTECH SOLUTIONS';
  const contact = accountInfo?.contact || '6858653555';
  const website = accountInfo?.website || 'WWW.WEBSITE.COM';
  const address = accountInfo?.address || '2385 SYCAMORE STREET, COLUMBUS, OH 43215';

  return (
    <FooterContainer>
      <BusinessName>{businessName}</BusinessName>
      <ContactInfoContainer>
        <ContactItem>
          <IconWrapper>
            <CallOutlinedIcon />
          </IconWrapper>
          <ContactText>{contact}</ContactText>
        </ContactItem>
        
        <ContactItem>
          <IconWrapper>
            <LanguageOutlinedIcon />
          </IconWrapper>
          <ContactText>{website}</ContactText>
        </ContactItem>
        
        <ContactItem>
          <IconWrapper>
            <LocationOnOutlinedIcon />
          </IconWrapper>
          <ContactText>{address}</ContactText>
        </ContactItem>
      </ContactInfoContainer>
    </FooterContainer>
  );
};

export default Template1Footer;