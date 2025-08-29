import React from 'react';
import { Box, Typography, Stack, TextField, Button, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#11141B',
  padding: '40px 64px',
  [theme.breakpoints.down('md')]: {
    padding: '40px 24px'
  }
}));

const ContactSection = styled(Stack)(({ theme }) => ({
  gap: '40px',
  marginBottom: '40px'
}));

const ContactHeader = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'flex-start'
  }
}));

const ContactTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '48px',
  fontWeight: 700,
  letterSpacing: '-0.96px',
  lineHeight: '58px',
  color: '#ffffff',
  maxWidth: '600px'
}));

const ContactButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#E53E3E',
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 700,
  letterSpacing: '-0.32px',
  padding: '12px 24px',
  borderRadius: '4px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#C53030'
  }
}));

const Divider = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '2px',
  backgroundColor: '#323B50',
  margin: '40px 0'
}));

const ContentSection = styled(Stack)(({ theme }) => ({
  gap: '35px'
}));

const ContentRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '40px',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '30px'
  }
}));

const ContactColumn = styled(Stack)(({ theme }) => ({
  gap: '8px',
  flex: 1
}));

const ColumnTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '18px',
  fontWeight: 700,
  letterSpacing: '-0.36px',
  lineHeight: '23px',
  color: '#F4F8FF',
  marginBottom: '8px'
}));

const ContactItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '10px',
  alignItems: 'flex-start'
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '-0.28px',
  color: '#F4F8FF'
}));

const LinkText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '-0.28px',
  color: '#F4F8FF',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main
  }
}));

const NewsletterColumn = styled(Stack)(({ theme }) => ({
  gap: '15px',
  flex: 1,
  maxWidth: '300px'
}));

const NewsletterTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Manrope, sans-serif',
  fontSize: '32px',
  fontWeight: 600,
  letterSpacing: '-0.64px',
  lineHeight: '40px',
  color: '#F4F8FF'
}));

const NewsletterDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '-0.28px',
  lineHeight: '18px',
  color: '#F4F8FF'
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    '& fieldset': {
      border: 'none'
    },
    '& input': {
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      fontWeight: 400,
      letterSpacing: '-0.32px',
      color: '#9CA6C1',
      '&::placeholder': {
        color: '#9CA6C1',
        opacity: 1
      }
    }
  }
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 700,
  letterSpacing: '-0.32px',
  padding: '12px 24px',
  borderRadius: '4px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const SocialMediaRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '29px',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start'
  }
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  width: '32px',
  height: '32px',
  backgroundColor: '#ffffff',
  color: '#000000',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff'
  }
}));

const BottomSection = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '40px',
  borderTop: '2px solid #323B50',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'flex-start'
  }
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '-0.24px',
  color: '#F4F8FF'
}));

const LinksContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '20px'
}));

const Footer = ({ contactInfo, footer }) => {
  const { title, ctaText, details, navigation, services, newsletter } = contactInfo || {};
  const { socialMedia, copyright } = footer || {};

  return (
    <FooterContainer>
      <ContactSection>
        <ContactHeader>
          <ContactTitle>
            {title || 'Contact us to get a quotation.'}
          </ContactTitle>
          <ContactButton>
            {ctaText || 'Contact Us'}
          </ContactButton>
        </ContactHeader>
      </ContactSection>

      <Divider />

      <ContentSection>
        <ContentRow>
          <ContactColumn>
            <ColumnTitle>Contact</ColumnTitle>
            
            <ContactItem>
              <LocationOnIcon sx={{ color: '#F4F8FF', fontSize: '16px', mt: 0.2 }} />
              <ContactText>{details?.address || '3249 Henery Street, Kansas'}</ContactText>
            </ContactItem>
            
            <ContactItem>
              <EmailIcon sx={{ color: '#F4F8FF', fontSize: '16px', mt: 0.2 }} />
              <ContactText>{details?.email || 'info@template.com'}</ContactText>
            </ContactItem>
            
            <ContactItem>
              <PhoneIcon sx={{ color: '#F4F8FF', fontSize: '16px', mt: 0.2 }} />
              <ContactText>{details?.phone || '+ (100) 234-5678'}</ContactText>
            </ContactItem>
            
            <ContactItem>
              <AccessTimeIcon sx={{ color: '#F4F8FF', fontSize: '16px', mt: 0.2 }} />
              <ContactText>{details?.hours?.weekdays || 'Monday- Saturday : 10:00am to 07:00pm.'}</ContactText>
            </ContactItem>
            
            <ContactItem>
              <AccessTimeIcon sx={{ color: '#F4F8FF', fontSize: '16px', mt: 0.2 }} />
              <ContactText>{details?.hours?.sunday || 'SUNDAY : CLOSED'}</ContactText>
            </ContactItem>
          </ContactColumn>

          <ContactColumn>
            <ColumnTitle>{navigation?.title || 'Navigation'}</ColumnTitle>
            {navigation?.links?.map((link, index) => (
              <LinkText key={index}>{link}</LinkText>
            ))}
          </ContactColumn>

          <ContactColumn>
            <ColumnTitle>{services?.title || 'Our Services'}</ColumnTitle>
            {services?.links?.map((link, index) => (
              <LinkText key={index}>{link}</LinkText>
            ))}
          </ContactColumn>

          <NewsletterColumn>
            <NewsletterTitle>
              {newsletter?.title || 'Newsletter'}
            </NewsletterTitle>
            <NewsletterDescription>
              {newsletter?.description || 'Get the latest tips and tricks, updates, offers and discount right into your mailbox.'}
            </NewsletterDescription>
            <NewsletterInput
              placeholder={newsletter?.placeholder || 'Your Email'}
              variant="outlined"
              fullWidth
            />
            <SubscribeButton>
              {newsletter?.buttonText || 'Subscribe Now'}
            </SubscribeButton>
          </NewsletterColumn>
        </ContentRow>

        <SocialMediaRow>
          <SocialIcon>
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon>
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon>
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon>
            <WhatsAppIcon />
          </SocialIcon>
        </SocialMediaRow>
      </ContentSection>

      <BottomSection>
        <CopyrightText>
          {copyright?.text || '© Copyright 2025 by Visibeen. Designed & Developed by Visibeen.'}
        </CopyrightText>
        
        <LinksContainer>
          {copyright?.links?.map((link, index) => (
            <LinkText key={index}>{link}</LinkText>
          ))}
        </LinksContainer>
      </BottomSection>
    </FooterContainer>
  );
};

export default Footer;