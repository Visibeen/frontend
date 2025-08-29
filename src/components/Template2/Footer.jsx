import React, { useState } from 'react';
import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#0baa68',
  padding: '60px 315px 40px'
}));

const FooterContent = styled(Stack)(({ theme }) => ({
  gap: '60px'
}));

const FooterTop = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '40px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
}));

const BrandSection = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px'
}));

const FooterLogo = styled('img')(({ theme }) => ({
  height: '45px',
  width: 'auto'
}));

const BrandTagline = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '47px',
  fontWeight: 700,
  letterSpacing: '-0.90px',
  lineHeight: '47px',
  color: '#f9f7f7',
  maxWidth: '445px'
}));

const FooterSections = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '60px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '40px'
  }
}));

const NewsletterSection = styled(Stack)(({ theme }) => ({
  gap: '16px'
}));

const NewsletterTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '16px',
  fontWeight: 700,
  color: '#ffffff'
}));

const NewsletterSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#ffffff'
}));

const NewsletterForm = styled(Stack)(({ theme }) => ({
  gap: '12px'
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    '& input': {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      color: '#333333',
      '&::placeholder': {
        color: '#a2a9b0'
      }
    }
  }
}));

const NewsletterButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'uppercase',
  backgroundColor: '#00663c',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#004d2d'
  }
}));

const FooterSection = styled(Stack)(({ theme }) => ({
  gap: '16px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '19px',
  fontWeight: 700,
  letterSpacing: '-0.19px',
  lineHeight: '19px',
  color: '#f9f7f7'
}));

const SectionLinks = styled(Stack)(({ theme }) => ({
  gap: '14px'
}));

const SectionLink = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '19.20px',
  color: '#d2d3d5',
  cursor: 'pointer',
  '&:hover': {
    color: '#ffffff'
  }
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  borderTop: '1px solid #598472',
  paddingTop: '20px'
}));

const CopyrightSection = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0px'
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#d2d3d5'
}));

const Footer = ({ footer }) => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      setIsValidEmail(validateEmail(value));
    } else {
      setIsValidEmail(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && validateEmail(email)) {
      console.log('Newsletter signup:', email);
      setEmail('');
    } else {
      setIsValidEmail(false);
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <BrandSection>
            <FooterLogo
              src={footer?.logo || '/images/footer-logo.png'}
              alt="Footer Logo"
            />
            <BrandTagline>
              {footer?.tagline || 'We develop & create healthier future'}
            </BrandTagline>
          </BrandSection>
        </FooterTop>
        
        <FooterSections>
          <NewsletterSection>
            <NewsletterTitle>
              {footer?.newsletter?.title || 'Join a Newsletter'}
            </NewsletterTitle>
            <NewsletterSubtitle>
              {footer?.newsletter?.subtitle || 'Your Email'}
            </NewsletterSubtitle>
            
            <NewsletterForm component="form" onSubmit={handleSubmit}>
              <NewsletterInput
                type="email"
                placeholder={footer?.newsletter?.placeholder || 'Enter Your Email'}
                value={email}
                onChange={handleEmailChange}
                error={!isValidEmail}
                helperText={!isValidEmail ? 'Please enter a valid email address' : ''}
                fullWidth
                size="small"
              />
              <NewsletterButton type="submit" variant="contained">
                {footer?.newsletter?.buttonText || 'Send'}
              </NewsletterButton>
            </NewsletterForm>
          </NewsletterSection>
          
          <FooterSection>
            <SectionTitle>
              {footer?.sections?.socials?.title || 'Socials'}
            </SectionTitle>
            <SectionLinks>
              {footer?.sections?.socials?.links?.map((link, index) => (
                <SectionLink key={index}>{link}</SectionLink>
              )) || ['Facebook', 'Twitter', 'Instagram'].map((link, index) => (
                <SectionLink key={index}>{link}</SectionLink>
              ))}
            </SectionLinks>
          </FooterSection>
          
          <FooterSection>
            <SectionTitle>
              {footer?.sections?.menu?.title || 'Menu'}
            </SectionTitle>
            <SectionLinks>
              {footer?.sections?.menu?.links?.map((link, index) => (
                <SectionLink key={index}>{link}</SectionLink>
              )) || ['Home', 'Services', 'About Us', 'Contacts'].map((link, index) => (
                <SectionLink key={index}>{link}</SectionLink>
              ))}
            </SectionLinks>
          </FooterSection>
          
          <FooterSection>
            <SectionTitle>
              {footer?.sections?.contact?.title || 'Say Hello'}
            </SectionTitle>
            <SectionLink>
              {footer?.sections?.contact?.email || 'info@email.com'}
            </SectionLink>
          </FooterSection>
        </FooterSections>
        
        <FooterBottom>
          <CopyrightSection>
            <CopyrightText>
              {footer?.copyright?.brand || 'visibeen'}
            </CopyrightText>
            <CopyrightText>
              {footer?.copyright?.text || '© 2025. All Rights Reserved.'}
            </CopyrightText>
          </CopyrightSection>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;