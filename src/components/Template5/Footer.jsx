import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: '#222838',
  padding: '20px 30px',
  spacing: 0
}));

const FooterContent = styled(Stack)(({ theme }) => ({
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    direction: 'column',
    spacing: 2,
    alignItems: 'center'
  }
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '18px',
  textTransform: 'capitalize',
  color: '#ffffff'
}));

const PolicyText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '18px',
  textTransform: 'capitalize',
  color: '#ffffff',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

const Footer = ({ footer }) => {
  return (
    <FooterContainer spacing={0}>
      <FooterContent 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={{ xs: 2, sm: 0 }}
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <CopyrightText>
          {footer?.copyright?.text}
        </CopyrightText>
        
        <PolicyText>
          {footer?.copyright?.links}
        </PolicyText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;