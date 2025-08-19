import React from 'react';
import { Box, Stack, Typography, TextField, Button, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assets/VisibeenLogo.png';
import InstagramIcon from '../Dashboard/icons/InstagramIcon';
import DribbbleIcon from '../Dashboard/icons/DribbbleIcon';
import TwitterIcon from '../Dashboard/icons/TwitterIcon';
import YouTubeIcon from '../Dashboard/icons/YouTubeIcon';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(93.12deg, rgba(11,145,214,1) 0%, rgba(239,35,42,1) 100%)',
  padding: '40px 0',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif'
}));

const FooterContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 40px',
  gap: '125px'
}));

const FooterLeft = styled(Stack)(({ theme }) => ({
  gap: '40px',
  alignItems: 'flex-start'
}));

const FooterLogo = styled('img')(({ theme }) => ({
  width: '143px',
  height: '48px'
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#ffffff',
  lineHeight: '20px'
}));

const SocialIcons = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '16px'
}));

const SocialIconLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  color: '#ffffff',
  textDecoration: 'none',
  '&:hover': {
    opacity: 0.8
  }
}));

const FooterColumns = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '30px',
  alignItems: 'flex-start'
}));

const FooterColumn = styled(Stack)(({ theme }) => ({
  gap: '24px',
  minWidth: '160px'
}));

const ColumnTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  color: '#ffffff'
}));

const ColumnLinks = styled(Stack)(({ theme }) => ({
  gap: '12px'
}));

const ColumnLink = styled(Link)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#ffffff',
  textDecoration: 'none',
  '&:hover': {
    opacity: 0.8
  }
}));

const NewsletterContainer = styled(Stack)(({ theme }) => ({
  gap: '24px',
  minWidth: '255px'
}));

const NewsletterForm = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  overflow: 'hidden'
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    height: '40px',
    paddingRight: '40px',
    '& fieldset': {
      border: 'none'
    },
    '& input': {
      fontFamily: 'Inter, sans-serif',
      fontSize: '12px',
      fontWeight: 400,
      color: '#A0A0AA',
      padding: '8px 12px'
    }
  }
}));

const SendButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  minWidth: '24px',
  width: '24px',
  height: '24px',
  padding: 0,
  color: '#000000',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLeft>
          <FooterLogo src={logo} alt="Visibeen" />
          <Stack spacing={1}>
            <CopyrightText>Copyright © 2025 e2e digitech pvt ltd.</CopyrightText>
            <CopyrightText>All rights reserved</CopyrightText>
          </Stack>
          <SocialIcons>
            <SocialIconLink href="#">
              <InstagramIcon width={32} height={32} color="#ffffff" />
            </SocialIconLink>
            <SocialIconLink href="#">
              <DribbbleIcon width={32} height={32} color="#ffffff" />
            </SocialIconLink>
            <SocialIconLink href="#">
              <TwitterIcon width={32} height={32} color="#ffffff" />
            </SocialIconLink>
            <SocialIconLink href="#">
              <YouTubeIcon width={32} height={32} color="#ffffff" />
            </SocialIconLink>
          </SocialIcons>
        </FooterLeft>

        <FooterColumns>
          <FooterColumn>
            <ColumnTitle>Company</ColumnTitle>
            <ColumnLinks>
              <ColumnLink href="#">About us</ColumnLink>
              <ColumnLink href="#">Blog</ColumnLink>
              <ColumnLink href="#">Contact us</ColumnLink>
              <ColumnLink href="#">Pricing</ColumnLink>
              <ColumnLink href="#">Testimonials</ColumnLink>
            </ColumnLinks>
          </FooterColumn>

          <FooterColumn>
            <ColumnTitle>Support</ColumnTitle>
            <ColumnLinks>
              <ColumnLink href="#">Help center</ColumnLink>
              <ColumnLink href="#">Terms of service</ColumnLink>
              <ColumnLink href="#">Legal</ColumnLink>
              <ColumnLink href="#">Privacy policy</ColumnLink>
              <ColumnLink href="#">Status</ColumnLink>
            </ColumnLinks>
          </FooterColumn>

          <NewsletterContainer>
            <ColumnTitle>Stay up to date</ColumnTitle>
            <NewsletterForm>
              <NewsletterInput
                fullWidth
                placeholder="Your email address"
                variant="outlined"
              />
              <SendButton>
                →
              </SendButton>
            </NewsletterForm>
          </NewsletterContainer>
        </FooterColumns>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;