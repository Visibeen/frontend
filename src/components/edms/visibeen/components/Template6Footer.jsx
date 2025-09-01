import React from 'react';
import { Box, Typography, Stack, TextField, InputAdornment, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import InstagramIcon from '../../../icons/InstagramIcon';
import DribbbleIcon from '../../../icons/DribbbleIcon';
import TwitterIcon from '../../../icons/TwitterIcon';
import YouTubeIcon from '../../../icons/YouTubeIcon';
import SendIcon from '../../../icons/SendIcon';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(93.12deg, #0B91D6 0%, #EF232A 100%)',
  padding: '40px 125px',
  color: '#ffffff',
  position: 'relative',
  overflow: 'hidden'
}));

const FooterContent = styled(Stack)(({ theme }) => ({
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '125px',
  maxWidth: '1200px',
  margin: '0 auto'
}));

const CompanySection = styled(Stack)(({ theme }) => ({
  gap: '40px',
  alignItems: 'flex-start'
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px'
}));

const Logo = styled('img')(({ theme }) => ({
  width: '143px',
  height: '48px',
  objectFit: 'contain'
}));

const CopyrightSection = styled(Stack)(({ theme }) => ({
  gap: '8px'
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#ffffff',
  lineHeight: 1.4
}));

const SocialLinksContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  gap: '16px',
  marginTop: '20px'
}));

const SocialIconWrapper = styled(Box)(({ theme }) => ({
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)'
  }
}));

const LinksSection = styled(Stack)(({ theme }) => ({
  direction: 'row',
  gap: '30px'
}));

const LinkColumn = styled(Stack)(({ theme }) => ({
  gap: '24px',
  minWidth: '160px'
}));

const ColumnTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  color: '#ffffff',
  marginBottom: '8px'
}));

const LinkList = styled(Stack)(({ theme }) => ({
  gap: '12px'
}));

const LinkItem = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#ffffff',
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  '&:hover': {
    opacity: 0.8
  }
}));

const EmailSection = styled(Stack)(({ theme }) => ({
  gap: '24px',
  minWidth: '255px'
}));

const EmailTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  color: '#ffffff'
}));

const EmailInputContainer = styled(Box)(({ theme }) => ({
  position: 'relative'
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    height: '40px',
    '& fieldset': {
      border: 'none'
    },
    '&:hover fieldset': {
      border: 'none'
    },
    '&.Mui-focused fieldset': {
      border: 'none'
    }
  },
  '& .MuiOutlinedInput-input': {
    color: '#ffffff',
    fontSize: '12px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    padding: '10px 50px 10px 16px',
    '&::placeholder': {
      color: '#A0A0AA',
      opacity: 1
    }
  }
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '24px',
  height: '24px',
  padding: 0,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  }
}));

const Template6Footer = ({ accountInfo }) => {
  return (
    <FooterContainer>
      <FooterContent>
        <CompanySection>
          <LogoContainer>
            <Logo 
              src="/images/visibeen-logo.png" 
              alt="VISIBEEN Logo"
            />
          </LogoContainer>
          
          <CopyrightSection>
            <CopyrightText>
              Copyright © 2025 e2e digitech pvt ltd.
            </CopyrightText>
            <CopyrightText>
              All rights reserved
            </CopyrightText>
          </CopyrightSection>

          <SocialLinksContainer>
            <SocialIconWrapper>
              <InstagramIcon width={32} height={32} color="#ffffff" />
            </SocialIconWrapper>
            <SocialIconWrapper>
              <DribbbleIcon width={32} height={32} color="#ffffff" />
            </SocialIconWrapper>
            <SocialIconWrapper>
              <TwitterIcon width={32} height={32} color="#ffffff" />
            </SocialIconWrapper>
            <SocialIconWrapper>
              <YouTubeIcon width={32} height={32} color="#ffffff" />
            </SocialIconWrapper>
          </SocialLinksContainer>
        </CompanySection>

        <LinksSection>
          <LinkColumn>
            <ColumnTitle>Company</ColumnTitle>
            <LinkList>
              <LinkItem>About us</LinkItem>
              <LinkItem>Blog</LinkItem>
              <LinkItem>Contact us</LinkItem>
              <LinkItem>Pricing</LinkItem>
              <LinkItem>Testimonials</LinkItem>
            </LinkList>
          </LinkColumn>

          <LinkColumn>
            <ColumnTitle>Support</ColumnTitle>
            <LinkList>
              <LinkItem>Help center</LinkItem>
              <LinkItem>Terms of service</LinkItem>
              <LinkItem>Legal</LinkItem>
              <LinkItem>Privacy policy</LinkItem>
              <LinkItem>Status</LinkItem>
            </LinkList>
          </LinkColumn>

          <EmailSection>
            <EmailTitle>Stay up to date</EmailTitle>
            <EmailInputContainer>
              <StyledTextField
                fullWidth
                placeholder="Your email address"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <SendButton>
                      <SendIcon width={17} height={17} color="#A0A0AA" />
                    </SendButton>
                  )
                }}
              />
            </EmailInputContainer>
          </EmailSection>
        </LinksSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Template6Footer;