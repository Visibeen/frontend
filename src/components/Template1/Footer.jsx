import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationIcon from '../icons/LocationIcon';
import EmailIcon from '../icons/EmailIcon';
import PhoneIcon from '../icons/PhoneIcon';
import ClockIcon from '../icons/ClockIcon';
import NewsletterSignup from './NewsletterSignup';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f6f6f6',
  padding: '60px 20px 0'
}));

const FooterContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  maxWidth: '1200px',
  margin: '0 auto',
  gap: '60px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '40px'
  }
}));

const FooterColumn = styled(Stack)(({ theme }) => ({
  gap: '16px',
  flex: 1
}));

const BrandName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Raleway, sans-serif',
  fontSize: '16px',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: '20px'
}));

const ContactItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '16px'
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: '#333333'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '16px',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: '16px'
}));

const LinkText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '24px',
  color: '#333333',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main
  }
}));

const CopyrightSection = styled(Box)(({ theme }) => ({
  borderTop: '1px solid #1f2428',
  padding: '20px 0',
  marginTop: '40px'
}));

const CopyrightContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0px',
  maxWidth: '1200px',
  margin: '0 auto'
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  color: '#ffffff'
}));

const Footer = ({ contactInfo, socialMedia, footerLinks, newsletter }) => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Brand and Contact */}
        <FooterColumn>
          <BrandName>Visibeen</BrandName>
          
          <ContactItem>
            <LocationIcon width={14} height={20} />
            <ContactText>
              {contactInfo?.address || '8819 Ohio St. South Gate, CA 90280'}
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <EmailIcon width={20} height={16} />
            <ContactText>
              {contactInfo?.email || 'Ourstudio@hello.com'}
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <PhoneIcon width={18} height={18} />
            <ContactText>
              {contactInfo?.phone || '+1 386-688-3295'}
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <ClockIcon width={24} height={24} />
            <ContactText>
              {contactInfo?.workingHours || 'Monday- Saturday : 10:00am to 07:00pm.'}
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <ClockIcon width={24} height={24} />
            <ContactText>
              {contactInfo?.sundayHours || 'SUNDAY : CLOSED'}
            </ContactText>
          </ContactItem>
        </FooterColumn>

        {/* Services */}
        <FooterColumn>
          <SectionTitle>Service</SectionTitle>
          <Stack gap="8px">
            {footerLinks?.services?.map((service, index) => (
              <LinkText key={index}>{service}</LinkText>
            )) || ['Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum', 'Lorem ipsum'].map((service, index) => (
              <LinkText key={index}>{service}</LinkText>
            ))}
          </Stack>
        </FooterColumn>

        {/* Company */}
        <FooterColumn>
          <SectionTitle>Company</SectionTitle>
          <Stack gap="8px">
            {footerLinks?.company?.map((link, index) => (
              <LinkText key={index}>{link}</LinkText>
            )) || ['Service', 'About Us', 'Client Testimonial', 'Blog', 'Latest updates', 'Contact Us'].map((link, index) => (
              <LinkText key={index}>{link}</LinkText>
            ))}
          </Stack>
        </FooterColumn>

        {/* Social Media */}
        <FooterColumn>
          <SectionTitle>Our Social Media</SectionTitle>
          <Stack gap="8px">
            <LinkText>Instagram</LinkText>
            <LinkText>Facebook</LinkText>
            <LinkText>Twitter</LinkText>
          </Stack>
        </FooterColumn>

        {/* Newsletter */}
        <FooterColumn>
          <NewsletterSignup newsletter={newsletter} />
          <Typography
            sx={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '16px',
              fontWeight: 500,
              color: '#333333',
              marginTop: '20px'
            }}
          >
            Copyright Visibeen
          </Typography>
        </FooterColumn>
      </FooterContent>

      <CopyrightSection>
        <CopyrightContent>
          <CopyrightText>
            Copyright © 2025 Visibeen | All Rights Reserved | Designed By{' '}
          </CopyrightText>
          <CopyrightText sx={{ color: theme => theme.palette.primary.main }}>
            Visibeen
          </CopyrightText>
        </CopyrightContent>
      </CopyrightSection>
    </FooterContainer>
  );
};

export default Footer;