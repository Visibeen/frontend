import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import BlurCircularOutlinedIcon from '@mui/icons-material/BlurCircularOutlined';
import FlutterDashOutlinedIcon from '@mui/icons-material/FlutterDashOutlined';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #0B91D6 0%, #6366F1 50%, #E53E3E 100%)',
  padding: '60px 40px 40px',
  color: '#ffffff',
}));

const FooterContent = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gap: '60px',
  marginBottom: '40px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: '30px',
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const Logo = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#E53E3E',
  padding: '8px 16px',
  borderRadius: '4px',
  fontSize: '18px',
  fontWeight: 700,
  fontFamily: 'Inter, sans-serif',
  marginBottom: '20px',
  width: 'fit-content',
}));

const LogoSubtext = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 400,
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  marginBottom: '20px',
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  marginBottom: '8px',
}));

const FooterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 600,
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  marginBottom: '20px',
}));

const FooterLink = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 400,
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  marginBottom: '12px',
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  '&:hover': {
    opacity: 0.8,
  },
}));

const EmailSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const EmailInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  padding: '4px',
  marginTop: '12px',
}));

const EmailInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiInputBase-root': {
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.7)',
      opacity: 1,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#0B91D6',
  borderRadius: '6px',
  padding: '8px',
  margin: '4px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
}));

const SocialIconsContainer = styled(Stack)(({ theme }) => ({
  marginTop: '20px',
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#ffffff',
  padding: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const FreeWebsiteFooter = () => {
  const [email, setEmail] = useState('');
  const handleEmailSubmit = () => {
    console.log('Email submitted:', email);
    setEmail('');
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEmailSubmit();
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection>
          <Logo>VISIBEEN</Logo>
          <LogoSubtext>Innovating Your Digital Future</LogoSubtext>
          <CopyrightText>Copyright © 2025 e2e digitech pvt ltd.</CopyrightText>
          <CopyrightText>All rights reserved</CopyrightText>
          <SocialIconsContainer direction="row" spacing={1}>
            <SocialIcon>
              <InstagramIcon fontSize="small" />
            </SocialIcon>
            <SocialIcon>
              <BlurCircularOutlinedIcon fontSize="small" />
            </SocialIcon>
            <SocialIcon>
              <FlutterDashOutlinedIcon fontSize="small" />
            </SocialIcon>
            <SocialIcon>
              <SmartDisplayOutlinedIcon fontSize="small" />
            </SocialIcon>
          </SocialIconsContainer>
        </LogoSection>

        <FooterSection>
          <SectionTitle>Company</SectionTitle>
          <FooterLink>About us</FooterLink>
          <FooterLink>Blog</FooterLink>
          <FooterLink>Contact us</FooterLink>
          <FooterLink>Pricing</FooterLink>
          <FooterLink>Testimonials</FooterLink>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Support</SectionTitle>
          <FooterLink>Help center</FooterLink>
          <FooterLink>Terms of service</FooterLink>
          <FooterLink>Legal</FooterLink>
          <FooterLink>Privacy policy</FooterLink>
          <FooterLink>Status</FooterLink>
        </FooterSection>

        <EmailSection>
          <SectionTitle>Stay up to date</SectionTitle>
          <EmailInputContainer>
            <EmailInput
              placeholder="Your email address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SendButton onClick={handleEmailSubmit}>
              <SendOutlinedIcon fontSize="small" />
            </SendButton>
          </EmailInputContainer>
        </EmailSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default FreeWebsiteFooter;