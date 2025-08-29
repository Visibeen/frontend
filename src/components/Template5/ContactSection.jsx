import React, { useState } from 'react';
import { Box, Typography, Stack, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationIcon from '../icons/LocationIcon';
import EmailIcon from '../icons/EmailIcon';
import PhoneIcon from '../icons/PhoneIcon';
import ClockIcon from '../icons/ClockIcon';
import FacebookIcon from '../icons/FacebookIcon';
import TwitterIcon from '../icons/TwitterIcon';
import WhatsAppIcon from '../icons/WhatsAppIcon';
import LinkedInIcon from '../icons/LinkedInIcon';

const ContactContainer = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 4,
  padding: '60px 30px',
  backgroundColor: '#222838',
  [theme.breakpoints.down('md')]: {
    direction: 'column',
    spacing: 3
  }
}));

const CompanySection = styled(Stack)(({ theme }) => ({
  flex: 1,
  spacing: 2,
  alignItems: 'flex-start'
}));

const Logo = styled('img')(({ theme }) => ({
  height: '69px',
  width: '188px',
  objectFit: 'contain',
  marginBottom: '20px'
}));

const CompanyDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#ffffff',
  maxWidth: '193px'
}));

const ContactSection = styled(Stack)(({ theme }) => ({
  flex: 1,
  spacing: 2
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '24px',
  textTransform: 'capitalize',
  color: '#ffffff',
  marginBottom: '20px'
}));

const ContactItem = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 2,
  alignItems: 'center',
  marginBottom: '15px'
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 400,
  lineHeight: '22px',
  color: '#ffffff'
}));

const HoursText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  letterSpacing: '0.10px',
  color: '#ffffff'
}));

const NewsletterSection = styled(Stack)(({ theme }) => ({
  flex: 1,
  spacing: 2
}));

const NewsletterForm = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 1,
  marginBottom: '20px'
}));

const EmailInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    '& fieldset': {
      border: 'none'
    }
  },
  '& .MuiInputBase-input': {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '18px',
    fontWeight: 400,
    color: '#222838',
    padding: '12px 16px'
  }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  textTransform: 'capitalize',
  color: '#ffffff',
  backgroundColor: '#efb817',
  padding: '12px 24px',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#d4a315'
  }
}));

const SocialLinks = styled(Stack)(({ theme }) => ({
  direction: 'row',
  spacing: 2,
  marginTop: '20px'
}));

const ContactSectionComponent = ({ contactInfo, footer }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    setEmailError('');
  };

  return (
    <ContactContainer 
      direction={{ xs: 'column', md: 'row' }} 
      spacing={{ xs: 3, md: 4 }}
    >
      <CompanySection spacing={2}>
        <Logo src={footer?.logo} alt="Company Logo" />
        <CompanyDescription>
          {footer?.description}
        </CompanyDescription>
      </CompanySection>

      <ContactSection spacing={2}>
        <SectionTitle>
          contact us
        </SectionTitle>
        
        <ContactItem direction="row" spacing={2}>
          <LocationIcon width={20} height={25} color="#ffffff" />
          <ContactText>{contactInfo?.address}</ContactText>
        </ContactItem>
        
        <ContactItem direction="row" spacing={2}>
          <EmailIcon width={25} height={15} color="#ffffff" />
          <ContactText>{contactInfo?.email}</ContactText>
        </ContactItem>
        
        <ContactItem direction="row" spacing={2}>
          <PhoneIcon width={24} height={24} color="#ffffff" />
          <ContactText>{contactInfo?.phone}</ContactText>
        </ContactItem>
        
        <ContactItem direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
          <ClockIcon width={22} height={22} color="#ffffff" />
          <Stack spacing={0}>
            <HoursText>{contactInfo?.hours?.weekdays}</HoursText>
            <HoursText>{contactInfo?.hours?.saturday}</HoursText>
            <HoursText>{contactInfo?.hours?.sunday}</HoursText>
          </Stack>
        </ContactItem>
      </ContactSection>

      <NewsletterSection spacing={2}>
        <SectionTitle>
          {footer?.newsletter?.title}
        </SectionTitle>
        
        <NewsletterForm 
          component="form" 
          onSubmit={handleSubmit}
          direction="row" 
          spacing={1}
        >
          <EmailInput
            placeholder={footer?.newsletter?.placeholder}
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            type="email"
          />
          <SubmitButton type="submit">
            {footer?.newsletter?.buttonText}
          </SubmitButton>
        </NewsletterForm>
        
        <SectionTitle>
          follow us on
        </SectionTitle>
        
        <SocialLinks direction="row" spacing={2}>
          <FacebookIcon width={15} height={15} color="#ffffff" />
          <TwitterIcon width={15} height={15} color="#ffffff" />
          <WhatsAppIcon width={15} height={12} color="#ffffff" />
          <LinkedInIcon width={15} height={15} color="#ffffff" />
        </SocialLinks>
      </NewsletterSection>
    </ContactContainer>
  );
};

export default ContactSectionComponent;