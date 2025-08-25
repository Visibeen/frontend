import React from 'react';
import { Box, Stack, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assets/VisibeenLogo.png';
import TwitterIcon from '../icons/TwitterIcon';
import FacebookIcon from '../icons/FacebookIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import YouTubeIcon from '../icons/YouTubeIcon';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F8F8',
  padding: '80px 0 0 0',
  marginLeft: '180px',
  marginRight: '200px',
}));

const FooterContent = styled(Stack)(({ theme }) => ({
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '0 66px',
  gap: '60px'
}));

const FooterMain = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '100px'
}));

const FooterLeft = styled(Stack)(({ theme }) => ({
  gap: '40px',
  alignItems: 'flex-start',
  minWidth: '250px'
}));

const FooterLogo = styled('img')(({ theme }) => ({
  width: '96px',
  height: '33px'
}));

const ContactInfo = styled(Stack)(({ theme }) => ({
  gap: '8px'
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '15px',
  fontWeight: 400,
  color: '#121927'
}));

const AddressText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '26px',
  color: '#121927'
}));

const SocialIcons = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '13px',
  marginRight: '66px',
  alignItems: 'center',
  flexWrap: 'nowrap',
  whiteSpace: 'nowrap'
}));

const SocialIconLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  color: '#0B91D6',
  textDecoration: 'none',
  '&:hover': {
    opacity: 0.8,
    transform: 'translateY(-2px)'
  },
  transition: 'all 0.2s ease'
}));

const FooterColumns = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '100px',
  flex: 1
}));

const FooterColumn = styled(Stack)(({ theme }) => ({
  gap: '24px',
  minWidth: '160px'
}));

const ColumnTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '18px',
  fontWeight: 700,
  lineHeight: '18px',
  color: '#121927'
}));

const ColumnLinks = styled(Stack)(({ theme }) => ({
  gap: '12px'
}));

const ColumnLink = styled(Link)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '16px',
  color: '#121927',
  textDecoration: 'none',
  '&:hover': {
    color: '#0B91D6',
    transform: 'translateX(4px)'
  },
  transition: 'all 0.2s ease'
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  backgroundColor: '#FAFAFA',
  padding: '24px 0',
  borderTop: '1px solid #E5E7EB'
}));

const CopyrightContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '0 66px'
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  color: '#121927'
}));

const BrandText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  background: 'linear-gradient(90deg, rgba(11,145,214,1) 0%, rgba(239,35,42,1) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
}));

const HomepageFooter = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterMain>
          <FooterLeft>
            <FooterLogo src={logo} alt="Visibeen" />
            
            <ContactInfo>
              <ContactText>888 999 0000</ContactText>
              <ContactText>needhelp@visibeen.com</ContactText>
              <AddressText>
                855 road, broklyn street<br />
                new york 600
              </AddressText>
            </ContactInfo>
          </FooterLeft>

          <FooterColumns>
            <FooterColumn>
              <ColumnTitle>Explore</ColumnTitle>
              <ColumnLinks>
                <ColumnLink href="#">About</ColumnLink>
                <ColumnLink href="#">Our Team</ColumnLink>
                <ColumnLink href="#">Features</ColumnLink>
                <ColumnLink href="#">Blog</ColumnLink>
                <ColumnLink href="#">How It Works</ColumnLink>
              </ColumnLinks>
            </FooterColumn>

            <FooterColumn>
              <ColumnTitle>Services</ColumnTitle>
              <ColumnLinks>
                <ColumnLink href="#">Speed Optimization</ColumnLink>
                <ColumnLink href="#">Marketing Analysis</ColumnLink>
                <ColumnLink href="#">SEO and Backlinks</ColumnLink>
                <ColumnLink href="#">Content Marketing</ColumnLink>
              </ColumnLinks>
            </FooterColumn>

            <FooterColumn>
              <ColumnTitle>Links</ColumnTitle>
              <ColumnLinks>
                <ColumnLink href="#">Help</ColumnLink>
                <ColumnLink href="#">Support</ColumnLink>
                <ColumnLink href="#">Clients</ColumnLink>
                <ColumnLink href="#">Contact</ColumnLink>
              </ColumnLinks>
            </FooterColumn>
          </FooterColumns>

          <SocialIcons>
            <SocialIconLink href="#">
              <TwitterIcon width={19} height={16} />
            </SocialIconLink>
            <SocialIconLink href="#">
              <FacebookIcon width={11} height={20} />
            </SocialIconLink>
            <SocialIconLink href="#">
              <LinkedInIcon width={16} height={16} />
            </SocialIconLink>
            <SocialIconLink href="#">
              <YouTubeIcon width={17} height={12} />
            </SocialIconLink>
          </SocialIcons>
        </FooterMain>
      </FooterContent>

      <FooterBottom>
        <CopyrightContainer>
          <CopyrightText>© copyright 2025 by</CopyrightText>
          <BrandText>Visibeen</BrandText>
        </CopyrightContainer>
      </FooterBottom>
    </FooterContainer>
  );
};

export default HomepageFooter;