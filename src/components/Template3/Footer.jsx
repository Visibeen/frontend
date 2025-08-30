import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneIcon from '../icons/PhoneIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import SocialMediaIcons from '../icons/SocialMediaIcons';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(20, 10, 9, 0.90)',
  padding: '68px 320px 0px'
}));

const FooterContent = styled(Stack)(({ theme }) => ({
  gap: '40px'
}));

const FooterMain = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '80px',
  justifyContent: 'space-between'
}));

const CompanySection = styled(Stack)(({ theme }) => ({
  gap: '19px',
  maxWidth: '365px'
}));

const CompanyLogo = styled('img')(({ theme }) => ({
  height: '41px',
  width: 'auto',
  marginBottom: '20px'
}));

const CompanyDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  lineHeight: '25.50px',
  color: '#ffffff'
}));

const ContactItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '33px'
}));

const ContactDetails = styled(Stack)(({ theme }) => ({
  gap: '-1px'
}));

const ContactLabel = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 700,
  textTransform: 'capitalize',
  color: '#0b91d6'
}));

const ContactInfo = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 700,
  textTransform: 'capitalize',
  color: '#ffffff'
}));

const FooterSection = styled(Stack)(({ theme }) => ({
  gap: '20px'
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '36.40px',
  color: '#ffffff',
  marginBottom: '20px'
}));

const LinkItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  '&:hover': {
    '& .link-text': {
      color: theme.palette.primary.main
    }
  }
}));

const LinkText = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  color: '#ffffff',
  transition: 'color 0.3s ease'
}));

const MapSection = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '20px'
}));

const MapImage = styled('img')(({ theme }) => ({
  width: '100px',
  height: 'auto'
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  borderTop: '1px solid rgba(156, 196, 207, 0.25)',
  padding: '30px 0',
  marginTop: '40px'
}));

const BottomContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px'
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  color: '#ffffff'
}));

const Footer = ({ contactInfo, footer }) => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterMain>
          <CompanySection>
            <CompanyLogo
              src={contactInfo?.logo || '/images/template3-logo.png'}
              alt="Company Logo"
            />
            
            <CompanyDescription>
              {contactInfo?.address || 'Logistic service provider company plays a pivotal role in the global supply chain logistic service provider.'}
            </CompanyDescription>
            
            <Divider sx={{ border: '1px solid rgba(156, 196, 207, 0.25)', margin: '20px 0' }} />
            
            <ContactItem>
              <PhoneIcon width={18} height={18} color="#ffffff" />
              <ContactDetails>
                <ContactLabel>
                  {contactInfo?.email || 'Call Now'}
                </ContactLabel>
                <ContactInfo>
                  {contactInfo?.phone || '+880 123 456 789'}
                </ContactInfo>
              </ContactDetails>
            </ContactItem>
            
            <ContactItem>
              <Box sx={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ width: '15px', height: '15px', backgroundColor: '#ffffff', borderRadius: '50%' }} />
              </Box>
              <ContactDetails>
                <ContactLabel>
                  {contactInfo?.hours?.label || 'Timming'}
                </ContactLabel>
                <ContactInfo>
                  {contactInfo?.hours?.weekdays || 'Mon-Fri: 9 AM – 6 PM'}
                </ContactInfo>
                <ContactInfo>
                  {contactInfo?.hours?.sunday || 'Sunday: Closed'}
                </ContactInfo>
              </ContactDetails>
            </ContactItem>
          </CompanySection>
          
          <FooterSection>
            <SectionTitle>Quick Links</SectionTitle>
            <Stack gap="7px">
              {footer?.quickLinks?.map((link, index) => (
                <LinkItem key={index}>
                  <ArrowRightIcon width={10} height={10} color="#0b91d6" />
                  <LinkText className="link-text">{link}</LinkText>
                </LinkItem>
              ))}
            </Stack>
          </FooterSection>
          
          <FooterSection>
            <SectionTitle>Services</SectionTitle>
            <Stack gap="7px">
              {footer?.services?.map((service, index) => (
                <LinkItem key={index}>
                  <ArrowRightIcon width={10} height={10} color="#0b91d6" />
                  <LinkText className="link-text">{service}</LinkText>
                </LinkItem>
              ))}
            </Stack>
          </FooterSection>
          
          <MapSection>
            <SectionTitle>Get Directions</SectionTitle>
            <MapImage
              src={footer?.mapImage || '/images/template3-map.svg'}
              alt="Map"
            />
          </MapSection>
        </FooterMain>
        
        <FooterBottom>
          <BottomContent>
            <CopyrightText>
              {footer?.copyright || '© Copyright 2025 Visibeen. All Rights Reserved'}
            </CopyrightText>
            
            <SocialMediaIcons width={151} height={34} color="#ffffff" />
          </BottomContent>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;