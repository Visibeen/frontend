import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneIcon from '../icons/PhoneIcon';
import EmailIcon from '../icons/EmailIcon';
import SocialMediaIcons from '../icons/SocialMediaIcons';

const TopBarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#140a09',
  padding: '13px 320px',
  minHeight: '51px',
  display: 'flex',
  alignItems: 'center'
}));

const TopBarContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  flexWrap: 'wrap',
  gap: '20px'
}));

const ContactInfo = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '40px',
  flexWrap: 'wrap'
}));

const ContactItem = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '9px'
}));

const ContactText = styled(Typography)(({ theme }) => ({
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '17px',
  fontWeight: 400,
  color: '#ffffff'
}));

const SocialContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));

const TopContactBar = ({ topContactInfo }) => {
  return (
    <TopBarContainer>
      <TopBarContent>
        <ContactInfo>
          <ContactItem>
            <PhoneIcon width={18} height={18} color="#0b91d6" />
            <ContactText>
              {topContactInfo?.phone || '+123 456 789'}
            </ContactText>
          </ContactItem>
          
          <ContactItem>
            <EmailIcon width={18} height={14} color="#0b91d6" />
            <ContactText>
              {topContactInfo?.email || 'support@domain.com'}
            </ContactText>
          </ContactItem>
        </ContactInfo>
        
        <SocialContainer>
          <SocialMediaIcons width={143} height={32} color="#0b91d6" />
        </SocialContainer>
      </TopBarContent>
    </TopBarContainer>
  );
};

export default TopContactBar;