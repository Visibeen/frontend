import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationIcon from '../icons/LocationIcon';
import PhoneIcon from '../icons/PhoneIcon';
import EmailIcon from '../icons/EmailIcon';
import ClockIcon from '../icons/ClockIcon';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: '80px 315px',
  backgroundColor: '#ffffff'
}));

const ContactContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '60px',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: '40px'
  }
}));

const ContactForm = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '20px'
}));

const ContactTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '14px',
  fontWeight: 700,
  letterSpacing: '1.80px',
  textTransform: 'uppercase',
  color: '#f4762a',
  marginBottom: '10px'
}));

const ContactHeading = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '57px',
  fontWeight: 700,
  letterSpacing: '-1.10px',
  lineHeight: '60px',
  color: '#0d2b23',
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    lineHeight: '45px'
  }
}));

const ContactDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  letterSpacing: '0.10px',
  lineHeight: '27.54px',
  color: '#797c7f',
  marginBottom: '30px'
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '1.30px',
  textTransform: 'uppercase',
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '4px',
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark
  }
}));

const ContactDetails = styled(Stack)(({ theme }) => ({
  flex: 1,
  gap: '40px'
}));

const ContactItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '16px'
}));

const ContactInfo = styled(Stack)(({ theme }) => ({
  gap: '5px'
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Nunito, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  letterSpacing: '0.10px',
  color: '#797c7f'
}));

const ContactPhone = styled(Typography)(({ theme }) => ({
  fontFamily: 'Kumbh Sans, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  letterSpacing: '-0.30px',
  lineHeight: '24px',
  color: '#0d2b23'
}));

const MapContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  height: '310px',
  borderRadius: '8px',
  overflow: 'hidden'
}));

const MapImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}));

const ContactSection = ({ contactInfo }) => {
  return (
    <SectionContainer>
      <ContactContent>
        <ContactForm>
          <ContactTitle>Contact Us</ContactTitle>
          <ContactHeading>
            {contactInfo?.title || 'Have Questions? Get in touch!'}
          </ContactHeading>
          <ContactDescription>
            {contactInfo?.description || 'Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.'}
          </ContactDescription>
          <CTAButton variant="contained">
            {contactInfo?.ctaText || 'Subcribe'}
          </CTAButton>
        </ContactForm>
        
        <ContactDetails>
          <ContactItem>
            <LocationIcon width={16} height={22} color="#0baa68" />
            <ContactInfo>
              <ContactText>{contactInfo?.details?.address?.country || 'Germany —'}</ContactText>
              <ContactText>{contactInfo?.details?.address?.street || '785 15h Street, Office 478'}</ContactText>
              <ContactText>{contactInfo?.details?.address?.city || 'Berlin, De 81566'}</ContactText>
            </ContactInfo>
          </ContactItem>
          
          <ContactItem>
            <PhoneIcon width={13} height={22} color="#0baa68" />
            <ContactPhone>
              {contactInfo?.details?.phone || '+1 840 841 25 69'}
            </ContactPhone>
          </ContactItem>
          
          <ContactItem>
            <ClockIcon width={22} height={22} color="#0baa68" />
            <ContactInfo>
              <ContactText>{contactInfo?.details?.hours?.weekdays || 'Mon-Fri: 9 AM – 6 PM'}</ContactText>
              <ContactText>{contactInfo?.details?.hours?.saturday || 'Saturday: 9 AM – 4 PM'}</ContactText>
              <ContactText>{contactInfo?.details?.hours?.sunday || 'Sunday: Closed'}</ContactText>
            </ContactInfo>
          </ContactItem>
          
          <ContactItem>
            <EmailIcon width={20} height={15} color="#0baa68" />
            <ContactText>
              {contactInfo?.details?.email || 'info@email.com'}
            </ContactText>
          </ContactItem>
        </ContactDetails>
        
        <MapContainer>
          <MapImage
            src={contactInfo?.map || '/images/contact-map.svg'}
            alt="Contact Map"
          />
        </MapContainer>
      </ContactContent>
    </SectionContainer>
  );
};

export default ContactSection;